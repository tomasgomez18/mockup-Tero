import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  to: string
}

export interface FooterColumn {
  title: string
  links: NavItem[]
}

export interface AdminNavItem extends NavItem {
  icon: LucideIcon
  end?: boolean
}

export interface SelectOption {
  value: string
  label: string
}
