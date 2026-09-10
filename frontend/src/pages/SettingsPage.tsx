import React, { useState } from 'react';
import {
  User,
  Palette,
  Bell,
  Settings as SettingsIcon,
  Info,
  Save,
  RotateCcw
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Input,
  Toggle,
  Select,
  Badge
} from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { usePreferences } from '@/hooks/usePreferences';
import { toast } from '@/components/ui';
import { cn } from '@/lib/utils';

type SettingCategory = 'profile' | 'appearance' | 'notifications' | 'operations' | 'application';

const CATEGORIES: { id: SettingCategory; label: string; icon: any }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'operations', label: 'Operations', icon: SettingsIcon },
  { id: 'application', label: 'Application', icon: Info },
];

export const SettingsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SettingCategory>('profile');
  const { user, updateUser } = useAuth();
  const prefs = usePreferences();

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fadeIn">
      {/* Settings Navigation */}
      <aside className="w-full lg:w-64 shrink-0 space-y-2">
        <div className="px-2 mb-4">
          <h2 className="text-lg font-bold text-foreground">Settings</h2>
          <p className="text-xs text-muted-foreground">System configuration & preferences</p>
        </div>
        <nav className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                activeCategory === cat.id
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <cat.icon className="h-4 w-4" />
              {cat.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Settings Content */}
      <div className="flex-1 space-y-6">
        {activeCategory === 'profile' && <ProfileSection user={user} onUpdate={updateUser} />}
        {activeCategory === 'appearance' && <AppearanceSection prefs={prefs} />}
        {activeCategory === 'notifications' && <NotificationSection prefs={prefs} />}
        {activeCategory === 'operations' && <OperationsSection prefs={prefs} />}
        {activeCategory === 'application' && <ApplicationSection />}
      </div>
    </div>
  );
};

// --- SECTION COMPONENTS ---

const Avatar = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 text-xl font-bold">
      {initials}
    </div>
  );
};

