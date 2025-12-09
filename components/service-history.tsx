"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, XCircle } from "lucide-react"
import { ServiceDetailModal } from "@/components/modals/service-detail-modal"

const history = [
  {
    id: 1,
    date: "24 Aralık 2024",
    customer: "Ali Veli",
    vehicle: "Toyota Corolla - 41 JKL 345",
    service: "Yağ Değişimi",
    cost: "₺850",
    status: "completed",
    mechanic: "Mehmet Usta",
    description: "Periyodik bakım kapsamında motor yağı ve filtre değişimi yapıldı.",
    completedAt: "24 Aralık 2024 - 14:30",
  },
  {
    id: 2,
    date: "23 Aralık 2024",
    customer: "Zeynep Ak",
    vehicle: "Honda Civic - 34 MNO 678",
    service: "Klima Bakımı",
    cost: "₺1,200",
    status: "completed",
    mechanic: "Ali Bey",
    completedAt: "23 Aralık 2024 - 16:00",
  },
  {
    id: 3,
    date: "23 Aralık 2024",
    customer: "Can Öz",
    vehicle: "Ford Focus - 35 PQR 901",
    service: "Balata Değişimi",
    cost: "₺1,500",
    status: "in-progress",
    mechanic: "Veli Usta",
  },
]

const statusIcons = {
  completed: <CheckCircle2 className="h-4 w-4 text-primary" />,
  "in-progress": <Clock className="h-4 w-4 text-chart-2" />,
  cancelled: <XCircle className="h-4 w-4 text-destructive" />,
}

export function ServiceHistory() {
  const [selectedService, setSelectedService] = useState<(typeof history)[0] | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleServiceClick = (service: (typeof history)[0]) => {
    setSelectedService(service)
    setModalOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Son Servisler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => handleServiceClick(item)}
                className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  {statusIcons[item.status]}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold">{item.customer}</p>
                    <p className="text-sm font-semibold text-primary">{item.cost}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.vehicle}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {item.service}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ServiceDetailModal open={modalOpen} onOpenChange={setModalOpen} service={selectedService || undefined} />
    </>
  )
}
