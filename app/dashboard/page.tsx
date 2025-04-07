"use client"

import { useState } from "react"
import {
  Briefcase,
  FileText,
  Upload,
  Sparkles,
  User,
  Settings,
  LogOut,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ResumeAnalysisModal } from "./resume-analysis-modal"

export default function Dashboard() {
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-semibold text-xl">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            <span>ResumeAI</span>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="hidden md:inline">Sarah Johnson</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-64 shrink-0">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard">
                      <FileText className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard/resumes">
                      <FileText className="mr-2 h-4 w-4" />
                      My Resumes
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard/applications">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Applications
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </Button>
                </nav>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Usage Stats</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Resume Optimizations</span>
                      <span>7/10</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Cover Letters</span>
                      <span>3/10</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Upgrade Plan
                </Button>
              </CardContent>
            </Card>
          </aside>

          <main className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Welcome back, Sarah!</h1>
                <p className="text-slate-600">Let's optimize your job applications today.</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-2">
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsAnalysisModalOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Application
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="optimize">Optimize Resume</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Active Applications</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-3xl font-bold">7</div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/dashboard/applications" className="text-sm text-emerald-600 hover:underline">
                        View all applications
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Interview Invites</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-3xl font-bold">2</div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/dashboard/interviews" className="text-sm text-emerald-600 hover:underline">
                        Prepare for interviews
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Resume Match Score</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-3xl font-bold">85%</div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/dashboard/optimize" className="text-sm text-emerald-600 hover:underline">
                        Improve your score
                      </Link>
                    </CardFooter>
                  </Card>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Track the status of your recent job applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-slate-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Senior Product Designer</h3>
                            <p className="text-sm text-slate-500">TechCorp Inc.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-slate-500">Applied 2 days ago</div>
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Review</Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-slate-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">UX Researcher</h3>
                            <p className="text-sm text-slate-500">InnovateLabs</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-slate-500">Applied 5 days ago</div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Interview Scheduled</Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-slate-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">UI Designer</h3>
                            <p className="text-sm text-slate-500">DesignHub Co.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-slate-500">Applied 1 week ago</div>
                          <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">No Response</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Applications
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Jobs</CardTitle>
                    <CardDescription>Based on your profile and preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-semibold">Senior UX Designer</h3>
                          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">95% Match</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">GlobalTech Solutions • San Francisco, CA</p>
                        <p className="text-sm mb-4">
                          Leading the design of innovative digital products for enterprise clients. Collaborate with
                          cross-functional teams to deliver exceptional user experiences.
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            Apply with ResumeAI
                          </Button>
                          <Button size="sm" variant="outline">
                            Save
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-semibold">Product Designer</h3>
                          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">88% Match</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">InnovateX • Remote</p>
                        <p className="text-sm mb-4">
                          Design user-centered digital experiences for a fast-growing startup. Work on multiple projects
                          from concept to launch with a focus on usability and visual design.
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            Apply with ResumeAI
                          </Button>
                          <Button size="sm" variant="outline">
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View More Jobs
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="applications">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Tracker</CardTitle>
                    <CardDescription>Monitor all your job applications in one place</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">Senior Product Designer</h3>
                          <p className="text-sm text-slate-500">TechCorp Inc. • San Francisco, CA</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                            <Clock className="mr-1 h-3 w-3" />
                            In Review
                          </Badge>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">UX Researcher</h3>
                          <p className="text-sm text-slate-500">InnovateLabs • New York, NY</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Interview
                          </Badge>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">UI Designer</h3>
                          <p className="text-sm text-slate-500">DesignHub Co. • Remote</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">
                            <Clock className="mr-1 h-3 w-3" />
                            No Response
                          </Badge>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">Interaction Designer</h3>
                          <p className="text-sm text-slate-500">CreativeSolutions • Chicago, IL</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Rejected
                          </Badge>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">Product Designer</h3>
                          <p className="text-sm text-slate-500">FutureTech • Austin, TX</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                            <Clock className="mr-1 h-3 w-3" />
                            In Review
                          </Badge>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Add Application</Button>
                    <Button variant="outline">Export Data</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="optimize">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Optimization</CardTitle>
                    <CardDescription>Tailor your resume to match job requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="job-description">Job Description</Label>
                        <Textarea
                          id="job-description"
                          placeholder="Paste the job description here..."
                          className="min-h-[150px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Upload Resume</Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                          <p className="text-sm text-slate-600 mb-2">
                            Drag and drop your resume here, or click to browse
                          </p>
                          <Input type="file" className="hidden" id="resume-upload" />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById("resume-upload")?.click()}
                          >
                            Select File
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Optimize Resume
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      <ResumeAnalysisModal isOpen={isAnalysisModalOpen} onClose={() => setIsAnalysisModalOpen(false)} />
    </div>
  )
}

