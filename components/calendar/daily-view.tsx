"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Sample data - replace with your actual data
const presses = [
  { id: "indigo-15k-1", name: "Indigo 15K", color: "#9c5cff" },
  { id: "indigo-15k-2", name: "Indigo 15K", color: "#6366f1" },
  { id: "indigo-15k-3", name: "Indigo 15K", color: "#84cc16" },
  { id: "indigo-15k-4", name: "Indigo 15K", color: "#ca8a04" },
  { id: "indigo-12000-2", name: "Indigo 12000 2", color: "#4ade80" },
  { id: "xl-106", name: "XL106", color: "#f97316" },
  { id: "cx-102", name: "CX102", color: "#818cf8" },
]

// Adjusted job data with varying lengths and gaps between some jobs
const initialJobs = [
  // Indigo 15K-1
  {
    id: "job-1",
    jobNumber: "45652",
    pressId: "indigo-15k-1",
    startTime: 6, // 6 AM
    endTime: 8, // 8 AM (2 hour job)
    coating: "UV Coating",
    status: "in-progress",
  },
  // Gap of 1 hour
  {
    id: "job-8",
    jobNumber: "62971",
    pressId: "indigo-15k-1",
    startTime: 9, // 9 AM (1 hour gap after previous job)
    endTime: 13, // 1 PM (4 hour job)
    coating: "Gloss AQ",
    status: "scheduled",
  },
  {
    id: "job-15",
    jobNumber: "72845",
    pressId: "indigo-15k-1",
    startTime: 13, // 1 PM (no gap)
    endTime: 14.5, // 2:30 PM (1.5 hour job)
    coating: "UV Coating",
    status: "scheduled",
  },
  // Gap of 0.5 hour
  {
    id: "job-19",
    jobNumber: "72849",
    pressId: "indigo-15k-1",
    startTime: 15, // 3 PM (0.5 hour gap after previous job)
    endTime: 18, // 6 PM (3 hour job)
    coating: "Matte AQ",
    status: "scheduled",
  },

  // Indigo 15K-2
  {
    id: "job-2",
    jobNumber: "45653",
    pressId: "indigo-15k-2",
    startTime: 6, // 6 AM
    endTime: 10.5, // 10:30 AM (4.5 hour job)
    coating: "Matte AQ",
    status: "scheduled",
  },
  {
    id: "job-9",
    jobNumber: "62973",
    pressId: "indigo-15k-2",
    startTime: 10.5, // 10:30 AM (no gap)
    endTime: 12, // 12 PM (1.5 hour job)
    coating: "Matte AQ",
    status: "scheduled",
  },
  // Gap of 1.5 hours for lunch
  {
    id: "job-20",
    jobNumber: "72850",
    pressId: "indigo-15k-2",
    startTime: 13.5, // 1:30 PM (1.5 hour gap after previous job)
    endTime: 15, // 3 PM (1.5 hour job)
    coating: "UV Coating",
    status: "scheduled",
  },
  {
    id: "job-21",
    jobNumber: "72851",
    pressId: "indigo-15k-2",
    startTime: 15, // 3 PM (no gap)
    endTime: 18, // 6 PM (3 hour job)
    coating: "Gloss AQ",
    status: "scheduled",
  },

  // Indigo 15K-3
  {
    id: "job-3",
    jobNumber: "45654",
    pressId: "indigo-15k-3",
    startTime: 6, // 6 AM
    endTime: 7, // 7 AM (1 hour job)
    coating: "Matte AQ",
    status: "scheduled",
  },
  // Gap of 0.5 hour
  {
    id: "job-10",
    jobNumber: "62914",
    pressId: "indigo-15k-3",
    startTime: 7.5, // 7:30 AM (0.5 hour gap after previous job)
    endTime: 13, // 1 PM (5.5 hour job)
    coating: "UV Coat",
    status: "scheduled",
  },
  // Gap of 2 hours
  {
    id: "job-16",
    jobNumber: "72846",
    pressId: "indigo-15k-3",
    startTime: 15, // 3 PM (2 hour gap after previous job)
    endTime: 18, // 6 PM (3 hour job)
    coating: "Gloss AQ",
    status: "scheduled",
  },

  // Indigo 15K-4
  {
    id: "job-4",
    jobNumber: "45655",
    pressId: "indigo-15k-4",
    startTime: 6, // 6 AM
    endTime: 9.5, // 9:30 AM (3.5 hour job)
    coating: "Matte AQ",
    status: "scheduled",
  },
  {
    id: "job-11",
    jobNumber: "62915",
    pressId: "indigo-15k-4",
    startTime: 9.5, // 9:30 AM (no gap)
    endTime: 11, // 11 AM (1.5 hour job)
    coating: "Matte AQ",
    status: "scheduled",
  },
  // Gap of 1 hour
  {
    id: "job-23",
    jobNumber: "72853",
    pressId: "indigo-15k-4",
    startTime: 12, // 12 PM (1 hour gap after previous job)
    endTime: 16, // 4 PM (4 hour job)
    coating: "UV Coating",
    status: "scheduled",
  },
  // Gap of 1 hour
  {
    id: "job-24",
    jobNumber: "72854",
    pressId: "indigo-15k-4",
    startTime: 17, // 5 PM (1 hour gap after previous job)
    endTime: 18, // 6 PM (1 hour job)
    coating: "Gloss AQ",
    status: "scheduled",
  },

  // Indigo 12000-2
  {
    id: "job-5",
    jobNumber: "45656",
    pressId: "indigo-12000-2",
    startTime: 6, // 6 AM
    endTime: 12, // 12 PM (6 hour job)
    coating: "Gloss AQ",
    status: "scheduled",
  },
  // Gap of 0.5 hour
  {
    id: "job-25",
    jobNumber: "72855",
    pressId: "indigo-12000-2",
    startTime: 12.5, // 12:30 PM (0.5 hour gap after previous job)
    endTime: 14, // 2 PM (1.5 hour job)
    coating: "Matte AQ",
    status: "scheduled",
  },
  // Gap of 1 hour
  {
    id: "job-26",
    jobNumber: "72856",
    pressId: "indigo-12000-2",
    startTime: 15, // 3 PM (1 hour gap after previous job)
    endTime: 17, // 5 PM (2 hour job)
    coating: "UV Coating",
    status: "scheduled",
  },

  // XL106
  {
    id: "job-6",
    jobNumber: "45657",
    pressId: "xl-106",
    startTime: 6, // 6 AM
    endTime: 7.5, // 7:30 AM (1.5 hour job)
    coating: "UV Coat",
    status: "scheduled",
  },
  // Gap of 1 hour
  {
    id: "job-13",
    jobNumber: "62925",
    pressId: "xl-106",
    startTime: 8.5, // 8:30 AM (1 hour gap after previous job)
    endTime: 10, // 10 AM (1.5 hour job)
    coating: "UV Coat",
    status: "scheduled",
  },
  {
    id: "job-17",
    jobNumber: "72847",
    pressId: "xl-106",
    startTime: 10, // 10 AM (no gap)
    endTime: 15, // 3 PM (5 hour job)
    coating: "Matte AQ",
    status: "scheduled",
  },
  // Gap of 1.5 hours
  {
    id: "job-27",
    jobNumber: "72857",
    pressId: "xl-106",
    startTime: 16.5, // 4:30 PM (1.5 hour gap after previous job)
    endTime: 18, // 6 PM (1.5 hour job)
    coating: "Gloss AQ",
    status: "scheduled",
  },

  // CX102
  {
    id: "job-7",
    jobNumber: "45658",
    pressId: "cx-102",
    startTime: 6, // 6 AM
    endTime: 8.5, // 8:30 AM (2.5 hour job)
    coating: "UV Coat",
    status: "scheduled",
  },
  // Gap of 0.5 hour
  {
    id: "job-14",
    jobNumber: "62926",
    pressId: "cx-102",
    startTime: 9, // 9 AM (0.5 hour gap after previous job)
    endTime: 12, // 12 PM (3 hour job)
    coating: "Matte AQ",
    status: "scheduled",
  },
  // Gap of 1 hour for lunch
  {
    id: "job-18",
    jobNumber: "72848",
    pressId: "cx-102",
    startTime: 13, // 1 PM (1 hour gap after previous job)
    endTime: 17, // 5 PM (4 hour job)
    coating: "UV Coat",
    status: "scheduled",
  },
  // No gap
  {
    id: "job-28",
    jobNumber: "72858",
    pressId: "cx-102",
    startTime: 17, // 5 PM (no gap)
    endTime: 18, // 6 PM (1 hour job)
    coating: "Matte AQ",
    status: "scheduled",
  },
]

