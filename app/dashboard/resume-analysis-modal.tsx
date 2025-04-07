"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResumeAnalysisModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeAnalysisModal({ isOpen, onClose }: ResumeAnalysisModalProps) {
  const [analysisStep, setAnalysisStep] = useState(1)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  // Simulate analysis progress
  useState(() => {
    if (isOpen && analysisStep === 1) {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => setAnalysisStep(2), 500)
            return 100
          }
          return prev + 5
        })
      }, 150)

      return () => clearInterval(interval)
    }
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Resume Analysis</DialogTitle>
          <DialogDescription>Our AI is analyzing your resume against the job description</DialogDescription>
        </DialogHeader>

        {analysisStep === 1 && (
          <div className="py-6">
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-100"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={36 * 2 * Math.PI}
                    strokeDashoffset={36 * 2 * Math.PI * (1 - analysisProgress / 100)}
                    className="text-emerald-500"
                  />
                </svg>
                <Sparkles className="absolute h-8 w-8 text-emerald-500" />
              </div>
            </div>

            <h3 className="text-center font-semibold text-lg mb-2">Analyzing Your Resume</h3>
            <p className="text-center text-slate-600 mb-6">
              Our AI is comparing your skills and experience with the job requirements
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Extracting skills and experience</span>
                  <span>{analysisProgress >= 40 ? "Complete" : "In progress..."}</span>
                </div>
                <Progress value={analysisProgress >= 40 ? 100 : analysisProgress * 2.5} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Analyzing job requirements</span>
                  <span>
                    {analysisProgress >= 70 ? "Complete" : analysisProgress >= 40 ? "In progress..." : "Waiting..."}
                  </span>
                </div>
                <Progress
                  value={analysisProgress >= 70 ? 100 : analysisProgress >= 40 ? (analysisProgress - 40) * 3.33 : 0}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Generating recommendations</span>
                  <span>
                    {analysisProgress >= 100 ? "Complete" : analysisProgress >= 70 ? "In progress..." : "Waiting..."}
                  </span>
                </div>
                <Progress
                  value={analysisProgress >= 100 ? 100 : analysisProgress >= 70 ? (analysisProgress - 70) * 3.33 : 0}
                  className="h-2"
                />
              </div>
            </div>
          </div>
        )}

        {analysisStep === 2 && (
          <div className="py-4">
            <Tabs defaultValue="overview">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="skills">Skills Match</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                        <span className="text-emerald-600 font-bold text-xl">78%</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Overall Match Score</h3>
                        <p className="text-sm text-slate-500">Your resume matches 78% of job requirements</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h3 className="font-medium mb-2">Key Strengths</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                          <span>UX/UI Design experience</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                          <span>Prototyping skills</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                          <span>Collaboration with developers</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h3 className="font-medium mb-2">Areas to Improve</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                          <span>Design system experience</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                          <span>User research methods</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                          <span>A/B testing experience</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium mb-2">Keywords to Add</h3>
                    <div className="flex flex-wrap gap-2">
                      <div className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs">Design Systems</div>
                      <div className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs">User Research</div>
                      <div className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs">A/B Testing</div>
                      <div className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs">Usability Testing</div>
                      <div className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs">
                        Information Architecture
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="skills">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium mb-3">Skills Match Analysis</h3>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>UI Design</span>
                          <span>95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Prototyping</span>
                          <span>90%</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Figma</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>User Research</span>
                          <span>60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Design Systems</span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>A/B Testing</span>
                          <span>30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium mb-2">Missing Skills</h3>
                    <p className="text-sm text-slate-600 mb-3">
                      These skills were mentioned in the job description but not found in your resume:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        <span>Experience with design systems</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        <span>A/B testing methodologies</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        <span>Information architecture</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="recommendations">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium mb-2">Resume Improvements</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start text-sm">
                        <div className="mt-0.5">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                        </div>
                        <div>
                          <p className="font-medium">Add specific metrics to your achievements</p>
                          <p className="text-slate-600">
                            Instead of "Improved user engagement", try "Increased user engagement by 45% through
                            redesigned onboarding flow"
                          </p>
                        </div>
                      </li>

                      <li className="flex items-start text-sm">
                        <div className="mt-0.5">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                        </div>
                        <div>
                          <p className="font-medium">Highlight design system experience</p>
                          <p className="text-slate-600">
                            Mention any work you've done with design systems, even if it was contributing to an existing
                            system
                          </p>
                        </div>
                      </li>

                      <li className="flex items-start text-sm">
                        <div className="mt-0.5">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                        </div>
                        <div>
                          <p className="font-medium">Add a skills section</p>
                          <p className="text-slate-600">
                            Create a dedicated skills section that includes the keywords from the job description
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium mb-2">Cover Letter Suggestions</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start text-sm">
                        <div className="mt-0.5">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                        </div>
                        <div>
                          <p className="font-medium">Address the design system experience gap</p>
                          <p className="text-slate-600">
                            Explain your interest in design systems and any related experience that could transfer to
                            this skill
                          </p>
                        </div>
                      </li>

                      <li className="flex items-start text-sm">
                        <div className="mt-0.5">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                        </div>
                        <div>
                          <p className="font-medium">Highlight collaboration skills</p>
                          <p className="text-slate-600">
                            The job description emphasizes cross-functional collaboration, so highlight your experience
                            working with developers and product managers
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        <DialogFooter>
          {analysisStep === 1 ? (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={onClose} className="mr-2">
                Close
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Sparkles className="mr-2 h-4 w-4" />
                Optimize Resume
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

