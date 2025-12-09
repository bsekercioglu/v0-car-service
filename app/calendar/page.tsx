"use client"

import { useState } from "react"
import { NavigationMenu } from "@/components/navigation-menu"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { NewAppointmentModal } from "@/components/modals/new-appointment-modal"

const mockAppointments = [
  { id: 1, date: "2025-01-15", time: "09:00", customer: "Ahmet Yılmaz", service: "Yağ Değişimi", plate: "34 ABC 123" },
  { id: 2, date: "2025-01-15", time: "11:00", customer: "Mehmet Kaya", service: "Fren Bakımı", plate: "06 XYZ 456" },
  { id: 3, date: "2025-01-16", time: "10:00", customer: "Ayşe Demir", service: "Lastik Değişimi", plate: "35 DEF 789" },
  { id: 4, date: "2025-01-17", time: "14:00", customer: "Fatma Şahin", service: "Genel Bakım", plate: "16 GHI 012" },
  { id: 5, date: "2025-01-18", time: "09:30", customer: "Ali Çelik", service: "Motor Bakımı", plate: "01 JKL 345" },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1))
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const monthNames = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ]
  const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"]

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const getAppointmentsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockAppointments.filter((apt) => apt.date === dateStr)
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Randevu Takvimi</h1>
              <p className="text-muted-foreground mt-1">Tüm randevularınızı takvim görünümünde yönetin</p>
            </div>
            <Button onClick={() => setIsNewAppointmentOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Randevu
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={previousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center font-semibold text-sm text-muted-foreground p-2">
                    {day}
                  </div>
                ))}

                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                  <div key={`empty-${i}`} className="min-h-[100px] p-2 border rounded-lg bg-muted/20" />
                ))}

                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1
                  const appointments = getAppointmentsForDate(day)
                  const isToday = day === 15 && currentDate.getMonth() === 0

                  return (
                    <div
                      key={day}
                      className={`min-h-[100px] p-2 border rounded-lg hover:bg-accent/50 transition-colors ${
                        isToday ? "border-primary border-2 bg-accent/30" : ""
                      }`}
                    >
                      <div className={`text-sm font-semibold mb-1 ${isToday ? "text-primary" : ""}`}>{day}</div>
                      <div className="space-y-1">
                        {appointments.map((apt) => (
                          <div
                            key={apt.id}
                            className="text-xs p-1 bg-primary/10 rounded border-l-2 border-primary cursor-pointer hover:bg-primary/20 transition-colors"
                          >
                            <div className="font-medium">{apt.time}</div>
                            <div className="truncate">{apt.customer}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Bugünün Randevuları</CardTitle>
                <CardDescription>15 Ocak 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAppointments
                    .filter((apt) => apt.date === "2025-01-15")
                    .map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{apt.customer}</div>
                          <div className="text-sm text-muted-foreground">{apt.service}</div>
                          <div className="text-xs text-muted-foreground">{apt.plate}</div>
                        </div>
                        <Badge variant="outline">{apt.time}</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yaklaşan Randevular</CardTitle>
                <CardDescription>Sonraki 3 gün</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAppointments
                    .filter((apt) => apt.date > "2025-01-15")
                    .slice(0, 3)
                    .map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{apt.customer}</div>
                          <div className="text-sm text-muted-foreground">{apt.service}</div>
                          <div className="text-xs text-muted-foreground">{apt.plate}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{apt.date}</div>
                          <div className="text-xs text-muted-foreground">{apt.time}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <NewAppointmentModal open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen} />
    </div>
  )
}
