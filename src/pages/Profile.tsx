
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import { User, Edit, Save, Star, Target } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Maya Chen',
    email: 'maya.chen@example.com',
    mission: 'Building sustainable education technology for underserved communities worldwide.',
    region: 'Southeast Asia',
    isFemaleFounder: true,
    appliedGrantsCount: 8,
    nftId: 'NFT-001'
  });

  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              My <span className="neon-text">Profile</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Manage your founder profile and NFT identity
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Profile Form */}
            <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">Profile Information</h2>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-neon-green to-neon-blue hover:from-neon-blue hover:to-neon-green"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  {isEditing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  ) : (
                    <div className="text-white text-lg">{profile.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  ) : (
                    <div className="text-white">{profile.email}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Mission</label>
                  {isEditing ? (
                    <Textarea
                      value={formData.mission}
                      onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                      rows={3}
                    />
                  ) : (
                    <div className="text-white">{profile.mission}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Region</label>
                  {isEditing ? (
                    <Input
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  ) : (
                    <div className="text-white">{profile.region}</div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <Checkbox
                      checked={formData.isFemaleFounder}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, isFemaleFounder: checked as boolean })
                      }
                      className="border-neon-pink data-[state=checked]:bg-neon-pink"
                    />
                  ) : (
                    <div className={`w-4 h-4 rounded border ${
                      profile.isFemaleFounder 
                        ? 'bg-neon-pink border-neon-pink' 
                        : 'border-gray-500'
                    }`} />
                  )}
                  <label className="text-sm text-gray-300">
                    I am a self-attested female founder
                  </label>
                </div>
              </div>
            </div>

            {/* NFT Card Preview */}
            <div className="space-y-6">
              <div className="glass-card p-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Star className="w-5 h-5 text-neon-purple mr-2" />
                  Your NFT Profile
                </h3>

                {/* NFT Visual */}
                <div className="w-full h-64 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 rounded-xl border border-neon-blue/30 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <User className="w-16 h-16 text-neon-blue mx-auto mb-2" />
                    <div className="text-neon-blue font-mono text-sm">{profile.nftId}</div>
                  </div>
                </div>

                {/* NFT Details */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg font-semibold text-white">{profile.name}</h4>
                      {profile.isFemaleFounder && (
                        <span className="px-2 py-1 bg-neon-pink/20 border border-neon-pink/30 text-neon-pink text-xs rounded-full font-medium">
                          Female Founder
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm">{profile.mission}</p>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Target className="w-4 h-4 text-neon-green" />
                    <span>Grants Applied: {profile.appliedGrantsCount}</span>
                  </div>

                  <div className="text-gray-400 text-xs">
                    Region: {profile.region}
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Profile Statistics</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold neon-text">{profile.appliedGrantsCount}</div>
                    <div className="text-gray-300 text-sm">Applications</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold neon-text">3</div>
                    <div className="text-gray-300 text-sm">Approved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold neon-text">$125K</div>
                    <div className="text-gray-300 text-sm">Funding</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold neon-text">95%</div>
                    <div className="text-gray-300 text-sm">Match Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
