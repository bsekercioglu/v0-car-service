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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus } from "lucide-react"

type NewUser = {
  name: string
  email: string
  phone: string
  role: "Yönetici" | "Kullanıcı" | "Servis Elemanı"
  status: "Aktif" | "Pasif"
}

interface AddUserModalProps {
  open: boolean
  onClose: () => void
  onAdd: (user: NewUser) => void
}

export function AddUserModal({ open, onClose, onAdd }: AddUserModalProps) {
  const [formData, setFormData] = useState<NewUser>({
    name: "",
    email: "",
    phone: "",
    role: "Kullanıcı",
    status: "Aktif",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "Kullanıcı",
      status: "Aktif",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Yeni Kullanıcı Ekle
          </DialogTitle>
          <DialogDescription>Yeni bir takım üyesi ekleyin ve rolünü belirleyin</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ad Soyad *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ahmet Yılmaz"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-posta *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ahmet@firma.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0555 123 4567"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rol *</Label>
              <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Rol seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yönetici">Yönetici</SelectItem>
                  <SelectItem value="Kullanıcı">Kullanıcı</SelectItem>
                  <SelectItem value="Servis Elemanı">Servis Elemanı</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Roller ve Yetkiler</Label>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div>
                <strong>Yönetici:</strong> Tüm özelliklere tam erişim, kullanıcı ve ayar yönetimi
              </div>
              <div>
                <strong>Kullanıcı:</strong> Randevu, müşteri ve servis yönetimi
              </div>
              <div>
                <strong>Servis Elemanı:</strong> Sadece atanan servisleri görüntüleme ve güncelleme
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit">
              <UserPlus className="w-4 h-4 mr-2" />
              Kullanıcı Ekle
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
