"use client"

import { NavigationMenu } from "@/components/navigation-menu"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, Wrench, DollarSign, Clock, Star, AlertCircle } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const monthlyData = [
  { month: "Oca", gelir: 45000, servis: 42, musteri: 38 },
  { month: "Şub", gelir: 52000, servis: 48, musteri: 44 },
  { month: "Mar", gelir: 48000, servis: 45, musteri: 41 },
  { month: "Nis", gelir: 61000, servis: 54, musteri: 49 },
  { month: "May", gelir: 58000, servis: 51, musteri: 47 },
  { month: "Haz", gelir: 65000, servis: 58, musteri: 52 },
]

const serviceDistribution = [
  { name: "Yağ Değişimi", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Fren Bakımı", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Lastik", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Motor Bakımı", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Diğer", value: 5, color: "hsl(var(--chart-5))" },
]

const topCustomers = [
  { name: "Ahmet Yılmaz", visits: 12, spent: 18500, plate: "34 ABC 123" },
  { name: "Mehmet Kaya", visits: 10, spent: 15200, plate: "06 XYZ 456" },
  { name: "Ayşe Demir", visits: 9, spent: 13800, plate: "35 DEF 789" },
  { name: "Fatma Şahin", visits: 8, spent: 12400, plate: "16 GHI 012" },
  { name: "Ali Çelik", visits: 7, spent: 11200, plate: "01 JKL 345" },
]

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex w-64 border-r bg-card">
        <div className="flex flex-col w-full p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg className="h-5 w-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg font-semibold">CarService</span>
          </div>
          <NavigationMenu />
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-balance">İstatistikler ve Analizler</h1>
            <p className="text-muted-foreground mt-1">Detaylı performans metrikleri ve trendler</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₺329,000</div>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+18.2% geçen aya göre</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Tamamlanan Servis</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">298</div>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+14.5% geçen aya göre</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Aktif Müşteri</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">271</div>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+9.8% geçen aya göre</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Ort. Servis Süresi</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4 saat</div>
                <div className="flex items-center gap-1 text-sm text-red-600 mt-1">
                  <TrendingDown className="h-3 w-3" />
                  <span>+0.3 saat artış</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Aylık Gelir Trendi</CardTitle>
                <CardDescription>Son 6 ayın gelir performansı</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="gelir"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Gelir (₺)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Servis Dağılımı</CardTitle>
                <CardDescription>Servis tipine göre dağılım</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={serviceDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {serviceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aylık Servis Sayısı</CardTitle>
                <CardDescription>Son 6 ayın servis performansı</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="servis" fill="hsl(var(--primary))" name="Servis Sayısı" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>En Değerli Müşteriler</CardTitle>
                <CardDescription>Toplam harcamaya göre sıralı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCustomers.map((customer, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <Star className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.plate} • {customer.visits} ziyaret
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₺{customer.spent.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Toplam</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  En İyi Performans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Haziran ayı</span>
                    <Badge variant="secondary">₺65,000</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">58 servis</span>
                    <Badge variant="secondary">52 müşteri</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-600" />
                  Müşteri Memnuniyeti
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4.8/5.0</div>
                <div className="text-sm text-muted-foreground mt-1">238 değerlendirme</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  Bekleyen Randevu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <div className="text-sm text-muted-foreground mt-1">Önümüzdeki 7 gün</div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
