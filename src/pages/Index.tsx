import { useRoles } from '@/hooks/useRoles';
import { RoleRadarChart } from '@/components/RoleRadarChart';
import { RolePieChart } from '@/components/RolePieChart';
import { RoleEditor } from '@/components/RoleEditor';
import { InsightsPanel } from '@/components/InsightsPanel';
import { ProfileSelector } from '@/components/ProfileSelector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Scale, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Index = () => {
  const {
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
  } = useRoles();

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const insights = getInsights();
  const totalWeight = activeProfile?.roles.reduce((sum, r) => sum + r.weight, 0) || 0;

  const handleCreateProfile = () => {
    createProfile('New Profile', 'A new role mix');
    toast.success('New profile created');
  };

  const handleSuggestBalance = () => {
    if (!activeProfile) return;
    
    // Simple AI-like suggestion: distribute weights more evenly with some variation
    const baseWeight = Math.floor(100 / activeProfile.roles.length);
    const variation = 5;
    
    activeProfile.roles.forEach((role, index) => {
      const randomVariation = Math.floor(Math.random() * variation * 2) - variation;
      const suggestedWeight = Math.max(0, Math.min(100, baseWeight + randomVariation));
      updateRoleWeight(role.id, suggestedWeight);
    });
    
    toast.success('Suggested a more balanced mix');
  };

  if (!activeProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="gradient-primary h-10 w-10 rounded-xl flex items-center justify-center shadow-soft">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground">
                  Natural Roles Mixer
                </h1>
                <p className="text-sm text-muted-foreground">
                  Design your archetype mix
                </p>
              </div>
            </div>
            
            <ProfileSelector
              profiles={profiles}
              activeProfileId={activeProfileId}
              onSelectProfile={setActiveProfileId}
              onCreateProfile={handleCreateProfile}
              onDuplicateProfile={duplicateProfile}
              onDeleteProfile={deleteProfile}
              onExport={exportProfile}
              onImport={importProfile}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Profile Info */}
        <Card className="mb-8 shadow-soft animate-fade-in">
          <CardContent className="pt-6">
            {isEditingProfile ? (
              <div className="space-y-4">
                <Input
                  value={activeProfile.name}
                  onChange={(e) => updateProfile(activeProfile.id, { name: e.target.value })}
                  className="text-xl font-display font-bold"
                  placeholder="Profile name"
                />
                <Textarea
                  value={activeProfile.description}
                  onChange={(e) => updateProfile(activeProfile.id, { description: e.target.value })}
                  className="resize-none"
                  placeholder="Describe this role mix..."
                  rows={2}
                />
                <Button size="sm" onClick={() => setIsEditingProfile(false)}>
                  Done
                </Button>
              </div>
            ) : (
              <div
                className="cursor-pointer rounded-lg p-2 -m-2 transition-colors hover:bg-muted/50"
                onClick={() => setIsEditingProfile(true)}
              >
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {activeProfile.name}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {activeProfile.description || 'Click to add a description...'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Visualization Grid */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Radar Chart */}
          <Card className="lg:col-span-2 shadow-soft animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle className="font-display">Role Distribution</CardTitle>
              <CardDescription>
                Radar view of your 15 natural roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoleRadarChart roles={activeProfile.roles} />
            </CardContent>
          </Card>

          {/* Pie Chart & Insights */}
          <div className="space-y-6">
            <Card className="shadow-soft animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-lg">Active Mix</CardTitle>
              </CardHeader>
              <CardContent>
                <RolePieChart roles={activeProfile.roles} />
              </CardContent>
            </Card>

            <Card className="shadow-soft animate-fade-in" style={{ animationDelay: '300ms' }}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-lg">Insights</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    Total: {totalWeight}%
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <InsightsPanel insights={insights} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Role Editor */}
        <Card className="shadow-soft animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="font-display">Role Editor</CardTitle>
                <CardDescription>
                  Adjust weights and customize each role
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={normalizeWeights}
                  disabled={totalWeight === 0}
                >
                  <Scale className="mr-2 h-4 w-4" />
                  Normalize to 100%
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSuggestBalance}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Suggest Balance
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="cards">Card View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="table">
                <div className="rounded-lg border bg-card overflow-hidden">
                  <RoleEditor
                    roles={activeProfile.roles}
                    onUpdateRole={updateRole}
                    onUpdateWeight={updateRoleWeight}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="cards">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {activeProfile.roles.map((role, index) => (
                    <Card 
                      key={role.id} 
                      className="overflow-hidden animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div 
                        className="h-2" 
                        style={{ backgroundColor: role.color }}
                      />
                      <CardContent className="pt-4">
                        <h4 className="font-display font-semibold text-foreground mb-1">
                          {role.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {role.essence}
                        </p>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={role.weight}
                            onChange={(e) => updateRoleWeight(role.id, parseInt(e.target.value))}
                            className="flex-1 accent-primary"
                          />
                          <span 
                            className="w-12 text-right text-sm font-semibold tabular-nums"
                            style={{ color: role.weight > 0 ? role.color : 'hsl(var(--muted-foreground))' }}
                          >
                            {role.weight}%
                          </span>
                        </div>
                        <div className="mt-3 flex gap-2 text-xs text-muted-foreground">
                          <span className="rounded bg-muted px-2 py-0.5">{role.method}</span>
                          <span className="rounded bg-muted px-2 py-0.5">{role.companyType}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          Natural Roles Mixer — Design your archetype mix
        </div>
      </footer>
    </div>
  );
};

export default Index;