// Generate time slots from 6 AM to 5 PM
const timeSlots = Array.from({ length: 12 }, (_, i) => i + 6)

export function DailyView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [jobs, setJobs] = useState(initialJobs)
  const [draggedJob, setDraggedJob] = useState(null)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartTime, setDragStartTime] = useState(0)
  const timelineRef = useRef(null)

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  })

  const previousDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  const nextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  const getJobsForPress = (pressId) => {
    return jobs.filter((job) => job.pressId === pressId)
  }

  const formatTimeSlot = (hour) => {
    const isHalfHour = hour % 1 !== 0
    const hourPart = Math.floor(hour)
    const displayHour = hourPart > 12 ? hourPart - 12 : hourPart
    const amPm = hourPart >= 12 ? "pm" : "am"

    if (isHalfHour) {
      return `${displayHour}:30${amPm}`
    }
    return `${displayHour}${amPm}`
  }

  const handleDragStart = (e, job) => {
    setDraggedJob(job)
    setDragStartX(e.clientX)
    setDragStartTime(job.startTime)

    // Set a custom drag image (transparent)
    const img = new Image()
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    e.dataTransfer.setDragImage(img, 0, 0)

    // Set data for drag operation
    e.dataTransfer.setData("text/plain", job.id)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDrag = (e) => {
    if (!draggedJob || !e.clientX) return
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (!draggedJob || !timelineRef.current) return

    // Calculate the time slot based on mouse position
    const timelineRect = timelineRef.current.getBoundingClientRect()
    const timelineWidth = timelineRect.width - 150 // Subtract the press name column width
    const mouseX = e.clientX - timelineRect.left - 150
    const hourWidth = timelineWidth / 12 // 12 hours in our timeline

    // Calculate the time difference in hours (allow for half-hour precision)
    const hourDiff = Math.round((mouseX / hourWidth) * 2) / 2 - (dragStartTime - 6)

    if (hourDiff === 0) return // No change

    // Update the job times
    const updatedJobs = [...jobs]
    const jobIndex = updatedJobs.findIndex((job) => job.id === draggedJob.id)

    if (jobIndex !== -1) {
      const job = updatedJobs[jobIndex]
      const duration = job.endTime - job.startTime
      const newStartTime = Math.max(6, Math.min(18 - duration, job.startTime + hourDiff))
      const newEndTime = newStartTime + duration

      // Update the job
      updatedJobs[jobIndex] = {
        ...job,
        startTime: newStartTime,
        endTime: newEndTime,
      }

      setJobs(updatedJobs)
    }

    setDraggedJob(null)
  }

  const handleDragEnd = () => {
    setDraggedJob(null)
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={previousDay}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-medium">{formattedDate}</h3>
          <Button variant="outline" size="icon" onClick={nextDay}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
          Today
        </Button>
      </div>

      <div className="border rounded-md overflow-auto">
        <div className="min-w-[1000px]" ref={timelineRef}>
          {/* Time slots header */}
          <div className="grid grid-cols-[150px_repeat(12,1fr)] border-b">
            <div className="p-3 font-medium border-r bg-muted/50">Press</div>
            {timeSlots.map((hour) => (
              <div key={hour} className="p-3 text-center text-sm font-medium border-r last:border-r-0">
                {formatTimeSlot(hour)}
              </div>
            ))}
          </div>

          {/* Press rows */}
          {presses.map((press, index) => (
            <div
              key={press.id}
              className={cn(
                "grid grid-cols-[150px_repeat(12,1fr)] relative",
                index !== presses.length - 1 && "border-b",
              )}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {/* Press name */}
              <div className="p-3 font-medium border-r flex items-center h-16">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: press.color }} />
                {press.name}
              </div>

              {/* Time slots */}
              {timeSlots.map((hour, hourIndex) => (
                <div key={hour} className={cn("h-16 border-r last:border-r-0", hourIndex === 6 && "bg-muted/10")}></div>
              ))}

              {/* Jobs */}
              <TooltipProvider>
                {getJobsForPress(press.id).map((job) => {
                  const startPosition = ((job.startTime - 6) / 12) * 100 // Position as percentage
                  const duration = job.endTime - job.startTime
                  const width = (duration / 12) * 100 // Width as percentage

                  return (
                    <Tooltip key={job.id}>
                      <TooltipTrigger asChild>
                        <div
                          draggable
                          onDragStart={(e) => handleDragStart(e, job)}
                          onDrag={handleDrag}
                          onDragEnd={handleDragEnd}
                          className={cn(
                            "absolute top-1 bottom-1 rounded-md flex items-center justify-center text-xs font-medium text-black cursor-move hover:opacity-90 transition-opacity",
                            job.status === "in-progress" ? "border-2 border-white" : "",
                            draggedJob?.id === job.id ? "opacity-50" : "",
                          )}
                          style={{
                            backgroundColor: press.color,
                            left: `calc(150px + ${startPosition}%)`,
                            width: `${width}%`,
                          }}
                        >
                          {job.jobNumber}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1">
                          <p className="font-medium">Job #{job.jobNumber}</p>
                          <p className="text-xs">Press: {press.name}</p>
                          <p className="text-xs">Coating: {job.coating}</p>
                          <p className="text-xs">
                            Time: {formatTimeSlot(job.startTime)} - {formatTimeSlot(job.endTime)}
                          </p>
                          <p className="text-xs">Duration: {duration} hrs</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </TooltipProvider>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        <p>Tip: Drag and drop jobs to adjust their time slots.</p>
      </div>
    </div>
  )
}
