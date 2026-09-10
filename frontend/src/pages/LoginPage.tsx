import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Input, Badge, Toggle } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = React.useState('dispatcher@vectorail.net');
  const [password, setPassword] = React.useState('Sector01Operations!');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isDemoMode, setIsDemoMode] = React.useState(true);
  const [errors, setErrors] = React.useState<{ username?: string; password?: string }>({});
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleDemoModeChange = (checked: boolean) => {
    setIsDemoMode(checked);
    if (checked) {
      setUsername('dispatcher@vectorail.net');
      setPassword('Sector01Operations!');
      setErrors({});
    }
  };

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username) {
      newErrors.username = 'Username is required';
    } else if (!username.includes('@') || !username.includes('.')) {
      newErrors.username = 'Enter a valid operator email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login({ username, password });
      toast.success('Welcome to Vectorail');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Unable to sign in');
      setErrors({ password: 'Invalid credentials provided' });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 selection:bg-emerald-500/20 selection:text-emerald-300">
      <div className="w-full max-w-md space-y-6 animate-fadeIn">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Radio className="h-6 w-6 animate-pulse text-emerald-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            VECTORAIL
          </h1>
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-mono font-medium">
            Intelligent Railway Traffic Management
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-border bg-card/95 shadow-xl backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Operations Console Sign In</CardTitle>
              {isDemoMode && (
                <Badge variant="operational" className="text-[10px] font-mono">
                  Demo Mode
                </Badge>
              )}
            </div>
            <CardDescription>
              Enter authorized railway controller credentials for Sector 01.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground" htmlFor="login-username">
                  Email / Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`pl-9 font-mono text-xs ${errors.username ? 'border-rose-500 focus-visible:ring-rose-500' : ''}`}
                    placeholder="controller@vectorail.net"
                    required
                    autoComplete="username"
                  />
                </div>
                {errors.username && (
                  <p className="text-[10px] text-rose-500 font-mono mt-1">{errors.username}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground" htmlFor="login-password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-9 pr-10 font-mono text-xs ${errors.password ? 'border-rose-500 focus-visible:ring-rose-500' : ''}`}
                    placeholder="Enter password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] text-rose-500 font-mono mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <Toggle
                  label="Demo Mode"
                  checked={isDemoMode}
                  onChange={handleDemoModeChange}
                />
                <span className="text-[11px] font-mono text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  Reset Password?
                </span>
              </div>

              <Button
                type="submit"
                loading={isLoading}
                className="w-full gap-2 mt-3"
              >
                <span>Sign In to Control Center</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-between bg-secondary/20 rounded-b-lg">
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>TLS 1.3 Operational Relay</span>
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">v1.0.0</span>
          </CardFooter>
        </Card>

        {/* Demo Mode Notice */}
        {isDemoMode && (
          <div className="rounded-lg border border-border/80 bg-secondary/30 p-3 text-center space-y-1 text-xs animate-fadeIn">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-mono font-medium text-[11px]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Demo Credentials Pre-filled</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Click &quot;Sign In to Control Center&quot; to test the application shell and UI components.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
