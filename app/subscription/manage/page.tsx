"use client"

import { useState } from "react"
import { NavigationMenu } from "@/components/navigation-menu"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CreditCard, FileText, AlertTriangle, Download, Plus } from "lucide-react"
import Link from "next/link"

// Mock data
const currentSubscription = {
  plan: "Profesyonel",
  status: "active",
  price: 699,
  billingCycle: "monthly",
  nextBillingDate: "2024-02-15",
  startDate: "2024-01-15",
}

const paymentMethod = {
  type: "visa",
  last4: "4242",
  expiry: "12/25",
}

const invoices = [
  { id: "INV-001", date: "2024-01-15", amount: 699, status: "paid" },
  { id: "INV-002", date: "2023-12-15", amount: 699, status: "paid" },
  { id: "INV-003", date: "2023-11-15", amount: 699, status: "paid" },
  { id: "INV-004", date: "2023-10-15", amount: 699, status: "paid" },
]

export default function ManageSubscriptionPage() {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")

  const handleUpdatePayment = () => {
    console.log("Update payment method:", { cardNumber, cardName, cardExpiry, cardCvv })
    setShowPaymentDialog(false)
    // Reset form
    setCardNumber("")
    setCardName("")
    setCardExpiry("")
    setCardCvv("")
  }

  const handleCancelSubscription = () => {
    console.log("Cancel subscription")
    setShowCancelDialog(false)
    // Redirect or show success message
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log("Download invoice:", invoiceId)
    // Download invoice PDF
  }

  return (
    <div className="flex h-screen overflow-hidden bg-secondary/30">
      <NavigationMenu />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold">Abonelik Yönetimi</h1>
              <p className="text-muted-foreground mt-1">Abonelik planınızı ve ödeme bilgilerinizi yönetin</p>
            </div>

            {/* Current Plan */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Mevcut Planınız</CardTitle>
                    <CardDescription>Aktif abonelik bilgileriniz</CardDescription>
                  </div>
                  <Badge variant={currentSubscription.status === "active" ? "default" : "secondary"} className="h-7">
                    {currentSubscription.status === "active" ? "Aktif" : "İptal Edildi"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-muted-foreground">Plan</Label>
                      <p className="text-2xl font-bold mt-1">{currentSubscription.plan}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Fiyat</Label>
                      <p className="text-xl font-semibold mt-1">
                        ₺{currentSubscription.price}
                        <span className="text-sm text-muted-foreground font-normal">
                          /{currentSubscription.billingCycle === "monthly" ? "ay" : "yıl"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-muted-foreground">Başlangıç Tarihi</Label>
                      <p className="text-lg mt-1">
                        {new Date(currentSubscription.startDate).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Sonraki Fatura Tarihi</Label>
                      <p className="text-lg mt-1">
                        {new Date(currentSubscription.nextBillingDate).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button asChild>
                  <Link href="/subscription">Planı Değiştir</Link>
                </Button>
                <Button variant="destructive" onClick={() => setShowCancelDialog(true)}>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Aboneliği İptal Et
                </Button>
              </CardFooter>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Ödeme Yöntemi</CardTitle>
                    <CardDescription>Fatura ödemesi için kullanılan kart</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowPaymentDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Güncelle
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-12 h-8 bg-primary/10 rounded flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {paymentMethod.type.toUpperCase()} •••• {paymentMethod.last4}
                    </p>
                    <p className="text-sm text-muted-foreground">Son kullanma: {paymentMethod.expiry}</p>
                  </div>
                  <Badge variant="secondary">Varsayılan</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Invoice History */}
            <Card>
              <CardHeader>
                <CardTitle>Fatura Geçmişi</CardTitle>
                <CardDescription>Geçmiş ödemelerinizin detayları</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{invoice.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(invoice.date).toLocaleDateString("tr-TR")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">₺{invoice.amount}</p>
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                            Ödendi
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleDownloadInvoice(invoice.id)}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Payment Method Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ödeme Yöntemi Güncelle</DialogTitle>
            <DialogDescription>Yeni kredi kartı bilgilerinizi girin</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Kart Numarası</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-name">Kart Üzerindeki İsim</Label>
              <Input
                id="card-name"
                placeholder="AD SOYAD"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="card-expiry">Son Kullanma</Label>
                <Input
                  id="card-expiry"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-cvv">CVV</Label>
                <Input
                  id="card-cvv"
                  placeholder="123"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  maxLength={3}
                  type="password"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              İptal
            </Button>
            <Button onClick={handleUpdatePayment}>Kaydet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Aboneliği iptal etmek istediğinizden emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem geri alınamaz. Mevcut fatura döneminizin sonuna kadar sisteme erişiminiz devam edecektir (
              {new Date(currentSubscription.nextBillingDate).toLocaleDateString("tr-TR")}). Sonrasında hesabınız askıya
              alınacaktır.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Vazgeç</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelSubscription}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Aboneliği İptal Et
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
