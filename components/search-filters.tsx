"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, X } from "lucide-react"

interface SearchFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  departmentFilter: string[]
  setDepartmentFilter: (departments: string[]) => void
  ratingFilter: number[]
  setRatingFilter: (ratings: number[]) => void
  departments: string[]
}

export function SearchFilters({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  ratingFilter,
  setRatingFilter,
  departments,
}: SearchFiltersProps) {
  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (checked) {
      setDepartmentFilter([...departmentFilter, department])
    } else {
      setDepartmentFilter(departmentFilter.filter((d) => d !== department))
    }
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setRatingFilter([...ratingFilter, rating])
    } else {
      setRatingFilter(ratingFilter.filter((r) => r !== rating))
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setDepartmentFilter([])
    setRatingFilter([])
  }

  const hasActiveFilters = searchTerm || departmentFilter.length > 0 || ratingFilter.length > 0

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Department
                {departmentFilter.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {departmentFilter.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {departments.map((department) => (
                <DropdownMenuCheckboxItem
                  key={department}
                  checked={departmentFilter.includes(department)}
                  onCheckedChange={(checked) => handleDepartmentChange(department, checked)}
                >
                  {department}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Rating
                {ratingFilter.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {ratingFilter.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {[5, 4, 3, 2, 1].map((rating) => (
                <DropdownMenuCheckboxItem
                  key={rating}
                  checked={ratingFilter.includes(rating)}
                  onCheckedChange={(checked) => handleRatingChange(rating, checked)}
                >
                  {rating} Star{rating !== 1 ? "s" : ""}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {(departmentFilter.length > 0 || ratingFilter.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {departmentFilter.map((department) => (
            <Badge key={department} variant="secondary" className="cursor-pointer">
              {department}
              <X className="h-3 w-3 ml-1" onClick={() => handleDepartmentChange(department, false)} />
            </Badge>
          ))}
          {ratingFilter.map((rating) => (
            <Badge key={rating} variant="secondary" className="cursor-pointer">
              {rating} Star{rating !== 1 ? "s" : ""}
              <X className="h-3 w-3 ml-1" onClick={() => handleRatingChange(rating, false)} />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
