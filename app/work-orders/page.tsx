import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Clock, AlertCircle, CheckCircle2, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function WorkOrdersPage() {
  const workOrders = [
    {
      id: "WO-2024-156",
      plate: "34 ABC 123",
      customer: "Ali Yılmaz",
      service: "Yağ Değişimi + Filtre",
      technician: "Ahmet Yılmaz",
      status: "İncelemede",
      statusColor: "bg-chart-2 text-white",
      priority: "Normal",
      entryDate: "06 Ara 2024",
      estimatedCompletion: "07 Ara 2024",
    },
    {
      id: "WO-2024-155",
      plate: "06 XYZ 789",
      customer: "Ayşe Kaya",
      service: "Fren Sistemi Onarımı",
      technician: "Mehmet Kaya",
      status: "Parça Bekliyor",
      statusColor: "bg-chart-4 text-white",
      priority: "Yüksek",
      entryDate: "05 Ara 2024",
      estimatedCompletion: "09 Ara 2024",
    },
    {
      id: "WO-2024-154",
      plate: "35 DEF 456",
      customer: "Mehmet Öz",
      service: "Motor Arıza Tespiti",
      technician: "Ali Demir",
      status: "Onarımda",
      statusColor: "bg-chart-1 text-white",
      priority: "Acil",
      entryDate: "04 Ara 2024",
      estimatedCompletion: "06 Ara 2024",
    },
    {
      id: "WO-2024-153",
      plate: "16 GHI 321",
      customer: "Fatma Demir",
      service: "Klima Bakımı",
      technician: "Mustafa Şahin",
      status: "Testte",
      statusColor: "bg-chart-3 text-white",
      priority: "Normal",
      entryDate: "03 Ara 2024",
      estimatedCompletion: "06 Ara 2024",
    },
    {
      id: "WO-2024-152",
      plate: "34 JKL 654",
      customer: "Can Özkan",
      service: "Periyodik Bakım",
      technician: "Ahmet Yılmaz",
      status: "Tamamlandı",
      statusColor: "bg-green-600 text-white",
      priority: "Normal",
      entryDate: "02 Ara 2024",
      estimatedCompletion: "03 Ara 2024",
    },
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
                <BreadcrumbPage>İş Emirleri</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">İş Emirleri</h1>
              <p className="text-muted-foreground">Tüm servis işlemlerini takip edin</p>
            </div>
            <Button asChild>
              <Link href="/service-entry">Yeni İş Emri</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Açık</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Parça Bekliyor</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Geciken</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bu Ay Tamamlanan</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters & Search */}
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>İş Emri Listesi</CardTitle>
                  <CardDescription>Tüm iş emirlerinin detaylı listesi</CardDescription>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="İş emri ara..." className="pl-9" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Durum Filtrele" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="inspection">İncelemede</SelectItem>
                      <SelectItem value="waiting">Parça Bekliyor</SelectItem>
                      <SelectItem value="repairing">Onarımda</SelectItem>
                      <SelectItem value="testing">Testte</SelectItem>
                      <SelectItem value="completed">Tamamlandı</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workOrders.map((order) => (
                  <Card key={order.id} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-sm font-semibold">{order.id}</span>
                            <Badge className={order.statusColor}>{order.status}</Badge>
                            {order.priority === "Acil" && (
                              <Badge variant="destructive" className="gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {order.priority}
                              </Badge>
                            )}
                            {order.priority === "Yüksek" && <Badge variant="secondary">{order.priority}</Badge>}
                          </div>
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Plaka</p>
                              <p className="font-medium">{order.plate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Müşteri</p>
                              <p className="font-medium">{order.customer}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Servis</p>
                              <p className="font-medium">{order.service}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Teknisyen</p>
                              <p className="font-medium">{order.technician}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span>Giriş: {order.entryDate}</span>
                            <span>•</span>
                            <span>Tahmini Teslim: {order.estimatedCompletion}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Düzenle
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/work-orders/${order.id}`}>Detaylar</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
