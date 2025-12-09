"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Phone } from "lucide-react"
import { AppointmentDetailModal } from "@/components/modals/appointment-detail-modal"

const appointments = [
  {
    id: 1,
    customer: "Ahmet Yılmaz",
    vehicle: "BMW 320i - 34 ABC 123",
    time: "09:00",
    service: "Periyodik Bakım",
    status: "confirmed",
    phone: "0532 123 45 67",
    notes: "Müşteri aracı sabah erkenden bırakmak istiyor.",
  },
  {
    id: 2,
    customer: "Ayşe Demir",
    vehicle: "Mercedes C180 - 06 XYZ 456",
    time: "10:30",
    service: "Fren Değişimi",
    status: "in-progress",
    phone: "0533 234 56 78",
  },
  {
    id: 3,
    customer: "Mehmet Kaya",
    vehicle: "Audi A4 - 35 DEF 789",
    time: "13:00",
    service: "Motor Arıza Tespiti",
    status: "confirmed",
    phone: "0534 345 67 89",
  },
  {
    id: 4,
    customer: "Fatma Şahin",
    vehicle: "Volkswagen Golf - 16 GHI 012",
    time: "15:00",
    service: "Lastik Değişimi",
    status: "pending",
    phone: "0535 456 78 90",
  },
]

const statusConfig = {
  confirmed: { label: "Onaylandı", color: "bg-primary/10 text-primary" },
  "in-progress": { label: "Devam Ediyor", color: "bg-chart-2/10 text-chart-2" },
  pending: { label: "Bekliyor", color: "bg-muted text-muted-foreground" },
}

export function AppointmentsList() {
  const [selectedAppointment, setSelectedAppointment] = useState<(typeof appointments)[0] | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleAppointmentClick = (appointment: (typeof appointments)[0]) => {
    setSelectedAppointment(appointment)
    setModalOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Bugünkü Randevular</CardTitle>
          <Button variant="outline" size="sm">
            Tümünü Gör
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                onClick={() => handleAppointmentClick(appointment)}
                className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {appointment.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{appointment.customer}</p>
                    <Badge variant="secondary" className={statusConfig[appointment.status].color}>
                      {statusConfig[appointment.status].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{appointment.vehicle}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {appointment.time}
                    </div>
                    <span>•</span>
                    <span>{appointment.service}</span>
                  </div>
                </div>

                <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AppointmentDetailModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        appointment={selectedAppointment || undefined}
      />
    </>
  )
}
