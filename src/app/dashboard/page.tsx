'use client'

import { useState } from 'react'
import {
  BarChart3,
  ListTodo,
  Activity,
  Settings,
  MoreVertical,
  CheckCircle2,
  Circle,
  Plus,
  Clock,
  Star,
  Users,
  Award,
  Target,
  BookOpen,
  ChevronRight,
  Calendar,
  TrendingUp,
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { DashboardRoute } from '@/components/auth/AuthGuard'

export default function DashboardPage() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete React Course',
      subtitle: 'Chapter 5: State Management',
      completed: false,
    },
    {
      id: 2,
      title: 'Practice DSA Problems',
      subtitle: 'Arrays and Strings',
      completed: false,
    },
    {
      id: 3,
      title: 'Prepare for Interview',
      subtitle: 'Mock interview with mentor',
      completed: true,
    },
  ])

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const projects = [
    {
      id: 1,
      title: 'JEE Preparation',
      progress: 78,
      totalSessions: 12,
      completedSessions: 9,
      nextSession: 'Tomorrow, 4:00 PM',
      mentor: 'Dr. Priya Sharma',
      subject: 'Physics & Mathematics',
    },
    {
      id: 2,
      title: 'Web Development',
      progress: 45,
      totalSessions: 8,
      completedSessions: 4,
      nextSession: 'Friday, 6:00 PM',
      mentor: 'Rajesh Kumar',
      subject: 'Full Stack Development',
    },
    {
      id: 3,
      title: 'Career Guidance',
      progress: 90,
      totalSessions: 5,
      completedSessions: 4,
      nextSession: 'Next Week',
      mentor: 'Anita Desai',
      subject: 'Career Planning',
    },
  ]

  const stats = [
    {
      label: 'Total Sessions',
      value: '24',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Hours Learned',
      value: '156',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Goals Achieved',
      value: '8',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Avg Rating',
      value: '4.8',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      mentor: 'Dr. Priya Sharma',
      subject: 'Physics - Mechanics',
      time: 'Today, 4:00 PM',
      duration: '60 min',
      type: 'Video Call',
    },
    {
      id: 2,
      mentor: 'Rajesh Kumar',
      subject: 'React.js Development',
      time: 'Tomorrow, 6:00 PM',
      duration: '90 min',
      type: 'Screen Share',
    },
    {
      id: 3,
      mentor: 'Anita Desai',
      subject: 'Career Planning',
      time: 'Friday, 2:00 PM',
      duration: '45 min',
      type: 'Discussion',
    },
  ]

  return (
    <DashboardRoute>
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <Header />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
              Good morning, Arjun!
            </h1>
            <p className="text-slate-600 dark:text-neutral-400">
              You have 3 upcoming sessions and 2 pending tasks to complete.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-neutral-400">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`h-12 w-12 ${stat.bgColor} flex items-center justify-center rounded-lg dark:bg-neutral-700`}
                  >
                    <stat.icon
                      className={`h-6 w-6 ${stat.color} dark:text-neutral-300`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Projects & Tasks */}
            <div className="space-y-8 lg:col-span-2">
              {/* Active Projects */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Active Learning Paths
                  </h2>
                  <button className="text-slate-600 transition-colors hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {projects.map(project => (
                    <div
                      key={project.id}
                      className="rounded-lg bg-slate-50 p-4 dark:bg-neutral-700"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {project.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-neutral-400">
                            {project.subject}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-neutral-300">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="mb-3 h-2 w-full rounded-full bg-slate-200 dark:bg-neutral-600">
                        <div
                          className="h-2 rounded-full bg-slate-900 transition-all duration-300 dark:bg-brand-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-neutral-400">
                        <span>Mentor: {project.mentor}</span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {project.nextSession}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tasks */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Today's Tasks
                  </h2>
                  <button className="flex items-center text-slate-600 transition-colors hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white">
                    <Plus className="mr-1 h-5 w-5" />
                    Add Task
                  </button>
                </div>
                <div className="space-y-3">
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      className="flex items-center rounded-lg p-3 transition-colors hover:bg-slate-50 dark:hover:bg-neutral-700"
                    >
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="mr-3 flex-shrink-0"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-400 dark:text-neutral-500" />
                        )}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-medium ${task.completed ? 'text-slate-500 line-through dark:text-neutral-500' : 'text-slate-900 dark:text-white'}`}
                        >
                          {task.title}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-neutral-400">
                          {task.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Upcoming Sessions & Quick Actions */}
            <div className="space-y-8">
              {/* Upcoming Sessions */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Upcoming Sessions
                  </h2>
                  <button className="text-slate-600 transition-colors hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white">
                    <Calendar className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {upcomingSessions.map(session => (
                    <div
                      key={session.id}
                      className="rounded-lg border border-slate-200 p-4 dark:border-neutral-600"
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                            {session.subject}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-neutral-400">
                            {session.mentor}
                          </p>
                        </div>
                        <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-neutral-700 dark:text-neutral-300">
                          {session.type}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-neutral-400">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {session.time}
                        </span>
                        <span>{session.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full rounded-lg py-2 text-center text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white">
                  View All Sessions
                </button>
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
                <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <button className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-neutral-700">
                    <div className="flex items-center">
                      <Users className="mr-3 h-5 w-5 text-slate-600 dark:text-neutral-400" />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        Find New Mentors
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 dark:text-neutral-500" />
                  </button>
                  <button className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-neutral-700">
                    <div className="flex items-center">
                      <Calendar className="mr-3 h-5 w-5 text-slate-600 dark:text-neutral-400" />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        Schedule Session
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 dark:text-neutral-500" />
                  </button>
                  <button className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-neutral-700">
                    <div className="flex items-center">
                      <TrendingUp className="mr-3 h-5 w-5 text-slate-600 dark:text-neutral-400" />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        View Progress
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 dark:text-neutral-500" />
                  </button>
                  <button className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-neutral-700">
                    <div className="flex items-center">
                      <Settings className="mr-3 h-5 w-5 text-slate-600 dark:text-neutral-400" />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        Account Settings
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 dark:text-neutral-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </DashboardRoute>
  )
}
