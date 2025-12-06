"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Car, Calendar, DollarSign, Wrench, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const [isVehicleDialogOpen, setIsVehicleDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false)

  const customer = {
    name: "Ali Yılmaz",
    phone: "+90 532 123 4567",
    email: "ali.yilmaz@email.com",
    address: "Atatürk Mah. Cumhuriyet Cad. No: 45/3 Kadıköy/İstanbul",
    registeredDate: "12 Oca 2023",
    totalSpent: "₺12,450",
  }

  const vehicles = [
    {
      id: 1,
      plate: "34 ABC 123",
      brand: "Toyota",
      model: "Corolla",
      year: 2020,
      km: "45,200 km",
      lastService: "15 Kas 2024",
      nextService: "15 Şub 2025",
      chassisNumber: "JT2BF18K6X0123456",
      engineNumber: "1ZZ-FE-7890123",
    },
    {
      id: 2,
      plate: "34 XYZ 789",
      brand: "Honda",
      model: "Civic",
      year: 2019,
      km: "67,800 km",
      lastService: "08 Eki 2024",
      nextService: "08 Oca 2025",
      chassisNumber: "2HGFG11528H567890",
      engineNumber: "R18A1-1234567",
    },
  ]

  const serviceHistory = [
    {
      date: "15 Kas 2024",
      plate: "34 ABC 123",
      service: "Yağ Değişimi + Filtre",
      cost: "₺850",
      status: "Tamamlandı",
      technician: "Ahmet Yılmaz",
    },
    {
      date: "08 Eki 2024",
      plate: "34 XYZ 789",
      service: "Fren Sistemi Onarımı",
      cost: "₺2,450",
      status: "Tamamlandı",
      technician: "Mehmet Kaya",
    },
    {
      date: "22 Eyl 2024",
      plate: "34 ABC 123",
      service: "Klima Bakımı",
      cost: "₺1,200",
      status: "Tamamlandı",
      technician: "Ali Demir",
    },
    {
      date: "15 Ağu 2024",
      plate: "34 ABC 123",
      service: "Periyodik Bakım",
      cost: "₺1,850",
      status: "Tamamlandı",
      technician: "Ahmet Yılmaz",
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
                <BreadcrumbLink href="/customers">Müşteriler</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{customer.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
              <p className="text-muted-foreground">Müşteri detayları ve servis geçmişi</p>
            </div>
            <div className="flex gap-2">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Düzenle</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Müşteri Bilgilerini Düzenle</DialogTitle>
                    <DialogDescription>Müşteri iletişim ve adres bilgilerini güncelleyin</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="edit-firstName">Ad *</Label>
                        <Input id="edit-firstName" defaultValue="Ali" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-lastName">Soyad *</Label>
                        <Input id="edit-lastName" defaultValue="Yılmaz" />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="edit-phone">Telefon *</Label>
                        <Input id="edit-phone" type="tel" defaultValue="+90 532 123 4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-email">E-posta</Label>
                        <Input id="edit-email" type="email" defaultValue="ali.yilmaz@email.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-address">Adres</Label>
                      <Textarea
                        id="edit-address"
                        rows={3}
                        defaultValue="Atatürk Mah. Cumhuriyet Cad. No: 45/3"
                        placeholder="Sokak, Cadde, Mahalle"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="edit-city">Şehir</Label>
                        <Input id="edit-city" defaultValue="İstanbul" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-postal">Posta Kodu</Label>
                        <Input id="edit-postal" defaultValue="34000" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-notes">Notlar</Label>
                      <Textarea id="edit-notes" rows={3} placeholder="Müşteri hakkında ek notlar" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      İptal
                    </Button>
                    <Button onClick={() => setIsEditDialogOpen(false)}>Değişiklikleri Kaydet</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Yeni Servis Oluştur</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Yeni Servis Kaydı Oluştur</DialogTitle>
                    <DialogDescription>Müşterinin aracı için yeni bir servis kaydı oluşturun</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="service-vehicle">Araç Seçin *</Label>
                      <Select>
                        <SelectTrigger id="service-vehicle">
                          <SelectValue placeholder="Araç seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicles.map((vehicle) => (
                            <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                              {vehicle.plate} - {vehicle.brand} {vehicle.model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service-type">Servis Tipi *</Label>
                      <Select>
                        <SelectTrigger id="service-type">
                          <SelectValue placeholder="Servis tipi seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="periodic">Periyodik Bakım</SelectItem>
                          <SelectItem value="repair">Arıza Onarımı</SelectItem>
                          <SelectItem value="oil-change">Yağ Değişimi</SelectItem>
                          <SelectItem value="brake">Fren Bakımı/Onarımı</SelectItem>
                          <SelectItem value="tire">Lastik İşlemleri</SelectItem>
                          <SelectItem value="battery">Akü Değişimi</SelectItem>
                          <SelectItem value="ac">Klima Bakımı</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service-complaint">Şikayet/Talep *</Label>
                      <Textarea
                        id="service-complaint"
                        rows={4}
                        placeholder="Müşteri şikayeti veya servis talebi detaylarını yazın"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="service-km">Kilometre</Label>
                        <Input id="service-km" type="number" placeholder="67800" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service-priority">Öncelik</Label>
                        <Select>
                          <SelectTrigger id="service-priority">
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service-notes">Ek Notlar</Label>
                      <Textarea
                        id="service-notes"
                        rows={3}
                        placeholder="Teknisyen için ek notlar veya özel talimatlar"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsServiceDialogOpen(false)}>
                      İptal
                    </Button>
                    <Button onClick={() => setIsServiceDialogOpen(false)}>Servis Kaydı Oluştur</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Customer Info */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>İletişim Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Telefon</p>
                    <p className="text-sm text-muted-foreground">{customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">E-posta</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Adres</p>
                    <p className="text-sm text-muted-foreground">{customer.address}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Kayıt Tarihi</p>
                    <p className="text-sm text-muted-foreground">{customer.registeredDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Toplam Harcama</p>
                    <p className="text-sm font-semibold text-primary">{customer.totalSpent}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="vehicles" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="vehicles">Araçlar</TabsTrigger>
                  <TabsTrigger value="history">Servis Geçmişi</TabsTrigger>
                </TabsList>
                <TabsContent value="vehicles" className="space-y-4">
                  <div className="flex justify-end">
                    <Dialog open={isVehicleDialogOpen} onOpenChange={setIsVehicleDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Yeni Araç Ekle
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Yeni Araç Ekle</DialogTitle>
                          <DialogDescription>Müşteriye ait yeni bir araç kaydı oluşturun</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="plate">Plaka *</Label>
                              <Input id="plate" placeholder="34 ABC 123" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="year">Model Yılı *</Label>
                              <Input id="year" type="number" placeholder="2020" />
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="brand">Marka *</Label>
                              <Input id="brand" placeholder="Toyota" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="model">Model *</Label>
                              <Input id="model" placeholder="Corolla" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="chassisNumber">Şase Numarası (VIN) *</Label>
                            <Input id="chassisNumber" placeholder="JT2BF18K6X0123456" className="font-mono" />
                            <p className="text-xs text-muted-foreground">17 haneli araç kimlik numarası</p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="engineNumber">Motor Numarası *</Label>
                            <Input id="engineNumber" placeholder="1ZZ-FE-7890123" className="font-mono" />
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="km">Kilometre</Label>
                              <Input id="km" placeholder="45000" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="color">Renk</Label>
                              <Input id="color" placeholder="Beyaz" />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsVehicleDialogOpen(false)}>
                            İptal
                          </Button>
                          <Button onClick={() => setIsVehicleDialogOpen(false)}>Araç Ekle</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {vehicles.map((vehicle) => (
                    <Card key={vehicle.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                              <Car className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{vehicle.plate}</CardTitle>
                              <CardDescription>
                                {vehicle.brand} {vehicle.model} - {vehicle.year}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant="outline">{vehicle.km}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 mb-4 pb-4 border-b">
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Şase Numarası</p>
                            <p className="text-sm font-mono">{vehicle.chassisNumber}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Motor Numarası</p>
                            <p className="text-sm font-mono">{vehicle.engineNumber}</p>
                          </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Son Servis</p>
                            <div className="flex items-center gap-2">
                              <Wrench className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{vehicle.lastService}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Sonraki Servis</p>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{vehicle.nextService}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle>Servis Geçmişi</CardTitle>
                      <CardDescription>Tüm geçmiş servis işlemleri</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tarih</TableHead>
                            <TableHead>Plaka</TableHead>
                            <TableHead>Servis</TableHead>
                            <TableHead>Teknisyen</TableHead>
                            <TableHead>Durum</TableHead>
                            <TableHead className="text-right">Maliyet</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {serviceHistory.map((service, index) => (
                            <TableRow key={index}>
                              <TableCell className="text-sm">{service.date}</TableCell>
                              <TableCell className="font-medium">{service.plate}</TableCell>
                              <TableCell className="text-sm">{service.service}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">{service.technician}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/20">
                                  {service.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right font-medium">{service.cost}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
