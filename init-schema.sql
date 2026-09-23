BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Construction Cost Codes Master Table
CREATE TABLE IF NOT EXISTS construction_cost_codes (
    cost_code_id VARCHAR(32) PRIMARY KEY,
    code_name VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL
);

-- Payment Transactions Table
CREATE TABLE IF NOT EXISTS payment_transactions (
    transaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(64) NOT NULL,
    gateway_type VARCHAR(32) NOT NULL,
    payment_token VARCHAR(255) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status VARCHAR(32) NOT NULL,
    idempotency_key VARCHAR(128) UNIQUE NOT NULL,
    tracking_number VARCHAR(64) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row-Level Security
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

COMMIT;
