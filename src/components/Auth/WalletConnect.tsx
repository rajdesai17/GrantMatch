
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface WalletConnectProps {
  onWalletConnected: (walletAddress: string) => void;
  userId?: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onWalletConnected, userId }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const { toast } = useToast();

  const connectPhantomWallet = async () => {
    setIsConnecting(true);
    
    try {
      // Check if Phantom is installed
      const { solana } = window as any;
      
      if (!solana || !solana.isPhantom) {
        toast({
          title: "Phantom Wallet not found",
          description: "Please install Phantom wallet extension",
          variant: "destructive",
        });
        window.open('https://phantom.app/', '_blank');
        return;
      }

      // Connect to Phantom
      const response = await solana.connect();
      const publicKey = response.publicKey.toString();
      
      setWalletAddress(publicKey);
      onWalletConnected(publicKey);

      // Update user's wallet address in database if userId is provided
      if (userId) {
        const { error } = await supabase
          .from('users')
          .update({ wallet_address: publicKey })
          .eq('id', userId);

        if (error) throw error;

        // Call faucet function for DAO funders
        const { data: userData } = await supabase
          .from('users')
          .select('user_type')
          .eq('id', userId)
          .single();

        if (userData?.user_type === 'dao_funder') {
          await airdropTokens(publicKey, userId);
        }
      }

      toast({
        title: "Wallet Connected!",
        description: `Connected to ${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`,
      });

    } catch (error: any) {
      console.error('Wallet connection error:', error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const airdropTokens = async (walletAddress: string, userId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('faucet-tokens', {
        body: { wallet_address: walletAddress, user_id: userId }
      });

      if (error) throw error;

      toast({
        title: "Tokens Airdropped!",
        description: "100 TestTokens have been sent to your wallet",
      });
    } catch (error: any) {
      console.error('Airdrop error:', error);
      toast({
        title: "Airdrop Failed",
        description: "Failed to airdrop tokens, please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Wallet className="w-12 h-12 text-neon-blue mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
        <p className="text-slate-300 text-sm">
          Connect your Phantom wallet to complete setup
        </p>
      </div>

      {!walletAddress ? (
        <Button
          onClick={connectPhantomWallet}
          disabled={isConnecting}
          className="w-full primary-button"
        >
          {isConnecting ? 'Connecting...' : 'Connect Phantom Wallet'}
        </Button>
      ) : (
        <div className="text-center space-y-2">
          <div className="text-green-400 font-semibold">✓ Wallet Connected</div>
          <div className="text-xs text-gray-400 font-mono break-all">
            {walletAddress.slice(0, 12)}...{walletAddress.slice(-12)}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
