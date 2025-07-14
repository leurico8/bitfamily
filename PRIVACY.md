# BitFamily Privacy Policy & Technical Architecture

## Privacy-First Design Philosophy

BitFamily is designed from the ground up with privacy as a core principle. We believe that family financial data should remain private, secure, and under your complete control.

## What Data We DON'T Store

❌ **Real Bitcoin Addresses**: We never store your actual Bitcoin addresses
❌ **Private Keys**: We never generate, store, or transmit private keys  
❌ **Seed Phrases**: We never handle your wallet recovery phrases
❌ **Transaction Details**: Minimal transaction logging (optional)
❌ **Location Data**: We don't track where you are
❌ **Browsing Behavior**: No tracking cookies or analytics (unless you opt in)
❌ **Third-Party Data Sharing**: We never sell or share your data

## What Data We Store (Minimally)

✅ **Family Structure**: Child names/ages (encrypted)
✅ **Allowance Settings**: Weekly amounts and schedules (encrypted)
✅ **Account Balances**: Internal accounting only (encrypted)
✅ **Session Data**: Temporary login sessions (7-day expiry)

## Privacy Protection Layers

### 1. Client-Side Encryption
- All sensitive data encrypted in your browser before transmission
- Encryption keys derived from your password or generated locally
- Zero-knowledge architecture: we can't read your encrypted data

### 2. Local-First Storage
- Sensitive data stored locally on your device
- Optional server storage for sync across devices
- You control what data (if any) leaves your device

### 3. Address Labeling System
- No real Bitcoin addresses stored anywhere
- Internal labels like "Emma's Savings" map to your external wallet
- You maintain the mapping in your own Bitcoin wallet software

### 4. Data Minimization
- Store only what's absolutely necessary for functionality
- Automatic data purging after user-defined periods (default: 30 days)
- No detailed transaction descriptions or merchant information

### 5. Privacy Controls
You have complete control over:
- What data to store vs. keep local-only
- How long to retain transaction history
- Whether to enable any analytics (disabled by default)
- When to export or delete all your data

## Self-Hosting for Maximum Privacy

For ultimate privacy and data sovereignty, you can self-host BitFamily:

### Quick Self-Hosting Setup
```bash
# Clone the repository
git clone https://github.com/bitfamily/bitfamily.git
cd bitfamily

# Configure your environment
cp .env.example .env


self-Hosting Benefits
Complete Data Sovereignty: All data stays on your server
No Third-Party Dependencies: Connect directly to your Bitcoin/Lightning nodes
Enhanced Security: Full control over security updates and configuration
Tor Integration: Optional Tor proxy for maximum anonymity
Custom Retention: Set your own data retention policies
Bitcoin Privacy Best Practices
Address Management
External Wallet Control: Use your own Bitcoin wallet (Sparrow, Electrum, etc.)
Address Rotation: Generate new addresses for each transaction
UTXO Management: Consolidate UTXOs during low-fee periods
Coin Control: Use coin selection features in your wallet
Lightning Privacy
Node Selection: Connect to your own Lightning node or trusted service
Channel Management: Open private channels when possible
Route Diversity: Use multiple routing paths for payments
Payment Limits: Set conservative daily/transaction limits
Network Privacy
Tor Usage: Route Bitcoin/Lightning traffic through Tor
VPN: Use a privacy-focused VPN service
Node Privacy: Run your own Bitcoin node
Electrum Server: Connect to your own Electrum server
Data Export & Portability
Export Your Data
You can export all your BitFamily data at any time:

Family profiles and settings
Transaction history (if enabled)
Privacy preferences
Address labels and mappings
Data Format
Exported data is provided in standard JSON format, making it easy to:

Import into other applications
Create personal backups
Analyze your family's Bitcoin journey
Migrate to self-hosted setup
Compliance & Transparency
No KYC Required
BitFamily doesn't require identity verification
We don't collect personal identification documents
Email-only registration (or anonymous with self-hosting)
Open Source
All code is open source and auditable
Community security reviews welcome
No hidden tracking or backdoors
Regular Security Audits
Code security reviews
Dependency vulnerability scanning
Privacy policy updates with user notification
Contact & Support
Privacy Questions
Email: leurico8@proton.me
Security issues: leurico8@proton.me
Open source: https://github.com/bitfamily/bitfamily
Your Rights
Access: View all data we have about you
Portability: Export your data in standard formats
Deletion: Permanently delete all your data
Correction: Update or correct your information
Objection: Opt out of any data processing
Privacy-First Development
BitFamily is built by Bitcoin privacy advocates who understand that financial privacy is a fundamental right. Every feature is designed with privacy as the primary consideration, not an afterthought.

We believe families should be able to teach their children about Bitcoin without sacrificing their privacy or financial sovereignty.

Last updated: July 13, 2025
This privacy policy is version-controlled and all changes are tracked in our GitHub repository.
# Edit .env with your Bitcoin/Lightning node details

# Run with Docker
docker-compose up -d

# Access at http://localhost:3000
