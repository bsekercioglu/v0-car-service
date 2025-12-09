"use client"

import { NavigationMenu } from "@/components/navigation-menu"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, Mail, Phone, Car, Clock } from "lucide-react"
import { useState } from "react"
import { NewCustomerModal } from "@/components/modals/new-customer-modal"
import { CustomerDetailModal } from "@/components/modals/customer-detail-modal"
import { VehicleSearch } from "@/components/vehicle-search"

const mockCustomers = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    email: "ahmet@email.com",
    phone: "+90 532 123 4567",
    vehicles: ["BMW 320i - 34 ABC 123"],
    totalServices: 12,
    lastService: "5 gün önce",
    totalSpent: "₺24,500",
    status: "active",
  },
  {
    id: 2,
    name: "Ayşe Demir",
    email: "ayse@email.com",
    phone: "+90 533 456 7890",
    vehicles: ["Mercedes C180 - 06 XYZ 456"],
    totalServices: 8,
    lastService: "2 hafta önce",
    totalSpent: "₺18,900",
    status: "active",
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    email: "mehmet@email.com",
    phone: "+90 535 789 0123",
    vehicles: ["Audi A4 - 35 DEF 789", "VW Golf - 35 GHI 012"],
    totalServices: 15,
    lastService: "3 gün önce",
    totalSpent: "₺32,100",
    status: "vip",
  },
  {
    id: 4,
    name: "Fatma Çelik",
    email: "fatma@email.com",
    phone: "+90 536 234 5678",
    vehicles: ["Toyota Corolla - 41 JKL 345"],
    totalServices: 5,
    lastService: "1 ay önce",
    totalSpent: "₺8,500",
    status: "active",
  },
  {
    id: 5,
    name: "Ali Öztürk",
    email: "ali@email.com",
    phone: "+90 537 567 8901",
    vehicles: ["Ford Focus - 16 MNO 678"],
    totalServices: 3,
    lastService: "3 ay önce",
    totalSpent: "₺4,200",
    status: "inactive",
  },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [newCustomerModalOpen, setNewCustomerModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof mockCustomers)[0] | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery),
  )

  const handleOpenDetail = (customer: (typeof mockCustomers)[0]) => {
    setSelectedCustomer(customer)
    setDetailModalOpen(true)
  }

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r border-border p-6 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-2">
            <Car className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">CarService</span>
        </div>
        <NavigationMenu />
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-balance">Müşteriler</h1>
                <p className="text-muted-foreground mt-1">Müşteri bilgilerini görüntüleyin ve yönetin</p>
              </div>
              <Button onClick={() => setNewCustomerModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Yeni Müşteri
              </Button>
            </div>

            <VehicleSearch />

            <Card>
              <CardHeader>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Müşteri ara (isim, email, telefon)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCustomers.map((customer) => (
                    <Card key={customer.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-lg">{customer.name}</h3>
                                <Badge
                                  variant={
                                    customer.status === "vip"
                                      ? "default"
                                      : customer.status === "active"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {customer.status === "vip" ? "VIP" : customer.status === "active" ? "Aktif" : "Pasif"}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Mail className="h-4 w-4" />
                                  <span>{customer.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Phone className="h-4 w-4" />
                                  <span>{customer.phone}</span>
                                </div>
                              </div>

                              <div className="space-y-1">
                                {customer.vehicles.map((vehicle, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm">
                                    <Car className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{vehicle}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="flex items-center gap-6 text-sm pt-2 border-t">
                                <div>
                                  <span className="text-muted-foreground">Toplam Servis: </span>
                                  <span className="font-medium">{customer.totalServices}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Toplam Harcama: </span>
                                  <span className="font-medium">{customer.totalSpent}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-muted-foreground">{customer.lastService}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Button variant="outline" size="sm" onClick={() => handleOpenDetail(customer)}>
                            Detaylar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <NewCustomerModal open={newCustomerModalOpen} onOpenChange={setNewCustomerModalOpen} />
      <CustomerDetailModal open={detailModalOpen} onOpenChange={setDetailModalOpen} customer={selectedCustomer} />
    </div>
  )
}
