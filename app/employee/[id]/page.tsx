"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Star, Phone, MapPin, Mail, Calendar, Bookmark, BookmarkCheck, ArrowLeft } from "lucide-react"
import { useBookmarks } from "@/contexts/bookmark-context"
import type { Employee } from "@/hooks/use-search"
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

function generateProjectsForEmployee(
  employee: Employee,
): Array<{ id: number; name: string; status: string; completion: number }> {
  const projectTemplates = {
    Engineering: [
      "API Development",
      "Database Optimization",
      "Frontend Redesign",
      "Mobile App",
      "Cloud Migration",
      "Security Audit",
      "Performance Testing",
      "Code Review",
      "System Architecture",
      "DevOps Pipeline",
    ],
    Marketing: [
      "Campaign Strategy",
      "Social Media Management",
      "Brand Guidelines",
      "Market Research",
      "Content Creation",
      "SEO Optimization",
      "Email Marketing",
      "Product Launch",
      "Customer Analytics",
      "Influencer Outreach",
    ],
    Sales: [
      "Lead Generation",
      "Client Onboarding",
      "Sales Training",
      "CRM Implementation",
      "Territory Expansion",
      "Proposal Development",
      "Customer Retention",
      "Sales Analytics",
      "Partnership Development",
      "Revenue Forecasting",
    ],
    HR: [
      "Recruitment Drive",
      "Employee Training",
      "Performance Reviews",
      "Policy Updates",
      "Benefits Administration",
      "Team Building",
      "Compliance Audit",
      "Onboarding Process",
      "Exit Interviews",
      "Culture Initiative",
    ],
    Finance: [
      "Budget Planning",
      "Financial Audit",
      "Cost Analysis",
      "Investment Review",
      "Tax Preparation",
      "Risk Assessment",
      "Expense Management",
      "Financial Reporting",
      "Cash Flow Analysis",
      "Compliance Review",
    ],
    Operations: [
      "Process Improvement",
      "Supply Chain",
      "Quality Control",
      "Vendor Management",
      "Facility Management",
      "Inventory Optimization",
      "Workflow Automation",
      "Safety Training",
      "Equipment Maintenance",
      "Resource Planning",
    ],
  }

  const statuses = ["Planning", "In Progress", "Review", "Completed", "On Hold"]
  const departmentProjects =
    projectTemplates[employee.department as keyof typeof projectTemplates] || projectTemplates.Operations

  const numProjects = Math.floor(Math.random() * 3) + 2
  const selectedProjects = []

  for (let i = 0; i < numProjects; i++) {
    const projectIndex = (employee.id * 7 + i * 3) % departmentProjects.length
    const statusIndex = (employee.id + i * 2) % statuses.length
    const completion =
      statuses[statusIndex] === "Completed"
        ? 100
        : statuses[statusIndex] === "Planning"
          ? Math.floor(Math.random() * 25)
          : statuses[statusIndex] === "In Progress"
            ? Math.floor(Math.random() * 50) + 25
            : statuses[statusIndex] === "Review"
              ? Math.floor(Math.random() * 25) + 75
              : Math.floor(Math.random() * 40) + 10

    selectedProjects.push({
      id: i + 1,
      name: departmentProjects[projectIndex],
      status: statuses[statusIndex],
      completion: completion,
    })
  }

  return selectedProjects
}

const mockFeedback = [
  {
    id: 1,
    date: "2024-01-15",
    feedback: "Excellent work on the quarterly report. Shows great attention to detail.",
    rating: 5,
  },
  { id: 2, date: "2024-01-01", feedback: "Good collaboration skills and team player attitude.", rating: 4 },
  { id: 3, date: "2023-12-15", feedback: "Needs improvement in time management for project deadlines.", rating: 3 },
]

export default function EmployeeDetails() {
  const params = useParams()
  const id = params.id as string
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [projects, setProjects] = useState<Array<{ id: number; name: string; status: string; completion: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()

  const bookmarked = employee ? isBookmarked(employee.id) : false

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`)
        if (!response.ok) {
          throw new Error("Employee not found")
        }
        const userData = await response.json()
        const employeeData = generateEmployeeData(userData)
        setEmployee(employeeData)
        setProjects(generateProjectsForEmployee(employeeData))
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [id])

  const handleBookmark = () => {
    if (employee) {
      if (bookmarked) {
        removeBookmark(employee.id)
      } else {
        addBookmark(employee.id)
      }
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-500"
    if (rating >= 3) return "text-yellow-500"
    return "text-red-500"
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="lg:col-span-2">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !employee) {
    return (
      <div className="space-y-4">
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <Alert variant="destructive">
          <AlertDescription>{error || "Employee not found"}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <Button onClick={handleBookmark} variant={bookmarked ? "default" : "outline"}>
          {bookmarked ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center space-y-4">
                <Image
                  src={employee.image || "/img2.jpg"}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
                <div className="text-center">
                  <h1 className="text-2xl font-bold">
                    {employee.firstName} {employee.lastName}
                  </h1>
                  <Badge className="mt-2">{employee.department}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Age: {employee.age}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {employee.address.address}, {employee.address.city}
                </span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Performance Rating</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= employee.rating ? `fill-current ${getRatingColor(employee.rating)}` : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className={`text-sm font-medium ml-2 ${getRatingColor(employee.rating)}`}>
                      {employee.rating}/5
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Bio</h3>
                    <p className="text-muted-foreground">
                      Dedicated {employee.department.toLowerCase()} professional with{" "}
                      {Math.floor(Math.random() * 10) + 2} years of experience. Known for excellent problem-solving
                      skills and collaborative approach to team projects.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Performance History</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Q4 2023</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${star <= 4 ? "fill-current text-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Q3 2023</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= employee.rating ? "fill-current text-yellow-500" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{project.name}</h4>
                          <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${project.completion}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{project.completion}% complete</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockFeedback.map((feedback) => (
                      <div key={feedback.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm text-muted-foreground">{feedback.date}</span>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= feedback.rating ? "fill-current text-yellow-500" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">{feedback.feedback}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
