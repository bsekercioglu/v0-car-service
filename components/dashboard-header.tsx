"use client"

import { Button } from "@/components/ui/button"
import { Bell, Settings, User, Menu, CreditCard } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavigationMenu } from "@/components/navigation-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function DashboardHeader() {
  const notificationCount = 3

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <svg
                      className="h-5 w-5 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold">CarService</span>
                </div>
                <NavigationMenu />
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg className="h-5 w-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg font-semibold">CarService</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Bildirimler</h3>
                  <Badge variant="secondary">{notificationCount} yeni</Badge>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-3 hover:bg-accent cursor-pointer border-b">
                  <p className="text-sm font-medium">Randevu Yaklaşıyor</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ahmet Yılmaz'ın randevusu 30 dakika içinde başlıyor.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">5 dakika önce</p>
                </div>
                <div className="p-3 hover:bg-accent cursor-pointer border-b">
                  <p className="text-sm font-medium">Servis Tamamlandı</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Mercedes C200 periyodik bakımı başarıyla tamamlandı.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">1 saat önce</p>
                </div>
                <div className="p-3 hover:bg-accent cursor-pointer border-b">
                  <p className="text-sm font-medium">Yeni Müşteri</p>
                  <p className="text-xs text-muted-foreground mt-1">Zeynep Kaya sisteme eklendi.</p>
                  <p className="text-xs text-muted-foreground mt-2">2 saat önce</p>
                </div>
              </div>
              <div className="p-2 border-t">
                <Button variant="ghost" size="sm" className="w-full">
                  Tümünü Gör
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/subscription" className="flex items-center cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Abonelik Planı
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Ayarlar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Çıkış Yap</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
