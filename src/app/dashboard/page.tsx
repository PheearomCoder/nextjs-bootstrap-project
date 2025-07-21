"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useRouter } from "next/navigation"

const enrolledCourses = [
  {
    id: 1,
    title: "C/C++ Programming",
    category: "Systems Programming",
    progress: 25,
    completedLessons: 2,
    totalLessons: 8,
    lastAccessed: "2 days ago",
    nextLesson: "Control Structures"
  },
  {
    id: 2,
    title: "Python Development",
    category: "General Programming",
    progress: 60,
    completedLessons: 6,
    totalLessons: 10,
    lastAccessed: "1 day ago",
    nextLesson: "File Handling and APIs"
  },
  {
    id: 3,
    title: "Web Development",
    category: "Web Development",
    progress: 40,
    completedLessons: 5,
    totalLessons: 12,
    lastAccessed: "3 days ago",
    nextLesson: "React Hooks and State"
  }
]

const achievements = [
  { title: "First Course Enrolled", description: "Welcome to CodeLearn!", earned: true },
  { title: "Quick Learner", description: "Complete 5 lessons in a day", earned: true },
  { title: "Consistent Student", description: "Study for 7 days straight", earned: false },
  { title: "Course Completer", description: "Complete your first course", earned: false }
]

export default function DashboardPage() {
  const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/auth/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    router.push("/")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p className="text-gray-600">Please wait while we load your dashboard.</p>
        </div>
      </div>
    )
  }

  const totalProgress = enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                CodeLearn
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
              <Link href="/courses" className="text-gray-600 hover:text-gray-900">Browse Courses</Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Continue your learning journey and track your progress.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrolledCourses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enrolledCourses.reduce((acc, course) => acc + course.completedLessons, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(totalProgress)}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {achievements.filter(a => a.earned).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Continue learning from where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          <Badge variant="secondary" className="mt-1">
                            {course.category}
                          </Badge>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <p>Last accessed: {course.lastAccessed}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-sm text-gray-600 mt-1">{course.progress}% complete</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Next lesson:</p>
                          <p className="font-medium">{course.nextLesson}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/courses/${course.id}`}>
                            <Button variant="outline" size="sm">
                              View Course
                            </Button>
                          </Link>
                          <Link href={`/courses/${course.id}/lessons/${course.completedLessons + 1}`}>
                            <Button size="sm">
                              Continue
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Link href="/courses">
                    <Button variant="outline">
                      Browse More Courses
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your learning milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-2 rounded ${
                        achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          achievement.earned ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div>
                        <p className={`font-medium text-sm ${
                          achievement.earned ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {achievement.title}
                        </p>
                        <p className={`text-xs ${
                          achievement.earned ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/courses">
                  <Button variant="outline" className="w-full justify-start">
                    Browse All Courses
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start">
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/certificates">
                  <Button variant="outline" className="w-full justify-start">
                    View Certificates
                  </Button>
                </Link>
                <Link href="/help">
                  <Button variant="outline" className="w-full justify-start">
                    Get Help
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
