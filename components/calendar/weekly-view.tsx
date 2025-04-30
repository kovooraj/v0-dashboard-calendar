"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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

// Import the jobs data from daily view
const dailyJobs = [
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

// Generate weekly job data based on the daily jobs
const generateWeeklyJobs = () => {
  const weeklyJobs = []

  // For each day of the week
  for (let day = 0; day < 7; day++) {
    // Create variations of the daily jobs for each day
    const dayJobs = dailyJobs.map((job) => {
      // Create a new job with slight variations
      const startVariation = Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
      const durationVariation = Math.floor(Math.random() * 2) // 0 or 1

      const newStartTime = Math.max(6, Math.min(17, job.startTime + startVariation))
      const newEndTime = Math.max(newStartTime + 1, Math.min(18, job.endTime + durationVariation))

      return {
        ...job,
        id: `${job.id}-day${day}`,
        startTime: newStartTime,
        endTime: newEndTime,
        day,
      }
    })

    // Only include some jobs for each day (random selection)
    const includedJobs = dayJobs.filter(() => Math.random() > 0.3)
    weeklyJobs.push(...includedJobs)
  }

  return weeklyJobs
}

const weeklyJobs = generateWeeklyJobs()

// Calculate utilization data based on jobs
const getUtilizationData = (pressId, date) => {
  const day = date.getDay() // 0-6 (Sunday-Saturday)

  // Filter jobs for this press and day
  const pressJobs = weeklyJobs.filter((job) => job.pressId === pressId && job.day === day)

  // Calculate total job hours
  let totalJobHours = 0
  pressJobs.forEach((job) => {
    totalJobHours += job.endTime - job.startTime
  })

  const shiftHours = 12 // 6am-6pm
  const utilization = Math.min(100, Math.round((totalJobHours / shiftHours) * 100))

  return {
    jobCount: pressJobs.length,
    utilization,
    jobHours: totalJobHours,
    shiftHours,
  }
}

export function WeeklyView() {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Get the start of the week (Sunday)
  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

  // Generate array of dates for the week
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    return date
  })

  const previousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const nextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const formatDateHeader = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    })
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={previousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-medium">{startOfWeek.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h3>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
          This Week
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden">
        {/* Days header */}
        <div className="grid grid-cols-[200px_1fr] border-b">
          <div className="p-2 font-medium text-sm border-r bg-muted/50">Press</div>
          <div className="grid grid-cols-7">
            {weekDates.map((date, index) => (
              <div
                key={index}
                className={cn(
                  "p-2 text-center text-sm font-medium border-r last:border-r-0",
                  date.toDateString() === new Date().toDateString() && "bg-primary/10",
                )}
              >
                {formatDateHeader(date)}
              </div>
            ))}
          </div>
        </div>

        {/* Press rows */}
        <div className="grid grid-cols-[200px_1fr]">
          {/* Press names */}
          <div className="border-r">
            {presses.map((press, index) => (
              <div
                key={press.id}
                className={cn("p-3 font-medium flex items-center h-24", index !== presses.length - 1 && "border-b")}
              >
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: press.color }} />
                {press.name}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div>
            {presses.map((press, pressIndex) => (
              <div
                key={press.id}
                className={cn("grid grid-cols-7 h-24", pressIndex !== presses.length - 1 && "border-b")}
              >
                {weekDates.map((date, dateIndex) => {
                  const { jobCount, utilization, jobHours, shiftHours } = getUtilizationData(press.id, date)

                  return (
                    <div
                      key={dateIndex}
                      className={cn(
                        "border-r last:border-r-0 p-2",
                        date.toDateString() === new Date().toDateString() && "bg-primary/5",
                      )}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div className="text-xs font-medium mb-1">
                          {jobCount} {jobCount === 1 ? "job" : "jobs"}
                        </div>

                        <div className="space-y-2 mb-1">
                          <Progress value={utilization} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            {jobHours}/{shiftHours} hrs ({utilization}%)
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
