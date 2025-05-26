"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Users, Star, Bookmark } from "lucide-react"

const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"]

const departmentRatings = departments.map((dept) => ({
  department: dept,
  averageRating: (Math.random() * 2 + 3).toFixed(1),
  employeeCount: Math.floor(Math.random() * 15) + 5,
}))

const bookmarkTrends = [
  { month: "Jan", bookmarks: 12 },
  { month: "Feb", bookmarks: 19 },
  { month: "Mar", bookmarks: 15 },
  { month: "Apr", bookmarks: 25 },
  { month: "May", bookmarks: 22 },
  { month: "Jun", bookmarks: 30 },
]

const performanceDistribution = [
  { rating: "5 Stars", count: 8, color: "#22c55e" },
  { rating: "4 Stars", count: 12, color: "#84cc16" },
  { rating: "3 Stars", count: 6, color: "#eab308" },
  { rating: "2 Stars", count: 3, color: "#f97316" },
  { rating: "1 Star", count: 1, color: "#ef4444" },
]

const chartConfig = {
  averageRating: {
    label: "Average Rating",
    color: "hsl(var(--chart-1))",
  },
  employeeCount: {
    label: "Employee Count",
    color: "hsl(var(--chart-2))",
  },
  bookmarks: {
    label: "Bookmarks",
    color: "hsl(var(--chart-3))",
  },
}

export default function AnalyticsPage() {
  const [totalEmployees, setTotalEmployees] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [totalBookmarks, setTotalBookmarks] = useState(0)

  useEffect(() => {
    const total = departmentRatings.reduce((sum, dept) => sum + dept.employeeCount, 0)
    const avgRating =
      departmentRatings.reduce((sum, dept) => sum + Number.parseFloat(dept.averageRating) * dept.employeeCount, 0) /
      total
    const bookmarks = bookmarkTrends[bookmarkTrends.length - 1].bookmarks

    setTotalEmployees(total)
    setAverageRating(avgRating)
    setTotalBookmarks(bookmarks)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Insights and trends across your organization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Across {departments.length} departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}/5</div>
            <p className="text-xs text-muted-foreground">Organization-wide performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookmarks</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookmarks}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceDistribution.find((p) => p.rating === "5 Stars")?.count || 0}
            </div>
            <p className="text-xs text-muted-foreground">5-star rated employees</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentRatings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis domain={[0, 5]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="averageRating" fill="var(--color-averageRating)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ rating, count }) => `${rating}: ${count}`}
                  >
                    {performanceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bookmark Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bookmarkTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="bookmarks"
                    stroke="var(--color-bookmarks)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-bookmarks)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Size</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentRatings} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="department" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="employeeCount" fill="var(--color-employeeCount)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-green-600">Top Performing Department</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {
                  departmentRatings.reduce((prev, current) =>
                    Number.parseFloat(prev.averageRating) > Number.parseFloat(current.averageRating) ? prev : current,
                  ).department
                }{" "}
                leads with{" "}
                {
                  departmentRatings.reduce((prev, current) =>
                    Number.parseFloat(prev.averageRating) > Number.parseFloat(current.averageRating) ? prev : current,
                  ).averageRating
                }
                /5 average rating
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-blue-600">Bookmark Growth</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Bookmarks increased by 20% this month, indicating higher employee engagement
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-purple-600">Performance Trend</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {(
                  ((performanceDistribution.find((p) => p.rating === "5 Stars")?.count || 0) / totalEmployees) *
                  100
                ).toFixed(1)}
                % of employees are top performers
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
