import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Package, AlertTriangle, TrendingDown, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function PartsPage() {
  const parts = [
    {
      id: "P-001",
      name: "Motor Yağı 5W-30",
      category: "Yağlar",
      stock: 24,
      minStock: 10,
      unit: "Litre",
      unitPrice: "₺185",
      supplier: "Shell",
      status: "Stokta",
    },
    {
      id: "P-002",
      name: "Fren Balatası Ön",
      category: "Fren Sistemi",
      stock: 8,
      minStock: 15,
      unit: "Takım",
      unitPrice: "₺450",
      supplier: "Bosch",
      status: "Kritik",
    },
    {
      id: "P-003",
      name: "Hava Filtresi",
      category: "Filtreler",
      stock: 32,
      minStock: 20,
      unit: "Adet",
      unitPrice: "₺120",
      supplier: "Mann Filter",
      status: "Stokta",
    },
    {
      id: "P-004",
      name: "Ön Amortisör",
      category: "Süspansiyon",
      stock: 4,
      minStock: 8,
      unit: "Adet",
      unitPrice: "₺1,250",
      supplier: "Sachs",
      status: "Kritik",
    },
    {
      id: "P-005",
      name: "Akü 12V 70Ah",
      category: "Elektrik",
      stock: 0,
      minStock: 5,
      unit: "Adet",
      unitPrice: "₺2,100",
      supplier: "Varta",
      status: "Tükendi",
    },
    {
      id: "P-006",
      name: "Radyatör Hortumu",
      category: "Soğutma",
      stock: 15,
      minStock: 10,
      unit: "Adet",
      unitPrice: "₺85",
      supplier: "Gates",
      status: "Stokta",
    },
  ]

  const pendingOrders = [
    {
      orderNo: "SO-2024-034",
      supplier: "Bosch",
      items: 3,
      totalAmount: "₺8,450",
      orderDate: "01 Ara 2024",
      expectedDelivery: "08 Ara 2024",
      status: "Yolda",
    },
    {
      orderNo: "SO-2024-033",
      supplier: "Shell",
      items: 2,
      totalAmount: "₺5,200",
      orderDate: "28 Kas 2024",
      expectedDelivery: "05 Ara 2024",
      status: "Beklemede",
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
                <BreadcrumbPage>Parça Yönetimi</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Parça & Malzeme Yönetimi</h1>
              <p className="text-muted-foreground">Stok takibi ve sipariş yönetimi</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Sipariş Oluştur
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Parça Ekle
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Kalem</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">487</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kritik Seviye</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-chart-4">12</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tükenen</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">5</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bekleyen Sipariş</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Parts Inventory */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle>Stok Listesi</CardTitle>
                      <CardDescription>Tüm parça ve malzemelerin stok durumu</CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                      <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Parça ara..." className="pl-9" />
                      </div>
                      <Select>
                        <SelectTrigger className="w-full md:w-40">
                          <SelectValue placeholder="Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tümü</SelectItem>
                          <SelectItem value="oils">Yağlar</SelectItem>
                          <SelectItem value="brakes">Fren Sistemi</SelectItem>
                          <SelectItem value="filters">Filtreler</SelectItem>
                          <SelectItem value="suspension">Süspansiyon</SelectItem>
                          <SelectItem value="electrical">Elektrik</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parça Adı</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Stok</TableHead>
                        <TableHead>Birim Fiyat</TableHead>
                        <TableHead>Tedarikçi</TableHead>
                        <TableHead>Durum</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parts.map((part) => (
                        <TableRow key={part.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{part.name}</p>
                              <p className="text-xs text-muted-foreground">{part.id}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{part.category}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {part.stock} {part.unit}
                                </span>
                              </div>
                              <Progress
                                value={(part.stock / (part.minStock * 2)) * 100}
                                className="h-1"
                                indicatorClassName={
                                  part.stock === 0
                                    ? "bg-destructive"
                                    : part.stock < part.minStock
                                      ? "bg-chart-4"
                                      : "bg-chart-3"
                                }
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{part.unitPrice}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{part.supplier}</TableCell>
                          <TableCell>
                            {part.status === "Stokta" && (
                              <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/20">
                                {part.status}
                              </Badge>
                            )}
                            {part.status === "Kritik" && (
                              <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">
                                {part.status}
                              </Badge>
                            )}
                            {part.status === "Tükendi" && <Badge variant="destructive">{part.status}</Badge>}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Pending Orders */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bekleyen Siparişler</CardTitle>
                  <CardDescription>Tedarikçiden beklenen parçalar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingOrders.map((order) => (
                    <Card key={order.orderNo}>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-semibold">{order.orderNo}</span>
                          <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                            {order.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tedarikçi</span>
                            <span className="font-medium">{order.supplier}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Kalem</span>
                            <span className="font-medium">{order.items} adet</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tutar</span>
                            <span className="font-medium">{order.totalAmount}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Sipariş</span>
                            <span className="text-xs">{order.orderDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tahmini Teslimat</span>
                            <span className="text-xs font-medium">{order.expectedDelivery}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          Detaylar
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hızlı İşlemler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <AlertTriangle className="mr-2 h-4 w-4 text-chart-4" />
                    Kritik Parçaları Göster
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingDown className="mr-2 h-4 w-4 text-destructive" />
                    Tükenen Parçalar
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Toplu Sipariş Oluştur
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
