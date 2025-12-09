"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Check, Users, Building2, Sparkles } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const plans = [
  {
    id: "starter",
    name: "Başlangıç",
    description: "Küçük servisler için ideal",
    price: { monthly: 299, yearly: 2990 },
    icon: Sparkles,
    features: [
      "30 güne kadar randevu takibi",
      "100 müşteri kaydı",
      "Temel raporlama",
      "E-posta bildirimleri",
      "1 kullanıcı",
      "Mobil uygulama erişimi",
    ],
    recommended: false,
  },
  {
    id: "professional",
    name: "Profesyonel",
    description: "Büyüyen servisler için en popüler",
    price: { monthly: 699, yearly: 6990 },
    icon: Users,
    features: [
      "Sınırsız randevu takibi",
      "Sınırsız müşteri kaydı",
      "Gelişmiş raporlama ve analizler",
      "SMS ve e-posta bildirimleri",
      "5 kullanıcı",
      "Mobil uygulama erişimi",
      "Stok yönetimi",
      "Fatura oluşturma",
      "Öncelikli destek",
    ],
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Kurumsal",
    description: "Büyük işletmeler ve zincir servisler",
    price: { monthly: 1499, yearly: 14990 },
    icon: Building2,
    features: [
      "Tüm Profesyonel özellikler",
      "Sınırsız kullanıcı",
      "Çoklu şube yönetimi",
      "Özel raporlar ve API erişimi",
      "Özel eğitim ve onboarding",
      "7/24 öncelikli destek",
      "Özel entegrasyonlar",
      "SLA garantisi",
    ],
    recommended: false,
  },
]

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const handleSelectPlan = (planId: string) => {
    console.log("Selected plan:", planId, "Billing:", billingCycle)
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CarService</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/subscription/manage" className="text-sm text-muted-foreground hover:text-foreground">
              Aboneliğimi Yönet
            </Link>
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Zaten hesabınız var mı? <span className="text-primary font-medium">Giriş Yapın</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>30 gün ücretsiz deneme, kredi kartı gerekmez</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">İşinize Uygun Planı Seçin</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Hemen başlayın ve servis operasyonlarınızı kolaylaştırın. İstediğiniz zaman planınızı değiştirebilirsiniz.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Label
            htmlFor="billing-toggle"
            className={billingCycle === "monthly" ? "font-semibold" : "text-muted-foreground"}
          >
            Aylık
          </Label>
          <Switch
            id="billing-toggle"
            checked={billingCycle === "yearly"}
            onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
          />
          <Label
            htmlFor="billing-toggle"
            className={billingCycle === "yearly" ? "font-semibold" : "text-muted-foreground"}
          >
            Yıllık
            <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
              2 ay bedava
            </Badge>
          </Label>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const PlanIcon = plan.icon
            const price = billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly
            const displayPrice = billingCycle === "yearly" ? price / 12 : price

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col ${
                  plan.recommended ? "border-primary shadow-xl shadow-primary/10 scale-105" : "border-border/50"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">Önerilen</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <PlanIcon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">₺{displayPrice.toFixed(0)}</span>
                      <span className="text-muted-foreground">/ay</span>
                    </div>
                    {billingCycle === "yearly" && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Yıllık ₺{price.toLocaleString("tr-TR")} faturalandırılır
                      </p>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    className="w-full h-11"
                    variant={plan.recommended ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.recommended ? "Başlayın" : "Planı Seç"}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Tüm Planlar Karşılaştırması</h2>
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                <FeatureRow
                  feature="Randevu Yönetimi"
                  starter="30 güne kadar"
                  professional="Sınırsız"
                  enterprise="Sınırsız"
                />
                <FeatureRow
                  feature="Müşteri Kaydı"
                  starter="100 müşteri"
                  professional="Sınırsız"
                  enterprise="Sınırsız"
                />
                <FeatureRow feature="Kullanıcı Sayısı" starter="1" professional="5" enterprise="Sınırsız" />
                <FeatureRow feature="Stok Yönetimi" starter="✗" professional="✓" enterprise="✓" />
                <FeatureRow feature="Fatura Oluşturma" starter="✗" professional="✓" enterprise="✓" />
                <FeatureRow feature="SMS Bildirimleri" starter="✗" professional="✓" enterprise="✓" />
                <FeatureRow feature="Çoklu Şube" starter="✗" professional="✗" enterprise="✓" />
                <FeatureRow feature="API Erişimi" starter="✗" professional="✗" enterprise="✓" />
                <FeatureRow feature="Destek" starter="E-posta" professional="Öncelikli" enterprise="7/24" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Sorularınız mı var?</h2>
          <p className="text-muted-foreground mb-8">
            Ekibimiz size yardımcı olmaktan mutluluk duyar. Bizimle iletişime geçin.
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="mailto:destek@carservice.com">Bize Ulaşın</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function FeatureRow({
  feature,
  starter,
  professional,
  enterprise,
}: { feature: string; starter: string; professional: string; enterprise: string }) {
  return (
    <div className="grid grid-cols-4 gap-4 items-center py-3 border-b last:border-0">
      <div className="font-medium">{feature}</div>
      <div className="text-center text-sm text-muted-foreground">{starter}</div>
      <div className="text-center text-sm text-muted-foreground">{professional}</div>
      <div className="text-center text-sm text-muted-foreground">{enterprise}</div>
    </div>
  )
}
