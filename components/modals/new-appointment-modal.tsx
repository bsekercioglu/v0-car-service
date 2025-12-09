"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock } from "lucide-react"

interface NewAppointmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewAppointmentModal({ open, onOpenChange }: NewAppointmentModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    vehicle: "",
    plate: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Yeni randevu oluşturuldu:", formData)
    onOpenChange(false)
    setFormData({
      customerName: "",
      phone: "",
      vehicle: "",
      plate: "",
      service: "",
      date: "",
      time: "",
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Yeni Randevu Oluştur</DialogTitle>
          <DialogDescription>Müşteri için yeni bir servis randevusu oluşturun.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customerName">Müşteri Adı Soyadı *</Label>
              <Input
                id="customerName"
                placeholder="Ahmet Yılmaz"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefon Numarası *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0532 123 45 67"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle">Araç Modeli *</Label>
              <Input
                id="vehicle"
                placeholder="BMW 320i"
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plate">Plaka *</Label>
              <Input
                id="plate"
                placeholder="34 ABC 123"
                value={formData.plate}
                onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Servis Tipi *</Label>
              <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Servis türü seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="periodic">Periyodik Bakım</SelectItem>
                  <SelectItem value="brake">Fren Değişimi</SelectItem>
                  <SelectItem value="oil">Yağ Değişimi</SelectItem>
                  <SelectItem value="tire">Lastik Değişimi</SelectItem>
                  <SelectItem value="engine">Motor Arıza Tespiti</SelectItem>
                  <SelectItem value="electrical">Elektrik Arıza</SelectItem>
                  <SelectItem value="other">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Randevu Tarihi *</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Randevu Saati *</Label>
              <div className="relative">
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notlar</Label>
            <Textarea
              id="notes"
              placeholder="Ek bilgiler veya özel talepler..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button type="submit">Randevu Oluştur</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
