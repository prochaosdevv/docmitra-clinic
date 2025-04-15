"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface EditableTagsProps {
  tags: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  className?: string
}

export function EditableTags({ tags, onChange, placeholder = "Add new tag...", className }: EditableTagsProps) {
  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()]
      onChange(updatedTags)
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    onChange(updatedTags)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs py-0 h-5 gap-1 pl-2 pr-1">
            {tag}
            <button onClick={() => handleRemoveTag(tag)} className="rounded-full hover:bg-muted-foreground/20">
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-1.5">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="h-7 text-xs"
        />
        <Button size="sm" variant="outline" className="h-7 px-2" onClick={handleAddTag} disabled={newTag.trim() === ""}>
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
