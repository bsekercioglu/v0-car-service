import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit, Crown, Calendar, UsersIcon, Database } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default async function SettingsPage() {
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

  // Get all users in the organization
  const { data: orgUsers } = await supabase
    .from("users")
    .select("*")
    .eq("organization_id", profile.organization_id)
    .order("created_at", { ascending: false })

  // Get customer count
  const { count: customerCount } = await supabase
    .from("customers")
    .select("*", { count: "exact", head: true })
    .eq("organization_id", profile.organization_id)

  const organization = profile.organization
  const licenseExpiresAt = organization.license_expires_at ? new Date(organization.license_expires_at) : null
  const daysUntilExpiry = licenseExpiresAt
    ? Math.ceil((licenseExpiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0

  const servicePrices = [
    { service: "Yağ Değişimi", price: "₺450", duration: "30 dk" },
    { service: "Filtre Değişimi", price: "₺250", duration: "20 dk" },
    { service: "Fren Bakımı", price: "₺800", duration: "2 saat" },
    { service: "Motor Kontrolü", price: "₺500", duration: "1 saat" },
    { service: "Klima Bakımı", price: "₺600", duration: "1.5 saat" },
    { service: "Periyodik Bakım", price: "₺1,200", duration: "3 saat" },
  ]

  const laborRates = [
    { category: "Genel Bakım", rate: "₺300/saat" },
    { category: "Motor İşleri", rate: "₺400/saat" },
    { category: "Elektrik", rate: "₺350/saat" },
    { category: "Kaporta", rate: "₺250/saat" },
  ]

  const licenseTypeLabels = {
    trial: "Deneme",
    basic: "Temel",
    premium: "Premium",
    enterprise: "Kurumsal",
  }

  return (
    <SidebarProvider>
      <AppSidebar user={profile} organization={organization} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Ayarlar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
            <p className="text-muted-foreground">Sistem yapılandırma ve yönetim ayarları</p>
          </div>

          <Tabs defaultValue="license" className="space-y-6">
            <TabsList>
              <TabsTrigger value="license">Lisans</TabsTrigger>
              <TabsTrigger value="general">Genel</TabsTrigger>
              <TabsTrigger value="users">Kullanıcılar</TabsTrigger>
              <TabsTrigger value="pricing">Fiyatlandırma</TabsTrigger>
              <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
            </TabsList>

            <TabsContent value="license" className="space-y-6">
              <Card className={daysUntilExpiry <= 7 ? "border-destructive" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-chart-4" />
                        Lisans Durumu
                      </CardTitle>
                      <CardDescription>Mevcut abonelik planınız ve kullanım detayları</CardDescription>
                    </div>
                    <Badge variant={organization.is_active ? "default" : "destructive"} className="text-sm">
                      {organization.is_active ? "Aktif" : "Pasif"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Crown className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Plan</p>
                          <p className="text-xl font-bold">
                            {licenseTypeLabels[organization.license_type as keyof typeof licenseTypeLabels]}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
                          <Calendar className="h-6 w-6 text-chart-2" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Son Kullanma</p>
                          <p className="text-lg font-semibold">
                            {licenseExpiresAt ? licenseExpiresAt.toLocaleDateString("tr-TR") : "Belirsiz"}
                          </p>
                          {daysUntilExpiry > 0 && daysUntilExpiry <= 7 && (
                            <p className="text-xs text-destructive font-medium">{daysUntilExpiry} gün kaldı</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <UsersIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Kullanıcı Limiti</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {orgUsers?.length || 0} / {organization.max_users}
                          </span>
                        </div>
                        <Progress value={((orgUsers?.length || 0) / organization.max_users) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Müşteri Limiti</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {customerCount || 0} / {organization.max_customers}
                          </span>
                        </div>
                        <Progress value={((customerCount || 0) / organization.max_customers) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>

                  {organization.license_type === "trial" && (
                    <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                      <div className="flex items-start gap-3">
                        <Crown className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-amber-900">Deneme Sürümü</p>
                          <p className="text-sm text-amber-700 mt-1">
                            Deneme süreniz {daysUntilExpiry} gün içinde sona erecek. Premium özelliklere erişmeye devam
                            etmek için lütfen bir plan seçin.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button className="flex-1">Planı Yükselt</Button>
                    <Button variant="outline">Fatura Geçmişi</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Paket Karşılaştırması</CardTitle>
                  <CardDescription>Size en uygun planı seçin</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4 space-y-4">
                      <div>
                        <h3 className="font-bold text-lg">Temel</h3>
                        <p className="text-3xl font-bold mt-2">
                          ₺499<span className="text-sm font-normal text-muted-foreground">/ay</span>
                        </p>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />5 Kullanıcı
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                          100 Müşteri
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                          Sınırsız İş Emri
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                          Temel Raporlar
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full bg-transparent">
                        Seç
                      </Button>
                    </div>

                    <div className="rounded-lg border-2 border-primary p-4 space-y-4 relative">
                      <Badge className="absolute -top-3 right-4">Popüler</Badge>
                      <div>
                        <h3 className="font-bold text-lg">Premium</h3>
                        <p className="text-3xl font-bold mt-2">
                          ₺999<span className="text-sm font-normal text-muted-foreground">/ay</span>
                        </p>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                          15 Kullanıcı
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                          Sınırsız Müşteri
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                          Gelişmiş Raporlar
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                          SMS Bildirimleri
                        </li>
                      </ul>
                      <Button className="w-full">Seç</Button>
                    </div>

                    <div className="rounded-lg border p-4 space-y-4">
                      <div>
                        <h3 className="font-bold text-lg">Kurumsal</h3>
                        <p className="text-3xl font-bold mt-2">
                          ₺2,499<span className="text-sm font-normal text-muted-foreground">/ay</span>
                        </p>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                          Sınırsız Kullanıcı
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                          Sınırsız Müşteri
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                          Özel Entegrasyonlar
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                          Öncelikli Destek
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full bg-transparent">
                        İletişime Geç
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>İşletme Bilgileri</CardTitle>
                  <CardDescription>Servis bilgilerini güncelleyin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">İşletme Adı</Label>
                      <Input id="business-name" defaultValue={organization.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax-number">Vergi Numarası</Label>
                      <Input id="tax-number" defaultValue={organization.tax_number || ""} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <Input id="address" defaultValue={organization.address || ""} />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" defaultValue={organization.phone || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input id="email" defaultValue={organization.email || ""} />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Değişiklikleri Kaydet</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Çalışma Saatleri</CardTitle>
                  <CardDescription>Servis açılış ve kapanış saatleri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="open-time">Açılış Saati</Label>
                      <Input id="open-time" type="time" defaultValue="08:00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="close-time">Kapanış Saati</Label>
                      <Input id="close-time" type="time" defaultValue="18:00" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Cumartesi Açık</Label>
                      <p className="text-sm text-muted-foreground">Cumartesi günü servis açık olsun</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Pazar Açık</Label>
                      <p className="text-sm text-muted-foreground">Pazar günü servis açık olsun</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex justify-end">
                    <Button>Değişiklikleri Kaydet</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Kullanıcı Yönetimi</CardTitle>
                      <CardDescription>Sistem kullanıcılarını ve yetkilerini yönetin</CardDescription>
                    </div>
                    <Button disabled={profile.role !== "admin"}>
                      <Plus className="mr-2 h-4 w-4" />
                      Yeni Kullanıcı
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ad Soyad</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>E-posta</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orgUsers?.map((orgUser) => (
                        <TableRow key={orgUser.id}>
                          <TableCell className="font-medium">
                            {orgUser.first_name} {orgUser.last_name}
                          </TableCell>
                          <TableCell>
                            <Badge variant={orgUser.role === "admin" ? "default" : "secondary"}>
                              {orgUser.role === "admin"
                                ? "Yönetici"
                                : orgUser.role === "manager"
                                  ? "Müdür"
                                  : orgUser.role === "technician"
                                    ? "Teknisyen"
                                    : "Kullanıcı"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{orgUser.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                orgUser.is_active
                                  ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
                                  : "bg-destructive/10 text-destructive border-destructive/20"
                              }
                            >
                              {orgUser.is_active ? "Aktif" : "Pasif"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" disabled={profile.role !== "admin"}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={profile.role !== "admin" || orgUser.id === user.id}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rol Yetkileri</CardTitle>
                  <CardDescription>Her rol için erişim izinlerini tanımlayın</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="font-medium">Yönetici</div>
                    <div className="grid gap-2 md:grid-cols-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked disabled />
                        <span>Tüm Modüllere Erişim</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked disabled />
                        <span>Raporları Görüntüleme</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked disabled />
                        <span>Kullanıcı Yönetimi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked disabled />
                        <span>Fiyat Düzenleme</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="font-medium">Teknisyen</div>
                    <div className="grid gap-2 md:grid-cols-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span>İş Emirleri</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span>Müşteri Görüntüleme</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span>Parça Kullanımı</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch />
                        <span>Fatura Oluşturma</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Servis Fiyat Listesi</CardTitle>
                      <CardDescription>Standart servis işlemlerinin fiyatları</CardDescription>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Yeni Fiyat Ekle
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Servis Adı</TableHead>
                        <TableHead>Fiyat</TableHead>
                        <TableHead>Ortalama Süre</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {servicePrices.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.service}</TableCell>
                          <TableCell className="font-semibold">{item.price}</TableCell>
                          <TableCell className="text-muted-foreground">{item.duration}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>İşçilik Ücretleri</CardTitle>
                      <CardDescription>Kategori bazlı saat ücretleri</CardDescription>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Yeni Kategori
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Saat Ücreti</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {laborRates.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.category}</TableCell>
                          <TableCell className="font-semibold">{item.rate}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>E-posta Bildirimleri</CardTitle>
                  <CardDescription>Otomatik e-posta bildirimi ayarları</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Yeni İş Emri</Label>
                      <p className="text-sm text-muted-foreground">Yeni iş emri oluşturulduğunda bildirim gönder</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>İş Tamamlandı</Label>
                      <p className="text-sm text-muted-foreground">İş emri tamamlandığında müşteriye bildir</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Parça Kritik Seviye</Label>
                      <p className="text-sm text-muted-foreground">Stok kritik seviyeye düştüğünde uyar</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Günlük Rapor</Label>
                      <p className="text-sm text-muted-foreground">Her gün sonunda özet rapor gönder</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SMS Bildirimleri</CardTitle>
                  <CardDescription>Müşteri SMS bildirimi ayarları</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Araç Teslime Hazır</Label>
                      <p className="text-sm text-muted-foreground">Araç teslime hazır olduğunda SMS gönder</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Randevu Hatırlatma</Label>
                      <p className="text-sm text-muted-foreground">Randevu 1 gün öncesinde hatırlat</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Periyodik Bakım</Label>
                      <p className="text-sm text-muted-foreground">Bakım zamanı yaklaştığında bildir</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
