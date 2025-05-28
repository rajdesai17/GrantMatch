
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Vote, MapPin, Target } from 'lucide-react';

interface Founder {
  id: string;
  name: string;
  mission: string;
  region: string;
  isFemaleFounder: boolean;
  appliedGrantsCount: number;
  nftUri: string;
  currentVotes: number;
  isTopVoted: boolean;
}

interface FounderCardProps {
  founder: Founder;
  onVote: (founderId: string) => void;
}

const FounderCard: React.FC<FounderCardProps> = ({ founder, onVote }) => {
  return (
    <div className="relative glass-card p-6 hover:bg-white/10 transition-all duration-300 group hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-purple/20">
      {/* Top Voted Badge */}
      {founder.isTopVoted && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-neon-pink to-neon-orange p-2 rounded-full animate-pulse-neon">
          <Star className="w-5 h-5 text-white fill-current" />
        </div>
      )}

      <div className="space-y-4">
        {/* NFT Placeholder */}
        <div className="w-full h-32 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 rounded-xl border border-neon-blue/30 flex items-center justify-center">
          <div className="text-neon-blue font-mono text-sm">NFT #{founder.id.split('-')[1]}</div>
        </div>

        {/* Founder Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-neon-purple transition-colors">
              {founder.name}
            </h3>
            {founder.isFemaleFounder && (
              <span className="px-2 py-1 bg-neon-pink/20 border border-neon-pink/30 text-neon-pink text-xs rounded-full font-medium">
                Female Founder
              </span>
            )}
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            {founder.mission}
          </p>
        </div>

        {/* Stats */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="w-4 h-4 text-neon-green" />
            <span>{founder.region}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Target className="w-4 h-4 text-neon-blue" />
            <span>Grants Applied: {founder.appliedGrantsCount}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Vote className="w-4 h-4 text-neon-purple" />
            <span>Current Votes: {founder.currentVotes}</span>
          </div>
        </div>

        {/* Vote Button */}
        <Button
          onClick={() => onVote(founder.id)}
          className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple text-white font-semibold py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/30"
        >
          Vote
        </Button>
      </div>
    </div>
  );
};

export default FounderCard;
