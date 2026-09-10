import React, { useState } from 'react';
import {
  TrainFront,
  Clock,
  AlertTriangle,
  Activity,
  Layers,
  Sparkles,
  RefreshCw,
  Filter,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  KpiCard,
  AlertCard,
  Button,
  StatusBadge,
  DelayBadge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Drawer,
  useToast,
  Input,
  Select,
  Checkbox,
  Toggle,
  CardSkeleton,
  LoadingSpinner,
  EmptyState,
  ErrorState,
} from '@/components/ui';

export const DashboardPage: React.FC = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [demoToggle, setDemoToggle] = useState(true);
  const [demoCheck, setDemoCheck] = useState(true);

  // Mock table dataset for previewing railway data tables
  const sampleTrains = [
    { id: 'TR-1082', name: 'Rajdhani Express', route: 'Sector 01 → Central Hub', speed: '124 km/h', status: 'RUNNING' as const, delay: 0 },
    { id: 'TR-2490', name: 'Vande Bharat Intercity', route: 'Metro North → West Yard', speed: '142 km/h', status: 'ON_TIME' as const, delay: 0 },
    { id: 'TR-0814', name: 'Freight Logistics Alpha', route: 'East Freight Line', speed: '58 km/h', status: 'DELAYED' as const, delay: 18 },
    { id: 'TR-3391', name: 'Duronto Special', route: 'Junction B → Terminal 4', speed: '0 km/h', status: 'MAINTENANCE' as const, delay: 45 },
    { id: 'TR-5120', name: 'Coastal Passenger', route: 'South Coast → City Link', speed: '88 km/h', status: 'RUNNING' as const, delay: 4 },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Top Banner: Section Heading & System Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-widest">
              Live Operations Preview
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Operations Control Center
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Real-time traffic telemetry, automated block monitoring, and active dispatch recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDrawerOpen(true)}
            className="text-xs gap-1.5"
          >
            <Layers className="h-3.5 w-3.5 text-emerald-400" />
            <span>Telemetry Drawer</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              toast({
                type: 'success',
                title: 'Dispatch Plan Synchronized',
                message: 'Active sector routing verified across all interlocking signal stations.',
              });
            }}
            className="text-xs gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Sync Dispatch Plan</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Active Trains"
          value="142"
          icon={TrainFront}
          status="operational"
          trend={{ value: "↑ 8.4%", direction: "up", label: "vs yesterday" }}
          description="Sector 01 & 02 mainline"
        />
        <KpiCard
          label="On-Time Rate"
          value="87.4%"
          icon={Clock}
          status="operational"
          trend={{ value: "+2.1%", direction: "up", label: "this shift" }}
          description="124 of 142 on schedule"
        />
        <KpiCard
          label="Delayed Trains"
          value="18"
          icon={Activity}
          status="warning"
          trend={{ value: "-3", direction: "down", label: "since 08:00" }}
          description="Avg delay: 7.2 min"
        />
        <KpiCard
          label="Critical Alerts"
          value="03"
          icon={AlertTriangle}
          status="critical"
          trend={{ value: "+1", direction: "up", label: "unacknowledged" }}
          description="Requires immediate action"
        />
      </div>

      {/* Interactive Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-3">
          <TabsList className="bg-secondary/60">
            <TabsTrigger value="overview">Operations Overview</TabsTrigger>
            <TabsTrigger value="components">UI Component Gallery</TabsTrigger>
            <TabsTrigger value="states">Loading & Feedback States</TabsTrigger>
          </TabsList>

          <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>MOCK PREVIEW MODE</span>
          </div>
        </div>

        {/* TAB 1: OPERATIONS OVERVIEW */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Operational Data Table */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Active Train Fleet Schedule</CardTitle>
                    <CardDescription>Real-time block section occupancy and telemetry status</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDialogOpen(true)}
                      className="text-xs h-7"
                    >
                      <Filter className="h-3 w-3 mr-1" />
                      <span>Filter Block</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-secondary/40 text-muted-foreground border-b border-border uppercase font-mono text-[10px] tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Train ID / Name</th>
                          <th className="py-3 px-4">Sector Route</th>
                          <th className="py-3 px-4">Speed</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Delay</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40 font-sans">
                        {sampleTrains.map((t) => (
                          <tr key={t.id} className="hover:bg-secondary/30 transition-colors">
                            <td className="py-3 px-4">
                              <div className="font-semibold text-foreground font-mono text-xs">{t.id}</div>
                              <div className="text-muted-foreground text-[11px]">{t.name}</div>
                            </td>
                            <td className="py-3 px-4 font-mono text-muted-foreground">{t.route}</td>
                            <td className="py-3 px-4 font-mono font-medium text-foreground">{t.speed}</td>
                            <td className="py-3 px-4">
                              <StatusBadge state={t.status} />
                            </td>
                            <td className="py-3 px-4">
                              <DelayBadge minutes={t.delay} />
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedTrain(t.id);
                                  setDrawerOpen(true);
                                }}
                                className="h-7 text-xs text-emerald-400 hover:text-emerald-300"
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <span>Showing 5 of 142 monitored trains</span>
                  <span className="font-mono text-emerald-400">TELEMETRY POLLING: 2.0s</span>
                </CardFooter>
              </Card>
            </div>

            {/* Right 1 Col: Operational Alert Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider font-mono">
                  Priority Alerts (3)
                </h3>
                <span className="text-xs text-rose-400 font-mono">1 CRITICAL</span>
              </div>

              <div className="space-y-3">
                <AlertCard
                  title="Signal Interlocking Timeout"
                  description="Junction B7 signal relay failed to confirm green within 1200ms."
                  severity="CRITICAL"
                  source="INTERLOCKING-J7"
                  timestamp="10:42:15 UTC"
                  onAcknowledge={() => {
                    toast({
                      type: 'info',
                      title: 'Alert Acknowledged',
                      message: 'Interlocking team has been dispatched to Junction B7.',
                    });
                  }}
                />

                <AlertCard
                  title="Track Speed Restriction"
                  description="Speed reduced to 60 km/h on Sector 04 due to heavy rainfall sensor trigger."
                  severity="WARNING"
                  source="TRACK-MONITOR"
                  timestamp="10:35:00 UTC"
                  acknowledged={true}
                />

                <AlertCard
                  title="Scheduled Track Inspection"
                  description="Routine track geometry inspection scheduled for Section 11 at 14:00 UTC."
                  severity="INFORMATION"
                  source="MAINTENANCE"
                  timestamp="09:15:00 UTC"
                  acknowledged={true}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: COMPONENT GALLERY */}
        <TabsContent value="components" className="space-y-6">
          {/* Button Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Button System & Hierarchy</CardTitle>
              <CardDescription>Standardized variants, sizes, and operational interactive states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="primary" loading>Processing</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button size="sm" variant="outline">Small Button</Button>
                <Button size="md" variant="outline">Medium Standard</Button>
                <Button size="lg" variant="outline">Large Button</Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Badges & Indicators */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Status & Severity Badges</CardTitle>
              <CardDescription>Consistent operational states across all railway monitoring modules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <StatusBadge state="OPERATIONAL" />
                <StatusBadge state="RUNNING" />
                <StatusBadge state="ON_TIME" />
                <StatusBadge state="DELAYED" />
                <StatusBadge state="WARNING" />
                <StatusBadge state="CRITICAL" />
                <StatusBadge state="CANCELLED" />
                <StatusBadge state="COMPLETED" />
                <StatusBadge state="MAINTENANCE" />
                <StatusBadge state="OFFLINE" />
              </div>
              <div className="flex items-center gap-4 text-xs font-mono pt-2">
                <span>Delay Indicators:</span>
                <DelayBadge minutes={0} />
                <DelayBadge minutes={5} />
                <DelayBadge minutes={22} />
              </div>
            </CardContent>
          </Card>

          {/* Form Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Form Controls & Filters</CardTitle>
              <CardDescription>Inputs, selects, switches, and checkboxes matching the dark theme</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Sector Code</label>
                <Input placeholder="e.g. SEC-01" defaultValue="SEC-01" className="font-mono text-xs" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Dispatch Priority</label>
                <Select defaultValue="HIGH">
                  <option value="HIGH">High Priority Express</option>
                  <option value="NORMAL">Standard Schedule</option>
                  <option value="FREIGHT">Freight Transit</option>
                </Select>
              </div>

              <div className="space-y-1.5 flex flex-col justify-end">
                <Checkbox
                  label="Audio Dispatch Alerts"
                  checked={demoCheck}
                  onChange={(e) => setDemoCheck(e.target.checked)}
                />
              </div>

              <div className="space-y-1.5 flex flex-col justify-end">
                <Toggle
                  label="Auto Conflict Resolution"
                  checked={demoToggle}
                  onChange={setDemoToggle}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: LOADING & FEEDBACK STATES */}
        <TabsContent value="states" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Skeleton Loading State</CardTitle>
                <CardDescription>Shown during asynchronous backend telemetry fetching</CardDescription>
              </CardHeader>
              <CardContent>
                <CardSkeleton rows={3} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inline Spinners & Loading</CardTitle>
                <CardDescription>Non-blocking telemetry spinners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6">
                  <LoadingSpinner size="sm" label="Telemetry poll..." />
                  <LoadingSpinner size="md" label="Calculating conflict graph..." />
                  <LoadingSpinner size="lg" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmptyState
              title="No active track conflicts detected"
              description="All train routes are clear and operating within safety margins across Sector 01."
              actionLabel="Run Diagnostic Scan"
              onAction={() => {
                toast({
                  type: 'info',
                  title: 'Scan Initiated',
                  message: 'Network topology verified with zero deadlocks.',
                });
              }}
            />

            <ErrorState
              title="Telemetry Link Interrupted"
              message="Failed to synchronize with sector SCADA RTU-08. Check network physical link."
              onRetry={() => {
                toast({
                  type: 'warning',
                  title: 'Reconnecting Link',
                  message: 'Attempting handshake with SCADA gateway...',
                });
              }}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Filter Block Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogHeader>
          <DialogTitle>Filter Block Sections</DialogTitle>
          <DialogDescription>
            Filter active train list by track sector and operational conditions.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Track Section Range</label>
            <Input defaultValue="KM 100 - KM 240" className="font-mono text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Speed Floor (km/h)</label>
            <Input type="number" defaultValue="60" className="font-mono text-xs" />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setDialogOpen(false);
              toast({
                type: 'success',
                title: 'Filters Applied',
                message: 'Train list updated for selected section parameters.',
              });
            }}
          >
            Apply Filters
          </Button>
        </div>
      </Dialog>

      {/* Telemetry Slide-out Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedTrain ? `Train Telemetry: ${selectedTrain}` : "Sector 01 Telemetry"}
        subtitle="Live Block Section & Sensor Status"
        width="md"
      >
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-secondary/30 p-4 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Block Section</span>
              <span className="text-foreground font-semibold">BLK-SEC-104A</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Track Occupancy</span>
              <StatusBadge state="ON_TIME" />
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Permitted Max Speed</span>
              <span className="text-foreground">160 km/h</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Axle Counter Count</span>
              <span className="text-emerald-400">72 (Balanced)</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono">
              Signal Aspects
            </h4>
            <div className="p-3 rounded border border-border bg-card text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Home Signal S-12</span>
                <span className="text-emerald-400 font-mono font-bold">🟢 PROCEED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distant Signal D-12</span>
                <span className="text-amber-400 font-mono font-bold">🟡 CAUTION</span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full text-xs gap-1.5"
            onClick={() => {
              setDrawerOpen(false);
              toast({
                type: 'info',
                title: 'Sensor Refresh',
                message: 'Manual polling cycle triggered.',
              });
            }}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Force Sensor Telemetry Refresh</span>
          </Button>
        </div>
      </Drawer>
    </div>
  );
};
