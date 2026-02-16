import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { advertisingData, regressionModel } from '@/lib/advertisingData';

interface SalesChartProps {
  platform: 'tv' | 'radio' | 'newspaper';
}

const platformConfig = {
  tv: {
    label: 'TV Advertising ($K)',
    color: 'hsl(187, 92%, 50%)',
    dataKey: 'tv',
  },
  radio: {
    label: 'Radio Advertising ($K)',
    color: 'hsl(262, 83%, 58%)',
    dataKey: 'radio',
  },
  newspaper: {
    label: 'Newspaper Advertising ($K)',
    color: 'hsl(330, 80%, 60%)',
    dataKey: 'newspaper',
  },
};

const SalesChart = ({ platform }: SalesChartProps) => {
  const config = platformConfig[platform];
  
  const data = advertisingData.map(d => ({
    x: d[platform],
    y: d.sales,
  }));

  // Calculate trend line points
  const xValues = data.map(d => d.x);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  
  const getCoef = () => {
    if (platform === 'tv') return regressionModel.tvCoef;
    if (platform === 'radio') return regressionModel.radioCoef;
    return regressionModel.newspaperCoef;
  };

  const avgOthers = platform === 'tv' 
    ? regressionModel.radioCoef * 23.3 + regressionModel.newspaperCoef * 30.6
    : platform === 'radio'
    ? regressionModel.tvCoef * 147.0 + regressionModel.newspaperCoef * 30.6
    : regressionModel.tvCoef * 147.0 + regressionModel.radioCoef * 23.3;

  const trendLine = [
    { x: minX, y: regressionModel.intercept + getCoef() * minX + avgOthers },
    { x: maxX, y: regressionModel.intercept + getCoef() * maxX + avgOthers },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 text-sm">
          <p className="text-muted-foreground">{config.label}</p>
          <p className="font-mono font-semibold text-primary">${payload[0].value}K</p>
          <p className="text-muted-foreground mt-1">Sales</p>
          <p className="font-mono font-semibold text-chart-sales">{payload[0].payload.y} units</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name={config.label}
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(222, 30%, 18%)' }}
            tickLine={{ stroke: 'hsl(222, 30%, 18%)' }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Sales"
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(222, 30%, 18%)' }}
            tickLine={{ stroke: 'hsl(222, 30%, 18%)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter 
            data={data} 
            fill={config.color}
            fillOpacity={0.6}
          />
          <ReferenceLine
            segment={trendLine}
            stroke={config.color}
            strokeWidth={2}
            strokeDasharray="5 5"
            ifOverflow="extendDomain"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
