"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const courses = [
  {
    id: 1,
    title: "C/C++ Programming",
    description: "Master the fundamentals of C and C++ programming languages",
    level: "Beginner",
    duration: "8 weeks",
    students: 1250,
    category: "Systems Programming"
  },
  {
    id: 2,
    title: "Python Development",
    description: "Learn Python from basics to advanced concepts including data structures and algorithms",
    level: "Beginner",
    duration: "10 weeks",
    students: 2100,
    category: "General Programming"
  },
  {
    id: 3,
    title: "Web Development",
    description: "Full-stack web development with HTML, CSS, JavaScript, React, and Node.js",
    level: "Intermediate",
    duration: "12 weeks",
    students: 1800,
    category: "Web Development"
  },
  {
    id: 4,
    title: "Mobile App Development",
    description: "Build mobile applications for iOS and Android using React Native",
    level: "Intermediate",
    duration: "14 weeks",
    students: 950,
    category: "Mobile Development"
  }
]

export default function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">All Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <span>{course.duration}</span>
                <span>{course.students} students</span>
              </div>
              <Link href={`/courses/${course.id}`}>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  View Course
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
