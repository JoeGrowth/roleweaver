import { Role } from '@/types/roles';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface RoleRadarChartProps {
  roles: Role[];
}

export function RoleRadarChart({ roles }: RoleRadarChartProps) {
  const data = roles.map(role => ({
    name: role.name.replace('To ', '').split(' ').slice(0, 2).join(' '),
    fullName: role.name,
    value: role.weight,
    essence: role.essence,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
        <PolarGrid 
          stroke="hsl(var(--border))" 
          strokeOpacity={0.5}
        />
        <PolarAngleAxis
          dataKey="name"
          tick={{ 
            fill: 'hsl(var(--muted-foreground))', 
            fontSize: 10,
            fontWeight: 500,
          }}
          tickLine={false}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          tickCount={5}
          axisLine={false}
        />
        <Radar
          name="Role Weight"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="rounded-lg border bg-card p-3 shadow-medium">
                  <p className="font-display font-semibold text-foreground">{data.fullName}</p>
                  <p className="text-sm text-muted-foreground">{data.essence}</p>
                  <p className="mt-1 text-lg font-semibold text-primary">{data.value}%</p>
                </div>
              );
            }
            return null;
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
