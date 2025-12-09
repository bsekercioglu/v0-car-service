import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Wrench, Clock, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Calendar,
    label: "Bugünkü Randevular",
    value: "12",
    change: "+3 dün",
    trend: "up",
  },
  {
    icon: Wrench,
    label: "Aktif Servisler",
    value: "8",
    change: "+2 bu hafta",
    trend: "up",
  },
  {
    icon: Clock,
    label: "Bekleyen İşler",
    value: "5",
    change: "-1 dün",
    trend: "down",
  },
  {
    icon: TrendingUp,
    label: "Bu Ay Gelir",
    value: "₺45,600",
    change: "+12% geçen ay",
    trend: "up",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className={`text-xs ${stat.trend === "up" ? "text-primary" : "text-muted-foreground"}`}>
                  {stat.change}
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
