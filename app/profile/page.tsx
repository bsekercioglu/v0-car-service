"use client"

import { NavigationMenu } from "@/components/navigation-menu"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Camera, Mail, Phone, MapPin, Building, Calendar, Shield, Bell, Lock } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 border-r bg-card flex-col">
        <div className="p-6">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Profile Header */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-balance">Profil Ayarları</h1>
                <p className="text-muted-foreground mt-1">Hesap bilgilerinizi ve tercihlerinizi yönetin</p>
              </div>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="general">Genel</TabsTrigger>
                <TabsTrigger value="security">Güvenlik</TabsTrigger>
                <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
              </TabsList>

              {/* General Tab */}
              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profil Bilgileri</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="text-2xl">AY</AvatarFallback>
                        </Avatar>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Admin Kullanıcı</h3>
                        <p className="text-sm text-muted-foreground">admin@carservice.com</p>
                        <Badge variant="secondary" className="mt-2">
                          Yönetici
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Ad</Label>
                        <Input id="firstName" defaultValue="Admin" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Soyad</Label>
                        <Input id="lastName" defaultValue="Kullanıcı" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="email" type="email" className="pl-9" defaultValue="admin@carservice.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="phone" type="tel" className="pl-9" defaultValue="+90 555 123 45 67" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adres</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          id="address"
                          className="pl-9 min-h-20"
                          defaultValue="Atatürk Cad. No:123, Kadıköy/İstanbul"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Şirket</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="company" className="pl-9" defaultValue="CarService Oto Servis" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hesap Bilgileri</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Üyelik Tarihi</span>
                      </div>
                      <span className="text-sm font-medium">15 Ocak 2024</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Hesap Türü</span>
                      </div>
                      <Badge>Yönetici</Badge>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                  <Button variant="outline">İptal</Button>
                  <Button>Değişiklikleri Kaydet</Button>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Şifre Değiştir</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="currentPassword" type="password" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Yeni Şifre</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="newPassword" type="password" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="confirmPassword" type="password" className="pl-9" />
                      </div>
                    </div>
                    <Button className="w-full">Şifreyi Güncelle</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>İki Faktörlü Kimlik Doğrulama</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Hesabınızın güvenliğini artırmak için iki faktörlü kimlik doğrulamayı etkinleştirin.
                    </p>
                    <Button variant="outline">Etkinleştir</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Oturum Geçmişi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="text-sm font-medium">Chrome - Windows</p>
                        <p className="text-xs text-muted-foreground">İstanbul, Türkiye • Aktif şimdi</p>
                      </div>
                      <Badge variant="secondary">Mevcut</Badge>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="text-sm font-medium">Safari - iPhone</p>
                        <p className="text-xs text-muted-foreground">İstanbul, Türkiye • 2 saat önce</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Kapat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bildirim Tercihleri</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Randevu Bildirimleri</p>
                          <p className="text-sm text-muted-foreground">
                            Yeni randevular ve randevu değişiklikleri hakkında bildirim al
                          </p>
                        </div>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Servis Tamamlandı</p>
                          <p className="text-sm text-muted-foreground">Servis işlemleri tamamlandığında bildirim al</p>
                        </div>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Yeni Müşteri</p>
                          <p className="text-sm text-muted-foreground">Sisteme yeni müşteri eklendiğinde bildirim al</p>
                        </div>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">E-posta Bildirimleri</p>
                          <p className="text-sm text-muted-foreground">
                            Önemli güncellemeler için e-posta bildirimleri al
                          </p>
                        </div>
                      </div>
                      <input type="checkbox" className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">SMS Bildirimleri</p>
                          <p className="text-sm text-muted-foreground">Acil durumlar için SMS bildirimleri al</p>
                        </div>
                      </div>
                      <input type="checkbox" className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                  <Button variant="outline">İptal</Button>
                  <Button>Tercihleri Kaydet</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
