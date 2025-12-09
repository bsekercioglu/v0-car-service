"use client"

import { useState } from "react"
import { NavigationMenu } from "@/components/navigation-menu"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, TrendingUp, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { cn } from "@/lib/utils"

const reportTypes = [
  { value: "revenue", label: "Gelir Raporu", icon: TrendingUp },
  { value: "services", label: "Servis Raporu", icon: FileText },
  { value: "customers", label: "Müşteri Raporu", icon: FileText },
  { value: "performance", label: "Performans Raporu", icon: TrendingUp },
]

const mockRevenueData = [
  { month: "Ocak", revenue: 45000, services: 42, avgService: 1071 },
  { month: "Şubat", revenue: 52000, services: 48, avgService: 1083 },
  { month: "Mart", revenue: 48000, services: 45, avgService: 1067 },
  { month: "Nisan", revenue: 61000, services: 54, avgService: 1130 },
]

const topServices = [
  { name: "Yağ Değişimi", count: 48, revenue: 12000 },
  { name: "Fren Bakımı", count: 32, revenue: 16000 },
  { name: "Lastik Değişimi", count: 28, revenue: 14000 },
  { name: "Motor Bakımı", count: 24, revenue: 19200 },
  { name: "Genel Bakım", count: 22, revenue: 13200 },
]

export default function ReportsPage() {
  const [reportType, setReportType] = useState("revenue")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const generateReport = () => {
    console.log("[v0] Generating report:", { reportType, startDate, endDate })
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex w-64 border-r bg-card">
        <div className="flex flex-col w-full p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg className="h-5 w-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg font-semibold">CarService</span>
          </div>
          <NavigationMenu />
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-balance">Rapor Oluştur</h1>
            <p className="text-muted-foreground mt-1">Detaylı raporlar oluşturun ve analiz edin</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Rapor Ayarları</CardTitle>
                <CardDescription>Rapor tipini ve tarih aralığını seçin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Rapor Tipi</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Başlangıç Tarihi</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP", { locale: tr }) : "Tarih seçin"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Bitiş Tarihi</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP", { locale: tr }) : "Tarih seçin"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button className="w-full" onClick={generateReport}>
                  <FileText className="h-4 w-4 mr-2" />
                  Rapor Oluştur
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  PDF İndir
                </Button>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Aylık Gelir Özeti</CardTitle>
                  <CardDescription>Son 4 ayın gelir performansı</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRevenueData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-semibold">{data.month} 2024</div>
                          <div className="text-sm text-muted-foreground">{data.services} servis tamamlandı</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">₺{data.revenue.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Ort: ₺{data.avgService}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>En Çok Yapılan Servisler</CardTitle>
                  <CardDescription>Servis bazında performans analizi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topServices.map((service, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                        <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                          {index + 1}
                        </Badge>
                        <div className="flex-1">
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-muted-foreground">{service.count} işlem</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₺{service.revenue.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Toplam gelir</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₺206,000</div>
                    <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>+12.5%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Toplam Servis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">189</div>
                    <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>+8.3%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Ort. Servis Değeri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₺1,090</div>
                    <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>+3.8%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
