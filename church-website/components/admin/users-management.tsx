"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface User {
  id: string
  email: string
  role: "admin" | "user"
  created_at: string
}

interface UsersManagementProps {
  language: "en" | "zh"
}

export default function UsersManagement({ language }: UsersManagementProps) {
  const [users, setUsers] = useState<User[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user" as "admin" | "user",
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleAdd = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      const { error: roleError } = await supabase
        .from("users")
        .insert([{ email: formData.email, role: formData.role }])

      if (roleError) throw roleError

      setIsAddDialogOpen(false)
      setFormData({ email: "", password: "", role: "user" })
      fetchUsers()
    } catch (error) {
      console.error("Error adding user:", error)
    }
  }

  const handleEdit = async () => {
    if (!selectedUser) return

    try {
      const { error } = await supabase
        .from("users")
        .update({ role: formData.role })
        .eq("id", selectedUser.id)

      if (error) throw error

      setIsEditDialogOpen(false)
      setSelectedUser(null)
      setFormData({ email: "", password: "", role: "user" })
      fetchUsers()
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", id)

      if (error) throw error
      fetchUsers()
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {language === "en" ? "Users" : "用户"}
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {language === "en" ? "Add New User" : "添加新用户"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {language === "en" ? "Add New User" : "添加新用户"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">
                  {language === "en" ? "Email" : "邮箱"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="password">
                  {language === "en" ? "Password" : "密码"}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="role">
                  {language === "en" ? "Role" : "角色"}
                </Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as "admin" | "user",
                    })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="user">
                    {language === "en" ? "User" : "用户"}
                  </option>
                  <option value="admin">
                    {language === "en" ? "Admin" : "管理员"}
                  </option>
                </select>
              </div>
              <Button onClick={handleAdd} className="w-full">
                {language === "en" ? "Add" : "添加"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              {language === "en" ? "Email" : "邮箱"}
            </TableHead>
            <TableHead>
              {language === "en" ? "Role" : "角色"}
            </TableHead>
            <TableHead>
              {language === "en" ? "Created At" : "创建时间"}
            </TableHead>
            <TableHead>
              {language === "en" ? "Actions" : "操作"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {language === "en"
                  ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  : user.role === "admin"
                  ? "管理员"
                  : "用户"}
              </TableCell>
              <TableCell>
                {new Date(user.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedUser(user)
                      setFormData({
                        email: user.email,
                        password: "",
                        role: user.role,
                      })
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === "en" ? "Edit User" : "编辑用户"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-email">
                {language === "en" ? "Email" : "邮箱"}
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="edit-role">
                {language === "en" ? "Role" : "角色"}
              </Label>
              <select
                id="edit-role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as "admin" | "user",
                  })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="user">
                  {language === "en" ? "User" : "用户"}
                </option>
                <option value="admin">
                  {language === "en" ? "Admin" : "管理员"}
                </option>
              </select>
            </div>
            <Button onClick={handleEdit} className="w-full">
              {language === "en" ? "Save Changes" : "保存更改"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 