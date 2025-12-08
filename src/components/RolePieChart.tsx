import { Role } from '@/types/roles';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface RolePieChartProps {
  roles: Role[];
}

export function RolePieChart({ roles }: RolePieChartProps) {
  const activeRoles = roles.filter(r => r.weight > 0);
  
  const data = activeRoles.map(role => ({
    name: role.name.replace('To ', ''),
    value: role.weight,
    color: role.color,
    essence: role.essence,
  }));

  if (data.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-muted-foreground">
        Adjust role weights to see the distribution
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="rounded-lg border bg-card p-3 shadow-medium">
                  <p className="font-display font-semibold text-foreground">{data.name}</p>
                  <p className="text-sm text-muted-foreground">{data.essence}</p>
                  <p className="mt-1 text-lg font-semibold" style={{ color: data.color }}>
                    {data.value}%
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          iconType="circle"
          iconSize={8}
          formatter={(value) => (
            <span className="text-xs text-muted-foreground">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
