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
# Edit .env with your Bitcoin/Lightning node details

# Run with Docker
docker-compose up -d

# Access at http://localhost:3000
