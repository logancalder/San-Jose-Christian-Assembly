"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2 } from "lucide-react"

interface Verse {
  id: string
  date: string
  verse: string
  verse_cn: string
  reflection: string
  reflection_cn: string
}

interface VersesManagementProps {
  language: "en" | "zh"
}

export default function VersesManagement({ language }: VersesManagementProps) {
  const [verses, setVerses] = useState<Verse[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null)
  const [newVerse, setNewVerse] = useState<Partial<Verse>>({
    date: "",
    verse: "",
    verse_cn: "",
    reflection: "",
    reflection_cn: "",
  })

  const handleAddVerse = async () => {
    // TODO: Implement API call to add verse
    setIsAddDialogOpen(false)
    setNewVerse({
      date: "",
      verse: "",
      verse_cn: "",
      reflection: "",
      reflection_cn: "",
    })
  }

  const handleEditVerse = async () => {
    // TODO: Implement API call to edit verse
    setIsEditDialogOpen(false)
    setSelectedVerse(null)
  }

  const handleDeleteVerse = async (id: string) => {
    // TODO: Implement API call to delete verse
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {language === "en" ? "Daily Verses" : "每日经文"}
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {language === "en" ? "Add New Verse" : "添加新经文"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {language === "en" ? "Add New Verse" : "添加新经文"}
              </DialogTitle>
              <DialogDescription>
                {language === "en"
                  ? "Add a new daily verse with its reflection"
                  : "添加新的每日经文和反思"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="date">
                  {language === "en" ? "Date" : "日期"}
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newVerse.date}
                  onChange={(e) =>
                    setNewVerse({ ...newVerse, date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="verse">
                  {language === "en" ? "Verse (English)" : "经文（英文）"}
                </Label>
                <Textarea
                  id="verse"
                  value={newVerse.verse}
                  onChange={(e) =>
                    setNewVerse({ ...newVerse, verse: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="verse_cn">
                  {language === "en" ? "Verse (Chinese)" : "经文（中文）"}
                </Label>
                <Textarea
                  id="verse_cn"
                  value={newVerse.verse_cn}
                  onChange={(e) =>
                    setNewVerse({ ...newVerse, verse_cn: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reflection">
                  {language === "en" ? "Reflection (English)" : "反思（英文）"}
                </Label>
                <Textarea
                  id="reflection"
                  value={newVerse.reflection}
                  onChange={(e) =>
                    setNewVerse({ ...newVerse, reflection: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reflection_cn">
                  {language === "en" ? "Reflection (Chinese)" : "反思（中文）"}
                </Label>
                <Textarea
                  id="reflection_cn"
                  value={newVerse.reflection_cn}
                  onChange={(e) =>
                    setNewVerse({ ...newVerse, reflection_cn: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                {language === "en" ? "Cancel" : "取消"}
              </Button>
              <Button onClick={handleAddVerse}>
                {language === "en" ? "Add Verse" : "添加经文"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === "en" ? "Date" : "日期"}</TableHead>
              <TableHead>{language === "en" ? "Verse" : "经文"}</TableHead>
              <TableHead>{language === "en" ? "Reflection" : "反思"}</TableHead>
              <TableHead className="text-right">
                {language === "en" ? "Actions" : "操作"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verses.map((verse) => (
              <TableRow key={verse.id}>
                <TableCell>{verse.date}</TableCell>
                <TableCell>
                  {language === "en" ? verse.verse : verse.verse_cn}
                </TableCell>
                <TableCell>
                  {language === "en" ? verse.reflection : verse.reflection_cn}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedVerse(verse)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteVerse(verse.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === "en" ? "Edit Verse" : "编辑经文"}
            </DialogTitle>
            <DialogDescription>
              {language === "en"
                ? "Edit the daily verse and its reflection"
                : "编辑每日经文和反思"}
            </DialogDescription>
          </DialogHeader>
          {selectedVerse && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-date">
                  {language === "en" ? "Date" : "日期"}
                </Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={selectedVerse.date}
                  onChange={(e) =>
                    setSelectedVerse({
                      ...selectedVerse,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-verse">
                  {language === "en" ? "Verse (English)" : "经文（英文）"}
                </Label>
                <Textarea
                  id="edit-verse"
                  value={selectedVerse.verse}
                  onChange={(e) =>
                    setSelectedVerse({
                      ...selectedVerse,
                      verse: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-verse_cn">
                  {language === "en" ? "Verse (Chinese)" : "经文（中文）"}
                </Label>
                <Textarea
                  id="edit-verse_cn"
                  value={selectedVerse.verse_cn}
                  onChange={(e) =>
                    setSelectedVerse({
                      ...selectedVerse,
                      verse_cn: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-reflection">
                  {language === "en" ? "Reflection (English)" : "反思（英文）"}
                </Label>
                <Textarea
                  id="edit-reflection"
                  value={selectedVerse.reflection}
                  onChange={(e) =>
                    setSelectedVerse({
                      ...selectedVerse,
                      reflection: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-reflection_cn">
                  {language === "en" ? "Reflection (Chinese)" : "反思（中文）"}
                </Label>
                <Textarea
                  id="edit-reflection_cn"
                  value={selectedVerse.reflection_cn}
                  onChange={(e) =>
                    setSelectedVerse({
                      ...selectedVerse,
                      reflection_cn: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {language === "en" ? "Cancel" : "取消"}
            </Button>
            <Button onClick={handleEditVerse}>
              {language === "en" ? "Save Changes" : "保存更改"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 