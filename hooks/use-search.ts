"use client"

import { useState, useMemo } from "react"

export interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  department: string
  rating: number
  phone: string
  address: {
    address: string
    city: string
    state: string
    postalCode: string
  }
  image: string
}

export function useSearch(employees: Employee[]) {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string[]>([])
  const [ratingFilter, setRatingFilter] = useState<number[]>([])

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDepartment = departmentFilter.length === 0 || departmentFilter.includes(employee.department)

      const matchesRating = ratingFilter.length === 0 || ratingFilter.includes(employee.rating)

      return matchesSearch && matchesDepartment && matchesRating
    })
  }, [employees, searchTerm, departmentFilter, ratingFilter])

  return {
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    ratingFilter,
    setRatingFilter,
    filteredEmployees,
  }
}
