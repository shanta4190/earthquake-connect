import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

/**
 * GNAIAAAC SOVEREIGN OS™ — Encrypted Backend Server Backup Engine
 * Document Ref: GNAI-ENCR-BACKUP-2026-0923
 */
export class SovereignServerBackupEngine {
  constructor(config = {}) {
    this.algorithm = 'aes-256-gcm';
    this.secretKey = this.#resolveSecretKey(process.env.BACKUP_ENC_KEY);
    this.backupDir = config.backupDir || './encrypted_server_vault';

    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  #resolveSecretKey(rawKey) {
    if (!rawKey) {
      return crypto.randomBytes(32);
    }

    if (!/^[0-9a-fA-F]{64}$/.test(rawKey)) {
      throw new Error('BACKUP_ENC_KEY must be a 64-character hex string (32 bytes).');
    }

    return Buffer.from(rawKey, 'hex');
  }

  /**
   * Encrypts a non-public software application bundle or database dump
   */
  encryptArtifact(sourceFilePath, artifactName) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);

    const fileData = fs.readFileSync(sourceFilePath);
    const encryptedData = Buffer.concat([cipher.update(fileData), cipher.final()]);
    const authTag = cipher.getAuthTag();

    const encryptedPackage = {
      artifactName,
      timestamp: new Date().toISOString(),
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
      data: encryptedData.toString('hex')
    };

    const targetPath = path.join(this.backupDir, `${artifactName}_${Date.now()}.enc.json`);
    fs.writeFileSync(targetPath, JSON.stringify(encryptedPackage, null, 2));

    console.log(`[Backup Engine] Artifact '${artifactName}' encrypted and saved to Vault: ${targetPath}`);
    return targetPath;
  }

  /**
   * Decrypts an artifact back to memory for authorized backend execution
   */
  decryptArtifact(encryptedPackagePath) {
    const packageRaw = fs.readFileSync(encryptedPackagePath, 'utf8');
    const pkg = JSON.parse(packageRaw);

    const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, Buffer.from(pkg.iv, 'hex'));
    decipher.setAuthTag(Buffer.from(pkg.authTag, 'hex'));

    const decryptedData = Buffer.concat([
      decipher.update(Buffer.from(pkg.data, 'hex')),
      decipher.final()
    ]);

    console.log(`[Backup Engine] Artifact '${pkg.artifactName}' successfully decrypted for authorized kernel runtime.`);
    return decryptedData;
  }
}

// Execution Verification
if (process.argv[2] === '--test') {
  console.log('[Backup Engine] Running Sovereign Encrypted Vault Self-Test...');
  const engine = new SovereignServerBackupEngine();
  const dummyPath = './dummy_app.json';
  fs.writeFileSync(dummyPath, JSON.stringify({ app: 'SS6CONNECT_PROPRIETARY_MODULE', status: 'NON_PUBLIC' }));

  const encPath = engine.encryptArtifact(dummyPath, 'ProprietaryModule');
  engine.decryptArtifact(encPath);

  fs.unlinkSync(dummyPath);
}
