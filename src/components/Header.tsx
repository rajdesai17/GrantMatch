
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const { profile, signOut } = useAuth();

  const navItems = [
    { label: 'Grant Discovery', path: '/discovery' },
    { label: 'Explore Grants', path: '/explore' },
    { label: 'DAO Voting', path: '/voting' },
    { label: 'My Profile', path: '/profile' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700/30 bg-slate-900/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-white tracking-tight">
            GrantMatch
          </div>
        </Link>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-all duration-200 relative ${
                location.pathname === item.path 
                  ? 'text-white' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-slate-400 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {profile && (
            <div className="flex items-center space-x-2 text-slate-300">
              <User className="w-4 h-4" />
              <span className="text-sm">{profile.full_name}</span>
              <span className="px-2 py-1 bg-slate-700 rounded-full text-xs">
                {profile.user_type === 'founder' ? 'Founder' : 'DAO Funder'}
              </span>
            </div>
          )}
          <Button 
            variant="outline"
            size="sm"
            onClick={signOut}
            className="border-slate-600 text-slate-300 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
