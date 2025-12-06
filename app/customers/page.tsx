"use client"

import type React from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Phone, Mail, Car, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState } from "react"

type Customer = {
  id: number
  name: string
  phone: string
  email: string
  vehicles: number
  lastService: string
  totalSpent: string
  address?: string
  city?: string
  postalCode?: string
  notes?: string
}

export default function CustomersPage() {
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const customers: Customer[] = [
    {
      id: 1,
      name: "Ali Yılmaz",
      phone: "+90 532 123 4567",
      email: "ali.yilmaz@email.com",
      vehicles: 2,
      lastService: "15 Kas 2024",
      totalSpent: "₺12,450",
      address: "Atatürk Mah. Cumhuriyet Cad. No:45/3",
      city: "İstanbul",
      postalCode: "34750",
      notes: "VIP müşteri",
    },
    {
      id: 2,
      name: "Ayşe Kaya",
      phone: "+90 533 234 5678",
      email: "ayse.kaya@email.com",
      vehicles: 1,
      lastService: "28 Kas 2024",
      totalSpent: "₺8,920",
    },
    {
      id: 3,
      name: "Mehmet Öz",
      phone: "+90 534 345 6789",
      email: "mehmet.oz@email.com",
      vehicles: 3,
      lastService: "02 Ara 2024",
      totalSpent: "₺24,780",
    },
    {
      id: 4,
      name: "Fatma Demir",
      phone: "+90 535 456 7890",
      email: "fatma.demir@email.com",
      vehicles: 1,
      lastService: "05 Ara 2024",
      totalSpent: "₺6,340",
    },
    {
      id: 5,
      name: "Can Özkan",
      phone: "+90 536 567 8901",
      email: "can.ozkan@email.com",
      vehicles: 2,
      lastService: "12 Eki 2024",
      totalSpent: "₺18,560",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] New customer form submitted")
    setOpen(false)
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Customer edit form submitted", selectedCustomer)
    setEditOpen(false)
    setSelectedCustomer(null)
  }

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer)
    setEditOpen(true)
  }

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
                <BreadcrumbPage>Müşteriler</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Müşteri Yönetimi</h1>
              <p className="text-muted-foreground">Müşteri ve araç bilgilerini yönetin</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Müşteri Ekle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Yeni Müşteri Ekle</DialogTitle>
                  <DialogDescription>Yeni müşteri bilgilerini girin. Tüm alanlar zorunludur.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6 py-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="firstName">Ad *</Label>
                        <Input id="firstName" placeholder="Ali" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="lastName">Soyad *</Label>
                        <Input id="lastName" placeholder="Yılmaz" required />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input id="phone" type="tel" placeholder="+90 532 123 4567" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input id="email" type="email" placeholder="ornek@email.com" />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="address">Adres</Label>
                      <Textarea id="address" placeholder="Mahalle, sokak, bina no..." rows={3} />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="city">Şehir</Label>
                        <Input id="city" placeholder="İstanbul" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="postalCode">Posta Kodu</Label>
                        <Input id="postalCode" placeholder="34000" />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="notes">Notlar</Label>
                      <Textarea id="notes" placeholder="Müşteri hakkında özel notlar..." rows={2} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                      İptal
                    </Button>
                    <Button type="submit">Müşteriyi Kaydet</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Müşteri Düzenle</DialogTitle>
                <DialogDescription>Müşteri bilgilerini güncelleyin.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleEditSubmit}>
                <div className="grid gap-6 py-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-name">Ad Soyad *</Label>
                      <Input id="edit-name" defaultValue={selectedCustomer?.name} placeholder="Ali Yılmaz" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-phone">Telefon *</Label>
                      <Input
                        id="edit-phone"
                        type="tel"
                        defaultValue={selectedCustomer?.phone}
                        placeholder="+90 532 123 4567"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="edit-email">E-posta</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      defaultValue={selectedCustomer?.email}
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="edit-address">Adres</Label>
                    <Textarea
                      id="edit-address"
                      defaultValue={selectedCustomer?.address}
                      placeholder="Mahalle, sokak, bina no..."
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-city">Şehir</Label>
                      <Input id="edit-city" defaultValue={selectedCustomer?.city} placeholder="İstanbul" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-postalCode">Posta Kodu</Label>
                      <Input id="edit-postalCode" defaultValue={selectedCustomer?.postalCode} placeholder="34000" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="edit-notes">Notlar</Label>
                    <Textarea
                      id="edit-notes"
                      defaultValue={selectedCustomer?.notes}
                      placeholder="Müşteri hakkında özel notlar..."
                      rows={2}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                    İptal
                  </Button>
                  <Button type="submit">Değişiklikleri Kaydet</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Kayıtlı Araç</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">387</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Bu Ay Aktif</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Toplam Ciro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₺1.2M</div>
              </CardContent>
            </Card>
          </div>

          {/* Customer List */}
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Müşteri Listesi</CardTitle>
                  <CardDescription>Tüm kayıtlı müşterilerin detaylı listesi</CardDescription>
                </div>
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Müşteri ara..." className="pl-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Müşteri Adı</TableHead>
                    <TableHead>İletişim</TableHead>
                    <TableHead>Araçlar</TableHead>
                    <TableHead>Son Servis</TableHead>
                    <TableHead>Toplam Harcama</TableHead>
                    <TableHead className="text-right">İşlem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span>{customer.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span>{customer.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          <Car className="h-3 w-3" />
                          {customer.vehicles}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{customer.lastService}</TableCell>
                      <TableCell className="font-medium">{customer.totalSpent}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(customer)}>
                            <Pencil className="mr-1 h-3 w-3" />
                            Düzenle
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/customers/${customer.id}`}>Detaylar</Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
