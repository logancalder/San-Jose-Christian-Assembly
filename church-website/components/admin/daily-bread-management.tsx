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

interface DailyBread {
  id: string
  date: string
  verse: string
}

interface DailyBreadManagementProps {
  language: "en" | "zh"
}

export default function DailyBreadManagement({ language }: DailyBreadManagementProps) {
  const [dailyBreads, setDailyBreads] = useState<DailyBread[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedDailyBread, setSelectedDailyBread] = useState<DailyBread | null>(null)
  const [formData, setFormData] = useState({
    date: "",
    verse: "",
  })

  useEffect(() => {
    fetchDailyBreads()
  }, [])

  const fetchDailyBreads = async () => {
    try {
      const { data, error } = await supabase
        .from("dailyBread")
        .select("*")
        .order("date", { ascending: false })

      if (error) throw error
      setDailyBreads(data || [])
    } catch (error) {
      console.error("Error fetching daily breads:", error)
    }
  }

  const handleAdd = async () => {
    try {
      const { error } = await supabase
        .from("dailyBread")
        .insert([formData])

      if (error) throw error
      setIsAddDialogOpen(false)
      setFormData({ date: "", verse: "" })
      fetchDailyBreads()
    } catch (error) {
      console.error("Error adding daily bread:", error)
    }
  }

  const handleEdit = async () => {
    if (!selectedDailyBread) return

    try {
      const { error } = await supabase
        .from("dailyBread")
        .update(formData)
        .eq("id", selectedDailyBread.id)

      if (error) throw error
      setIsEditDialogOpen(false)
      setSelectedDailyBread(null)
      setFormData({ date: "", verse: "" })
      fetchDailyBreads()
    } catch (error) {
      console.error("Error updating daily bread:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("dailyBread")
        .delete()
        .eq("id", id)

      if (error) throw error
      fetchDailyBreads()
    } catch (error) {
      console.error("Error deleting daily bread:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {language === "en" ? "Daily Bread" : "每日灵粮"}
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {language === "en" ? "Add New Daily Bread" : "添加新每日灵粮"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {language === "en" ? "Add New Daily Bread" : "添加新每日灵粮"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">
                  {language === "en" ? "Date" : "日期"}
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="verse">
                  {language === "en" ? "Verse" : "经文"}
                </Label>
                <Input
                  id="verse"
                  value={formData.verse}
                  onChange={(e) =>
                    setFormData({ ...formData, verse: e.target.value })
                  }
                />
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
              {language === "en" ? "Date" : "日期"}
            </TableHead>
            <TableHead>
              {language === "en" ? "Verse" : "经文"}
            </TableHead>
            <TableHead>
              {language === "en" ? "Actions" : "操作"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dailyBreads.map((bread) => (
            <TableRow key={bread.id}>
              <TableCell>{bread.date}</TableCell>
              <TableCell>{bread.verse}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedDailyBread(bread)
                      setFormData({
                        date: bread.date,
                        verse: bread.verse,
                      })
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(bread.id)}
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
              {language === "en" ? "Edit Daily Bread" : "编辑每日灵粮"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-date">
                {language === "en" ? "Date" : "日期"}
              </Label>
              <Input
                id="edit-date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-verse">
                {language === "en" ? "Verse" : "经文"}
              </Label>
              <Input
                id="edit-verse"
                value={formData.verse}
                onChange={(e) =>
                  setFormData({ ...formData, verse: e.target.value })
                }
              />
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