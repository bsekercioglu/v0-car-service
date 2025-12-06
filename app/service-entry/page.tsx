import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"

export default function ServiceEntryPage() {
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
                <BreadcrumbPage>Servis Girişi</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Yeni Servis Girişi</h1>
            <p className="text-muted-foreground">Araç servis kaydı oluşturun</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Customer & Vehicle Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Müşteri & Araç Bilgileri</CardTitle>
                  <CardDescription>Müşteri ve araç seçimi yapın veya yeni kayıt oluşturun</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="customer">Müşteri</Label>
                      <Select>
                        <SelectTrigger id="customer">
                          <SelectValue placeholder="Müşteri seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Ali Yılmaz</SelectItem>
                          <SelectItem value="2">Ayşe Kaya</SelectItem>
                          <SelectItem value="3">Mehmet Öz</SelectItem>
                          <SelectItem value="new">+ Yeni Müşteri</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle">Araç</Label>
                      <Select>
                        <SelectTrigger id="vehicle">
                          <SelectValue placeholder="Araç seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">34 ABC 123 - Toyota Corolla</SelectItem>
                          <SelectItem value="2">34 XYZ 789 - Honda Civic</SelectItem>
                          <SelectItem value="new">+ Yeni Araç</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Marka</Label>
                      <Input id="brand" placeholder="Toyota" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Input id="model" placeholder="Corolla" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="km">Kilometre</Label>
                      <Input id="km" placeholder="45200" type="number" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Servis Detayları</CardTitle>
                  <CardDescription>Servis türü ve arıza bilgilerini girin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-type">Servis Türü</Label>
                    <Select>
                      <SelectTrigger id="service-type">
                        <SelectValue placeholder="Servis türü seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maintenance">Periyodik Bakım</SelectItem>
                        <SelectItem value="repair">Arıza Onarımı</SelectItem>
                        <SelectItem value="inspection">Genel Kontrol</SelectItem>
                        <SelectItem value="bodywork">Kaporta İşleri</SelectItem>
                        <SelectItem value="other">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complaint">Müşteri Şikayeti / İstek</Label>
                    <Textarea
                      id="complaint"
                      placeholder="Motor ısınıyor ve soğutma suyu eksiliyor. Klima çalışmıyor..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initial-inspection">İlk İnceleme Notları</Label>
                    <Textarea
                      id="initial-inspection"
                      placeholder="Motor gözle kontrol edildi. Radyatör hortumunda kaçak tespit edildi..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Photo Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Fotoğraf Yükleme</CardTitle>
                  <CardDescription>Hasar veya arıza fotoğrafları ekleyin</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-12 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-sm font-medium mb-1">Fotoğraf yüklemek için tıklayın</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG veya JPEG (Maks. 10MB)</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Giriş Özeti</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Giriş Tarihi</span>
                      <span className="font-medium">
                        {new Date().toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Giriş Saati</span>
                      <span className="font-medium">
                        {new Date().toLocaleTimeString("tr-TR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Müşteri</span>
                      <span className="font-medium">-</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Plaka</span>
                      <span className="font-medium">-</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Kilometre</span>
                      <span className="font-medium">-</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="assigned-tech">Atanan Teknisyen</Label>
                    <Select>
                      <SelectTrigger id="assigned-tech">
                        <SelectValue placeholder="Teknisyen seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Ahmet Yılmaz</SelectItem>
                        <SelectItem value="2">Mehmet Kaya</SelectItem>
                        <SelectItem value="3">Ali Demir</SelectItem>
                        <SelectItem value="4">Mustafa Şahin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Öncelik</Label>
                    <Select>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Öncelik seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Düşük</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">Yüksek</SelectItem>
                        <SelectItem value="urgent">Acil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimated-completion">Tahmini Teslim</Label>
                    <Input id="estimated-completion" type="date" />
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-2">
                <Button size="lg" className="w-full">
                  Servisi Kaydet
                </Button>
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
