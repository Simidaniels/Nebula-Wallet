import React from "react";

type FooterLink = {
  label: string;
  href?: string;
  badge?: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Resources",
    links: [
      { label: "Bitcoin Price", href: "#" },
      { label: "Market Overview", href: "#" },
      { label: "Transaction Explorer", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Support", href: "#" },
      { label: "Bug Reports", href: "#" },
      { label: "Security Issues", href: "/security" },
      { label: "FAQs", href: "#" },
    ],
  },
  {
    title: "Nebula Vault",
    links: [
      { label: "About Us", href: "#" },
      { label: "Security Practices", href: "#" },
      { label: "Risk Disclosure", href: "#" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "X (Twitter)", href: "#" },
      { label: "Telegram", href: "#" },
      { label: "Discord", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  },
];

const DashboardLinksFooter = () => {
  return (
    <section
      className="dashboard-links-footer"
      role="contentinfo"
      aria-label="Dashboard footer links"
    >
      <div className="dashboard-links-inner">
        <div className="dashboard-links-brand">
          <div className="dashboard-brand-row">
            <div className="dashboard-brand-logo">N</div>
            <span className="dashboard-brand-name">Nebula Vault</span>
          </div>

          <p className="dashboard-brand-description">
            Nebula Vault gives you a secure Bitcoin dashboard with fast balance
            tracking, clean transfer workflows, and market visibility.
          </p>

          <div className="dashboard-trust-badges">
            <span className="dashboard-trust-badge">Self-Custody</span>
            <span className="dashboard-trust-badge">Bitcoin-Only</span>
            <span className="dashboard-trust-badge">Open Standards</span>
          </div>
        </div>

        <nav className="dashboard-links-columns" aria-label="Footer navigation">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="dashboard-links-column">
              <h4 className="dashboard-links-title">{column.title}</h4>
              <ul className="dashboard-links-list">
                {column.links.map((link) => (
                  <li key={link.label} className="dashboard-links-item">
                    <a href={link.href ?? "#"} className="dashboard-links-link">
                      {link.label}
                    </a>
                    {link.badge && (
                      <span className="dashboard-links-badge">
                        {link.badge}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default DashboardLinksFooter;
