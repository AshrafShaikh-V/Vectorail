import { AlertSeverity, AlertStatus, AlertCategory, AlertImpact } from '../types';
import { SEVERITY_CONFIG, STATUS_CONFIG, CATEGORY_CONFIG, IMPACT_CONFIG } from '../constants';
import { formatDistanceToNow } from 'date-fns';

export const getSeverityLabel = (severity: AlertSeverity) => SEVERITY_CONFIG[severity]?.label || severity;
export const getSeverityVariant = (severity: AlertSeverity) => SEVERITY_CONFIG[severity]?.variant || 'info';
export const getSeverityColor = (severity: AlertSeverity) => SEVERITY_CONFIG[severity]?.color || 'text-muted-foreground';
export const getSeverityPriority = (severity: AlertSeverity) => SEVERITY_CONFIG[severity]?.priority || 99;

export const getStatusLabel = (status: AlertStatus) => STATUS_CONFIG[status]?.label || status;
export const getStatusVariant = (status: AlertStatus) => STATUS_CONFIG[status]?.variant || 'default';

export const getCategoryLabel = (category: AlertCategory) => CATEGORY_CONFIG[category]?.label || category;
export const getImpactLabel = (impact: AlertImpact) => IMPACT_CONFIG[impact]?.label || impact;

export const formatRelativeTime = (dateString: string) => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return 'Unknown time';
  }
};

export const resolveAlertLocation = (alert: { location: string; stationId?: string; sectionId?: string; trainId?: string }) => {
  return alert.location;
};
