"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import { Plus, Trash2, Percent, FileText, Printer, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ServiceInvoiceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service?: {
    id: number
    customer: string
    vehicle: string
    serviceType: string
  }
}

const mockInventory = [
  { id: 1, name: "Motor Yağı 5W-30", price: 280, unit: "Litre" },
  { id: 2, name: "Hava Filtresi", price: 150, unit: "Adet" },
  { id: 3, name: "Yağ Filtresi", price: 85, unit: "Adet" },
  { id: 4, name: "Fren Balatası Ön", price: 450, unit: "Takım" },
  { id: 5, name: "Fren Balatası Arka", price: 380, unit: "Takım" },
  { id: 6, name: "Ateşleme Bujisi", price: 95, unit: "Adet" },
]

interface InvoiceItem {
  id: number
  name: string
  quantity: number
  unit: string
  unitPrice: number
  total: number
}

interface LaborItem {
  id: number
  description: string
  hours: number
  hourlyRate: number
  total: number
}

export function ServiceInvoiceModal({ open, onOpenChange, service }: ServiceInvoiceModalProps) {
  const [materials, setMaterials] = useState<InvoiceItem[]>([])
  const [laborItems, setLaborItems] = useState<LaborItem[]>([
    { id: 1, description: "İşçilik", hours: 2, hourlyRate: 350, total: 700 },
  ])
  const [discountType, setDiscountType] = useState<"percentage" | "amount">("percentage")
  const [discountValue, setDiscountValue] = useState(0)

  const addMaterial = () => {
    const newItem: InvoiceItem = {
      id: Date.now(),
      name: "",
      quantity: 1,
      unit: "Adet",
      unitPrice: 0,
      total: 0,
    }
    setMaterials([...materials, newItem])
  }

  const updateMaterial = (id: number, field: keyof InvoiceItem, value: any) => {
    setMaterials(
      materials.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          updated.total = updated.quantity * updated.unitPrice
          return updated
        }
        return item
      }),
    )
  }

  const removeMaterial = (id: number) => {
    setMaterials(materials.filter((item) => item.id !== id))
  }

  const selectInventoryItem = (materialId: number, inventoryId: number) => {
    const inventoryItem = mockInventory.find((item) => item.id === inventoryId)
    if (inventoryItem) {
      setMaterials(
        materials.map((item) => {
          if (item.id === materialId) {
            const updated = {
              ...item,
              name: inventoryItem.name,
              unitPrice: inventoryItem.price,
              unit: inventoryItem.unit,
            }
            updated.total = updated.quantity * updated.unitPrice
            return updated
          }
          return item
        }),
      )
    }
  }

  const addLabor = () => {
    const newItem: LaborItem = {
      id: Date.now(),
      description: "",
      hours: 1,
      hourlyRate: 350,
      total: 350,
    }
    setLaborItems([...laborItems, newItem])
  }

  const updateLabor = (id: number, field: keyof LaborItem, value: any) => {
    setLaborItems(
      laborItems.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          updated.total = updated.hours * updated.hourlyRate
          return updated
        }
        return item
      }),
    )
  }

  const removeLabor = (id: number) => {
    setLaborItems(laborItems.filter((item) => item.id !== id))
  }

  const materialsSubtotal = materials.reduce((sum, item) => sum + item.total, 0)
  const laborSubtotal = laborItems.reduce((sum, item) => sum + item.total, 0)
  const subtotal = materialsSubtotal + laborSubtotal

  const discountAmount = discountType === "percentage" ? (subtotal * discountValue) / 100 : discountValue

  const taxAmount = (subtotal - discountAmount) * 0.2 // KDV %20
  const total = subtotal - discountAmount + taxAmount

  const handleCreateInvoice = () => {
    const invoiceData = {
      service,
      materials,
      laborItems,
      discountType,
      discountValue,
      discountAmount,
      subtotal,
      taxAmount,
      total,
    }
    console.log("Fatura oluşturuluyor:", invoiceData)
    onOpenChange(false)
  }

  if (!service) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[96vw] w-[1600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Fatura Hazırla</DialogTitle>
          <DialogDescription>
            {service.customer} - {service.vehicle}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-200px)]">
          <div className="space-y-6 pr-4">
            {/* Malzemeler */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Kullanılan Malzemeler</h3>
                <Button onClick={addMaterial} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Malzeme Ekle
                </Button>
              </div>

              {materials.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                  Henüz malzeme eklenmedi
                </div>
              ) : (
                <div className="space-y-3">
                  {materials.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="grid grid-cols-12 gap-6 items-end">
                        <div className="col-span-5">
                          <Label className="block mb-2">Malzeme</Label>
                          <Select
                            value={item.name ? String(mockInventory.find((i) => i.name === item.name)?.id || "") : ""}
                            onValueChange={(value) => {
                              selectInventoryItem(item.id, Number.parseInt(value))
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Malzeme Seçiniz" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockInventory.map((inv) => (
                                <SelectItem key={inv.id} value={String(inv.id)}>
                                  {inv.name} - ₺{inv.price}/{inv.unit}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <Label className="block mb-2">Miktar</Label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateMaterial(item.id, "quantity", Number.parseFloat(e.target.value) || 0)
                            }
                          />
                        </div>
                        <div className="col-span-2">
                          <Label className="block mb-2 whitespace-nowrap">Birim Fiyat</Label>
                          <Input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) =>
                              updateMaterial(item.id, "unitPrice", Number.parseFloat(e.target.value) || 0)
                            }
                          />
                        </div>
                        <div className="col-span-2">
                          <Label className="block mb-2">Toplam</Label>
                          <div className="h-10 flex items-center font-semibold text-lg">₺{item.total.toFixed(2)}</div>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button variant="ghost" size="icon" className="mt-7" onClick={() => removeMaterial(item.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* İşçilik */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">İşçilik</h3>
                <Button onClick={addLabor} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  İşçilik Ekle
                </Button>
              </div>

              <div className="space-y-3">
                {laborItems.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="grid grid-cols-12 gap-4 items-end">
                      <div className="col-span-5">
                        <Label>Açıklama</Label>
                        <Input
                          value={item.description}
                          onChange={(e) => updateLabor(item.id, "description", e.target.value)}
                          placeholder="İşçilik açıklaması"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Saat</Label>
                        <Input
                          type="number"
                          min="0.5"
                          step="0.5"
                          value={item.hours}
                          onChange={(e) => updateLabor(item.id, "hours", Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Saat Ücreti</Label>
                        <Input
                          type="number"
                          value={item.hourlyRate}
                          onChange={(e) => updateLabor(item.id, "hourlyRate", Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Toplam</Label>
                        <div className="h-10 flex items-center font-semibold">₺{item.total.toFixed(2)}</div>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <Button variant="ghost" size="icon" className="mt-6" onClick={() => removeLabor(item.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* İskonto */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Percent className="h-5 w-5" />
                İskonto
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>İskonto Tipi</Label>
                  <Select value={discountType} onValueChange={(value: any) => setDiscountType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Yüzde (%)</SelectItem>
                      <SelectItem value="amount">Tutar (₺)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>İskonto Değeri</Label>
                  <Input
                    type="number"
                    min="0"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number.parseFloat(e.target.value) || 0)}
                    placeholder={discountType === "percentage" ? "%" : "₺"}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Özet */}
            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-lg mb-4">Fatura Özeti</h3>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Malzeme Ara Toplamı:</span>
                <span className="font-medium">₺{materialsSubtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">İşçilik Ara Toplamı:</span>
                <span className="font-medium">₺{laborSubtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ara Toplam:</span>
                <span className="font-medium">₺{subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>İskonto ({discountType === "percentage" ? `%${discountValue}` : `₺${discountValue}`}):</span>
                  <span className="font-medium">-₺{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">KDV (%20):</span>
                <span className="font-medium">₺{taxAmount.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Genel Toplam:</span>
                <span className="text-primary">₺{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={() => console.log("Fatura önizleme")}>
            <FileText className="h-4 w-4 mr-2" />
            Önizleme
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent" onClick={() => console.log("Fatura yazdır")}>
            <Printer className="h-4 w-4 mr-2" />
            Yazdır
          </Button>
          <Button className="flex-1" onClick={handleCreateInvoice}>
            <Download className="h-4 w-4 mr-2" />
            Fatura Oluştur
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
