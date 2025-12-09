"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, FileText, Users, Wrench, TrendingUp } from "lucide-react"
import { NewAppointmentModal } from "@/components/modals/new-appointment-modal"
import { NewCustomerModal } from "@/components/modals/new-customer-modal"
import { NewServiceModal } from "@/components/modals/new-service-modal"

const actions = [
  {
    icon: Plus,
    label: "Yeni Randevu",
    description: "Müşteri için randevu oluştur",
    variant: "default" as const,
  },
  {
    icon: Wrench,
    label: "Yeni Servis",
    description: "Servis kaydı başlat",
    variant: "secondary" as const,
  },
  {
    icon: Users,
    label: "Müşteri Ekle",
    description: "Yeni müşteri kaydı",
    variant: "secondary" as const,
  },
  {
    icon: FileText,
    label: "Rapor Oluştur",
    description: "Servis raporu hazırla",
    variant: "secondary" as const,
  },
  {
    icon: Calendar,
    label: "Takvim",
    description: "Randevu takvimini görüntüle",
    variant: "secondary" as const,
  },
  {
    icon: TrendingUp,
    label: "İstatistikler",
    description: "Performans raporları",
    variant: "secondary" as const,
  },
]

export function QuickActions() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false)
  const [customerModalOpen, setCustomerModalOpen] = useState(false)
  const [serviceModalOpen, setServiceModalOpen] = useState(false)

  const handleAction = (action: string) => {
    switch (action) {
      case "Yeni Randevu":
        setAppointmentModalOpen(true)
        break
      case "Yeni Servis":
        setServiceModalOpen(true)
        break
      case "Müşteri Ekle":
        setCustomerModalOpen(true)
        break
      default:
        console.log("[v0] Action clicked:", action)
    }
  }

  return (
    <>
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {actions.map((action) => (
              <Button
                key={action.label}
                variant={action.variant}
                className="w-full justify-start h-auto py-4"
                onClick={() => handleAction(action.label)}
              >
                <action.icon className="h-5 w-5 mr-3 shrink-0" />
                <div className="flex flex-col items-start gap-0.5">
                  <span className="font-semibold">{action.label}</span>
                  <span className="text-xs opacity-80 font-normal">{action.description}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <NewAppointmentModal open={appointmentModalOpen} onOpenChange={setAppointmentModalOpen} />
      <NewCustomerModal open={customerModalOpen} onOpenChange={setCustomerModalOpen} />
      <NewServiceModal open={serviceModalOpen} onOpenChange={setServiceModalOpen} />
    </>
  )
}
