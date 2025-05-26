"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useBookmarks } from "@/contexts/bookmark-context"
import type { Employee } from "@/hooks/use-search"
import { Star, Eye, BookmarkX, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"]

function generateEmployeeData(user: any): Employee {
  const departmentIndex = user.id % departments.length
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    age: user.age,
    department: departments[departmentIndex],
    rating: Math.floor(Math.random() * 5) + 1,
    phone: user.phone,
    address: user.address,
    image: user.image,
  }
}

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks()
  const [bookmarkedEmployees, setBookmarkedEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBookmarkedEmployees() {
      if (bookmarks.length === 0) {
        setBookmarkedEmployees([])
        setLoading(false)
        return
      }

      try {
        const employeePromises = bookmarks.map(async (id) => {
          const response = await fetch(`https://dummyjson.com/users/${id}`)
          if (response.ok) {
            const userData = await response.json()
            return generateEmployeeData(userData)
          }
          return null
        })

        const employees = await Promise.all(employeePromises)
        setBookmarkedEmployees(employees.filter((emp) => emp !== null) as Employee[])
      } catch (error) {
        console.error("Error fetching bookmarked employees:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookmarkedEmployees()
  }, [bookmarks])

  const handleRemoveBookmark = (id: number) => {
    removeBookmark(id)
  }

  const handlePromote = (id: number) => {
    alert(`Employee ${id} has been promoted!`)
  }

  const handleAssignProject = (id: number) => {
    alert(`Project assigned to employee ${id}!`)
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
          <p className="text-muted-foreground">Manage your saved employees</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
        <p className="text-muted-foreground">Manage your saved employees and take quick actions</p>
      </div>

      {bookmarkedEmployees.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No bookmarked employees</h3>
            <p className="text-muted-foreground mb-4">
              Start bookmarking employees from the dashboard to see them here.
            </p>
            <Link href="/">
              <Button>Go to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {bookmarkedEmployees.length} bookmarked employee{bookmarkedEmployees.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedEmployees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={employee.image || "/img3.png"}
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
                              star <= employee.rating
                                ? `fill-current ${getRatingColor(employee.rating)}`
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className={`text-sm font-medium ${getRatingColor(employee.rating)}`}>
                          {employee.rating}/5
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link href={`/employee/${employee.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveBookmark(employee.id)}
                        className="w-full"
                      >
                        <BookmarkX className="h-4 w-4 mr-2" />
                        Remove
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => handlePromote(employee.id)} className="w-full">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Promote
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAssignProject(employee.id)}
                        className="w-full"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Assign
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
