import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle, Wrench } from "lucide-react"

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

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
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Bir Hata Oluştu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {params?.error ? (
              <p className="text-center text-sm text-slate-600">Hata kodu: {params.error}</p>
            ) : (
              <p className="text-center text-sm text-slate-600">Bilinmeyen bir hata oluştu.</p>
            )}
            <Button asChild className="w-full h-11 bg-[#0A2540] hover:bg-[#0A2540]/90">
              <Link href="/auth/login">Giriş Sayfasına Dön</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
