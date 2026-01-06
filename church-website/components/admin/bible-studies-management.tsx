"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface BibleStudy {
  id: string
  title: string
  content: string
  date: string
  language: "en" | "zh"
}

interface BibleStudyManagementProps {
  language: "en" | "zh"
}

export default function BibleStudyManagement({ language }: BibleStudyManagementProps) {
  const [bibleStudies, setBibleStudies] = useState<BibleStudy[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedBibleStudy, setSelectedBibleStudy] = useState<BibleStudy | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
    language: language,
  })

  useEffect(() => {
    fetchBibleStudies()
  }, [])

  const fetchBibleStudies = async () => {
    try {
      const { data, error } = await supabase
        .from("bibleStudies")
        .select("*")
        .eq("language", language)
        .order("date", { ascending: false })

      if (error) throw error
      setBibleStudies(data || [])
    } catch (error) {
      console.error("Error fetching bible studies:", error)
    }
  }

  const handleAdd = async () => {
    try {
      const { error } = await supabase
        .from("bibleStudies")
        .insert([formData])

      if (error) throw error
      setIsAddDialogOpen(false)
      setFormData({ title: "", content: "", date: "", language })
      fetchBibleStudies()
    } catch (error) {
      console.error("Error adding bible study:", error)
    }
  }

  const handleEdit = async () => {
    if (!selectedBibleStudy) return

    try {
      const { error } = await supabase
        .from("bibleStudies")
        .update(formData)
        .eq("id", selectedBibleStudy.id)

      if (error) throw error
      setIsEditDialogOpen(false)
      setSelectedBibleStudy(null)
      setFormData({ title: "", content: "", date: "", language })
      fetchBibleStudies()
    } catch (error) {
      console.error("Error updating bible study:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("bibleStudies")
        .delete()
        .eq("id", id)

      if (error) throw error
      fetchBibleStudies()
    } catch (error) {
      console.error("Error deleting bible study:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {language === "en" ? "Bible Studies" : "查经"}
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {language === "en" ? "Add New Bible Study" : "添加新查经"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {language === "en" ? "Add New Bible Study" : "添加新查经"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">
                  {language === "en" ? "Title" : "标题"}
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
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
                <Label htmlFor="content">
                  {language === "en" ? "Content" : "内容"}
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="min-h-[200px]"
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
              {language === "en" ? "Title" : "标题"}
            </TableHead>
            <TableHead>
              {language === "en" ? "Date" : "日期"}
            </TableHead>
            <TableHead>
              {language === "en" ? "Actions" : "操作"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bibleStudies.map((study) => (
            <TableRow key={study.id}>
              <TableCell>{study.title}</TableCell>
              <TableCell>{study.date}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedBibleStudy(study)
                      setFormData({
                        title: study.title,
                        content: study.content,
                        date: study.date,
                        language: study.language,
                      })
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(study.id)}
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {language === "en" ? "Edit Bible Study" : "编辑查经"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">
                {language === "en" ? "Title" : "标题"}
              </Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
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
              <Label htmlFor="edit-content">
                {language === "en" ? "Content" : "内容"}
              </Label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="min-h-[200px]"
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