const ProfileSection: React.FC<{ user: any; onUpdate: (updates: any) => void }> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState<{ username?: string; email?: string }>({});

  const handleSave = () => {
    const newErrors: { username?: string; email?: string } = {};
    if (!formData.username) newErrors.username = 'Display name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onUpdate({ username: formData.username, email: formData.email });
    toast.success('Profile updated successfully');
    setErrors({});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Manage your operator identity and account details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6 p-4 rounded-lg bg-secondary/20 border border-border">
          <Avatar name={user?.username || 'User'} />
          <div className="space-y-1">
            <div className="text-lg font-bold text-foreground">{user?.username}</div>
            <div className="text-sm text-muted-foreground font-mono">{user?.email}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="operational" className="text-[10px] font-mono uppercase">
                {user?.role}
              </Badge>
              <Badge variant="inactive" className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                Active
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground" htmlFor="prof-name">Display Name</label>
            <Input
              id="prof-name"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className={cn(errors.username && 'border-rose-500')}
            />
            {errors.username && <p className="text-[10px] text-rose-500">{errors.username}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground" htmlFor="prof-email">Email Address</label>
            <Input
              id="prof-email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={cn(errors.email && 'border-rose-500')}
            />
            {errors.email && <p className="text-[10px] text-rose-500">{errors.email}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={() => setFormData({ username: user?.username || '', email: user?.email || '' })}>
            <RotateCcw className="h-4 w-4 mr-2" /> Reset
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" /> Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const AppearanceSection: React.FC<{ prefs: any }> = ({ prefs }) => {
  const { updatePreference } = usePreferences();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize the visual experience of the control center.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-3 rounded-md border border-border bg-secondary/10">
          <div>
            <div className="text-sm font-medium text-foreground">Dark Mode</div>
            <p className="text-xs text-muted-foreground">The primary operational theme for Vectorail.</p>
          </div>
          <Toggle
            checked={prefs.appearance.theme === 'dark'}
            onChange={(v) => updatePreference('appearance', { theme: v ? 'dark' : 'light' })}
          />
        </div>
        <div className="flex items-center justify-between p-3 rounded-md border border-border bg-secondary/10">
          <div>
            <div className="text-sm font-medium text-foreground">Interface Density</div>
            <p className="text-xs text-muted-foreground">Adjust the spacing and layout of data tables.</p>
          </div>
          <Select
            value={prefs.appearance.density}
            onChange={(v) => updatePreference('appearance', { density: v })}
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </Select>
        </div>
        <div className="flex items-center justify-between p-3 rounded-md border border-border bg-secondary/10">
          <div>
            <div className="text-sm font-medium text-foreground">Remember Sidebar State</div>
            <p className="text-xs text-muted-foreground">Persist collapsed/expanded sidebar preference.</p>
          </div>
          <Toggle
            checked={prefs.sidebar.rememberCollapsed}
            onChange={(v) => updatePreference('sidebar', { rememberCollapsed: v })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const NotificationSection: React.FC<{ prefs: any }> = ({ prefs }) => {
  const { updatePreference } = usePreferences();

  const settings = [
    { key: 'operational', label: 'Operational Alerts', desc: 'Track conflicts and signal updates' },
    { key: 'critical', label: 'Critical Alerts', desc: 'Emergency and safety-critical notifications' },
    { key: 'system', label: 'System Notifications', desc: 'API and hardware status updates' },
    { key: 'maintenance', label: 'Maintenance Advisories', desc: 'Scheduled track work and closures' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Control which operational alerts are displayed in the console.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {settings.map((s) => (
          <div key={s.key} className="flex items-center justify-between p-3 rounded-md border border-border bg-secondary/10">
            <div>
              <div className="text-sm font-medium text-foreground">{s.label}</div>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
            <Toggle
              checked={prefs.notifications[s.key as keyof typeof prefs.notifications]}
              onChange={(v) => updatePreference('notifications', { [s.key]: v })}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const OperationsSection: React.FC<{ prefs: any }> = ({ prefs }) => {
  const { updatePreference } = usePreferences();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Operations</CardTitle>
        <CardDescription>Fine-tune the behavior of the traffic management interface.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-3 rounded-md border border-border bg-secondary/10">
          <div>
            <div className="text-sm font-medium text-foreground">Telemetry Auto-Refresh</div>
            <p className="text-xs text-muted-foreground">Automatic update interval for fleet telemetry.</p>
          </div>
          <Select
            value={prefs.operations.refreshInterval}
            onChange={(v) => updatePreference('operations', { refreshInterval: v })}
          >
            <option value="off">Off</option>
            <option value="15s">15 seconds</option>
            <option value="30s">30 seconds</option>
            <option value="1m">1 minute</option>
            <option value="5m">5 minutes</option>
          </Select>
        </div>
        <div className="space-y-3">
          {[
            { key: 'showSystemStatus', label: 'Display System Status', desc: 'Show real-time API health in header' },
            { key: 'showWarnings', label: 'Operational Warnings', desc: 'Highlight potential bottlenecks' },
            { key: 'compactTables', label: 'Compact Data Tables', desc: 'Increase information density in lists' },
          ].map((s) => (
            <div key={s.key} className="flex items-center justify-between p-3 rounded-md border border-border bg-secondary/10">
              <div>
                <div className="text-sm font-medium text-foreground">{s.label}</div>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
              <Toggle
                checked={prefs.operations[s.key as keyof typeof prefs.operations]}
                onChange={(v) => updatePreference('operations', { [s.key]: v })}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ApplicationSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Information</CardTitle>
        <CardDescription>Vectorail system details and environment.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 rounded-md border border-border bg-secondary/10">
            <span className="text-sm text-muted-foreground">System Name</span>
            <span className="text-sm font-bold text-foreground">Vectorail</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-md border border-border bg-secondary/10">
            <span className="text-sm text-muted-foreground">Description</span>
            <span className="text-sm font-medium text-foreground text-right max-w-[200px]">Intelligent Railway Operations</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-md border border-border bg-secondary/10">
            <span className="text-sm text-muted-foreground">Version</span>
            <span className="text-sm font-mono text-emerald-400">v0.1.0</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-md border border-border bg-secondary/10">
            <span className="text-sm text-muted-foreground">Environment</span>
            <Badge variant="inactive" className="font-mono text-[10px]">Demo / Development</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
