import {
  MonitorSmartphone,
  Database,
  ShieldCheck,
  Layers,
  Code,
  Cpu,
  Globe,
  Server,
  Terminal,
  Laptop,
  Smartphone,
  Cloud,
  FileCode,
  Layout,
  Lock,
  Workflow,
  Sparkles,
  Zap,
  Wrench,
  GitBranch,
  type LucideIcon,
} from 'lucide-react'

export const AVAILABLE_ICONS: Record<string, LucideIcon> = {
  MonitorSmartphone,
  Database,
  ShieldCheck,
  Layers,
  Code,
  Cpu,
  Globe,
  Server,
  Terminal,
  Laptop,
  Smartphone,
  Cloud,
  FileCode,
  Layout,
  Lock,
  Workflow,
  Sparkles,
  Zap,
  Wrench,
  GitBranch,
}

export function getIconComponent(iconName?: string): LucideIcon {
  if (!iconName) return Layers
  return AVAILABLE_ICONS[iconName] || Layers
}
