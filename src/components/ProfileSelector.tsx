import { RoleProfile } from '@/types/roles';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Copy, Trash2, Download, Upload, MoreHorizontal } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';

interface ProfileSelectorProps {
  profiles: RoleProfile[];
  activeProfileId: string | null;
  onSelectProfile: (id: string) => void;
  onCreateProfile: () => void;
  onDuplicateProfile: (id: string) => void;
  onDeleteProfile: (id: string) => void;
  onExport: (id: string) => string | null;
  onImport: (json: string) => void;
}

export function ProfileSelector({
  profiles,
  activeProfileId,
  onSelectProfile,
  onCreateProfile,
  onDuplicateProfile,
  onDeleteProfile,
  onExport,
  onImport,
}: ProfileSelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (!activeProfileId) return;
    const json = onExport(activeProfileId);
    if (json) {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `role-profile-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Profile exported successfully');
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = event.target?.result as string;
        onImport(json);
        toast.success('Profile imported successfully');
      } catch {
        toast.error('Failed to import profile');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={activeProfileId || ''} onValueChange={onSelectProfile}>
        <SelectTrigger className="w-[200px] bg-card">
          <SelectValue placeholder="Select a profile" />
        </SelectTrigger>
        <SelectContent>
          {profiles.map((profile) => (
            <SelectItem key={profile.id} value={profile.id}>
              {profile.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" size="icon" onClick={onCreateProfile} title="New Profile">
        <Plus className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => activeProfileId && onDuplicateProfile(activeProfileId)}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Import Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => activeProfileId && onDeleteProfile(activeProfileId)}
            className="text-destructive focus:text-destructive"
            disabled={profiles.length <= 1}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Profile
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
}
