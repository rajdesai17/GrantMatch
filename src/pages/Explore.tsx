
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import GrantCard from '@/components/GrantCard';
import { Search, Filter } from 'lucide-react';
import grantsData from '@/data/grants.json';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedFocus, setSelectedFocus] = useState('all');
  const [filteredGrants, setFilteredGrants] = useState(grantsData);

  const regions = ['all', ...Array.from(new Set(grantsData.map(grant => grant.region)))];
  const focusAreas = ['all', ...Array.from(new Set(grantsData.flatMap(grant => grant.focusAreas)))];

  const applyFilters = () => {
    let filtered = grantsData;

    if (searchTerm) {
      filtered = filtered.filter(grant =>
        grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRegion !== 'all') {
      filtered = filtered.filter(grant => grant.region === selectedRegion);
    }

    if (selectedFocus !== 'all') {
      filtered = filtered.filter(grant => grant.focusAreas.includes(selectedFocus));
    }

    setFilteredGrants(filtered);
  };

  const handleApply = (grantId: string) => {
    console.log('Applying to grant:', grantId);
    // Add toast notification here
  };

  React.useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedRegion, selectedFocus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Explore <span className="neon-text">Grants</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Browse and filter through our comprehensive database of funding opportunities
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search grants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 rounded-xl"
              />
            </div>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent className="bg-dark-200 border-white/10 text-white">
                {regions.map((region) => (
                  <SelectItem key={region} value={region} className="hover:bg-white/10">
                    {region === 'all' ? 'All Regions' : region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedFocus} onValueChange={setSelectedFocus}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                <SelectValue placeholder="Focus Area" />
              </SelectTrigger>
              <SelectContent className="bg-dark-200 border-white/10 text-white">
                {focusAreas.map((focus) => (
                  <SelectItem key={focus} value={focus} className="hover:bg-white/10">
                    {focus === 'all' ? 'All Focus Areas' : focus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={applyFilters}
              className="neon-glow bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-blue rounded-xl"
            >
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-300">
            Showing <span className="text-neon-blue font-semibold">{filteredGrants.length}</span> grants
          </p>
        </div>

        {/* Grants Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGrants.map((grant) => (
            <GrantCard
              key={grant.id}
              grant={grant}
              onApply={handleApply}
            />
          ))}
        </div>

        {filteredGrants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No grants found matching your criteria</div>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('all');
                setSelectedFocus('all');
              }}
              className="text-neon-blue hover:text-white border-neon-blue hover:bg-neon-blue"
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;
