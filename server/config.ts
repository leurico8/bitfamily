export interface AppConfig {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
  sessionSecret: string;
  replitDomains: string[];
  issuerUrl: string;
  replId: string;
  
  // Bitcoin configuration
  bitcoinNetwork: 'mainnet' | 'testnet' | 'regtest';
  bitcoinRpcUrl?: string;
  bitcoinRpcAuth?: string;
  
  // Lightning configuration
  lightningNetworkUrl?: string;
  lightningMacaroon?: string;
  lightningTlsCert?: string;
  
  // Wallet configuration
  familyWalletAddress?: string;
  familyWalletXpub?: string;
  
  // External API keys
  blockcypherApiKey?: string;
  albyAccessToken?: string;
  phoenixApiKey?: string;
  breezApiKey?: string;
}

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value;
}

function getOptionalEnv(key: string): string | undefined {
  return process.env[key];
}

function validateConfig(): AppConfig {
  const requiredVars = [
    'DATABASE_URL',
    'SESSION_SECRET', 
    'REPLIT_DOMAINS',
    'REPL_ID'
  ];

  const missing = requiredVars.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  const config: AppConfig = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '5000', 10),
    databaseUrl: getRequiredEnv('DATABASE_URL'),
    sessionSecret: getRequiredEnv('SESSION_SECRET'),
    replitDomains: getRequiredEnv('REPLIT_DOMAINS').split(','),
    issuerUrl: process.env.ISSUER_URL || 'https://replit.com/oidc',
    replId: getRequiredEnv('REPL_ID'),
    
    // Bitcoin configuration
    bitcoinNetwork: (process.env.BITCOIN_NETWORK as any) || (process.env.NODE_ENV === 'production' ? 'mainnet' : 'testnet'),
    bitcoinRpcUrl: getOptionalEnv('BITCOIN_RPC_URL'),
    bitcoinRpcAuth: getOptionalEnv('BITCOIN_RPC_AUTH'),
    
    // Lightning configuration
    lightningNetworkUrl: getOptionalEnv('LIGHTNING_NETWORK_URL'),
    lightningMacaroon: getOptionalEnv('LIGHTNING_MACAROON'),
    lightningTlsCert: getOptionalEnv('LIGHTNING_TLS_CERT'),
    
    // Wallet configuration
    familyWalletAddress: getOptionalEnv('FAMILY_WALLET_ADDRESS'),
    familyWalletXpub: getOptionalEnv('FAMILY_WALLET_XPUB'),
    
    // External API keys
    blockcypherApiKey: getOptionalEnv('BLOCKCYPHER_API_KEY'),
    albyAccessToken: getOptionalEnv('ALBY_ACCESS_TOKEN'),
    phoenixApiKey: getOptionalEnv('PHOENIX_API_KEY'),
    breezApiKey: getOptionalEnv('BREEZ_API_KEY'),
  };

  return config;
}

export const config = validateConfig();

// Helper to check if we have Lightning configuration
export function hasLightningConfig(): boolean {
  return !!(config.lightningNetworkUrl && config.lightningMacaroon && config.lightningTlsCert);
}

// Helper to check if we have Bitcoin wallet configuration  
export function hasBitcoinWalletConfig(): boolean {
  return !!(config.familyWalletAddress && config.familyWalletXpub);
}

// Helper to check if we have external API configuration
export function hasExternalApiConfig(): boolean {
  return !!(config.bitcoinRpcUrl || config.blockcypherApiKey);
}
