
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import WalletConnect from './WalletConnect';
import WalletSignIn from './WalletSignIn';

interface AuthFormProps {
  isSignUp: boolean;
  onToggleMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUp, onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    userType: 'founder' as 'founder' | 'dao_funder',
    orgType: '',
    isFemale: false,
    region: '',
    mission: ''
  });
  const [loading, setLoading] = useState(false);
  const [showWalletConnect, setShowWalletConnect] = useState(false);
  const [newUserId, setNewUserId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            user_type: formData.userType,
            org_type: formData.orgType || null,
            is_female: formData.isFemale,
            region: formData.region,
            mission: formData.mission
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        setNewUserId(data.user.id);
        setShowWalletConnect(true);
        toast({
          title: "Account created successfully!",
          description: "Now connect your wallet to complete setup.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You've been signed in successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWalletConnected = (walletAddress: string) => {
    toast({
      title: "Setup Complete!",
      description: "Your account is ready. Redirecting...",
    });
    // The useAuth hook will handle the redirect
  };

  if (showWalletConnect && newUserId) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Almost Done!</h1>
          <p className="text-slate-300">Connect your wallet to complete setup</p>
        </div>
        
        <WalletConnect 
          onWalletConnected={handleWalletConnected}
          userId={newUserId}
        />
        
        <div className="text-center">
          <button
            onClick={() => setShowWalletConnect(false)}
            className="text-slate-300 hover:text-white transition-colors text-sm"
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          {isSignUp ? 'Join GrantMatch' : 'Welcome Back'}
        </h1>
        <p className="text-slate-300">
          {isSignUp ? 'Create your account to get started' : 'Sign in to your account'}
        </p>
      </div>

      <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-slate-300">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-slate-800/50 border-slate-600 text-white"
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-slate-300">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="bg-slate-800/50 border-slate-600 text-white"
            required
          />
        </div>

        {isSignUp && (
          <>
            <div>
              <Label htmlFor="fullName" className="text-slate-300">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-slate-800/50 border-slate-600 text-white"
                required
              />
            </div>

            <div>
              <Label className="text-slate-300">User Type</Label>
              <RadioGroup
                value={formData.userType}
                onValueChange={(value) => setFormData({ ...formData, userType: value as 'founder' | 'dao_funder' })}
                className="flex gap-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="founder" id="founder" />
                  <Label htmlFor="founder" className="text-slate-300">Founder</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dao_funder" id="dao_funder" />
                  <Label htmlFor="dao_funder" className="text-slate-300">DAO Funder</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.userType === 'founder' && (
              <div>
                <Label className="text-slate-300">Organization Type</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, orgType: value })}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ngo">NGO</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFemale"
                checked={formData.isFemale}
                onCheckedChange={(checked) => setFormData({ ...formData, isFemale: checked as boolean })}
              />
              <Label htmlFor="isFemale" className="text-slate-300">I am a female founder</Label>
            </div>

            <div>
              <Label htmlFor="region" className="text-slate-300">Region</Label>
              <Input
                id="region"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="bg-slate-800/50 border-slate-600 text-white"
                placeholder="e.g., North America, Europe, Asia"
              />
            </div>

            <div>
              <Label htmlFor="mission" className="text-slate-300">Mission Statement</Label>
              <Textarea
                id="mission"
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                className="bg-slate-800/50 border-slate-600 text-white"
                placeholder="Describe your project's mission and goals"
                rows={3}
              />
            </div>
          </>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full primary-button"
        >
          {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
        </Button>
      </form>

      {!isSignUp && <WalletSignIn onSuccess={() => {}} />}

      <div className="text-center">
        <button
          onClick={onToggleMode}
          className="text-slate-300 hover:text-white transition-colors"
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
