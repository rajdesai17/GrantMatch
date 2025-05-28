
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Connection, PublicKey, Transaction } from "https://esm.sh/@solana/web3.js@1.87.6";

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

    const { voter_id, founder_id, token_amount = 1 } = await req.json();

    if (!voter_id || !founder_id) {
      throw new Error('Missing voter_id or founder_id');
    }

    // Verify voter is a DAO Funder
    const { data: voter, error: voterError } = await supabaseClient
      .from('users')
      .select('user_type, wallet_address')
      .eq('id', voter_id)
      .single();

    if (voterError || voter.user_type !== 'dao_funder') {
      throw new Error('Only DAO Funders can vote');
    }

    // Verify founder exists and is a founder
    const { data: founder, error: founderError } = await supabaseClient
      .from('users')
      .select('user_type')
      .eq('id', founder_id)
      .single();

    if (founderError || founder.user_type !== 'founder') {
      throw new Error('Invalid founder');
    }

    // For demo purposes, simulate SPL token transfer
    // In a real implementation, you would:
    // 1. Create and send SPL transfer transaction
    // 2. Wait for confirmation
    console.log(`Simulating 1 TestToken transfer from ${voter.wallet_address} for vote`);

    // Record the vote in database
    const { data: vote, error: voteError } = await supabaseClient
      .from('votes')
      .insert({
        voter_id,
        founder_id,
        token_amount
      })
      .select()
      .single();

    if (voteError) throw voteError;

    return new Response(
      JSON.stringify({
        success: true,
        vote_id: vote.id,
        message: 'Vote recorded successfully',
        transaction_id: 'simulated_vote_tx_' + Date.now()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Vote recording error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
