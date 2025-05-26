"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Eye, Bookmark, TrendingUp, BookmarkCheck } from "lucide-react"
import { useBookmarks } from "@/contexts/bookmark-context"
import type { Employee } from "@/hooks/use-search"
import Link from "next/link"
import Image from "next/image"

interface EmployeeCardProps {
  employee: Employee
  onPromote?: (id: number) => void
}

export function EmployeeCard({ employee, onPromote }: EmployeeCardProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()
  const bookmarked = isBookmarked(employee.id)

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(employee.id)
    } else {
      addBookmark(employee.id)
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-500"
    if (rating >= 3) return "text-yellow-500"
    return "text-red-500"
  }

  const getDepartmentColor = (department: string) => {
    const colors = {
      Engineering: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Marketing: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Sales: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      HR: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      Finance: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      Operations: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    }
    return colors[department as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={employee.image || "/img1.jpg"}
              alt={`${employee.firstName} ${employee.lastName}`}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{employee.email}</p>
              <p className="text-sm text-muted-foreground">Age: {employee.age}</p>
            </div>
          </div>
          <Badge className={getDepartmentColor(employee.department)}>{employee.department}</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium">Performance:</span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= employee.rating ? `fill-current ${getRatingColor(employee.rating)}` : "text-gray-300"
                  }`}
                />
              ))}
              <span className={`text-sm font-medium ${getRatingColor(employee.rating)}`}>{employee.rating}/5</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Link href={`/employee/${employee.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </Link>

            <Button variant={bookmarked ? "default" : "outline"} size="sm" onClick={handleBookmark} className="flex-1">
              {bookmarked ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
              {bookmarked ? "Saved" : "Bookmark"}
            </Button>

            <Button variant="outline" size="sm" onClick={() => onPromote?.(employee.id)} className="flex-1">
              <TrendingUp className="h-4 w-4 mr-2" />
              Promote
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
