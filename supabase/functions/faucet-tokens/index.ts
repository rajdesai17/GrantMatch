
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Connection, PublicKey, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } from "https://esm.sh/@solana/web3.js@1.87.6";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { wallet_address, user_id } = await req.json();

    if (!wallet_address || !user_id) {
      throw new Error('Missing wallet_address or user_id');
    }

    // Connect to Solana Devnet
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

    // For demo purposes, we'll simulate the token airdrop
    // In a real implementation, you would:
    // 1. Create SPL tokens
    // 2. Transfer 100 TestTokens to the wallet
    console.log(`Airdropping 100 TestTokens to ${wallet_address} for user ${user_id}`);

    // Update user's wallet address in database
    const { error: updateError } = await supabaseClient
      .from('users')
      .update({ wallet_address })
      .eq('id', user_id);

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({
        success: true,
        message: '100 TestTokens airdropped successfully',
        transaction_id: 'simulated_tx_id_' + Date.now()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Faucet error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
