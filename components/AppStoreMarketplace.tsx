import React, { useState } from 'react';

interface SoftwareTier {
  id: string;
  name: string;
  priceDisplay: string;
  amount: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export default function AppStoreMarketplace() {
  const [selectedTier, setSelectedTier] = useState('STUDENT');
  const [loading, setLoading] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<Record<string, unknown> | null>(null);

  const tiers: SoftwareTier[] = [
    {
      id: 'STUDENT',
      name: 'Student & Lifelong Learner',
      priceDisplay: '$5.00',
      amount: 5.0,
      description: 'Complete access to Quantum Kids™, Future Innovators™, and learning labs.',
      features: ['App Generator Access', 'Learning Labs & Sandbox', '140-Language Voice Hub', 'PWA Offline Sync'],
    },
    {
      id: 'ASIA_REGIONAL',
      name: 'Asia Regional Tier',
      priceDisplay: '$10.00 / mo',
      amount: 10.0,
      description: 'Alpha/Beta acceleration for micro-enterprises and regional developers.',
      features: ['Regional App Store Access', 'Local Cloud Routing', 'Standard SLA Support'],
    },
    {
      id: 'GLOBAL_COMMERCIAL',
      name: 'Global Commercial Tier',
      priceDisplay: '$25.00 / mo',
      amount: 25.0,
      isPopular: true,
      description: 'Worldwide multi-cloud routing and complete software catalog access.',
      features: ['Full Software Catalog', 'Gamma/Omega Acceleration', '99.9% Uptime SLA', 'Enterprise Integrations'],
    },
    {
      id: 'BUSINESS_OPS',
      name: 'Business Operations Tier',
      priceDisplay: '$99.00 / mo',
      amount: 99.0,
      description: 'Multi-user team workspaces, ERP/CRM hooks, and job-costing engines.',
      features: ['Omega/Supernova Workflows', 'Freight Allocation Engine', 'BIM-to-BOQ Construction Tool', '24/7 Desk Support'],
    },
  ];

  const handleCheckout = async (tier: SoftwareTier) => {
    setLoading(true);
    setCheckoutStatus(null);

    try {
      const response = await fetch('/api/v1/checkout/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: 'STRIPE_CARD',
          amount: tier.amount,
          currency: 'USD',
          customerEmail: 'user@domain.com',
          planTier: tier.id,
          isStudent: tier.id === 'STUDENT',
        }),
      });

      const data = await response.json();
      setCheckoutStatus(data);
    } catch (err) {
      console.error('Checkout failed:', err);
      setCheckoutStatus({ ok: false, error: 'CHECKOUT_FAILED' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Software & App Marketplace</h2>
      <p>Select a plan and continue to checkout.</p>

      <div>
        {tiers.map((tier) => {
          const isSelected = selectedTier === tier.id;
          return (
            <article key={tier.id}>
              {tier.isPopular ? <strong>Most Popular</strong> : null}
              <h3>{tier.name}</h3>
              <p>{tier.priceDisplay}</p>
              <p>{tier.description}</p>
              <ul>
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setSelectedTier(tier.id);
                  void handleCheckout(tier);
                }}
              >
                {loading && isSelected ? 'Processing...' : `Choose ${tier.name}`}
              </button>
            </article>
          );
        })}
      </div>

      {checkoutStatus ? (
        <pre>{JSON.stringify(checkoutStatus, null, 2)}</pre>
      ) : null}
    </section>
  );
}
