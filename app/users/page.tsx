"use client"

import { useState } from "react"
import { NavigationMenu } from "@/components/navigation-menu"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserPlus, Search, MoreVertical, Mail, Phone, Shield, Edit, Trash2, Users } from "lucide-react"
import { AddUserModal } from "@/components/modals/add-user-modal"
import { EditUserModal } from "@/components/modals/edit-user-modal"

type User = {
  id: string
  name: string
  email: string
  phone: string
  role: "Yönetici" | "Kullanıcı" | "Servis Elemanı"
  status: "Aktif" | "Pasif"
  lastActive: string
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet@firma.com",
    phone: "0555 123 4567",
    role: "Yönetici",
    status: "Aktif",
    lastActive: "5 dakika önce",
  },
  {
    id: "2",
    name: "Ayşe Demir",
    email: "ayse@firma.com",
    phone: "0555 234 5678",
    role: "Kullanıcı",
    status: "Aktif",
    lastActive: "2 saat önce",
  },
  {
    id: "3",
    name: "Mehmet Kaya",
    email: "mehmet@firma.com",
    phone: "0555 345 6789",
    role: "Servis Elemanı",
    status: "Aktif",
    lastActive: "1 gün önce",
  },
  {
    id: "4",
    name: "Zeynep Arslan",
    email: "zeynep@firma.com",
    phone: "0555 456 7890",
    role: "Kullanıcı",
    status: "Pasif",
    lastActive: "3 gün önce",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery),
  )

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Yönetici":
        return "bg-primary text-primary-foreground"
      case "Kullanıcı":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
      case "Servis Elemanı":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
      setUsers(users.filter((user) => user.id !== userId))
    }
  }

  const handleToggleStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "Aktif" ? "Pasif" : "Aktif" } : user,
      ),
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-primary-foreground"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold">CarService</span>
        </div>
        <NavigationMenu />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Kullanıcı Yönetimi</h1>
                <p className="text-muted-foreground mt-1">Takım üyelerinizi ve yetkilerini yönetin</p>
              </div>
              <Button onClick={() => setShowAddModal(true)} size="lg">
                <UserPlus className="w-4 h-4 mr-2" />
                Kullanıcı Ekle
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Toplam Kullanıcı</CardDescription>
                  <CardTitle className="text-3xl">{users.length}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Aktif Kullanıcı</CardDescription>
                  <CardTitle className="text-3xl">{users.filter((u) => u.status === "Aktif").length}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Yönetici</CardDescription>
                  <CardTitle className="text-3xl">{users.filter((u) => u.role === "Yönetici").length}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Servis Elemanı</CardDescription>
                  <CardTitle className="text-3xl">{users.filter((u) => u.role === "Servis Elemanı").length}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tüm Kullanıcılar</CardTitle>
                    <CardDescription>Takımınızdaki tüm kullanıcıları görüntüleyin ve yönetin</CardDescription>
                  </div>
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Kullanıcı ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kullanıcı</TableHead>
                      <TableHead>İletişim</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>Son Aktiflik</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-3 h-3 text-muted-foreground" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-3 h-3 text-muted-foreground" />
                              <span>{user.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(user.role)} variant="secondary">
                            <Shield className="w-3 h-3 mr-1" />
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Aktif" ? "default" : "secondary"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => setEditingUser(user)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Düzenle
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                                <Users className="w-4 h-4 mr-2" />
                                {user.status === "Aktif" ? "Pasif Yap" : "Aktif Yap"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Sil
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Modals */}
      <AddUserModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(user) => {
          setUsers([...users, { ...user, id: Date.now().toString(), lastActive: "Az önce" }])
          setShowAddModal(false)
        }}
      />
      <EditUserModal
        open={!!editingUser}
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={(updatedUser) => {
          setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
          setEditingUser(null)
        }}
      />
    </div>
  )
}
