"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface EditableTagsAreaProps {
  tags: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  className?: string
  previousTags?: string[]
  onRemovePrevious?: (tag: string) => void
}

export function EditableTagsArea({
  tags,
  onChange,
  placeholder = "Add new tag...",
  className,
  previousTags = [],
  onRemovePrevious,
}: EditableTagsAreaProps) {
  const [newTag, setNewTag] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleAddTag()
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [newTag])

  return (
    <div className={className}>
      {previousTags.length > 0 && (
        <div className="mb-2">
          <div className="text-xs text-muted-foreground mb-1">Previous:</div>
          <div className="flex flex-wrap gap-1.5">
            {previousTags.map((tag, index) => (
              <Badge key={`prev-${index}`} variant="secondary" className="text-xs py-0 h-5 gap-1 pl-2 pr-1">
                {tag}
                {onRemovePrevious && (
                  <button onClick={() => onRemovePrevious(tag)} className="rounded-full hover:bg-muted-foreground/20">
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {tag}</span>
                  </button>
                )}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="default" className="text-xs py-0 h-5 gap-1 pl-2 pr-1">
            {tag}
            <button onClick={() => handleRemoveTag(tag)} className="rounded-full hover:bg-primary-foreground/20">
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          </Badge>
        ))}
      </div>

      <div className="flex gap-1.5">
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-h-[60px] text-xs resize-none p-2"
          />
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-auto px-2 self-start"
          onClick={handleAddTag}
          disabled={newTag.trim() === ""}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
