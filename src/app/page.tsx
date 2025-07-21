"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

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

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">CodeLearn</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/courses" className="text-gray-600 hover:text-gray-900">Courses</Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Master Programming Languages
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Learn C/C++, Python, Web Development, and Mobile App Development with hands-on projects and expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Explore Courses
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Start Learning Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Courses</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive selection of programming courses designed for all skill levels
            </p>
          </div>

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
                    <Button className="w-full">View Course</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CodeLearn?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded"></div>
              </div>
              <h4 className="text-xl font-semibold mb-2">Interactive Learning</h4>
              <p className="text-gray-600">Practice coding with our built-in code editor and real-time feedback</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-600 rounded"></div>
              </div>
              <h4 className="text-xl font-semibold mb-2">Expert Instructors</h4>
              <p className="text-gray-600">Learn from industry professionals with years of experience</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded"></div>
              </div>
              <h4 className="text-xl font-semibold mb-2">Progress Tracking</h4>
              <p className="text-gray-600">Monitor your learning progress and earn certificates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">CodeLearn</h5>
              <p className="text-gray-400">Master programming languages with interactive courses and expert guidance.</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Courses</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/courses/cpp">C/C++</Link></li>
                <li><Link href="/courses/python">Python</Link></li>
                <li><Link href="/courses/web">Web Development</Link></li>
                <li><Link href="/courses/mobile">Mobile Apps</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CodeLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
