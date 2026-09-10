import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  X,
  Radio,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui';
import { NAV_ITEMS } from '@/config/routes';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isCollapsed,
  onToggleCollapse,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-40 flex flex-col border-r border-border bg-card/98 backdrop-blur transition-all duration-200 ease-in-out lg:static',
          // Mobile state
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          // Desktop collapsed vs expanded
          isCollapsed ? 'lg:w-[68px]' : 'lg:w-64',
          'w-64'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Radio className="h-5 w-5 animate-pulse text-emerald-400" />
            </div>
            {(!isCollapsed || isOpen) && (
              <div className="truncate">
                <div className="text-sm font-bold tracking-wider text-foreground">
                  VECTORAIL
                </div>
                <div className="text-[10px] text-muted-foreground font-medium tracking-tight">
                  Intelligent Railway Operations
                </div>
              </div>
            )}
          </div>

          {/* Close mobile button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-1">
          {(!isCollapsed || isOpen) && (
            <div className="mb-2 px-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Operations
            </div>
          )}

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;

              const linkContent = (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) onCloseMobile();
                  }}
                  className={({ isActive }) =>
                    cn(
                      'group relative flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium transition-all select-none',
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/25 shadow-sm'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                      isCollapsed && !isOpen && 'justify-center px-0'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active Indicator Bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-emerald-500" />
                      )}

                      <Icon className={cn('h-4 w-4 shrink-0 transition-colors', isActive ? 'text-emerald-400' : 'group-hover:text-foreground')} />

                      {(!isCollapsed || isOpen) && (
                        <span className="truncate flex-1">{item.title}</span>
                      )}
                    </>
                  )}
                </NavLink>
              );

              // If collapsed on desktop, wrap with Tooltip
              if (isCollapsed) {
                return (
                  <Tooltip key={item.path} content={item.name} position="right">
                    <div className="w-full">{linkContent}</div>
                  </Tooltip>
                );
              }

              return linkContent;
            })}
          </nav>
        </div>

        {/* Footer / Desktop Collapse Toggle */}
        <div className="border-t border-border p-3 bg-secondary/20">
          <div className="flex items-center justify-between">
            {(!isCollapsed || isOpen) && (
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-muted-foreground">OPS SECTOR 01</span>
                <span className="text-[9px] font-mono text-emerald-400">STATUS: ACTIVE</span>
              </div>
            )}

            {/* Desktop toggle button */}
            <button
              onClick={onToggleCollapse}
              className={cn(
                'hidden lg:flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors',
                isCollapsed && 'mx-auto'
              )}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
