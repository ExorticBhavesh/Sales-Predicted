import { Lightbulb, TrendingUp, AlertTriangle, Target, DollarSign, BarChart3 } from 'lucide-react';

const insights = [
  {
    icon: TrendingUp,
    title: 'TV Drives Highest Volume',
    description: 'TV advertising has the strongest correlation (0.78) with sales. For every $10K invested in TV, expect ~0.46 units increase in sales.',
    type: 'success',
  },
  {
    icon: Target,
    title: 'Radio Offers Best ROI',
    description: 'Radio advertising shows the highest coefficient per dollar spent ($1.89 per $10K). Consider reallocating budget from newspaper to radio.',
    type: 'primary',
  },
  {
    icon: AlertTriangle,
    title: 'Newspaper Impact Minimal',
    description: 'Newspaper advertising shows near-zero or negative correlation with sales. Consider reducing or eliminating newspaper ad spend.',
    type: 'warning',
  },
  {
    icon: DollarSign,
    title: 'Optimal Budget Allocation',
    description: 'Based on our model, optimal allocation: 60% TV, 35% Radio, 5% Newspaper for maximum sales impact.',
    type: 'info',
  },
  {
    icon: BarChart3,
    title: 'Synergy Effects',
    description: 'Combined TV + Radio campaigns show multiplicative effects. Peak performance when both channels are active simultaneously.',
    type: 'primary',
  },
  {
    icon: Lightbulb,
    title: 'Diminishing Returns',
    description: 'TV spending above $250K shows diminishing returns. Consider diversifying once TV budget exceeds this threshold.',
    type: 'info',
  },
];

const typeStyles = {
  success: 'border-green-500/30 bg-green-500/5',
  primary: 'border-primary/30 bg-primary/5',
  warning: 'border-yellow-500/30 bg-yellow-500/5',
  info: 'border-blue-500/30 bg-blue-500/5',
};

const iconStyles = {
  success: 'text-green-400',
  primary: 'text-primary',
  warning: 'text-yellow-400',
  info: 'text-blue-400',
};

const InsightsPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {insights.map((insight, index) => (
        <div
          key={index}
          className={`insight-card ${typeStyles[insight.type]} opacity-0 animate-fade-in`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg bg-background/50 ${iconStyles[insight.type]}`}>
              <insight.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {insight.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InsightsPanel;
