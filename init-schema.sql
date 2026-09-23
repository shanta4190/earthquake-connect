BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table 1: Tokenized Payment Transactions
CREATE TABLE IF NOT EXISTS payment_transactions (
    transaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(64) NOT NULL,
    gateway_type VARCHAR(32) NOT NULL CHECK (gateway_type IN ('B2G_GATEWAY', 'STRIPE_GATEWAY')),
    payment_token VARCHAR(255) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status VARCHAR(32) NOT NULL CHECK (status IN ('PENDING', 'SETTLED', 'FAILED', 'REFUNDED', 'LOCKED_HOLD')),
    idempotency_key VARCHAR(128) UNIQUE NOT NULL,
    tracking_number VARCHAR(64) UNIQUE NOT NULL,
    agency_billing_id VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: Payment Refunds & Reversals Audit
CREATE TABLE IF NOT EXISTS payment_refunds (
    refund_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES payment_transactions(transaction_id) ON DELETE RESTRICT,
    tenant_id VARCHAR(64) NOT NULL,
    amount_refunded DECIMAL(12, 2) NOT NULL,
    refund_reason VARCHAR(64) NOT NULL CHECK (refund_reason IN ('DUPLICATE_CHARGE', 'SERVICE_CANCELLED', 'AGENCY_ADJUSTMENT', 'BILLING_ERROR')),
    approval_status VARCHAR(32) NOT NULL CHECK (approval_status IN ('AUTO_APPROVED', 'PENDING_HUMAN_REVIEW', 'APPROVED', 'REJECTED')),
    approved_by_user_id VARCHAR(64),
    ameba_notification_dispatched BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table 3: Gateway Activation Locks & Audit Log
CREATE TABLE IF NOT EXISTS gateway_activation_logs (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gateway_name VARCHAR(32) NOT NULL,
    previous_state VARCHAR(16) NOT NULL,
    new_state VARCHAR(16) NOT NULL,
    agency_approval_token_ref VARCHAR(255),
    executed_by_ip VARCHAR(45) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row-Level Security
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_refunds ENABLE ROW LEVEL SECURITY;

-- Indexes for Fast Query Performance
CREATE INDEX IF NOT EXISTS idx_transactions_tenant ON payment_transactions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_transactions_tracking ON payment_transactions(tracking_number);
CREATE INDEX IF NOT EXISTS idx_refunds_transaction ON payment_refunds(transaction_id);

COMMIT;
