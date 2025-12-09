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
import { Checkbox } from "@/components/ui/checkbox"

interface NewServiceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewServiceModal({ open, onOpenChange }: NewServiceModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    vehicle: "",
    plate: "",
    mileage: "",
    serviceType: "",
    mechanic: "",
    estimatedCost: "",
    estimatedTime: "",
    description: "",
    services: [] as string[],
  })

  const serviceItems = [
    { id: "oil", label: "Yağ Değişimi" },
    { id: "filter", label: "Filtre Değişimi" },
    { id: "brake", label: "Fren Kontrolü" },
    { id: "tire", label: "Lastik Kontrolü" },
    { id: "battery", label: "Akü Kontrolü" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Yeni servis başlatıldı:", formData)
    onOpenChange(false)
    setFormData({
      customerName: "",
      vehicle: "",
      plate: "",
      mileage: "",
      serviceType: "",
      mechanic: "",
      estimatedCost: "",
      estimatedTime: "",
      description: "",
      services: [],
    })
  }

  const toggleService = (serviceId: string) => {
    setFormData({
      ...formData,
      services: formData.services.includes(serviceId)
        ? formData.services.filter((id) => id !== serviceId)
        : [...formData.services, serviceId],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Yeni Servis Kaydı Başlat</DialogTitle>
          <DialogDescription>Araç için yeni bir servis işlemi başlatın.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customerName">Müşteri Adı *</Label>
              <Input
                id="customerName"
                placeholder="Ahmet Yılmaz"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
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
              <Label htmlFor="mileage">Kilometre</Label>
              <Input
                id="mileage"
                type="number"
                placeholder="125000"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType">Servis Tipi *</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Servis türü seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="periodic">Periyodik Bakım</SelectItem>
                  <SelectItem value="repair">Arıza Onarımı</SelectItem>
                  <SelectItem value="maintenance">Genel Bakım</SelectItem>
                  <SelectItem value="diagnostic">Arıza Tespiti</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mechanic">Sorumlu Teknisyen</Label>
              <Select
                value={formData.mechanic}
                onValueChange={(value) => setFormData({ ...formData, mechanic: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Teknisyen seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mehmet">Mehmet Usta</SelectItem>
                  <SelectItem value="ali">Ali Bey</SelectItem>
                  <SelectItem value="veli">Veli Usta</SelectItem>
                  <SelectItem value="hasan">Hasan Bey</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedCost">Tahmini Maliyet (₺)</Label>
              <Input
                id="estimatedCost"
                type="number"
                placeholder="1500"
                value={formData.estimatedCost}
                onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedTime">Tahmini Süre (Saat)</Label>
              <Input
                id="estimatedTime"
                type="number"
                placeholder="3"
                value={formData.estimatedTime}
                onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Yapılacak İşlemler</Label>
            <div className="space-y-2 rounded-lg border p-4">
              {serviceItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={item.id}
                    checked={formData.services.includes(item.id)}
                    onCheckedChange={() => toggleService(item.id)}
                  />
                  <Label htmlFor={item.id} className="text-sm font-normal cursor-pointer">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama ve Notlar</Label>
            <Textarea
              id="description"
              placeholder="Servis detayları, özel talepler, gözlemler..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button type="submit">Servisi Başlat</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
