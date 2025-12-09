import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-cards"
import { AppointmentsList } from "@/components/appointments-list"
import { ServiceHistory } from "@/components/service-history"
import { QuickActions } from "@/components/quick-actions"
import { NavigationMenu } from "@/components/navigation-menu"

export default function DashboardPage() {
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

        <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Servis operasyonlarınızı yönetin ve takip edin</p>
          </div>

          <StatsCards />

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <AppointmentsList />
              <ServiceHistory />
            </div>

            <div className="lg:col-span-1">
              <QuickActions />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
