"use client"

import { NavigationMenu } from "@/components/navigation-menu"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Plus, Clock, CheckCircle2, Wrench, Receipt } from "lucide-react"
import { useState } from "react"
import { ServiceInvoiceModal } from "@/components/modals/service-invoice-modal"

const mockServices = {
  inProgress: [
    {
      id: 1,
      customer: "Ahmet Yılmaz",
      vehicle: "BMW 320i - 34 ABC 123",
      serviceType: "Periyodik Bakım",
      startTime: "09:00",
      estimatedEnd: "11:00",
      progress: 60,
      technician: "Mehmet Usta",
      status: "in-progress",
    },
    {
      id: 2,
      customer: "Ayşe Demir",
      vehicle: "Mercedes C180 - 06 XYZ 456",
      serviceType: "Fren Değişimi",
      startTime: "10:30",
      estimatedEnd: "12:00",
      progress: 30,
      technician: "Ali Usta",
      status: "in-progress",
    },
  ],
  waiting: [
    {
      id: 3,
      customer: "Mehmet Kaya",
      vehicle: "Audi A4 - 35 DEF 789",
      serviceType: "Motor Revizyonu",
      appointmentTime: "14:00",
      technician: "Mehmet Usta",
      status: "waiting",
    },
    {
      id: 4,
      customer: "Fatma Çelik",
      vehicle: "Toyota Corolla - 41 JKL 345",
      serviceType: "Lastik Değişimi",
      appointmentTime: "15:30",
      technician: "Hasan Usta",
      status: "waiting",
    },
  ],
  completed: [
    {
      id: 5,
      customer: "Ali Öztürk",
      vehicle: "Ford Focus - 16 MNO 678",
      serviceType: "Yağ Değişimi",
      completedTime: "08:45",
      technician: "Ali Usta",
      status: "completed",
      cost: "₺850",
    },
    {
      id: 6,
      customer: "Zeynep Şahin",
      vehicle: "Renault Clio - 34 PQR 901",
      serviceType: "Klima Bakımı",
      completedTime: "09:15",
      technician: "Hasan Usta",
      status: "completed",
      cost: "₺450",
    },
  ],
}

export default function ServicesPage() {
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)

  const handleCreateInvoice = (service: any) => {
    setSelectedService({
      id: service.id,
      customer: service.customer,
      vehicle: service.vehicle,
      serviceType: service.serviceType,
    })
    setInvoiceModalOpen(true)
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
                <h1 className="text-3xl font-bold text-balance">Servisler</h1>
                <p className="text-muted-foreground mt-1">Aktif ve tamamlanmış servisleri yönetin</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Yeni Servis
              </Button>
            </div>

            <Tabs defaultValue="in-progress" className="space-y-6">
              <TabsList>
                <TabsTrigger value="in-progress">Devam Eden ({mockServices.inProgress.length})</TabsTrigger>
                <TabsTrigger value="waiting">Bekleyen ({mockServices.waiting.length})</TabsTrigger>
                <TabsTrigger value="completed">Tamamlanan ({mockServices.completed.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="in-progress" className="space-y-4">
                {mockServices.inProgress.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{service.customer}</h3>
                            <Badge variant="default">
                              <Wrench className="h-3 w-3 mr-1" />
                              Devam Ediyor
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{service.vehicle}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleCreateInvoice(service)}>
                            <Receipt className="h-4 w-4 mr-2" />
                            Fatura Hazırla
                          </Button>
                          <Button variant="outline" size="sm">
                            Detaylar
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Servis Tipi</p>
                          <p className="font-medium">{service.serviceType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Teknisyen</p>
                          <p className="font-medium">{service.technician}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Başlangıç</p>
                          <p className="font-medium">{service.startTime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tahmini Bitiş</p>
                          <p className="font-medium">{service.estimatedEnd}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">İlerleme</span>
                          <span className="font-medium">%{service.progress}</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary transition-all" style={{ width: `${service.progress}%` }} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="waiting" className="space-y-4">
                {mockServices.waiting.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{service.customer}</h3>
                            <Badge variant="secondary">
                              <Clock className="h-3 w-3 mr-1" />
                              Bekliyor
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{service.vehicle}</p>
                        </div>
                        <Button size="sm">Başlat</Button>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Servis Tipi</p>
                          <p className="font-medium">{service.serviceType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Randevu Saati</p>
                          <p className="font-medium">{service.appointmentTime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Teknisyen</p>
                          <p className="font-medium">{service.technician}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {mockServices.completed.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{service.customer}</h3>
                            <Badge variant="outline" className="border-green-500 text-green-700">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Tamamlandı
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{service.vehicle}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{service.cost}</p>
                          <Button
                            variant="link"
                            size="sm"
                            className="mt-1"
                            onClick={() => handleCreateInvoice(service)}
                          >
                            <Receipt className="h-4 w-4 mr-2" />
                            Fatura Görüntüle
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Servis Tipi</p>
                          <p className="font-medium">{service.serviceType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tamamlanma</p>
                          <p className="font-medium">{service.completedTime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Teknisyen</p>
                          <p className="font-medium">{service.technician}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <ServiceInvoiceModal open={invoiceModalOpen} onOpenChange={setInvoiceModalOpen} service={selectedService} />
    </div>
  )
}
