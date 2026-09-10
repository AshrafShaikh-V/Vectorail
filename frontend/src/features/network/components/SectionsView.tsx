import React, { useState, useMemo } from 'react';
import { SectionFilters } from './SectionFilters';
import { SectionTable } from './SectionTable';
import { EmptyState } from '@/components/ui/FeedbackStates';
import { TableSkeleton } from '@/components/ui/LoadingStates';
import { RailwayNetwork } from '@/features/network/types';
import { MOCK_NETWORK } from '@/features/network/mockData';
import { Search } from 'lucide-react';

interface SectionsViewProps {
  network: RailwayNetwork;
  selectedElement: { type: 'node' | 'connection'; id: string } | null;
  onElementSelect: (type: 'node' | 'connection', id: string) => void;
}

export const SectionsView: React.FC<SectionsViewProps> = ({
  network,
  selectedElement,
  onElementSelect,
}) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [congestion, setCongestion] = useState('ALL');
  const [line, setLine] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredSections = useMemo(() => {
    return network.sections.filter(section => {
      const matchesSearch =
        section.name.toLowerCase().includes(search.toLowerCase()) ||
        section.id.toLowerCase().includes(search.toLowerCase()) ||
        network.lines.some(l => l.name.toLowerCase().includes(search.toLowerCase()) && l.sections.includes(section.id));

      const matchesStatus = status === 'ALL' || section.status === status;
      const matchesLine = line === 'ALL' || section.lineId === line;

      // Manual congestion check based on utilization
      const getCongestionLevel = (utilization: number) => {
        if (utilization > 80) return 'CRITICAL';
        if (utilization > 60) return 'HEAVY';
        if (utilization > 30) return 'MODERATE';
        return 'LOW';
      };
      const currentCongestion = getCongestionLevel(section.utilization);
      const matchesCongestion = congestion === 'ALL' || currentCongestion === congestion;

      return matchesSearch && matchesStatus && matchesLine && matchesCongestion;
    });
  }, [search, status, congestion, line, network]);

  const handleSectionSelect = (id: string) => {
    onElementSelect('connection', id);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-16 w-full bg-secondary/20 rounded-lg animate-pulse" />
        <TableSkeleton rows={10} cols={9} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Railway Sections</h2>
        <p className="text-sm text-muted-foreground">Monitor track utilization and congestion levels across the network.</p>
      </div>

      <SectionFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        congestion={congestion}
        setCongestion={setCongestion}
        line={line}
        setLine={setLine}
        network={network}
      />

      {filteredSections.length > 0 ? (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <SectionTable
            sections={filteredSections}
            network={network}
            selectedSectionId={selectedElement?.id}
            onSectionSelect={handleSectionSelect}
          />
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No sections found"
          description={`No sections match your current filters: ${search || 'none'}, ${status !== 'ALL' ? status : 'all statuses'}, ${congestion !== 'ALL' ? congestion : 'all congestion levels'}, ${line !== 'ALL' ? line : 'all lines'}.`}
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setStatus('ALL');
            setCongestion('ALL');
            setLine('ALL');
          }}
        />
      )}
    </div>
  );
};
