import { Role } from '@/types/roles';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface RoleEditorProps {
  roles: Role[];
  onUpdateRole: (roleId: string, updates: Partial<Role>) => void;
  onUpdateWeight: (roleId: string, weight: number) => void;
}

export function RoleEditor({ roles, onUpdateRole, onUpdateWeight }: RoleEditorProps) {
  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="grid grid-cols-12 gap-3 px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <div className="col-span-3">Role</div>
        <div className="col-span-2">Essence</div>
        <div className="col-span-2">Method</div>
        <div className="col-span-2">Company Type</div>
        <div className="col-span-3">Weight</div>
      </div>
      
      {/* Rows */}
      <div className="space-y-1">
        {roles.map((role, index) => (
          <div
            key={role.id}
            className={cn(
              "grid grid-cols-12 items-center gap-3 rounded-lg px-4 py-3 transition-all",
              "hover:bg-muted/50",
              index % 2 === 0 ? "bg-transparent" : "bg-muted/30"
            )}
            style={{ 
              animationDelay: `${index * 30}ms`,
            }}
          >
            {/* Role Name with Color Indicator */}
            <div className="col-span-3 flex items-center gap-2">
              <div
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: role.color }}
              />
              <Input
                value={role.name}
                onChange={(e) => onUpdateRole(role.id, { name: e.target.value })}
                className="h-8 border-transparent bg-transparent px-2 text-sm font-medium hover:border-input focus:border-input"
              />
            </div>
            
            {/* Essence */}
            <div className="col-span-2">
              <Input
                value={role.essence}
                onChange={(e) => onUpdateRole(role.id, { essence: e.target.value })}
                className="h-8 border-transparent bg-transparent px-2 text-sm text-muted-foreground hover:border-input focus:border-input"
              />
            </div>
            
            {/* Method */}
            <div className="col-span-2">
              <Input
                value={role.method}
                onChange={(e) => onUpdateRole(role.id, { method: e.target.value })}
                className="h-8 border-transparent bg-transparent px-2 text-sm text-muted-foreground hover:border-input focus:border-input"
              />
            </div>
            
            {/* Company Type */}
            <div className="col-span-2">
              <Input
                value={role.companyType}
                onChange={(e) => onUpdateRole(role.id, { companyType: e.target.value })}
                className="h-8 border-transparent bg-transparent px-2 text-sm text-muted-foreground hover:border-input focus:border-input"
              />
            </div>
            
            {/* Weight Slider */}
            <div className="col-span-3 flex items-center gap-3">
              <Slider
                value={[role.weight]}
                onValueChange={([value]) => onUpdateWeight(role.id, value)}
                max={100}
                step={1}
                className="flex-1"
              />
              <span 
                className="w-12 text-right text-sm font-semibold tabular-nums"
                style={{ color: role.weight > 0 ? role.color : 'hsl(var(--muted-foreground))' }}
              >
                {role.weight}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
