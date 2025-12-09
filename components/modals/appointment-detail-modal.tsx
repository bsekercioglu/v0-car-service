"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, Car, Phone, FileText, MapPin } from "lucide-react"

interface AppointmentDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appointment?: {
    id: number
    customer: string
    vehicle: string
    time: string
    service: string
    status: string
    phone?: string
    notes?: string
  }
}

const statusConfig = {
  confirmed: { label: "Onaylandı", color: "bg-primary/10 text-primary" },
  "in-progress": { label: "Devam Ediyor", color: "bg-chart-2/10 text-chart-2" },
  pending: { label: "Bekliyor", color: "bg-muted text-muted-foreground" },
  completed: { label: "Tamamlandı", color: "bg-green-500/10 text-green-600" },
}

export function AppointmentDetailModal({ open, onOpenChange, appointment }: AppointmentDetailModalProps) {
  if (!appointment) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle>Randevu Detayı #{appointment.id}</DialogTitle>
              <DialogDescription>Randevu bilgileri ve müşteri detayları</DialogDescription>
            </div>
            <Badge className={statusConfig[appointment.status as keyof typeof statusConfig]?.color || ""}>
              {statusConfig[appointment.status as keyof typeof statusConfig]?.label || appointment.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Müşteri</p>
                <p className="font-semibold">{appointment.customer}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Car className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Araç</p>
                <p className="font-semibold">{appointment.vehicle}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Saat</p>
                <p className="font-semibold">{appointment.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Servis Tipi</p>
                <p className="font-semibold">{appointment.service}</p>
              </div>
            </div>

            {appointment.phone && (
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <p className="font-semibold">{appointment.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Konum</p>
                <p className="font-semibold">Servis Merkezi</p>
              </div>
            </div>
          </div>

          <Separator />

          {appointment.notes && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold">Notlar</h4>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">{appointment.notes}</p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent">
              <Phone className="h-4 w-4 mr-2" />
              Müşteriyi Ara
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Yeniden Planla
            </Button>
            <Button className="flex-1">Servisi Başlat</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
