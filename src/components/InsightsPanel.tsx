import { RoleInsight } from '@/types/roles';
import { cn } from '@/lib/utils';
import { Lightbulb, AlertTriangle, Zap, TrendingUp } from 'lucide-react';

interface InsightsPanelProps {
  insights: RoleInsight[];
}

const insightConfig = {
  dominant: {
    icon: TrendingUp,
    bgClass: 'bg-primary/10',
    borderClass: 'border-primary/20',
    iconClass: 'text-primary',
  },
  underdeveloped: {
    icon: Lightbulb,
    bgClass: 'bg-terracotta-light',
    borderClass: 'border-terracotta/20',
    iconClass: 'text-terracotta',
  },
  synergy: {
    icon: Zap,
    bgClass: 'bg-sage-light',
    borderClass: 'border-sage/20',
    iconClass: 'text-sage',
  },
  conflict: {
    icon: AlertTriangle,
    bgClass: 'bg-destructive/10',
    borderClass: 'border-destructive/20',
    iconClass: 'text-destructive',
  },
};

export function InsightsPanel({ insights }: InsightsPanelProps) {
  if (insights.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-center text-muted-foreground">
        <div>
          <Lightbulb className="mx-auto mb-2 h-8 w-8 opacity-50" />
          <p>Adjust your role weights to see insights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {insights.map((insight, index) => {
        const config = insightConfig[insight.type];
        const Icon = config.icon;
        
        return (
          <div
            key={index}
            className={cn(
              "rounded-lg border p-4 transition-all animate-fade-in",
              config.bgClass,
              config.borderClass
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", config.iconClass)} />
              <div className="space-y-2">
                <h4 className="font-display font-semibold text-foreground">
                  {insight.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {insight.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {insight.roles.map((role, i) => (
                    <span
                      key={i}
                      className="inline-flex rounded-full bg-background/80 px-2.5 py-0.5 text-xs font-medium text-foreground"
                    >
                      {role.replace('To ', '')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
