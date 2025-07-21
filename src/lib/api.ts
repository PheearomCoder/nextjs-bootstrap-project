// API configuration and utilities for Laravel backend integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// API client class
class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken')
    }
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token)
    }
  }

  // Remove authentication token
  removeToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
    }
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

// Create API client instance
export const apiClient = new ApiClient(API_BASE_URL)

// Type definitions for API responses
export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface Course {
  id: number
  title: string
  description: string
  category: string
  level: string
  duration: string
  price: number
  instructorId: number
  instructor: {
    id: number
    name: string
    bio: string
  }
  lessonsCount: number
  studentsCount: number
  rating: number
  createdAt: string
  updatedAt: string
}

export interface Lesson {
  id: number
  courseId: number
  title: string
  content: string
  duration: string
  order: number
  videoUrl?: string
  codeExercise?: {
    instruction: string
    starterCode: string
    solution: string
  }
  quiz?: {
    question: string
    options: string[]
    correctAnswer: number
  }
  createdAt: string
  updatedAt: string
}

export interface Enrollment {
  id: number
  userId: number
  courseId: number
  progress: number
  completedLessons: number[]
  enrolledAt: string
  lastAccessedAt: string
}

export interface AuthResponse {
  user: User
  token: string
  expiresIn: number
}

// API methods
export const authAPI = {
  // Register new user
  register: async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
  }): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData)
    apiClient.setToken(response.token)
    return response
  },

  // Login user
  login: async (credentials: {
    email: string
    password: string
  }): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    apiClient.setToken(response.token)
    return response
  },

  // Logout user
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
    apiClient.removeToken()
  },

  // Get current user
  me: async (): Promise<User> => {
    return apiClient.get<User>('/auth/me')
  },

  // Refresh token
  refresh: async (): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/refresh')
    apiClient.setToken(response.token)
    return response
  }
}

export const coursesAPI = {
  // Get all courses
  getAll: async (params?: {
    category?: string
    level?: string
    search?: string
    page?: number
    limit?: number
  }): Promise<{
    courses: Course[]
    total: number
    page: number
    totalPages: number
  }> => {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }
    const endpoint = `/courses${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return apiClient.get(endpoint)
  },

  // Get course by ID
  getById: async (id: number): Promise<Course> => {
    return apiClient.get<Course>(`/courses/${id}`)
  },

  // Get course lessons
  getLessons: async (courseId: number): Promise<Lesson[]> => {
    return apiClient.get<Lesson[]>(`/courses/${courseId}/lessons`)
  },

  // Get specific lesson
  getLesson: async (courseId: number, lessonId: number): Promise<Lesson> => {
    return apiClient.get<Lesson>(`/courses/${courseId}/lessons/${lessonId}`)
  },

  // Enroll in course
  enroll: async (courseId: number): Promise<Enrollment> => {
    return apiClient.post<Enrollment>(`/courses/${courseId}/enroll`)
  },

  // Get user's enrolled courses
  getEnrolled: async (): Promise<{
    enrollments: (Enrollment & { course: Course })[]
  }> => {
    return apiClient.get('/courses/enrolled')
  }
}

export const progressAPI = {
  // Mark lesson as completed
  completeLesson: async (courseId: number, lessonId: number): Promise<void> => {
    return apiClient.post(`/courses/${courseId}/lessons/${lessonId}/complete`)
  },

  // Submit quiz answer
  submitQuiz: async (
    courseId: number,
    lessonId: number,
    answer: number
  ): Promise<{ correct: boolean; score: number }> => {
    return apiClient.post(`/courses/${courseId}/lessons/${lessonId}/quiz`, {
      answer
    })
  },

  // Get user progress for a course
  getCourseProgress: async (courseId: number): Promise<{
    progress: number
    completedLessons: number[]
    quizScores: { [lessonId: number]: number }
  }> => {
    return apiClient.get(`/courses/${courseId}/progress`)
  }
}

// Error handling utility
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Request interceptor for handling common errors
export const handleApiError = (error: any): never => {
  if (error.status === 401) {
    // Unauthorized - redirect to login
    apiClient.removeToken()
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login'
    }
  }
  
  throw new ApiError(
    error.message || 'An unexpected error occurred',
    error.status,
    error.code
  )
}

// Utility function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('authToken')
}

// Utility function to get current user from token (basic JWT decode)
export const getCurrentUser = (): Partial<User> | null => {
  if (typeof window === 'undefined') return null
  
  const token = localStorage.getItem('authToken')
  if (!token) return null

  try {
    // In a real app, you'd properly decode the JWT
    // For demo purposes, we'll return mock data
    return {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'student'
    }
  } catch {
    return null
  }
}
