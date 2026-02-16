import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Database, 
  Tv, 
  Radio, 
  Newspaper,
  Target,
  Sparkles
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedBackground from '@/components/AnimatedBackground';
import StatCard from '@/components/StatCard';
import SalesChart from '@/components/SalesChart';
import FeatureImportanceChart from '@/components/FeatureImportanceChart';
import PredictionSimulator from '@/components/PredictionSimulator';
import InsightsPanel from '@/components/InsightsPanel';
import { calculateStats, advertisingData, regressionModel } from '@/lib/advertisingData';

const Index = () => {
  const stats = calculateStats(advertisingData);
  const [activeChart, setActiveChart] = useState<'tv' | 'radio' | 'newspaper'>('tv');

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">SalesForecast AI</h1>
                  <p className="text-xs text-muted-foreground">Predictive Analytics Dashboard</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <Database className="w-4 h-4" />
                <span className="number-display">{stats.totalRecords} records analyzed</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12 opacity-0 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Machine Learning Powered</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Predict <span className="gradient-text">Future Sales</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Analyze advertising spend across TV, Radio & Newspaper channels. 
              Discover insights that drive your marketing strategy.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <StatCard
              title="Total Sales"
              value={`${stats.totalSales}`}
              subtitle="Total units across all campaigns"
              icon={TrendingUp}
              trend={{ value: 12.5, isPositive: true }}
              delay={100}
            />
            <StatCard
              title="Average Sales"
              value={stats.avgSales}
              subtitle="Mean sales per campaign"
              icon={Target}
              delay={200}
            />
            <StatCard
              title="Total Ad Spend"
              value={`$${stats.totalAdSpend}K`}
              subtitle="Combined advertising investment"
              icon={DollarSign}
              delay={300}
            />
            <StatCard
              title="Model Accuracy"
              value={`${(regressionModel.rSquared * 100).toFixed(0)}%`}
              subtitle="R² score of regression model"
              icon={BarChart3}
              trend={{ value: 2.3, isPositive: true }}
              delay={400}
            />
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Charts Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Scatter Plot */}
              <div className="chart-container opacity-0 animate-scale-in" style={{ animationDelay: '500ms' }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Advertising vs Sales Correlation</h3>
                    <p className="text-sm text-muted-foreground">Visualize the relationship between ad spend and sales</p>
                  </div>
                </div>
                
                <Tabs value={activeChart} onValueChange={(v) => setActiveChart(v as typeof activeChart)}>
                  <TabsList className="grid grid-cols-3 mb-4 bg-secondary/50">
                    <TabsTrigger value="tv" className="flex items-center gap-2 data-[state=active]:bg-chart-tv/20 data-[state=active]:text-chart-tv">
                      <Tv className="w-4 h-4" />
                      <span className="hidden sm:inline">TV</span>
                    </TabsTrigger>
                    <TabsTrigger value="radio" className="flex items-center gap-2 data-[state=active]:bg-chart-radio/20 data-[state=active]:text-chart-radio">
                      <Radio className="w-4 h-4" />
                      <span className="hidden sm:inline">Radio</span>
                    </TabsTrigger>
                    <TabsTrigger value="newspaper" className="flex items-center gap-2 data-[state=active]:bg-chart-newspaper/20 data-[state=active]:text-chart-newspaper">
                      <Newspaper className="w-4 h-4" />
                      <span className="hidden sm:inline">Newspaper</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tv">
                    <SalesChart platform="tv" />
                  </TabsContent>
                  <TabsContent value="radio">
                    <SalesChart platform="radio" />
                  </TabsContent>
                  <TabsContent value="newspaper">
                    <SalesChart platform="newspaper" />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Feature Importance */}
              <div className="chart-container opacity-0 animate-scale-in" style={{ animationDelay: '600ms' }}>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold">Feature Importance Analysis</h3>
                  <p className="text-sm text-muted-foreground">Relative impact of each advertising channel on sales</p>
                </div>
                <FeatureImportanceChart />
              </div>
            </div>

            {/* Prediction Simulator */}
            <div className="lg:col-span-1">
              <div className="chart-container sticky top-4 opacity-0 animate-scale-in" style={{ animationDelay: '700ms' }}>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Sales Predictor
                  </h3>
                  <p className="text-sm text-muted-foreground">Adjust ad spend to forecast sales</p>
                </div>
                <PredictionSimulator />
              </div>
            </div>
          </div>
        </section>

        {/* Insights Section */}
        <section className="container mx-auto px-4 pb-12">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Strategic Insights</h3>
            <p className="text-muted-foreground">Data-driven recommendations for your marketing strategy</p>
          </div>
          <InsightsPanel />
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 backdrop-blur-sm bg-background/30">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span>SalesForecast AI</span>
              </div>
              <p>
                Built with regression analysis • Model: Sales = {regressionModel.intercept.toFixed(2)} + 
                {regressionModel.tvCoef}×TV + {regressionModel.radioCoef}×Radio + {regressionModel.newspaperCoef}×Newspaper
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
