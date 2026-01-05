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
    //   { label: "API Access", href: "#" },
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
    title: "NebulaWallet",
    links: [
      { label: "About Us", href: "#" },
    //   { label: "Careers", href: "#", badge: "Hiring" },
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
        {/* BRAND */}
        <div className="dashboard-links-brand">
          <div className="dashboard-brand-row">
            <div className="dashboard-brand-logo">N</div>
            <span className="dashboard-brand-name">NebulaWallet</span>
          </div>

          <p className="dashboard-brand-description">
            NebulaWallet is a secure, non-custodial Bitcoin wallet built for
            global access. You always control your private keys and assets.
          </p>

          <div className="dashboard-trust-badges">
            <span className="dashboard-trust-badge">Self-Custody</span>
            <span className="dashboard-trust-badge">Bitcoin-Only</span>
            <span className="dashboard-trust-badge">Open Standards</span>
          </div>
        </div>

        {/* LINKS */}
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
