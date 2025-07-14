# BitFamily - Privacy-First Bitcoin Family Wallet
A secure, educational Bitcoin wallet designed for families. Parents maintain complete control over funds while children learn about Bitcoin through guided spending and savings experiences.
## 🔒 Privacy-First Architecture
- **Zero-Knowledge Design**: Server cannot read encrypted family data
- **No Private Key Storage**: App never generates, stores, or handles private keys
- **Address Labeling System**: No real Bitcoin addresses stored anywhere
- **Client-Side Encryption**: All sensitive data encrypted before transmission
- **Local-First Storage**: User controls what data leaves their device
## ⚡ Key Features
### For Parents
- Complete control over Bitcoin and Lightning funds
- Set weekly allowances and spending limits
- Monitor all family transactions
- Approve withdrawal requests
- Real-time balance monitoring
### For Children
- Learn Bitcoin fundamentals through guided experience
- Spend Lightning payments within parent-set limits
- Request additional spending funds
- View savings and spending balances
- Build responsible money habits
### Technical Features
- **Real Bitcoin Integration**: Production-ready mainnet support
- **Lightning Network**: Multi-node support (LND, Alby, Zeus, Phoenix, Breez)
- **Accounting System**: Children's balances as safe accounting entries
- **External Wallet Control**: User maintains complete control of funds
- **Health Monitoring**: Production-ready with comprehensive monitoring
## 🚀 Quick Start
### Option 1: Deploy on Replit (Recommended)
1. Fork this repository on Replit
2. Configure environment variables
3. Click Deploy
### Option 2: Self-Hosting with Docker
```bash
git clone https://github.com/your-username/bitfamily.git
cd bitfamily
cp .env.example .env
# Edit .env with your configuration
docker-compose up -d
