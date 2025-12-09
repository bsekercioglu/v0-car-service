"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Clock, AlertCircle, CheckCircle, Info, X } from "lucide-react"
import { useState } from "react"

interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Randevu Yaklaşıyor",
    message: "Ahmet Yılmaz'ın randevusu 30 dakika içinde başlıyor.",
    time: "5 dakika önce",
    read: false,
  },
  {
    id: "2",
    type: "success",
    title: "Servis Tamamlandı",
    message: "Mercedes C200 periyodic bakımı başarıyla tamamlandı.",
    time: "1 saat önce",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Yeni Müşteri",
    message: "Zeynep Kaya sisteme yeni müşteri olarak eklendi.",
    time: "2 saat önce",
    read: false,
  },
  {
    id: "4",
    type: "error",
    title: "Parça Eksikliği",
    message: "BMW 320i için sipariş edilen fren diski tedarikçide mevcut değil.",
    time: "3 saat önce",
    read: true,
  },
  {
    id: "5",
    type: "info",
    title: "Ödeme Alındı",
    message: "Ali Demir 2.500 TL tutarında ödeme yaptı.",
    time: "4 saat önce",
    read: true,
  },
]

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Bildirimler</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Tümünü Okundu İşaretle
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Henüz bildirim bulunmuyor</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex gap-3 p-3 rounded-lg border transition-colors ${
                !notification.read ? "bg-accent/50 border-primary/20" : "bg-muted/30 border-border"
              }`}
              onClick={() => !notification.read && markAsRead(notification.id)}
            >
              <div className="flex-shrink-0 pt-1">{getIcon(notification.type)}</div>
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeNotification(notification.id)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{notification.time}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
