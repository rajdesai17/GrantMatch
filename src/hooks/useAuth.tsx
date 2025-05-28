
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  user_type: 'founder' | 'dao_funder';
  org_type?: 'ngo' | 'startup';
  is_female: boolean;
  region?: string;
  mission?: string;
  wallet_address?: string;
  created_at: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const connectWallet = async (walletAddress: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ wallet_address: walletAddress })
        .eq('id', user.id);

      if (error) throw error;
      
      // Refresh profile
      await fetchProfile(user.id);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  };

  return {
    user,
    profile,
    loading,
    signOut,
    connectWallet,
    isFounder: profile?.user_type === 'founder',
    isDAOFunder: profile?.user_type === 'dao_funder',
    hasWallet: !!profile?.wallet_address,
  };
};
