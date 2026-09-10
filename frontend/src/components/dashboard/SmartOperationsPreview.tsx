import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { Sparkles } from 'lucide-react';

export const SmartOperationsPreview: React.FC = () => {
  return (
    <Card className="border-emerald-500/20 bg-emerald-500/5">
      <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-foreground">Smart Operations Insight</h4>
            <p className="text-xs text-muted-foreground">AI-driven optimization recommendations for Sector 01</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
          {[
            'Re-sequence Train TR-1082',
            'Optimize Platform 4 Allocation',
            'Review Congestion at B-12'
          ].map((rec, i) => (
            <div key={i} className="text-[10px] font-mono p-2 rounded border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-emerald-400" />
              {rec}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
