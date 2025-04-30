import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CalendarFilters() {
  // Sample press data - replace with your actual press data
  const presses = [
    { id: "indigo-15k", name: "Indigo 15K" },
    { id: "indigo-18k", name: "Indigo 18K" },
    { id: "indigo-100k", name: "Indigo 100K" },
    { id: "indigo-12000", name: "Indigo 12000" },
    { id: "indigo-12000-2", name: "Indigo 12000 2" },
    { id: "xl-106", name: "XL106" },
    { id: "cx-102", name: "CX102" },
  ]

  return (
    <div className="p-4 border-b grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="search-jobs">Search Jobs</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id="search-jobs" placeholder="Search by job number, customer..." className="pl-8" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Press Selection</Label>
        <div className="grid grid-cols-2 gap-2">
          {presses.slice(0, 6).map((press) => (
            <div key={press.id} className="flex items-center space-x-2">
              <Checkbox id={press.id} defaultChecked />
              <Label htmlFor={press.id} className="text-sm font-normal">
                {press.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date-range">Date Range</Label>
          <Select defaultValue="today">
            <SelectTrigger id="date-range">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="next-week">Next Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Reset
          </Button>
          <Button size="sm">Apply Filters</Button>
        </div>
      </div>
    </div>
  )
}
