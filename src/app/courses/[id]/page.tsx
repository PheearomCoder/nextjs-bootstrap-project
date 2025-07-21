"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useParams } from "next/navigation"

const courseData = {
  1: {
    id: 1,
    title: "C/C++ Programming",
    description: "Master the fundamentals of C and C++ programming languages with hands-on projects and real-world applications.",
    level: "Beginner",
    duration: "8 weeks",
    students: 1250,
    category: "Systems Programming",
    instructor: "Dr. Sarah Johnson",
    rating: 4.8,
    price: "$99",
    lessons: [
      { id: 1, title: "Introduction to C Programming", duration: "45 min", completed: false },
      { id: 2, title: "Variables and Data Types", duration: "60 min", completed: false },
      { id: 3, title: "Control Structures", duration: "75 min", completed: false },
      { id: 4, title: "Functions and Scope", duration: "90 min", completed: false },
      { id: 5, title: "Arrays and Pointers", duration: "120 min", completed: false },
      { id: 6, title: "Introduction to C++", duration: "60 min", completed: false },
      { id: 7, title: "Object-Oriented Programming", duration: "150 min", completed: false },
      { id: 8, title: "Final Project", duration: "180 min", completed: false }
    ]
  },
  2: {
    id: 2,
    title: "Python Development",
    description: "Learn Python from basics to advanced concepts including data structures, algorithms, and web development.",
    level: "Beginner",
    duration: "10 weeks",
    students: 2100,
    category: "General Programming",
    instructor: "Prof. Michael Chen",
    rating: 4.9,
    price: "$129",
    lessons: [
      { id: 1, title: "Python Basics and Syntax", duration: "60 min", completed: false },
      { id: 2, title: "Data Types and Variables", duration: "45 min", completed: false },
      { id: 3, title: "Control Flow and Loops", duration: "75 min", completed: false },
      { id: 4, title: "Functions and Modules", duration: "90 min", completed: false },
      { id: 5, title: "Data Structures", duration: "120 min", completed: false },
      { id: 6, title: "Object-Oriented Programming", duration: "150 min", completed: false },
      { id: 7, title: "File Handling and APIs", duration: "90 min", completed: false },
      { id: 8, title: "Web Development with Flask", duration: "180 min", completed: false },
      { id: 9, title: "Database Integration", duration: "120 min", completed: false },
      { id: 10, title: "Final Project", duration: "240 min", completed: false }
    ]
  },
  3: {
    id: 3,
    title: "Web Development",
    description: "Full-stack web development covering HTML, CSS, JavaScript, React, Node.js, and database integration.",
    level: "Intermediate",
    duration: "12 weeks",
    students: 1800,
    category: "Web Development",
    instructor: "Alex Rodriguez",
    rating: 4.7,
    price: "$199",
    lessons: [
      { id: 1, title: "HTML Fundamentals", duration: "60 min", completed: false },
      { id: 2, title: "CSS Styling and Layout", duration: "90 min", completed: false },
      { id: 3, title: "JavaScript Basics", duration: "120 min", completed: false },
      { id: 4, title: "DOM Manipulation", duration: "90 min", completed: false },
      { id: 5, title: "React Introduction", duration: "150 min", completed: false },
      { id: 6, title: "React Hooks and State", duration: "120 min", completed: false },
      { id: 7, title: "Node.js and Express", duration: "180 min", completed: false },
      { id: 8, title: "Database Design", duration: "90 min", completed: false },
      { id: 9, title: "API Development", duration: "150 min", completed: false },
      { id: 10, title: "Authentication and Security", duration: "120 min", completed: false },
      { id: 11, title: "Deployment", duration: "90 min", completed: false },
      { id: 12, title: "Capstone Project", duration: "300 min", completed: false }
    ]
  },
  4: {
    id: 4,
    title: "Mobile App Development",
    description: "Build cross-platform mobile applications for iOS and Android using React Native and modern development practices.",
    level: "Intermediate",
    duration: "14 weeks",
    students: 950,
    category: "Mobile Development",
    instructor: "Emma Thompson",
    rating: 4.6,
    price: "$249",
    lessons: [
      { id: 1, title: "Mobile Development Overview", duration: "45 min", completed: false },
      { id: 2, title: "React Native Setup", duration: "60 min", completed: false },
      { id: 3, title: "Components and Navigation", duration: "120 min", completed: false },
      { id: 4, title: "State Management", duration: "90 min", completed: false },
      { id: 5, title: "Styling and Layout", duration: "105 min", completed: false },
      { id: 6, title: "Native Device Features", duration: "150 min", completed: false },
      { id: 7, title: "Data Storage", duration: "120 min", completed: false },
      { id: 8, title: "API Integration", duration: "135 min", completed: false },
      { id: 9, title: "Push Notifications", duration: "90 min", completed: false },
      { id: 10, title: "Testing and Debugging", duration: "120 min", completed: false },
      { id: 11, title: "App Store Deployment", duration: "90 min", completed: false },
      { id: 12, title: "Performance Optimization", duration: "105 min", completed: false },
      { id: 13, title: "Advanced Features", duration: "180 min", completed: false },
      { id: 14, title: "Final Project", duration: "360 min", completed: false }
    ]
  }
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = parseInt(params.id as string)
  const course = courseData[courseId as keyof typeof courseData]
  const [isEnrolled, setIsEnrolled] = useState(false)

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">The course you're looking for doesn't exist.</p>
          <Link href="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  const completedLessons = course.lessons.filter(lesson => lesson.completed).length
  const progressPercentage = (completedLessons / course.lessons.length) * 100

  const handleEnroll = () => {
    setIsEnrolled(true)
    // TODO: Implement actual enrollment with Laravel backend
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Course Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="secondary">{course.category}</Badge>
            <Badge variant="outline">{course.level}</Badge>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{course.description}</p>
          
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>Instructor: <strong>{course.instructor}</strong></span>
            <span>Duration: <strong>{course.duration}</strong></span>
            <span>Students: <strong>{course.students}</strong></span>
            <span>Rating: <strong>{course.rating}/5</strong></span>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{course.price}</CardTitle>
              <CardDescription>One-time payment, lifetime access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isEnrolled ? (
                <Button onClick={handleEnroll} className="w-full" size="lg">
                  Enroll Now
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Your Progress</p>
                    <Progress value={progressPercentage} className="mb-2" />
                    <p className="text-sm text-gray-600">
                      {completedLessons} of {course.lessons.length} lessons completed
                    </p>
                  </div>
                  <Link href={`/courses/${course.id}/lessons/1`}>
                    <Button className="w-full" size="lg">
                      {completedLessons === 0 ? "Start Learning" : "Continue Learning"}
                    </Button>
                  </Link>
                </div>
              )}
              
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>Lessons:</span>
                  <span>{course.lessons.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span>{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{course.duration}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Content */}
      <Tabs defaultValue="curriculum" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="curriculum" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <CardDescription>
                {course.lessons.length} lessons • {course.duration} total duration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{lesson.title}</h4>
                        <p className="text-sm text-gray-600">{lesson.duration}</p>
                      </div>
                    </div>
                    {isEnrolled && (
                      <Link href={`/courses/${course.id}/lessons/${lesson.id}`}>
                        <Button variant="outline" size="sm">
                          {lesson.completed ? "Review" : "Start"}
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructor" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>About the Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{course.instructor}</h3>
                  <p className="text-gray-600 mb-4">
                    Experienced software engineer and educator with over 10 years in the industry. 
                    Passionate about teaching programming concepts and helping students build real-world skills.
                  </p>
                  <div className="text-sm text-gray-600">
                    <p>• 15+ years of industry experience</p>
                    <p>• 50,000+ students taught</p>
                    <p>• 4.8 average instructor rating</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Reviews</CardTitle>
              <CardDescription>
                {course.rating}/5 average rating from {course.students} students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">JD</span>
                    </div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-600">5/5 stars</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Excellent course! The instructor explains concepts clearly and the hands-on projects 
                    really helped me understand the material. Highly recommended for beginners.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-600">AS</span>
                    </div>
                    <div>
                      <p className="font-medium">Alice Smith</p>
                      <p className="text-sm text-gray-600">4/5 stars</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Great content and well-structured lessons. The pace is perfect for learning 
                    at your own speed. Would love to see more advanced topics covered.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600">MB</span>
                    </div>
                    <div>
                      <p className="font-medium">Mike Brown</p>
                      <p className="text-sm text-gray-600">5/5 stars</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    This course transformed my understanding of programming. The practical examples 
                    and real-world projects made all the difference. Thank you!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
