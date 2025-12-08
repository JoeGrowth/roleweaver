import { useState, useCallback, useEffect } from 'react';
import { Role, RoleProfile, RoleInsight } from '@/types/roles';
import { defaultRoles } from '@/data/defaultRoles';

const STORAGE_KEY = 'natural-roles-profiles';

const generateId = () => Math.random().toString(36).substr(2, 9);

export function useRoles() {
  const [profiles, setProfiles] = useState<RoleProfile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setProfiles(parsed.profiles || []);
      setActiveProfileId(parsed.activeProfileId || null);
    } else {
      // Create default profile
      const defaultProfile: RoleProfile = {
        id: generateId(),
        name: 'My Role Mix',
        description: 'My personal archetype mix',
        roles: defaultRoles.map(r => ({ ...r, weight: Math.floor(Math.random() * 30) + 5 })),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setProfiles([defaultProfile]);
      setActiveProfileId(defaultProfile.id);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (profiles.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ profiles, activeProfileId }));
    }
  }, [profiles, activeProfileId]);

  const activeProfile = profiles.find(p => p.id === activeProfileId) || null;

  const createProfile = useCallback((name: string, description: string = '') => {
    const newProfile: RoleProfile = {
      id: generateId(),
      name,
      description,
      roles: defaultRoles.map(r => ({ ...r })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProfiles(prev => [...prev, newProfile]);
    setActiveProfileId(newProfile.id);
    return newProfile;
  }, []);

  const duplicateProfile = useCallback((profileId: string) => {
    const source = profiles.find(p => p.id === profileId);
    if (!source) return null;
    
    const newProfile: RoleProfile = {
      ...source,
      id: generateId(),
      name: `${source.name} (Copy)`,
      roles: source.roles.map(r => ({ ...r })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProfiles(prev => [...prev, newProfile]);
    setActiveProfileId(newProfile.id);
    return newProfile;
  }, [profiles]);

  const deleteProfile = useCallback((profileId: string) => {
    setProfiles(prev => {
      const updated = prev.filter(p => p.id !== profileId);
      if (activeProfileId === profileId && updated.length > 0) {
        setActiveProfileId(updated[0].id);
      }
      return updated;
    });
  }, [activeProfileId]);

  const updateProfile = useCallback((profileId: string, updates: Partial<RoleProfile>) => {
    setProfiles(prev => prev.map(p => 
      p.id === profileId 
        ? { ...p, ...updates, updatedAt: new Date() }
        : p
    ));
  }, []);

  const updateRole = useCallback((roleId: string, updates: Partial<Role>) => {
    if (!activeProfileId) return;
    
    setProfiles(prev => prev.map(profile => 
      profile.id === activeProfileId
        ? {
            ...profile,
            roles: profile.roles.map(role =>
              role.id === roleId ? { ...role, ...updates } : role
            ),
            updatedAt: new Date(),
          }
        : profile
    ));
  }, [activeProfileId]);

  const updateRoleWeight = useCallback((roleId: string, weight: number) => {
    updateRole(roleId, { weight: Math.max(0, Math.min(100, weight)) });
  }, [updateRole]);

  const normalizeWeights = useCallback(() => {
    if (!activeProfile) return;
    
    const total = activeProfile.roles.reduce((sum, r) => sum + r.weight, 0);
    if (total === 0) return;
    
    const normalizedRoles = activeProfile.roles.map(r => ({
      ...r,
      weight: Math.round((r.weight / total) * 100),
    }));
    
    updateProfile(activeProfileId!, { roles: normalizedRoles });
  }, [activeProfile, activeProfileId, updateProfile]);

  const getInsights = useCallback((): RoleInsight[] => {
    if (!activeProfile) return [];
    
    const insights: RoleInsight[] = [];
    const sortedRoles = [...activeProfile.roles].sort((a, b) => b.weight - a.weight);
    const totalWeight = sortedRoles.reduce((sum, r) => sum + r.weight, 0);
    
    // Dominant roles (top 3 with significant weight)
    const dominant = sortedRoles.filter(r => r.weight > 0).slice(0, 3);
    if (dominant.length > 0) {
      insights.push({
        type: 'dominant',
        title: 'Your Dominant Roles',
        description: `These roles shape your primary operating mode and influence most decisions.`,
        roles: dominant.map(r => r.name),
      });
    }
    
    // Underdeveloped roles (weight = 0 or very low)
    const underdeveloped = sortedRoles.filter(r => r.weight < 5);
    if (underdeveloped.length > 0) {
      insights.push({
        type: 'underdeveloped',
        title: 'Roles to Explore',
        description: `These archetypes are currently dormant. Consider if activating them could bring balance.`,
        roles: underdeveloped.slice(0, 4).map(r => r.name),
      });
    }
    
    // Check for synergies
    const hasVision = sortedRoles.find(r => r.name.includes('Vision') && r.weight > 15);
    const hasClarity = sortedRoles.find(r => r.name.includes('Clarity') && r.weight > 15);
    if (hasVision && hasClarity) {
      insights.push({
        type: 'synergy',
        title: 'Strategic Synergy Detected',
        description: 'Your combination of vision and clarity creates powerful strategic thinking.',
        roles: [hasVision.name, hasClarity.name],
      });
    }
    
    // Check for potential conflicts
    const hasHack = sortedRoles.find(r => r.name.includes('Hack') && r.weight > 20);
    const hasStable = sortedRoles.find(r => r.name.includes('Stable') && r.weight > 20);
    if (hasHack && hasStable) {
      insights.push({
        type: 'conflict',
        title: 'Tension Point',
        description: 'Fast optimization may conflict with stable support. Consider context-switching strategies.',
        roles: [hasHack.name, hasStable.name],
      });
    }
    
    return insights;
  }, [activeProfile]);

  const exportProfile = useCallback((profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) return null;
    return JSON.stringify(profile, null, 2);
  }, [profiles]);

  const importProfile = useCallback((jsonString: string) => {
    try {
      const imported = JSON.parse(jsonString);
      const newProfile: RoleProfile = {
        ...imported,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setProfiles(prev => [...prev, newProfile]);
      setActiveProfileId(newProfile.id);
      return newProfile;
    } catch {
      return null;
    }
  }, []);

  return {
    profiles,
    activeProfile,
    activeProfileId,
    setActiveProfileId,
    createProfile,
    duplicateProfile,
    deleteProfile,
    updateProfile,
    updateRole,
    updateRoleWeight,
    normalizeWeights,
    getInsights,
    exportProfile,
    importProfile,
  };
}
