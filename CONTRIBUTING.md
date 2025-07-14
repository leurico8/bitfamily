# Contributing to BitFamily

Thank you for your interest in contributing to BitFamily! This guide will help you get started.

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and collaborative environment.

## Getting Started

### Prerequisites
- Node.js 20 or higher
- PostgreSQL database
- Basic understanding of Bitcoin and Lightning Network
- Familiarity with TypeScript and React

### Development Setup
```bash
# Clone the repository
git clone https://github.com/your-username/bitfamily.git
cd bitfamily

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Initialize database
npm run db:push

# Start development server
npm run dev


Project Structure
bitfamily/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── pages/          # Page components
├── server/                 # Express backend
│   ├── db.ts              # Database connection
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data access layer
│   └── *.ts               # Service modules
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema
└── docs/                   # Documentation

Development Guidelines
Code Style
Use TypeScript for all new code
Follow existing code formatting and conventions
Use meaningful variable and function names
Add JSDoc comments for complex functions
Security Guidelines
Never store private keys or sensitive Bitcoin data
All user data must be encrypted before storage
Validate all inputs with Zod schemas
Use parameterized queries for database operations
Follow the principle of least privilege
Testing
Write tests for new features
Test with testnet Bitcoin before mainnet
Include error handling tests
Test privacy and security features thoroughly
Submitting Changes
Pull Request Process
Fork the repository
Create a feature branch: git checkout -b feature/your-feature-name
Make your changes
Add tests if applicable
Ensure all tests pass
Update documentation if needed
Submit a pull request
Pull Request Guidelines
Provide a clear description of changes
Reference any related issues
Include screenshots for UI changes
Ensure code passes all security checks
Update version documentation if applicable
Types of Contributions
Bug Reports
Use the GitHub issue template
Include steps to reproduce
Provide system information
Include relevant logs (without sensitive data)
Feature Requests
Describe the problem you're solving
Explain the proposed solution
Consider security and privacy implications
Discuss implementation approach
Documentation
Fix typos and improve clarity
Add examples and use cases
Update setup instructions
Translate to other languages
Code Contributions
Bug fixes
Performance improvements
New features
Security enhancements
Privacy improvements
Security Considerations
Responsible Disclosure
Report security vulnerabilities privately
Allow time for fixes before public disclosure
Provide clear reproduction steps
Suggest potential mitigations
Privacy Protection
Respect user privacy in all contributions
Follow zero-knowledge architecture principles
Minimize data collection and storage
Implement proper data encryption
Development Best Practices
Database Changes
Use Drizzle ORM for all database operations
Run npm run db:push to apply schema changes
Never write manual SQL migrations
Test database changes thoroughly
Frontend Development
Use shadcn/ui components when possible
Implement proper error boundaries
Follow accessibility guidelines
Test on mobile devices
Backend Development
Validate all inputs with Zod schemas
Use proper error handling
Implement rate limiting for sensitive operations
Log security-relevant events
Review Process
Code Review Checklist
 Code follows project conventions
 Security best practices followed
 Privacy considerations addressed
 Tests added for new functionality
 Documentation updated
 No sensitive data exposed
Approval Process
All pull requests require review
Security-related changes require additional review
Breaking changes require documentation updates
Major features require design discussion
Resources
Documentation
Production Security Checklist
Deployment Guide
Privacy Policy
Version History
External Resources
Bitcoin Development
Lightning Network
React Documentation
TypeScript Handbook
Questions?
If you have questions about contributing:

Open a GitHub issue
Review existing documentation
Check the project's README
Look at previous pull requests for examples
Thank you for helping make BitFamily better for families learning about Bitcoin!
