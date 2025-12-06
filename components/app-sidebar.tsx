"use client"

import type * as React from "react"
import { LayoutDashboard, Users, Car, Wrench, Package, FileText, BarChart3, Settings } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Ana Panel",
    url: "/",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Müşteriler",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Servis Girişi",
    url: "/service-entry",
    icon: Car,
  },
  {
    title: "İş Emirleri",
    url: "/work-orders",
    icon: Wrench,
  },
  {
    title: "Parça Yönetimi",
    url: "/parts",
    icon: Package,
  },
  {
    title: "Süreç Takibi",
    url: "/kanban",
    icon: FileText,
  },
  {
    title: "Raporlar",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Ayarlar",
    url: "/settings",
    icon: Settings,
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: {
    first_name: string
    last_name: string
    email: string
    role: string
  }
  organization?: {
    name: string
  }
}

export function AppSidebar({ user, organization, ...props }: AppSidebarProps) {
  const userData = user
    ? {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        avatar: "/diverse-team-manager.png",
        role: user.role,
      }
    : {
        name: "Servis Yöneticisi",
        email: "yonetici@carservice.com",
        avatar: "/diverse-team-manager.png",
        role: "admin",
      }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wrench className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{organization?.name || "CarService Pro"}</span>
            <span className="text-xs text-muted-foreground">Yönetim Paneli</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
