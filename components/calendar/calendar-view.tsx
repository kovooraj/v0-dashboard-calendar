"use client"

import { useState } from "react"
import { Calendar, Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DailyView } from "./daily-view"
import { WeeklyView } from "./weekly-view"
import { MonthlyView } from "./monthly-view"
import { CalendarFilters } from "./calendar-filters"

export function CalendarView() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Production Schedule</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Clock className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFilters && <CalendarFilters />}

      <Tabs defaultValue="daily" className="w-full">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="daily" className="mt-0">
          <DailyView />
        </TabsContent>

        <TabsContent value="weekly" className="mt-0">
          <WeeklyView />
        </TabsContent>

        <TabsContent value="monthly" className="mt-0">
          <MonthlyView />
        </TabsContent>
      </Tabs>
    </div>
  )
}
