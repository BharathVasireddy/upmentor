'use client';

import { useState } from 'react';
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
  TrendingUp
} from 'lucide-react';
import WebsiteLayout from '@/components/layout/WebsiteLayout';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete React Course', subtitle: 'Chapter 5: State Management', completed: false },
    { id: 2, title: 'Practice DSA Problems', subtitle: 'Arrays and Strings', completed: false },
    { id: 3, title: 'Prepare for Interview', subtitle: 'Mock interview with mentor', completed: true }
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const projects = [
    {
      id: 1,
      title: 'JEE Preparation',
      progress: 78,
      totalSessions: 12,
      completedSessions: 9,
      nextSession: 'Tomorrow, 4:00 PM',
      mentor: 'Dr. Priya Sharma',
      subject: 'Physics & Mathematics'
    },
    {
      id: 2,
      title: 'Web Development',
      progress: 45,
      totalSessions: 8,
      completedSessions: 4,
      nextSession: 'Friday, 6:00 PM',
      mentor: 'Rajesh Kumar',
      subject: 'Full Stack Development'
    },
    {
      id: 3,
      title: 'Career Guidance',
      progress: 90,
      totalSessions: 5,
      completedSessions: 4,
      nextSession: 'Next Week',
      mentor: 'Anita Desai',
      subject: 'Career Planning'
    }
  ];

  const stats = [
    { label: 'Total Sessions', value: '24', icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Hours Learned', value: '156', icon: Clock, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Goals Achieved', value: '8', icon: Target, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
  ];

  const upcomingSessions = [
    {
      id: 1,
      mentor: 'Dr. Priya Sharma',
      subject: 'Physics - Mechanics',
      time: 'Today, 4:00 PM',
      duration: '60 min',
      type: 'Video Call'
    },
    {
      id: 2,
      mentor: 'Rajesh Kumar',
      subject: 'React.js Development',
      time: 'Tomorrow, 6:00 PM',
      duration: '90 min',
      type: 'Screen Share'
    },
    {
      id: 3,
      mentor: 'Anita Desai',
      subject: 'Career Planning',
      time: 'Friday, 2:00 PM',
      duration: '45 min',
      type: 'Discussion'
    }
  ];

  return (
    <WebsiteLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Good morning, Arjun!
          </h1>
          <p className="text-slate-600">
            You have 3 upcoming sessions and 2 pending tasks to complete.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Projects & Tasks */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Projects */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Active Learning Paths</h2>
                <button className="text-slate-600 hover:text-slate-900 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900">{project.title}</h3>
                        <p className="text-sm text-slate-600">{project.subject}</p>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-slate-900 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Mentor: {project.mentor}</span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {project.nextSession}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tasks */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Today's Tasks</h2>
                <button className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
                  <Plus className="w-5 h-5 mr-1" />
                  Add Task
                </button>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="mr-3 flex-shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-slate-600">{task.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Upcoming Sessions & Quick Actions */}
          <div className="space-y-8">
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Upcoming Sessions</h2>
                <button className="text-slate-600 hover:text-slate-900 transition-colors">
                  <Calendar className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-sm">{session.subject}</h3>
                        <p className="text-xs text-slate-600">{session.mentor}</p>
                      </div>
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                        {session.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {session.time}
                      </span>
                      <span>{session.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-center text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                View All Sessions
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full p-3 text-left rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-slate-600 mr-3" />
                    <span className="text-sm font-medium text-slate-900">Find New Mentors</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button className="w-full p-3 text-left rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-slate-600 mr-3" />
                    <span className="text-sm font-medium text-slate-900">Schedule Session</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button className="w-full p-3 text-left rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-slate-600 mr-3" />
                    <span className="text-sm font-medium text-slate-900">View Progress</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button className="w-full p-3 text-left rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center">
                    <Settings className="w-5 h-5 text-slate-600 mr-3" />
                    <span className="text-sm font-medium text-slate-900">Account Settings</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
} 