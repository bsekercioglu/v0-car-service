"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface AddVehicleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customerId?: number
}

export function AddVehicleModal({ open, onOpenChange, customerId }: AddVehicleModalProps) {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    plate: "",
    year: "",
    km: "",
    vinNumber: "",
    engineNumber: "",
    color: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Yeni araç ekleniyor:", { ...formData, customerId })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Yeni Araç Ekle</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Marka *</Label>
              <Select value={formData.brand} onValueChange={(value) => setFormData({ ...formData, brand: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Marka seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="mercedes">Mercedes</SelectItem>
                  <SelectItem value="audi">Audi</SelectItem>
                  <SelectItem value="volkswagen">Volkswagen</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="renault">Renault</SelectItem>
                  <SelectItem value="peugeot">Peugeot</SelectItem>
                  <SelectItem value="fiat">Fiat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="320i"
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
                placeholder="34 ABC 123"
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
                placeholder="2020"
                min="1950"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="km">Kilometre *</Label>
              <Input
                id="km"
                type="number"
                value={formData.km}
                onChange={(e) => setFormData({ ...formData, km: e.target.value })}
                placeholder="45000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Renk</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="Siyah"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vinNumber">Şasi Numarası *</Label>
              <Input
                id="vinNumber"
                value={formData.vinNumber}
                onChange={(e) => setFormData({ ...formData, vinNumber: e.target.value.toUpperCase() })}
                placeholder="WBADT43452G123456"
                required
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">17 karakterli VIN numarası</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="engineNumber">Motor Numarası</Label>
              <Input
                id="engineNumber"
                value={formData.engineNumber}
                onChange={(e) => setFormData({ ...formData, engineNumber: e.target.value.toUpperCase() })}
                placeholder="N47D20A12345678"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">Motorda bulunan seri numarası</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notlar</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Araç hakkında özel notlar ekleyin..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button type="submit">Araç Ekle</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
