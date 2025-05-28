
/**
 * Utility functions for grant-related operations
 * Centralizes grant processing logic for reusability
 */

/**
 * Maps grant IDs to human-readable names for logging and display
 */
export const getGrantName = (grantId: string): string => {
  const grantNames: Record<string, string> = {
    'grant-001': 'Community Empowerment Fund 2025',
    'grant-002': 'Women in Tech Innovation Grant',
    'grant-003': 'Rural Development Initiative',
    'grant-004': 'Climate Action Seed Fund',
    'grant-005': 'Arts & Culture Revitalization Grant'
  };
  
  return grantNames[grantId] || 'Unknown Grant';
};

/**
 * Handles grant application process with comprehensive logging
 * Provides detailed feedback for application tracking
 */
export const processGrantApplication = (grantId: string): void => {
  const grantName = getGrantName(grantId);
  
  console.log('=== GRANT APPLICATION INITIATED ===');
  console.log(`Grant: ${grantName}`);
  console.log(`ID: ${grantId}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Estimated completion: 15-20 minutes`);
  console.log(`Required documents: Business plan, financial statements, impact assessment`);
  console.log(`Next steps: Document upload → Review → Submission`);
  console.log('=====================================');
};

/**
 * Simulates wallet connection with realistic feedback
 * Provides mock wallet data for development purposes
 */
export const simulateWalletConnection = (): void => {
  const mockWalletData = {
    address: '0x742d35Cc6632C0532925a3b8D32f5f5',
    balance: '2.847 ETH',
    network: 'Ethereum Mainnet',
    connected: true,
    timestamp: new Date().toISOString()
  };

  console.log('=== WALLET CONNECTION SIMULATION ===');
  console.log('Status: Connected');
  console.log(`Address: ${mockWalletData.address}`);
  console.log(`Balance: ${mockWalletData.balance}`);
  console.log(`Network: ${mockWalletData.network}`);
  console.log(`Connected at: ${mockWalletData.timestamp}`);
  console.log('===================================');
};
