"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, Car, DollarSign, FileText, Wrench } from "lucide-react"

interface ServiceDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service?: {
    id: number
    customer: string
    vehicle: string
    date: string
    service: string
    cost: string
    status: string
    mechanic?: string
    description?: string
    completedAt?: string
  }
}

const statusConfig = {
  completed: { label: "Tamamlandı", color: "bg-green-500/10 text-green-600" },
  "in-progress": { label: "Devam Ediyor", color: "bg-blue-500/10 text-blue-600" },
  pending: { label: "Bekliyor", color: "bg-yellow-500/10 text-yellow-600" },
}

export function ServiceDetailModal({ open, onOpenChange, service }: ServiceDetailModalProps) {
  if (!service) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle>Servis Detayı #{service.id}</DialogTitle>
              <DialogDescription>Servis işlemi hakkında detaylı bilgiler</DialogDescription>
            </div>
            <Badge className={statusConfig[service.status as keyof typeof statusConfig]?.color || ""}>
              {statusConfig[service.status as keyof typeof statusConfig]?.label || service.status}
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
                <p className="font-semibold">{service.customer}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Car className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Araç</p>
                <p className="font-semibold">{service.vehicle}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Tarih</p>
                <p className="font-semibold">{service.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Tutar</p>
                <p className="font-semibold">{service.cost}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Wrench className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Servis Tipi</p>
                <p className="font-semibold">{service.service}</p>
              </div>
            </div>

            {service.mechanic && (
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Teknisyen</p>
                  <p className="font-semibold">{service.mechanic}</p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-semibold">Yapılan İşlemler</h4>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Motor yağı değişimi
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Hava filtresi değişimi
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Yağ filtresi değişimi
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Genel kontrol
                </li>
              </ul>
            </div>
          </div>

          {service.description && (
            <div className="space-y-2">
              <h4 className="font-semibold">Açıklama</h4>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          )}

          {service.completedAt && (
            <div className="rounded-lg bg-green-500/10 p-4 text-sm">
              <div className="flex items-center gap-2 text-green-600">
                <Clock className="h-4 w-4" />
                <span className="font-semibold">Tamamlanma: {service.completedAt}</span>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent">
              Rapor İndir
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Yazdır
            </Button>
            <Button className="flex-1">Düzenle</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
