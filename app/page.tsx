import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Car, CheckCircle2, Clock, Package, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default async function HomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile with organization
  const { data: profile } = await supabase
    .from("users")
    .select("*, organization:organizations(*)")
    .eq("id", user.id)
    .single()

  if (!profile?.organization) {
    redirect("/auth/error?error=no_organization")
  }

  return (
    <SidebarProvider>
      <AppSidebar user={profile} organization={profile.organization} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Ana Panel</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Ana Panel</h1>
              <p className="text-muted-foreground">Servis operasyonlarınızın genel görünümü</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Bugün</p>
              <p className="text-lg font-semibold">
                {new Date().toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Günlük Giriş</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-chart-3" />
                  <span className="text-chart-3">+3</span> dünden
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Açık İşler</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <span className="text-chart-4">7</span> parça bekliyor
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground mt-1">Bu ay</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aylık Gelir</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₺284,560</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-chart-3" />
                  <span className="text-chart-3">+12%</span> geçen aydan
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Technician Workload */}
            <Card>
              <CardHeader>
                <CardTitle>Usta İş Yoğunluğu</CardTitle>
                <CardDescription>Teknisyenlerin güncel iş durumu</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Ahmet Yılmaz</span>
                    <span className="text-muted-foreground">5/6 iş</span>
                  </div>
                  <Progress value={83} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Mehmet Kaya</span>
                    <span className="text-muted-foreground">4/6 iş</span>
                  </div>
                  <Progress value={66} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Ali Demir</span>
                    <span className="text-muted-foreground">6/6 iş</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Mustafa Şahin</span>
                    <span className="text-muted-foreground">3/6 iş</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Critical Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Kritik Uyarılar</CardTitle>
                <CardDescription>Acil dikkat gerektiren durumlar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg border p-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">3 İş Emri Gecikmiş</p>
                    <p className="text-xs text-muted-foreground">Teslimat tarihleri geçmiş durumda</p>
                  </div>
                  <Badge variant="destructive">Acil</Badge>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-3">
                  <Package className="h-5 w-5 text-chart-4 mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">12 Parça Kritik Seviyede</p>
                    <p className="text-xs text-muted-foreground">Stok yenilenmesi gerekiyor</p>
                  </div>
                  <Badge variant="secondary">Uyarı</Badge>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-3">
                  <Clock className="h-5 w-5 text-chart-4 mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">5 Parça Sipariş Bekleniyor</p>
                    <p className="text-xs text-muted-foreground">Tedarikçiden teslimat bekleniyor</p>
                  </div>
                  <Badge variant="outline">Bekliyor</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Work Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Son İş Emirleri</CardTitle>
              <CardDescription>En son işleme alınan servis talepleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    plate: "34 ABC 123",
                    customer: "Ali Yılmaz",
                    service: "Yağ Değişimi + Filtre",
                    status: "İncelemede",
                    statusColor: "bg-chart-2",
                  },
                  {
                    plate: "06 XYZ 789",
                    customer: "Ayşe Kaya",
                    service: "Fren Sistemi Onarımı",
                    status: "Parça Bekliyor",
                    statusColor: "bg-chart-4",
                  },
                  {
                    plate: "35 DEF 456",
                    customer: "Mehmet Öz",
                    service: "Motor Arıza Tespiti",
                    status: "Onarımda",
                    statusColor: "bg-chart-1",
                  },
                  {
                    plate: "16 GHI 321",
                    customer: "Fatma Demir",
                    service: "Klima Bakımı",
                    status: "Testte",
                    statusColor: "bg-chart-3",
                  },
                ].map((order, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Car className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{order.plate}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer} - {order.service}
                        </p>
                      </div>
                    </div>
                    <Badge className={order.statusColor + " text-white"}>{order.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
