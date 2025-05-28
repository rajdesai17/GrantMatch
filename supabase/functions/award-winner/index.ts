
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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

    const { round_name } = await req.json();

    if (!round_name) {
      throw new Error('Missing round_name');
    }

    // Get vote counts for all founders
    const { data: voteCounts, error: voteError } = await supabaseClient
      .from('votes')
      .select('founder_id, token_amount')
      .order('voted_at', { ascending: true });

    if (voteError) throw voteError;

    // Calculate total votes per founder
    const founderVotes = voteCounts.reduce((acc, vote) => {
      acc[vote.founder_id] = (acc[vote.founder_id] || 0) + vote.token_amount;
      return acc;
    }, {} as Record<string, number>);

    // Find winner (founder with most votes)
    let winnerId = null;
    let maxVotes = 0;
    let totalTokens = 0;

    for (const [founderId, votes] of Object.entries(founderVotes)) {
      totalTokens += votes;
      if (votes > maxVotes) {
        maxVotes = votes;
        winnerId = founderId;
      }
    }

    if (!winnerId) {
      throw new Error('No votes found');
    }

    // Create funding round record
    const { data: fundingRound, error: roundError } = await supabaseClient
      .from('funding_rounds')
      .insert({
        round_name,
        winner_id: winnerId,
        total_tokens: totalTokens
      })
      .select()
      .single();

    if (roundError) throw roundError;

    // Update winner's NFT with champion badge
    const { error: nftError } = await supabaseClient
      .from('nfts')
      .update({ champion_badge: true })
      .eq('user_id', winnerId);

    if (nftError) {
      console.error('Error updating NFT:', nftError);
      // Don't throw here as the main operation succeeded
    }

    // Get winner details for response
    const { data: winner } = await supabaseClient
      .from('users')
      .select('full_name, email')
      .eq('id', winnerId)
      .single();

    return new Response(
      JSON.stringify({
        success: true,
        funding_round: fundingRound,
        winner: {
          id: winnerId,
          name: winner?.full_name,
          email: winner?.email,
          votes_received: maxVotes
        },
        total_tokens_awarded: totalTokens
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Award winner error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
