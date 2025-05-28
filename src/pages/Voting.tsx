
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import FounderCard from '@/components/FounderCard';
import { Wallet, Coins, Trophy } from 'lucide-react';
import foundersData from '@/data/founders.json';

const Voting = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenBalance, setTokenBalance] = useState(0);
  const [founders, setFounders] = useState(foundersData);

  const connectWallet = () => {
    // Simulate wallet connection
    setIsWalletConnected(true);
    setWalletAddress('9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM');
  };

  const getTestTokens = () => {
    setTokenBalance(prev => prev + 100);
  };

  const handleVote = (founderId: string) => {
    if (tokenBalance > 0) {
      setTokenBalance(prev => prev - 1);
      setFounders(prev => prev.map(founder => 
        founder.id === founderId 
          ? { ...founder, currentVotes: founder.currentVotes + 1 }
          : founder
      ));
      console.log('Voted for founder:', founderId);
    }
  };

  const sortedFounders = [...founders].sort((a, b) => b.currentVotes - a.currentVotes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            DAO <span className="neon-text">Voting</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Support founders through decentralized governance and token-based voting
          </p>
        </div>

        {/* Wallet & Token Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Connect Wallet */}
          <div className="glass-card p-6 text-center">
            <Wallet className="w-12 h-12 text-neon-blue mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-4">Phantom Wallet</h3>
            {!isWalletConnected ? (
              <Button
                onClick={connectWallet}
                className="w-full neon-glow bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-blue rounded-xl"
              >
                Connect Wallet
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-green-400 font-semibold">Connected</div>
                <div className="text-xs text-gray-400 font-mono break-all">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                </div>
              </div>
            )}
          </div>

          {/* Token Balance */}
          <div className="glass-card p-6 text-center">
            <Coins className="w-12 h-12 text-neon-green mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-4">TestTokens</h3>
            <div className="text-2xl font-bold text-neon-green mb-4">{tokenBalance}</div>
            <Button
              onClick={getTestTokens}
              disabled={!isWalletConnected}
              className="w-full bg-gradient-to-r from-neon-green to-neon-blue hover:from-neon-blue hover:to-neon-green rounded-xl disabled:opacity-50"
            >
              Get 100 Tokens
            </Button>
          </div>

          {/* Voting Power */}
          <div className="glass-card p-6 text-center">
            <Trophy className="w-12 h-12 text-neon-orange mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-4">Voting Power</h3>
            <div className="text-2xl font-bold text-neon-orange mb-4">{tokenBalance}</div>
            <div className="text-sm text-gray-400">1 Token = 1 Vote</div>
          </div>
        </div>

        {/* Voting Instructions */}
        {isWalletConnected && tokenBalance > 0 && (
          <div className="glass-card p-6 mb-8 text-center">
            <p className="text-gray-300">
              🗳️ You have <span className="text-neon-green font-semibold">{tokenBalance} votes</span> available. 
              Support founders by voting for their NFT profiles!
            </p>
          </div>
        )}

        {/* Founders Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedFounders.map((founder, index) => (
            <div key={founder.id} className="relative">
              {index < 3 && (
                <div className="absolute -top-3 -left-3 bg-gradient-to-r from-neon-orange to-neon-pink text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  #{index + 1}
                </div>
              )}
              <FounderCard
                founder={founder}
                onVote={handleVote}
              />
            </div>
          ))}
        </div>

        {/* Voting Stats */}
        <div className="glass-card p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Voting Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold neon-text mb-2">
                {founders.reduce((sum, founder) => sum + founder.currentVotes, 0)}
              </div>
              <div className="text-gray-300">Total Votes Cast</div>
            </div>
            <div>
              <div className="text-3xl font-bold neon-text mb-2">{founders.length}</div>
              <div className="text-gray-300">Active Founders</div>
            </div>
            <div>
              <div className="text-3xl font-bold neon-text mb-2">
                {founders.filter(f => f.isTopVoted).length}
              </div>
              <div className="text-gray-300">Top Voted</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Voting;
