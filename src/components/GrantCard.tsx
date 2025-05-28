
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

interface Grant {
  id: string;
  title: string;
  description: string;
  deadline: string;
  region: string;
  focusAreas: string[];
  amount: string;
  eligibility: string;
}

interface GrantCardProps {
  grant: Grant;
  onApply: (grantId: string) => void;
}

const GrantCard: React.FC<GrantCardProps> = ({ grant, onApply }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-blue/20">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-white group-hover:text-neon-blue transition-colors">
            {grant.title}
          </h3>
          <p className="text-gray-300 mt-2 text-sm leading-relaxed">
            {grant.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {grant.focusAreas.map((area, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-neon-blue/20 border border-neon-blue/30 text-neon-blue text-xs rounded-full font-medium"
            >
              {area}
            </span>
          ))}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="w-4 h-4 text-neon-green" />
            <span>Deadline: {formatDate(grant.deadline)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="w-4 h-4 text-neon-pink" />
            <span>Region: {grant.region}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <DollarSign className="w-4 h-4 text-neon-orange" />
            <span>{grant.amount}</span>
          </div>
        </div>

        <Button
          onClick={() => onApply(grant.id)}
          className="w-full bg-gradient-to-r from-neon-green to-neon-blue hover:from-neon-blue hover:to-neon-green text-white font-semibold py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-neon-green/30"
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default GrantCard;
