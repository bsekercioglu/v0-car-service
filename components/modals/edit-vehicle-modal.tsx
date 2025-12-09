"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditVehicleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle: {
    brand: string
    model: string
    plate: string
    year: string
    km: string
    lastService: string
    vinNumber?: string
    engineNumber?: string
    color?: string
  }
}

export function EditVehicleModal({ open, onOpenChange, vehicle }: EditVehicleModalProps) {
  const [formData, setFormData] = useState({
    brand: vehicle.brand,
    model: vehicle.model,
    plate: vehicle.plate,
    year: vehicle.year,
    km: vehicle.km,
    vinNumber: vehicle.vinNumber || "",
    engineNumber: vehicle.engineNumber || "",
    color: vehicle.color || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Araç güncelleniyor:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Araç Bilgilerini Düzenle</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Marka *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="Örn: BMW"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="Örn: 320i"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plate">Plaka *</Label>
              <Input
                id="plate"
                value={formData.plate}
                onChange={(e) => setFormData({ ...formData, plate: e.target.value.toUpperCase() })}
                placeholder="Örn: 34 ABC 123"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Model Yılı *</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="Örn: 2020"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="km">Kilometre *</Label>
              <Input
                id="km"
                value={formData.km}
                onChange={(e) => setFormData({ ...formData, km: e.target.value })}
                placeholder="Örn: 45000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Renk</Label>
              <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Renk Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beyaz">Beyaz</SelectItem>
                  <SelectItem value="Siyah">Siyah</SelectItem>
                  <SelectItem value="Gri">Gri</SelectItem>
                  <SelectItem value="Gümüş">Gümüş</SelectItem>
                  <SelectItem value="Mavi">Mavi</SelectItem>
                  <SelectItem value="Kırmızı">Kırmızı</SelectItem>
                  <SelectItem value="Yeşil">Yeşil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vinNumber">Şasi Numarası (VIN) *</Label>
            <Input
              id="vinNumber"
              value={formData.vinNumber}
              onChange={(e) => setFormData({ ...formData, vinNumber: e.target.value.toUpperCase() })}
              placeholder="Örn: WBADT43452G123456"
              required
              maxLength={17}
            />
            <p className="text-xs text-muted-foreground">17 karakterli şasi numarası</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="engineNumber">Motor Numarası</Label>
            <Input
              id="engineNumber"
              value={formData.engineNumber}
              onChange={(e) => setFormData({ ...formData, engineNumber: e.target.value.toUpperCase() })}
              placeholder="Örn: N20B20A12345678"
            />
            <p className="text-xs text-muted-foreground">Motor değişikliği takibi için kullanılır</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button type="submit">Güncelle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
