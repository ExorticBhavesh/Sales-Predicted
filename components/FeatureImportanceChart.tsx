import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { featureImportance } from '@/lib/advertisingData';

const FeatureImportanceChart = () => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 text-sm">
          <p className="font-semibold">{payload[0].payload.feature}</p>
          <p className="text-muted-foreground mt-1">Impact Score</p>
          <p className="font-mono font-semibold text-primary">{(payload[0].value * 100).toFixed(0)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={featureImportance}
          margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" horizontal={false} />
          <XAxis 
            type="number" 
            domain={[0, 1]}
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(222, 30%, 18%)' }}
            tickLine={{ stroke: 'hsl(222, 30%, 18%)' }}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
          />
          <YAxis 
            type="category" 
            dataKey="feature"
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(222, 30%, 18%)' }}
            tickLine={false}
            width={90}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="importance" radius={[0, 4, 4, 0]} barSize={30}>
            {featureImportance.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureImportanceChart;
