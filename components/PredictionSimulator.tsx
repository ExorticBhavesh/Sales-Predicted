import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { predictSales, regressionModel } from '@/lib/advertisingData';
import { TrendingUp, Tv, Radio, Newspaper } from 'lucide-react';

const PredictionSimulator = () => {
  const [tv, setTv] = useState(150);
  const [radio, setRadio] = useState(25);
  const [newspaper, setNewspaper] = useState(30);
  const [predictedSales, setPredictedSales] = useState(0);

  useEffect(() => {
    const prediction = predictSales(tv, radio, newspaper);
    setPredictedSales(prediction);
  }, [tv, radio, newspaper]);

  const totalSpend = tv + radio + newspaper;
  const roi = predictedSales / (totalSpend / 1000);

  return (
    <div className="space-y-8">
      <div className="text-center pb-6 border-b border-border/50">
        <p className="text-sm text-muted-foreground mb-2">Predicted Sales</p>
        <div className="flex items-center justify-center gap-3">
          <TrendingUp className="w-8 h-8 text-primary animate-glow-pulse" />
          <span className="text-5xl font-bold number-display gradient-text">
            {predictedSales.toFixed(1)}
          </span>
          <span className="text-xl text-muted-foreground">units</span>
        </div>
        <div className="mt-4 flex justify-center gap-8 text-sm">
          <div>
            <span className="text-muted-foreground">Total Ad Spend: </span>
            <span className="font-mono text-foreground">${totalSpend}K</span>
          </div>
          <div>
            <span className="text-muted-foreground">ROI: </span>
            <span className="font-mono text-success">{roi.toFixed(2)}x</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-chart-tv" />
              <span className="text-sm font-medium">TV Advertising</span>
            </div>
            <span className="font-mono text-sm text-chart-tv">${tv}K</span>
          </div>
          <Slider
            value={[tv]}
            onValueChange={(value) => setTv(value[0])}
            max={300}
            step={5}
            className="[&_[role=slider]]:bg-chart-tv [&_[role=slider]]:border-chart-tv [&_.relative]:bg-secondary/50 [&_[data-orientation=horizontal]>span:first-child]:bg-chart-tv"
          />
          <p className="text-xs text-muted-foreground">
            Impact: +{(regressionModel.tvCoef * 10).toFixed(2)} sales per $10K
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-chart-radio" />
              <span className="text-sm font-medium">Radio Advertising</span>
            </div>
            <span className="font-mono text-sm text-chart-radio">${radio}K</span>
          </div>
          <Slider
            value={[radio]}
            onValueChange={(value) => setRadio(value[0])}
            max={50}
            step={1}
            className="[&_[role=slider]]:bg-chart-radio [&_[role=slider]]:border-chart-radio [&_.relative]:bg-secondary/50 [&_[data-orientation=horizontal]>span:first-child]:bg-chart-radio"
          />
          <p className="text-xs text-muted-foreground">
            Impact: +{(regressionModel.radioCoef * 10).toFixed(2)} sales per $10K
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-chart-newspaper" />
              <span className="text-sm font-medium">Newspaper Advertising</span>
            </div>
            <span className="font-mono text-sm text-chart-newspaper">${newspaper}K</span>
          </div>
          <Slider
            value={[newspaper]}
            onValueChange={(value) => setNewspaper(value[0])}
            max={120}
            step={5}
            className="[&_[role=slider]]:bg-chart-newspaper [&_[role=slider]]:border-chart-newspaper [&_.relative]:bg-secondary/50 [&_[data-orientation=horizontal]>span:first-child]:bg-chart-newspaper"
          />
          <p className="text-xs text-muted-foreground">
            Impact: {(regressionModel.newspaperCoef * 10).toFixed(2)} sales per $10K
          </p>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
        <p className="text-xs text-muted-foreground">
          <span className="text-primary font-medium">Model Accuracy:</span> R² = {(regressionModel.rSquared * 100).toFixed(1)}% — 
          This linear regression model explains {(regressionModel.rSquared * 100).toFixed(0)}% of the variance in sales.
        </p>
      </div>
    </div>
  );
};

export default PredictionSimulator;
