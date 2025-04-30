"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// Import the jobs data from daily view
const dailyJobs = [
  // Morning jobs
  {
    id: "job-1",
    jobNumber: "45652",
    pressId: "indigo-15k-1",
    startTime: 6, // 6 AM
    endTime: 11, // 11 AM
    coating: "UV Coating",
    status: "in-progress",
  },
  {
    id: "job-2",
    jobNumber: "45652",
    pressId: "indigo-15k-2",
    startTime: 7, // 7 AM
    endTime: 12, // 12 PM
    coating: "Matte AQ",
    status: "scheduled",
  },
  {
    id: "job-3",
    jobNumber: "45652",
    pressId: "indigo-15k-3",
    startTime: 6, // 6 AM
    endTime: 11, // 11 AM
    coating: "Matte AQ",
    status: "scheduled",
  },
  {
    id: "job-4",
    jobNumber: "45652",
    pressId: "indigo-15k-4",
    startTime: 7, // 7 AM
    endTime: 12, // 12 PM
    coating: "Matte AQ",
    status: "scheduled",
  },
  {
    id: "job-5",
    jobNumber: "45652",
    pressId: "indigo-12000-2",
    startTime: 7, // 7 AM
    endTime: 12, // 12 PM
    coating: "Gloss AQ",
    status: "scheduled",
  },
  {
    id: "job-6",
    jobNumber: "45652",
    pressId: "xl-106",
    startTime: 7, // 7 AM
    endTime: 12, // 12 PM
    coating: "UV Coat",
    status: "scheduled",
  },
  {
    id: "job-7",
    jobNumber: "45652",
    pressId: "cx-102",
    startTime: 6, // 6 AM
    endTime: 11, // 11 AM
    coating: "UV Coat",
    status: "scheduled",
  },

  // Afternoon jobs
  {
    id: "job-8",
    jobNumber: "62971",
    pressId: "indigo-15k-1",
    startTime: 12, // 12 PM
    endTime: 15, // 3 PM
    coating: "Gloss AQ",
    status: "scheduled",
  },
  {
    id: "job-9",
    jobNumber: "62973",
    pressId: "indigo-15k-2",
    startTime: 13, // 1 PM
    endTime: 17, // 5 PM
    coating: "Matte AQ",
    status: "scheduled",
  },
  {
    id: "job-10",
    jobNumber: "62914",
    pressId: "indigo-15k-3",
    startTime: 12, // 12 PM
    endTime: 14, // 2 PM
    coating: "UV Coat",
    status: "scheduled",
  },
  {
    id: "job-11",
    jobNumber: "62915",
    pressId: "indigo-15k-4",
    startTime: 13, // 1 PM
    endTime: 16, // 4 PM
    coating: "Matte AQ",
    status: "scheduled",
  },
  {
    id: "job-12",
    jobNumber: "62920",
    pressId: "indigo-12000-2",
    startTime: 13, // 1 PM
    endTime: 17, // 5 PM
    coating: "Gloss AQ",
    status: "scheduled",
  },
  {
    id: "job-13",
    jobNumber: "62925",
    pressId: "xl-106",
    startTime: 12, // 12 PM
    endTime: 15, // 3 PM
    coating: "UV Coat",
    status: "scheduled",
  },
  {
    id: "job-14",
    jobNumber: "62926",
    pressId: "cx-102",
    startTime: 12, // 12 PM
    endTime: 16, // 4 PM
    coating: "Matte AQ",
    status: "scheduled",
  },

  // Additional jobs with different time slots
  {
    id: "job-15",
    jobNumber: "72845",
    pressId: "indigo-15k-1",
    startTime: 16, // 4 PM
    endTime: 18, // 6 PM (extending beyond our visible range)
    coating: "UV Coating",
    status: "scheduled",
  },
  {
    id: "job-16",
    jobNumber: "72846",
    pressId: "indigo-15k-3",
    startTime: 15, // 3 PM
    endTime: 17, // 5 PM
    coating: "Gloss AQ",
    status: "scheduled",
  },
  {
    id: "job-17",
    jobNumber: "72847",
    pressId: "xl-106",
    startTime: 16, // 4 PM
    endTime: 18, // 6 PM (extending beyond our visible range)
    coating: "Matte AQ",
    status: "scheduled",
  },
  {
    id: "job-18",
    jobNumber: "72848",
    pressId: "cx-102",
    startTime: 17, // 5 PM
    endTime: 18, // 6 PM (extending beyond our visible range)
    coating: "UV Coat",
    status: "scheduled",
  },
]

