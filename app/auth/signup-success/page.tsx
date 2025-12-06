import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Wrench } from "lucide-react"

export default function SignupSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0A2540] shadow-lg">
            <Wrench className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">CarService Pro</h1>
        </div>

        <Card className="border-slate-200 shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Kayıt Başarılı!</CardTitle>
            <CardDescription className="text-base">E-posta adresinizi doğrulayın</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-slate-600">
              Hesabınız başarıyla oluşturuldu. Giriş yapmadan önce lütfen e-posta adresinize gönderilen doğrulama
              linkine tıklayın.
            </p>
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Not:</strong> E-postayı görmüyorsanız spam/gereksiz klasörünüzü kontrol edin.
              </p>
            </div>
            <Button asChild className="w-full h-11 bg-[#0A2540] hover:bg-[#0A2540]/90">
              <Link href="/auth/login">Giriş Sayfasına Dön</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
