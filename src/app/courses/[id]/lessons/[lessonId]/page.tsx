"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

type LessonData = {
  [courseId: number]: {
    [lessonId: number]: {
      id: number;
      title: string;
      duration: string;
      content: string;
      codeExercise: {
        instruction: string;
        starterCode: string;
        solution: string;
      };
      quiz: {
        question: string;
        options: string[];
        correctAnswer: number;
      };
    };
  };
};

const lessonData: LessonData = {
  1: {
    1: {
      id: 1,
      title: "Introduction to C Programming",
      duration: "45 min",
      content: `
# Introduction to C Programming

Welcome to your first lesson in C programming! C is a powerful, general-purpose programming language that has been around since the 1970s and remains one of the most important languages in computer science.

## What is C?

C is a procedural programming language developed by Dennis Ritchie at Bell Labs. It's known for:

- **Efficiency**: C programs run fast and use memory efficiently
- **Portability**: C code can run on many different systems
- **Foundation**: Many other languages are based on C
- **System Programming**: Used for operating systems, embedded systems, and more

## Your First C Program

Let's start with the classic "Hello, World!" program:

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

### Breaking it down:

1. **#include <stdio.h>** - This includes the standard input/output library
2. **int main()** - This is the main function where program execution begins
3. **printf()** - This function prints text to the screen
4. **return 0** - This indicates the program ended successfully

## Try it yourself!

Use the code editor below to write and test your first C program.
      `,
      codeExercise: {
        instruction: "Write a C program that prints 'Welcome to CodeLearn!' to the screen.",
        starterCode: `#include <stdio.h>

int main() {
    // Write your code here
    
    return 0;
}`,
        solution: `#include <stdio.h>

int main() {
    printf("Welcome to CodeLearn!\\n");
    return 0;
}`
      },
      quiz: {
        question: "What does the #include <stdio.h> directive do in a C program?",
        options: [
          "It defines the main function",
          "It includes the standard input/output library",
          "It compiles the program",
          "It creates a variable"
        ],
        correctAnswer: 1
      }
    },
    2: {
      id: 2,
      title: "Variables and Data Types",
      duration: "60 min",
      content: `
# Variables and Data Types in C

In this lesson, we'll learn about variables and the different types of data you can store in C programs.

## What are Variables?

Variables are containers that store data values. In C, you must declare a variable before using it, specifying its data type.

## Basic Data Types

C has several built-in data types:

### Integer Types
- **int**: Stores whole numbers (typically 4 bytes)
- **short**: Smaller integers (typically 2 bytes)
- **long**: Larger integers (typically 8 bytes)

### Floating Point Types
- **float**: Single precision decimal numbers
- **double**: Double precision decimal numbers

### Character Type
- **char**: Stores single characters

## Variable Declaration

Here's how to declare and initialize variables:

\`\`\`c
#include <stdio.h>

int main() {
    // Integer variables
    int age = 25;
    int score = 100;
    
    // Floating point variables
    float height = 5.9;
    double pi = 3.14159;
    
    // Character variable
    char grade = 'A';
    
    // Print the variables
    printf("Age: %d\\n", age);
    printf("Score: %d\\n", score);
    printf("Height: %.1f\\n", height);
    printf("Pi: %.5f\\n", pi);
    printf("Grade: %c\\n", grade);
    
    return 0;
}
\`\`\`

## Format Specifiers

When using printf(), you need format specifiers:
- **%d** for integers
- **%f** for floats
- **%c** for characters
- **%s** for strings
      `,
      codeExercise: {
        instruction: "Create variables for your name (as a string), age (integer), and GPA (float), then print them.",
        starterCode: `#include <stdio.h>

int main() {
    // Declare your variables here
    
    // Print your variables here
    
    return 0;
}`,
        solution: `#include <stdio.h>

int main() {
    char name[] = "John Doe";
    int age = 20;
    float gpa = 3.75;
    
    printf("Name: %s\\n", name);
    printf("Age: %d\\n", age);
    printf("GPA: %.2f\\n", gpa);
    
    return 0;
}`
      },
      quiz: {
        question: "Which format specifier is used to print a floating-point number in C?",
        options: ["%d", "%f", "%c", "%s"],
        correctAnswer: 1
      }
    }
  },
  2: {
    1: {
      id: 1,
      title: "Python Basics and Syntax",
      duration: "60 min",
      content: `
# Python Basics and Syntax

Welcome to Python programming! Python is known for its simple, readable syntax that makes it perfect for beginners and powerful enough for experts.

## What makes Python special?

- **Readable**: Python code looks almost like English
- **Versatile**: Used for web development, data science, AI, and more
- **Large Community**: Extensive libraries and helpful community
- **Interpreted**: No need to compile, run code directly

## Your First Python Program

\`\`\`python
print("Hello, World!")
\`\`\`

That's it! Much simpler than C, right?

## Python Syntax Rules

1. **Indentation matters**: Python uses indentation to define code blocks
2. **No semicolons needed**: Line breaks separate statements
3. **Case sensitive**: \`variable\` and \`Variable\` are different
4. **Comments**: Use # for single-line comments

## Variables in Python

Python variables are dynamically typed - you don't need to declare the type:

\`\`\`python
# Numbers
age = 25
height = 5.9
pi = 3.14159

# Strings
name = "Alice"
message = 'Hello, World!'

# Boolean
is_student = True
is_working = False

# Print variables
print("Name:", name)
print("Age:", age)
print("Height:", height)
print("Is student:", is_student)
\`\`\`

## Basic Operations

\`\`\`python
# Arithmetic
a = 10
b = 3

print("Addition:", a + b)      # 13
print("Subtraction:", a - b)   # 7
print("Multiplication:", a * b) # 30
print("Division:", a / b)      # 3.333...
print("Integer Division:", a // b) # 3
print("Modulus:", a % b)       # 1
print("Exponent:", a ** b)     # 1000
\`\`\`
      `,
      codeExercise: {
        instruction: "Create a Python program that calculates and prints the area of a rectangle. Use variables for length and width.",
        starterCode: `# Calculate the area of a rectangle
# Your code here`,
        solution: `# Calculate the area of a rectangle
length = 10
width = 5
area = length * width

print("Length:", length)
print("Width:", width)
print("Area:", area)`
      },
      quiz: {
        question: "What symbol is used for comments in Python?",
        options: ["//", "/*", "#", "--"],
        correctAnswer: 2
      }
    }
  }
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = parseInt(params.id as string)
  const lessonId = parseInt(params.lessonId as string)
  
  const lesson = lessonData[courseId]?.[lessonId]
  
  const [userCode, setUserCode] = useState(lesson?.codeExercise?.starterCode || "")
  const [showSolution, setShowSolution] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showQuizResult, setShowQuizResult] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <Link href={`/courses/${courseId}`}>
            <Button>Back to Course</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleRunCode = () => {
    // Simulate code execution
    alert("Code executed successfully! (This is a simulation)")
  }

  const handleQuizSubmit = () => {
    setShowQuizResult(true)
    if (selectedAnswer === lesson.quiz.correctAnswer) {
      setLessonCompleted(true)
    }
  }

  const handleNextLesson = () => {
    const nextLessonId = lessonId + 1
    router.push(`/courses/${courseId}/lessons/${nextLessonId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                CodeLearn
              </Link>
              <span className="text-gray-400">/</span>
              <Link href={`/courses/${courseId}`} className="text-gray-600 hover:text-gray-900">
                Course
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">Lesson {lessonId}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Progress value={lessonCompleted ? 100 : 50} className="w-32" />
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Lesson Header */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="outline">Lesson {lessonId}</Badge>
                <Badge variant="secondary">{lesson.duration}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
            </div>

            {/* Lesson Content */}
            <Card>
              <CardHeader>
                <CardTitle>Lesson Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {lesson.content}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Code Exercise */}
            {lesson.codeExercise && (
              <Card>
                <CardHeader>
                  <CardTitle>Code Exercise</CardTitle>
                  <CardDescription>{lesson.codeExercise.instruction}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Code Editor</label>
                    <Textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="font-mono text-sm min-h-[200px]"
                      placeholder="Write your code here..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleRunCode}>Run Code</Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowSolution(!showSolution)}
                    >
                      {showSolution ? "Hide Solution" : "Show Solution"}
                    </Button>
                  </div>
                  {showSolution && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Solution:</h4>
                      <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
                        {lesson.codeExercise.solution}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quiz */}
            {lesson.quiz && (
              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Check</CardTitle>
                  <CardDescription>Test your understanding of this lesson</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-4">{lesson.quiz.question}</h4>
                    <div className="space-y-2">
                      {lesson.quiz.options.map((option: string, index: number) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="quiz"
                            value={index}
                            checked={selectedAnswer === index}
                            onChange={() => setSelectedAnswer(index)}
                            className="text-blue-600"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {!showQuizResult ? (
                    <Button 
                      onClick={handleQuizSubmit}
                      disabled={selectedAnswer === null}
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <div className={`p-4 rounded-lg ${
                      selectedAnswer === lesson.quiz.correctAnswer 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      <p className={`font-medium ${
                        selectedAnswer === lesson.quiz.correctAnswer 
                          ? 'text-green-800' 
                          : 'text-red-800'
                      }`}>
                        {selectedAnswer === lesson.quiz.correctAnswer 
                          ? '✓ Correct! Well done.' 
                          : '✗ Incorrect. The correct answer is: ' + lesson.quiz.options[lesson.quiz.correctAnswer]
                        }
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Lesson Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Content</span>
                    <span className="text-green-600">✓ Read</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Code Exercise</span>
                    <span className="text-gray-400">In Progress</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Quiz</span>
                    <span className={showQuizResult ? "text-green-600" : "text-gray-400"}>
                      {showQuizResult ? "✓ Complete" : "Pending"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/courses/${courseId}`}>
                  <Button variant="outline" className="w-full">
                    Back to Course
                  </Button>
                </Link>
                {lessonId > 1 && (
                  <Link href={`/courses/${courseId}/lessons/${lessonId - 1}`}>
                    <Button variant="outline" className="w-full">
                      Previous Lesson
                    </Button>
                  </Link>
                )}
                <Button 
                  onClick={handleNextLesson}
                  className="w-full"
                  disabled={!lessonCompleted}
                >
                  Next Lesson
                </Button>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Stuck on this lesson? Get help from our community or instructors.
                </p>
                <Button variant="outline" className="w-full">
                  Ask for Help
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
