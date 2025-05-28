
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface WalletSignInProps {
  onSuccess: () => void;
}

const WalletSignIn: React.FC<WalletSignInProps> = ({ onSuccess }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const signInWithWallet = async () => {
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

      // Check if user exists with this wallet address
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', publicKey)
        .single();

      if (error && error.code === 'PGRST116') {
        toast({
          title: "Wallet not registered",
          description: "This wallet is not associated with any account. Please sign up first.",
          variant: "destructive",
        });
        return;
      }

      if (error) throw error;

      if (userData) {
        // Create a custom token for wallet-based auth
        // In a real implementation, you'd want to verify wallet ownership
        // For now, we'll use the existing email/password auth but auto-sign them in
        toast({
          title: "Wallet Authentication",
          description: "Please use email/password sign-in for now. Wallet-only auth coming soon!",
        });
      }

    } catch (error: any) {
      console.error('Wallet sign-in error:', error);
      toast({
        title: "Sign-in Failed",
        description: error.message || "Failed to sign in with wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center my-4">
        <div className="flex-1 border-t border-slate-600"></div>
        <span className="px-4 text-slate-400 text-sm">or</span>
        <div className="flex-1 border-t border-slate-600"></div>
      </div>

      <Button
        onClick={signInWithWallet}
        disabled={isConnecting}
        variant="outline"
        className="w-full bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50"
      >
        <Wallet className="w-4 h-4 mr-2" />
        {isConnecting ? 'Connecting...' : 'Sign In with Phantom Wallet'}
      </Button>
    </div>
  );
};

export default WalletSignIn;
