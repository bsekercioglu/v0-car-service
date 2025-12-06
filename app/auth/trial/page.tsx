"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Wrench, Check } from "lucide-react"

export default function TrialPage() {
  const [formData, setFormData] = useState({
    organizationName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}`,
          data: {
            full_name: `${formData.firstName} ${formData.lastName}`,
            organization_name: formData.organizationName,
            phone: formData.phone,
          },
        },
      })

      if (authError) throw authError

      router.push("/auth/signup-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Kayıt sırasında bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="mx-auto w-full max-w-6xl py-12">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0A2540] shadow-lg">
            <Wrench className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">CarService Pro</h1>
          <p className="text-sm text-slate-600">Araç Servis Yönetim Sistemi</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-slate-200 shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">14 Gün Ücretsiz Deneyin</CardTitle>
              <CardDescription>Kredi kartı gerektirmez. İstediğiniz zaman iptal edebilirsiniz.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Servis Adı</Label>
                  <Input
                    id="organizationName"
                    name="organizationName"
                    placeholder="Örn: Mavi Oto Servis"
                    required
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ad</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ornek@email.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="0555 123 4567"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Şifre</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">{error}</div>
                )}

                <Button type="submit" className="w-full h-11 bg-[#0A2540] hover:bg-[#0A2540]/90" disabled={isLoading}>
                  {isLoading ? "Hesap oluşturuluyor..." : "Ücretsiz Denemeyi Başlat"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                Zaten hesabınız var mı?{" "}
                <Link href="/auth/login" className="font-medium text-[#0A2540] hover:underline">
                  Giriş Yap
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-slate-200 bg-white/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">Deneme Sürümü Özellikleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 mt-0.5">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">14 Gün Tam Erişim</p>
                    <p className="text-sm text-slate-600">Tüm özelliklere sınırsız erişim</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 mt-0.5">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">3 Kullanıcı</p>
                    <p className="text-sm text-slate-600">Ekip arkadaşlarınızı ekleyin</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 mt-0.5">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">50 Müşteri Kaydı</p>
                    <p className="text-sm text-slate-600">Müşteri ve araç yönetimi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 mt-0.5">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">Sınırsız Servis Kaydı</p>
                    <p className="text-sm text-slate-600">İş takibi ve raporlama</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 mt-0.5">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">Teknik Destek</p>
                    <p className="text-sm text-slate-600">7/24 e-posta desteği</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-gradient-to-br from-[#0A2540] to-[#1a3a5f] text-white">
              <CardHeader>
                <CardTitle className="text-lg text-white">Neden CarService Pro?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-white/90">
                <p>✓ Bulut tabanlı, her yerden erişim</p>
                <p>✓ Otomatik yedekleme ve güvenlik</p>
                <p>✓ Kolay kullanımlı arayüz</p>
                <p>✓ Mobil uyumlu tasarım</p>
                <p>✓ Düzenli güncellemeler</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
