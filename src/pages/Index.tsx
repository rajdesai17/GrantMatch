
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { ArrowRight, Search, Users, Zap } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8 text-slate-300" />,
      title: "AI-Powered Grant Discovery",
      description: "Find the perfect grants tailored to your mission using our intelligent matching system."
    },
    {
      icon: <Users className="w-8 h-8 text-slate-300" />,
      title: "Community Voting",
      description: "Participate in decentralized governance and support fellow founders through token-based voting."
    },
    {
      icon: <Zap className="w-8 h-8 text-slate-300" />,
      title: "NFT Profile System",
      description: "Create your unique founder profile as an NFT, showcasing your journey and achievements."
    }
  ];

  return (
    <div className="min-h-screen rich-gradient-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-20">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none">
              <span className="block text-white">Discover Your</span>
              <span className="block elegant-text">Perfect Grant</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              GrantMatch connects founders with funding opportunities through AI-powered discovery, 
              community governance, and innovative NFT profiles. Join the future of grant funding.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/discovery">
              <Button className="primary-button group">
                Start Discovery
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button className="secondary-button">
                Create Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="elegant-card p-8 text-center group transition-all duration-300">
              <div className="flex justify-center mb-6 group-hover:animate-elegant-pulse">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-slate-100 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="elegant-card p-12 mb-20 subtle-glow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold elegant-text mb-2">500+</div>
              <div className="text-slate-400">Active Grants</div>
            </div>
            <div>
              <div className="text-4xl font-bold elegant-text mb-2">1,200</div>
              <div className="text-slate-400">Founders</div>
            </div>
            <div>
              <div className="text-4xl font-bold elegant-text mb-2">$50M+</div>
              <div className="text-slate-400">Funding Matched</div>
            </div>
            <div>
              <div className="text-4xl font-bold elegant-text mb-2">95%</div>
              <div className="text-slate-400">Success Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-white">
            Ready to Find Your Next Grant?
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Join thousands of founders who have successfully matched with funding opportunities through GrantMatch.
          </p>
          <Link to="/discovery">
            <Button className="primary-button">
              Get Started Today
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;
