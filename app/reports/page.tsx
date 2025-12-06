import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ReportsPage() {
  const revenueData = [
    { month: "Oca", gelir: 245000, gider: 125000 },
    { month: "Şub", gelir: 268000, gider: 135000 },
    { month: "Mar", gelir: 289000, gider: 142000 },
    { month: "Nis", gelir: 312000, gider: 156000 },
    { month: "May", gelir: 295000, gider: 148000 },
    { month: "Haz", gelir: 325000, gider: 162000 },
    { month: "Tem", gelir: 342000, gider: 171000 },
    { month: "Ağu", gelir: 318000, gider: 159000 },
    { month: "Eyl", gelir: 335000, gider: 168000 },
    { month: "Eki", gelir: 358000, gider: 179000 },
    { month: "Kas", gelir: 372000, gider: 186000 },
    { month: "Ara", gelir: 284560, gider: 142000 },
  ]

  const serviceTypesData = [
    { name: "Periyodik Bakım", value: 42, color: "#4F46E5" },
    { name: "Arıza Onarımı", value: 28, color: "#06B6D4" },
    { name: "Fren Sistemi", value: 15, color: "#10B981" },
    { name: "Motor İşleri", value: 10, color: "#F59E0B" },
    { name: "Diğer", value: 5, color: "#EF4444" },
  ]

  const technicianPerformance = [
    {
      name: "Ahmet Yılmaz",
      completed: 48,
      revenue: "₺142,800",
      avgTime: "4.2 saat",
      rating: 4.8,
    },
    {
      name: "Mehmet Kaya",
      completed: 42,
      revenue: "₺128,400",
      avgTime: "4.5 saat",
      rating: 4.6,
    },
    {
      name: "Ali Demir",
      completed: 45,
      revenue: "₺135,600",
      avgTime: "4.3 saat",
      rating: 4.7,
    },
    {
      name: "Mustafa Şahin",
      completed: 38,
      revenue: "₺114,200",
      avgTime: "4.8 saat",
      rating: 4.5,
    },
  ]

  const topCustomers = [
    { name: "Mehmet Öz", visits: 18, spent: "₺24,780" },
    { name: "Can Özkan", visits: 15, spent: "₺18,560" },
    { name: "Ali Yılmaz", visits: 12, spent: "₺12,450" },
    { name: "Ayşe Kaya", visits: 10, spent: "₺8,920" },
    { name: "Fatma Demir", visits: 8, spent: "₺6,340" },
  ]

  const mostCommonIssues = [
    { issue: "Yağ Değişimi", count: 156, trend: "+12%" },
    { issue: "Fren Bakımı", count: 98, trend: "+8%" },
    { issue: "Klima Arızası", count: 72, trend: "-5%" },
    { issue: "Motor Arızası", count: 54, trend: "+15%" },
    { issue: "Süspansiyon", count: 48, trend: "+3%" },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Raporlar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Raporlar & Analitik</h1>
              <p className="text-muted-foreground">Detaylı performans ve finansal analiz</p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="2024">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Rapor İndir
              </Button>
            </div>
          </div>

          <Tabs defaultValue="financial" className="space-y-6">
            <TabsList>
              <TabsTrigger value="financial">Finansal</TabsTrigger>
              <TabsTrigger value="operational">Operasyonel</TabsTrigger>
              <TabsTrigger value="customer">Müşteri</TabsTrigger>
              <TabsTrigger value="technician">Teknisyen</TabsTrigger>
            </TabsList>

            <TabsContent value="financial" className="space-y-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Gelir - Gider Grafiği</CardTitle>
                  <CardDescription>Aylık finansal performans</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      gelir: {
                        label: "Gelir",
                        color: "hsl(var(--chart-1))",
                      },
                      gider: {
                        label: "Gider",
                        color: "hsl(var(--chart-5))",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="gelir" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                        <Line type="monotone" dataKey="gider" stroke="hsl(var(--chart-5))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Aylık Özet</CardTitle>
                    <CardDescription>Aralık 2024</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Toplam Gelir</span>
                      <span className="text-lg font-bold">₺284,560</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Toplam Gider</span>
                      <span className="text-lg font-bold">₺142,000</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Net Kar</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-chart-3" />
                        <span className="text-lg font-bold text-chart-3">₺142,560</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Kar Marjı</span>
                      <span className="font-medium">50.1%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Yıllık Performans</CardTitle>
                    <CardDescription>2024 Toplamları</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Yıllık Gelir</span>
                      <span className="text-lg font-bold">₺3,743,560</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Yıllık Gider</span>
                      <span className="text-lg font-bold">₺1,873,000</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Net Kar</span>
                      <span className="text-lg font-bold text-chart-3">₺1,870,560</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Geçen yıla göre</span>
                      <div className="flex items-center gap-1 text-chart-3">
                        <TrendingUp className="h-3 w-3" />
                        <span className="font-medium">+15%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="operational" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Service Types Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Servis Türleri Dağılımı</CardTitle>
                    <CardDescription>En çok yapılan işlemler</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        value: {
                          label: "Yüzde",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={serviceTypesData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {serviceTypesData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Common Issues */}
                <Card>
                  <CardHeader>
                    <CardTitle>En Sık Karşılaşılan Arızalar</CardTitle>
                    <CardDescription>Müşteri şikayetleri analizi</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mostCommonIssues.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.issue}</p>
                            <p className="text-xs text-muted-foreground">{item.count} işlem</p>
                          </div>
                          <div
                            className={`flex items-center gap-1 text-sm ${item.trend.startsWith("+") ? "text-chart-3" : "text-chart-5"}`}
                          >
                            {item.trend.startsWith("+") ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            <span className="font-medium">{item.trend}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Completion Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Aylık Tamamlanan İşlemler</CardTitle>
                  <CardDescription>İş emri tamamlanma oranları</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      completed: {
                        label: "Tamamlanan",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="gelir" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customer" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>En Değerli Müşteriler</CardTitle>
                  <CardDescription>Toplam harcama ve ziyaret sayısı</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Müşteri Adı</TableHead>
                        <TableHead>Ziyaret Sayısı</TableHead>
                        <TableHead>Toplam Harcama</TableHead>
                        <TableHead>Ortalama İşlem</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topCustomers.map((customer, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.visits}</TableCell>
                          <TableCell className="font-semibold">{customer.spent}</TableCell>
                          <TableCell className="text-muted-foreground">
                            ₺
                            {Math.round(
                              Number.parseFloat(customer.spent.replace("₺", "").replace(",", "")) / customer.visits,
                            ).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technician" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Teknisyen Performans Raporu</CardTitle>
                  <CardDescription>Bu ayki teknisyen verimlilik analizi</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Teknisyen</TableHead>
                        <TableHead>Tamamlanan</TableHead>
                        <TableHead>Gelir</TableHead>
                        <TableHead>Ort. Süre</TableHead>
                        <TableHead>Değerlendirme</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {technicianPerformance.map((tech, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{tech.name}</TableCell>
                          <TableCell>{tech.completed}</TableCell>
                          <TableCell className="font-semibold">{tech.revenue}</TableCell>
                          <TableCell className="text-muted-foreground">{tech.avgTime}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{tech.rating}</span>
                              <span className="text-chart-4">★</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
