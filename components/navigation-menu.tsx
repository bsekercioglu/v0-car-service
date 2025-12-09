"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, Calendar, Wrench, Users, FileText, BarChart3, Package, CreditCard, Car } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Calendar, label: "Takvim", href: "/calendar" },
  { icon: Wrench, label: "Servisler", href: "/services" },
  { icon: Users, label: "Müşteriler", href: "/customers" },
  { icon: Car, label: "Araçlar", href: "/vehicles" },
  { icon: Package, label: "Stok Yönetimi", href: "/inventory" },
  { icon: FileText, label: "Raporlar", href: "/reports" },
  { icon: BarChart3, label: "Analizler", href: "/analytics" },
  { icon: Users, label: "Kullanıcılar", href: "/users" },
  { icon: CreditCard, label: "Abonelik", href: "/subscription" },
]

export function NavigationMenu() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Button
            key={item.label}
            variant={isActive ? "secondary" : "ghost"}
            className={cn("justify-start", isActive && "bg-accent")}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="h-4 w-4 mr-2" />
              <span>{item.label}</span>
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
