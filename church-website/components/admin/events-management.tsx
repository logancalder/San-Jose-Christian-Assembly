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

interface Event {
  id: string
  name: string
  name_cn: string
  description: string
  description_cn: string
  timestamp: string
  location: string
  location_cn: string
}

interface EventsManagementProps {
  language: "en" | "zh"
}

export default function EventsManagement({ language }: EventsManagementProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    name: "",
    name_cn: "",
    description: "",
    description_cn: "",
    timestamp: "",
    location: "",
    location_cn: "",
  })

  const handleAddEvent = async () => {
    // TODO: Implement API call to add event
    setIsAddDialogOpen(false)
    setNewEvent({
      name: "",
      name_cn: "",
      description: "",
      description_cn: "",
      timestamp: "",
      location: "",
      location_cn: "",
    })
  }

  const handleEditEvent = async () => {
    // TODO: Implement API call to edit event
    setIsEditDialogOpen(false)
    setSelectedEvent(null)
  }

  const handleDeleteEvent = async (id: string) => {
    // TODO: Implement API call to delete event
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {language === "en" ? "Events" : "活动"}
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {language === "en" ? "Add New Event" : "添加新活动"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {language === "en" ? "Add New Event" : "添加新活动"}
              </DialogTitle>
              <DialogDescription>
                {language === "en"
                  ? "Add a new church event"
                  : "添加新的教会活动"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {language === "en" ? "Event Name (English)" : "活动名称（英文）"}
                </Label>
                <Input
                  id="name"
                  value={newEvent.name}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_cn">
                  {language === "en" ? "Event Name (Chinese)" : "活动名称（中文）"}
                </Label>
                <Input
                  id="name_cn"
                  value={newEvent.name_cn}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, name_cn: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">
                  {language === "en" ? "Description (English)" : "描述（英文）"}
                </Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description_cn">
                  {language === "en" ? "Description (Chinese)" : "描述（中文）"}
                </Label>
                <Textarea
                  id="description_cn"
                  value={newEvent.description_cn}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description_cn: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timestamp">
                  {language === "en" ? "Date and Time" : "日期和时间"}
                </Label>
                <Input
                  id="timestamp"
                  type="datetime-local"
                  value={newEvent.timestamp}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, timestamp: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">
                  {language === "en" ? "Location (English)" : "地点（英文）"}
                </Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location_cn">
                  {language === "en" ? "Location (Chinese)" : "地点（中文）"}
                </Label>
                <Input
                  id="location_cn"
                  value={newEvent.location_cn}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location_cn: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                {language === "en" ? "Cancel" : "取消"}
              </Button>
              <Button onClick={handleAddEvent}>
                {language === "en" ? "Add Event" : "添加活动"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === "en" ? "Name" : "名称"}</TableHead>
              <TableHead>{language === "en" ? "Date & Time" : "日期和时间"}</TableHead>
              <TableHead>{language === "en" ? "Location" : "地点"}</TableHead>
              <TableHead className="text-right">
                {language === "en" ? "Actions" : "操作"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  {language === "en" ? event.name : event.name_cn}
                </TableCell>
                <TableCell>{event.timestamp}</TableCell>
                <TableCell>
                  {language === "en" ? event.location : event.location_cn}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedEvent(event)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEvent(event.id)}
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
              {language === "en" ? "Edit Event" : "编辑活动"}
            </DialogTitle>
            <DialogDescription>
              {language === "en"
                ? "Edit the event details"
                : "编辑活动详情"}
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">
                  {language === "en" ? "Event Name (English)" : "活动名称（英文）"}
                </Label>
                <Input
                  id="edit-name"
                  value={selectedEvent.name}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-name_cn">
                  {language === "en" ? "Event Name (Chinese)" : "活动名称（中文）"}
                </Label>
                <Input
                  id="edit-name_cn"
                  value={selectedEvent.name_cn}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      name_cn: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">
                  {language === "en" ? "Description (English)" : "描述（英文）"}
                </Label>
                <Textarea
                  id="edit-description"
                  value={selectedEvent.description}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description_cn">
                  {language === "en" ? "Description (Chinese)" : "描述（中文）"}
                </Label>
                <Textarea
                  id="edit-description_cn"
                  value={selectedEvent.description_cn}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      description_cn: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-timestamp">
                  {language === "en" ? "Date and Time" : "日期和时间"}
                </Label>
                <Input
                  id="edit-timestamp"
                  type="datetime-local"
                  value={selectedEvent.timestamp}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      timestamp: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">
                  {language === "en" ? "Location (English)" : "地点（英文）"}
                </Label>
                <Input
                  id="edit-location"
                  value={selectedEvent.location}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location_cn">
                  {language === "en" ? "Location (Chinese)" : "地点（中文）"}
                </Label>
                <Input
                  id="edit-location_cn"
                  value={selectedEvent.location_cn}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      location_cn: e.target.value,
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
            <Button onClick={handleEditEvent}>
              {language === "en" ? "Save Changes" : "保存更改"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 