// Generate monthly job data based on the daily jobs
const generateMonthlyJobData = (date) => {
  // Use the date to create a consistent but varied pattern
  const day = date.getDate()
  const seed = day + date.getMonth()

  // List of presses
  const presses = [
    { id: "indigo-15k-1", name: "Indigo 15K", color: "#9c5cff" },
    { id: "indigo-15k-2", name: "Indigo 15K", color: "#6366f1" },
    { id: "indigo-15k-3", name: "Indigo 15K", color: "#84cc16" },
    { id: "indigo-15k-4", name: "Indigo 15K", color: "#ca8a04" },
    { id: "indigo-12000-2", name: "Indigo 12000 2", color: "#4ade80" },
    { id: "xl-106", name: "XL106", color: "#f97316" },
    { id: "cx-102", name: "CX102", color: "#818cf8" },
  ]

  // Generate data for each press
  const pressData = presses.map((press) => {
    // Use the seed and press ID to create consistent but varied job counts
    const pressIndex = Number.parseInt(press.id.replace(/\D/g, "")) || 1
    const jobCountSeed = (seed * pressIndex) % 10
    const jobCount = Math.max(1, Math.min(5, Math.floor(jobCountSeed / 2) + 1))

    // Calculate utilization based on job count and a random factor
    const utilizationBase = jobCount * 20 // 20% per job
    const utilizationVariation = ((seed * pressIndex) % 20) - 10 // -10 to +10
    const utilization = Math.max(0, Math.min(100, utilizationBase + utilizationVariation))

    return {
      ...press,
      jobCount,
      utilization,
    }
  })

  // Only include some presses based on the date (to create variation)
  return pressData.filter((press) => {
    const shouldInclude = (seed + press.id.length) % 4 !== 0
    return shouldInclude
  })
}

export function MonthlyView() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)

  // Get last day of the month
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)

  // Get day of the week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDayOfMonth.getDay()

  // Calculate total days to display (previous month days + current month days)
  const totalDays = firstDayOfWeek + lastDayOfMonth.getDate()

  // Calculate rows needed (ceil to nearest week)
  const totalRows = Math.ceil(totalDays / 7)

  // Generate calendar days
  const calendarDays = []

  // Add previous month days
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate()
  for (let i = 0; i < firstDayOfWeek; i++) {
    const day = prevMonthLastDay - firstDayOfWeek + i + 1
    calendarDays.push({
      day,
      currentMonth: false,
      date: new Date(currentYear, currentMonth - 1, day),
    })
  }

  // Add current month days
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    calendarDays.push({
      day: i,
      currentMonth: true,
      date: new Date(currentYear, currentMonth, i),
    })
  }

  // Add next month days to fill the last row
  const remainingDays = totalRows * 7 - calendarDays.length
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      currentMonth: false,
      date: new Date(currentYear, currentMonth + 1, i),
    })
  }

  const previousMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  const nextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  // Sample press data for the legend
  const presses = [
    { id: "indigo-15k-1", name: "Indigo 15K", color: "#9c5cff" },
    { id: "indigo-15k-2", name: "Indigo 15K", color: "#6366f1" },
    { id: "indigo-15k-3", name: "Indigo 15K", color: "#84cc16" },
    { id: "indigo-15k-4", name: "Indigo 15K", color: "#ca8a04" },
    { id: "indigo-12000-2", name: "Indigo 12000 2", color: "#4ade80" },
    { id: "xl-106", name: "XL106", color: "#f97316" },
    { id: "cx-102", name: "CX102", color: "#818cf8" },
  ]

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-medium">{currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h3>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
          Today
        </Button>
      </div>

      {/* Press legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        {presses.map((press) => (
          <div key={press.id} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: press.color }} />
            <span className="text-xs">{press.name}</span>
          </div>
        ))}
      </div>

      <div className="border rounded-md overflow-hidden">
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b bg-muted/50">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            const pressData = day.currentMonth ? generateMonthlyJobData(day.date) : []
            const totalJobs = pressData.reduce((sum, press) => sum + press.jobCount, 0)
            const avgUtilization =
              pressData.length > 0
                ? Math.round(pressData.reduce((sum, press) => sum + press.utilization, 0) / pressData.length)
                : 0

            return (
              <div
                key={index}
                className={cn(
                  "border-r border-b p-1 min-h-24",
                  !day.currentMonth && "bg-muted/20 text-muted-foreground",
                  day.date.toDateString() === new Date().toDateString() && "bg-primary/5",
                  (index + 1) % 7 === 0 && "border-r-0",
                  index >= calendarDays.length - 7 && "border-b-0",
                )}
              >
                <div className="text-xs font-medium p-1">{day.day}</div>

                {day.currentMonth && pressData.length > 0 && (
                  <div className="mt-1 space-y-2">
                    <div className="text-xs font-medium">
                      {totalJobs} {totalJobs === 1 ? "job" : "jobs"}
                    </div>

                    {avgUtilization > 0 && (
                      <div className="space-y-1">
                        <Progress value={avgUtilization} className="h-1.5" />
                        <div className="text-[10px] text-muted-foreground">{avgUtilization}% utilization</div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 mt-1">
                      {pressData.slice(0, 3).map((press, i) => (
                        <div
                          key={i}
                          className="text-[10px] rounded px-1 py-0.5 text-white truncate"
                          style={{ backgroundColor: press.color }}
                        >
                          {press.jobCount}
                        </div>
                      ))}
                      {pressData.length > 3 && (
                        <div className="text-[10px] rounded px-1 py-0.5 bg-muted text-muted-foreground">
                          +{pressData.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
