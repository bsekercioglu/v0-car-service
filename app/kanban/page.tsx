import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, Clock, User, AlertCircle } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function KanbanPage() {
  const columns = [
    {
      id: "new",
      title: "Yeni",
      color: "bg-slate-100 dark:bg-slate-900",
      count: 3,
      jobs: [
        {
          id: "WO-2024-160",
          plate: "34 MNO 111",
          customer: "Zeynep Arslan",
          service: "Genel Kontrol",
          priority: "Normal",
          technician: null,
          entryDate: "06 Ara 2024",
        },
        {
          id: "WO-2024-159",
          plate: "06 PQR 222",
          customer: "Kemal Aydın",
          service: "Klima Arızası",
          priority: "Yüksek",
          technician: null,
          entryDate: "06 Ara 2024",
        },
        {
          id: "WO-2024-158",
          plate: "35 STU 333",
          customer: "Elif Kaya",
          service: "Lastik Değişimi",
          priority: "Normal",
          technician: null,
          entryDate: "05 Ara 2024",
        },
      ],
    },
    {
      id: "inspection",
      title: "İncelemede",
      color: "bg-blue-50 dark:bg-blue-950",
      count: 4,
      jobs: [
        {
          id: "WO-2024-156",
          plate: "34 ABC 123",
          customer: "Ali Yılmaz",
          service: "Yağ Değişimi + Filtre",
          priority: "Normal",
          technician: "Ahmet Yılmaz",
          entryDate: "06 Ara 2024",
        },
        {
          id: "WO-2024-157",
          plate: "16 VWX 444",
          customer: "Selin Öztürk",
          service: "Motor Arıza Tespiti",
          priority: "Acil",
          technician: "Ali Demir",
          entryDate: "05 Ara 2024",
        },
      ],
    },
    {
      id: "waiting-parts",
      title: "Parça Bekliyor",
      color: "bg-amber-50 dark:bg-amber-950",
      count: 5,
      jobs: [
        {
          id: "WO-2024-155",
          plate: "06 XYZ 789",
          customer: "Ayşe Kaya",
          service: "Fren Sistemi Onarımı",
          priority: "Yüksek",
          technician: "Mehmet Kaya",
          entryDate: "05 Ara 2024",
          note: "Fren balata bekleniyor",
        },
        {
          id: "WO-2024-151",
          plate: "34 YZA 555",
          customer: "Burak Şen",
          service: "Süspansiyon Onarımı",
          priority: "Normal",
          technician: "Mustafa Şahin",
          entryDate: "03 Ara 2024",
          note: "Amortisör siparişte",
        },
      ],
    },
    {
      id: "repairing",
      title: "Onarımda",
      color: "bg-purple-50 dark:bg-purple-950",
      count: 6,
      jobs: [
        {
          id: "WO-2024-154",
          plate: "35 DEF 456",
          customer: "Mehmet Öz",
          service: "Motor Arıza Onarımı",
          priority: "Acil",
          technician: "Ali Demir",
          entryDate: "04 Ara 2024",
        },
        {
          id: "WO-2024-150",
          plate: "16 BCD 666",
          customer: "Deniz Yıldız",
          service: "Elektrik Arızası",
          priority: "Normal",
          technician: "Ahmet Yılmaz",
          entryDate: "02 Ara 2024",
        },
      ],
    },
    {
      id: "testing",
      title: "Testte",
      color: "bg-cyan-50 dark:bg-cyan-950",
      count: 3,
      jobs: [
        {
          id: "WO-2024-153",
          plate: "16 GHI 321",
          customer: "Fatma Demir",
          service: "Klima Bakımı",
          priority: "Normal",
          technician: "Mustafa Şahin",
          entryDate: "03 Ara 2024",
        },
      ],
    },
    {
      id: "ready",
      title: "Teslime Hazır",
      color: "bg-green-50 dark:bg-green-950",
      count: 7,
      jobs: [
        {
          id: "WO-2024-152",
          plate: "34 JKL 654",
          customer: "Can Özkan",
          service: "Periyodik Bakım",
          priority: "Normal",
          technician: "Ahmet Yılmaz",
          entryDate: "02 Ara 2024",
        },
        {
          id: "WO-2024-149",
          plate: "06 EFG 777",
          customer: "Gizem Çelik",
          service: "Fren Bakımı",
          priority: "Normal",
          technician: "Mehmet Kaya",
          entryDate: "01 Ara 2024",
        },
      ],
    },
    {
      id: "delivered",
      title: "Teslim Edildi",
      color: "bg-emerald-50 dark:bg-emerald-950",
      count: 4,
      jobs: [
        {
          id: "WO-2024-148",
          plate: "35 HIJ 888",
          customer: "Cem Yılmaz",
          service: "Yağ Değişimi",
          priority: "Normal",
          technician: "Ali Demir",
          entryDate: "30 Kas 2024",
        },
      ],
    },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Süreç Takibi</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Süreç Takip Panosu</h1>
            <p className="text-muted-foreground">İş emirlerinin gerçek zamanlı durum görünümü</p>
          </div>

          {/* Summary Stats */}
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-slate-500" />
              <span className="text-muted-foreground">Yeni:</span>
              <span className="font-semibold">{columns[0].count}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">İncelemede:</span>
              <span className="font-semibold">{columns[1].count}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="text-muted-foreground">Parça Bekliyor:</span>
              <span className="font-semibold">{columns[2].count}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-500" />
              <span className="text-muted-foreground">Onarımda:</span>
              <span className="font-semibold">{columns[3].count}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-cyan-500" />
              <span className="text-muted-foreground">Testte:</span>
              <span className="font-semibold">{columns[4].count}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-muted-foreground">Hazır:</span>
              <span className="font-semibold">{columns[5].count}</span>
            </div>
          </div>

          {/* Kanban Board */}
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-4">
              {columns.map((column) => (
                <div key={column.id} className="w-80 shrink-0">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{column.title}</h3>
                    <Badge variant="secondary" className="rounded-full">
                      {column.count}
                    </Badge>
                  </div>
                  <div className={`rounded-lg p-2 ${column.color} min-h-[600px]`}>
                    <div className="space-y-3">
                      {column.jobs.map((job) => (
                        <Card key={job.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                              <span className="font-mono text-xs font-semibold">{job.id}</span>
                              {job.priority === "Acil" && (
                                <Badge variant="destructive" className="text-xs h-5">
                                  Acil
                                </Badge>
                              )}
                              {job.priority === "Yüksek" && (
                                <Badge variant="secondary" className="text-xs h-5">
                                  Yüksek
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                                <Car className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate">{job.plate}</p>
                                <p className="text-xs text-muted-foreground truncate">{job.customer}</p>
                              </div>
                            </div>
                            <p className="text-sm">{job.service}</p>
                            {job.note && (
                              <div className="flex items-start gap-2 rounded-md bg-amber-100 dark:bg-amber-900/20 p-2">
                                <AlertCircle className="h-3 w-3 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
                                <p className="text-xs text-amber-900 dark:text-amber-100">{job.note}</p>
                              </div>
                            )}
                            <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{job.entryDate}</span>
                              </div>
                              {job.technician && (
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  <span className="truncate max-w-[100px]">{job.technician}</span>
                                </div>
                              )}
                            </div>
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              Detaylar
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
