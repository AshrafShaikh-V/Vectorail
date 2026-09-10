import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@/components/ui';
import { Clock } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  subtitle?: string;
  moduleName?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  subtitle = 'Module preparation in progress.',
  moduleName = 'Vectorail Operations Module',
}) => {
  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-fadeIn">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="inactive" className="font-mono text-[10px]">
            {moduleName}
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <Card className="border-border/60 bg-card/60">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-foreground">
            <Clock className="h-4 w-4 text-emerald-400" />
            <span>Module Status: Preparation</span>
          </CardTitle>
          <CardDescription>
            This module is currently under development. The operational routing and infrastructure are verified.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded border border-dashed border-border/80 bg-secondary/20 p-8 text-center">
            <div className="text-sm font-semibold text-foreground">Vectorail</div>
            <div className="text-xs text-emerald-400 font-mono mt-1">{title}</div>
            <div className="text-xs text-muted-foreground mt-2"> coming in a future phase.</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
