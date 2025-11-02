"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Send,
  ChevronRight,
  DollarSign,
  TrendingUp,
  GraduationCap,
  Heart,
  Briefcase,
  Users,
  Home,
  Dumbbell,
  Sparkles,
  Zap,
  Loader2,
} from "lucide-react"

type Message = {
  id: string
  type: "system" | "player"
  content: string
  timestamp: Date
}

type GameStats = {
  cash: number
  investments: number
  studies: number
  health: number
  relationships: number
  career: number
  social: number
  living: number
  personal: number
  motivation: number
}

function getAreaDetails(area: string) {
  // Placeholder implementation for getAreaDetails
  // This function should return details based on the area provided
  // For demonstration purposes, returning an empty object
  return {}
}

export default function GameScreen() {
  const [currentMonth, setCurrentMonth] = useState("January 2008")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content:
        "Welcome back to January 2008. You're standing at the beginning of a journey you've already lived once. But this time, you have the wisdom of hindsight. What will you do differently?",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "system",
      content:
        "The world is on the brink of a financial crisis. Social media is just beginning to reshape society. Your choices this month will set the tone for everything that follows.",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [stats, setStats] = useState<GameStats>({
    cash: 5000,
    investments: 0,
    studies: 50,
    health: 70,
    relationships: 60,
    career: 40,
    social: 55,
    living: 50,
    personal: 45,
    motivation: 80,
  })

  const [expandedArea, setExpandedArea] = useState<string | null>(null)
  const [userConfig, setUserConfig] = useState<any>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    const config = localStorage.getItem("lifeReloadedConfig")
    if (config) {
      setUserConfig(JSON.parse(config))
    }
  }, [])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: "player",
        content: inputValue,
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setInputValue("")
      setIsTyping(true)

      setTimeout(() => {
        setIsTyping(false)
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "system",
          content:
            "Interesting choice. Your decision will have consequences as the month unfolds. The world around you continues to shift...",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 1500)
    }
  }

  const handleAdvanceMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const [currentMonthName, year] = currentMonth.split(" ")
    const currentIndex = months.indexOf(currentMonthName)
    const nextIndex = (currentIndex + 1) % 12
    const nextYear = nextIndex === 0 ? Number.parseInt(year) + 1 : Number.parseInt(year)
    setCurrentMonth(`${months[nextIndex]} ${nextYear}`)

    const monthChangeMessage: Message = {
      id: Date.now().toString(),
      type: "system",
      content: `Time moves forward. It's now ${months[nextIndex]} ${nextYear}. What happened this month has shaped your path...`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, monthChangeMessage])
  }

  return (
    <main className="relative h-screen bg-black overflow-hidden flex">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 flex flex-1 max-w-[1800px] mx-auto w-full">
        {/* Chat Interface - Center */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b border-border/30 bg-card/30 backdrop-blur-sm px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className="text-2xl font-black tracking-tight text-foreground"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  LIFE RELOADED
                </h1>
                <p className="text-sm text-muted-foreground font-mono mt-1">Simulation in progress...</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent font-mono">{currentMonth}</div>
                  <div className="text-xs text-muted-foreground">Chapter 1</div>
                </div>
                <Button
                  onClick={handleAdvanceMonth}
                  variant="outline"
                  className="border-accent/50 text-accent hover:bg-accent/10 hover:border-accent bg-transparent"
                >
                  <ChevronRight className="w-4 h-4 mr-2" />
                  Next Month
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.type === "player" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`max-w-[75%] rounded-xl px-6 py-4 shadow-lg ${
                    message.type === "system"
                      ? "bg-card/60 border border-primary/30 text-foreground backdrop-blur-sm"
                      : "bg-accent/20 border border-accent/50 text-foreground backdrop-blur-sm"
                  }`}
                >
                  <div className="text-sm leading-relaxed text-pretty">{message.content}</div>
                  <div className="text-xs text-muted-foreground mt-3 font-mono opacity-60">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="max-w-[75%] rounded-xl px-6 py-4 bg-card/60 border border-primary/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Narrator is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="border-t border-border/30 bg-card/30 backdrop-blur-sm px-6 py-5">
            <div className="flex gap-3 items-center max-w-4xl mx-auto">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                placeholder="What will you do this month? Type your action..."
                className="flex-1 bg-background/50 border-border/50 focus:border-primary h-12 text-base"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-accent hover:bg-accent/90 text-black px-8 h-12 font-medium"
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3 font-mono opacity-60">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </div>

        {/* Sidebar - Right */}
        <div className="w-80 border-l border-border/30 bg-card/20 backdrop-blur-sm overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* User Info */}
            <Card className="p-5 bg-card/50 border-border/50 shadow-lg">
              <h3 className="text-xs font-bold text-muted-foreground mb-4 font-mono tracking-wider">PLAYER INFO</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="text-foreground font-semibold">{userConfig?.name || "John Doe"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Age:</span>
                  <span className="text-foreground font-semibold">
                    {userConfig?.dateOfBirth
                      ? new Date().getFullYear() - new Date(userConfig.dateOfBirth).getFullYear()
                      : "25"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground font-semibold">{userConfig?.city || "New York"}</span>
                </div>
              </div>
            </Card>

            {/* Financial Status */}
            <Card className="p-5 bg-card/50 border-border/50 shadow-lg">
              <h3 className="text-xs font-bold text-muted-foreground mb-4 font-mono tracking-wider">FINANCES</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/20 rounded-lg">
                      <DollarSign className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm text-muted-foreground">Cash</span>
                  </div>
                  <span className="text-xl font-bold text-accent font-mono">${stats.cash.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">Investments</span>
                  </div>
                  <span className="text-xl font-bold text-primary font-mono">
                    ${stats.investments.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>

            {/* Life Areas */}
            <Card className="p-5 bg-card/50 border-border/50 shadow-lg">
              <h3 className="text-xs font-bold text-muted-foreground mb-4 font-mono tracking-wider">LIFE AREAS</h3>
              <div className="space-y-2">
                <button onClick={() => setExpandedArea("education")} className="w-full">
                  <StatBar icon={GraduationCap} label="Studies" value={stats.studies} color="text-blue-400" />
                </button>
                <button onClick={() => setExpandedArea("relationships")} className="w-full">
                  <StatBar icon={Heart} label="Relationships" value={stats.relationships} color="text-pink-400" />
                </button>
                <button onClick={() => setExpandedArea("career")} className="w-full">
                  <StatBar icon={Briefcase} label="Career" value={stats.career} color="text-purple-400" />
                </button>
                <button onClick={() => setExpandedArea("health")} className="w-full">
                  <StatBar icon={Dumbbell} label="Health" value={stats.health} color="text-green-400" />
                </button>
                <button onClick={() => setExpandedArea("social")} className="w-full">
                  <StatBar icon={Users} label="Social" value={stats.social} color="text-yellow-400" />
                </button>
                <button onClick={() => setExpandedArea("living")} className="w-full">
                  <StatBar icon={Home} label="Living" value={stats.living} color="text-orange-400" />
                </button>
                <button onClick={() => setExpandedArea("personal")} className="w-full">
                  <StatBar icon={Sparkles} label="Personal" value={stats.personal} color="text-cyan-400" />
                </button>
              </div>
            </Card>

            {/* Motivation */}
            <Card className="p-5 bg-card/50 border-border/50 shadow-lg">
              <h3 className="text-xs font-bold text-muted-foreground mb-4 font-mono tracking-wider">ENERGY</h3>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground font-medium">Motivation</span>
                    <span className="text-accent font-bold font-mono text-lg">{stats.motivation}%</span>
                  </div>
                  <div className="h-2.5 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
                      style={{ width: `${stats.motivation}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={expandedArea !== null} onOpenChange={() => setExpandedArea(null)}>
        <DialogContent className="bg-card border-border/50 max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {expandedArea === "education" && (
                <>
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                  Education & Studies
                </>
              )}
              {expandedArea === "relationships" && (
                <>
                  <Heart className="w-6 h-6 text-pink-400" />
                  Relationships
                </>
              )}
              {expandedArea === "career" && (
                <>
                  <Briefcase className="w-6 h-6 text-purple-400" />
                  Career
                </>
              )}
              {expandedArea === "health" && (
                <>
                  <Dumbbell className="w-6 h-6 text-green-400" />
                  Health & Fitness
                </>
              )}
              {expandedArea === "social" && (
                <>
                  <Users className="w-6 h-6 text-yellow-400" />
                  Social Life
                </>
              )}
              {expandedArea === "living" && (
                <>
                  <Home className="w-6 h-6 text-orange-400" />
                  Living Situation
                </>
              )}
              {expandedArea === "personal" && (
                <>
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                  Personal Growth
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Relationships Details */}
            {expandedArea === "relationships" && (
              <>
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-bold text-muted-foreground mb-3">IMPORTANT PEOPLE</h4>
                  {getAreaDetails("relationships")?.people?.length > 0 ? (
                    <div className="space-y-3">
                      {getAreaDetails("relationships").people.map((person: any) => (
                        <div key={person.id} className="p-3 bg-card/50 rounded border border-border/30">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-foreground">{person.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{person.relationship}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-pink-400">{person.quality}/10</p>
                              <p className="text-xs text-muted-foreground">Quality</p>
                            </div>
                          </div>
                          <div className="h-1.5 bg-background rounded-full overflow-hidden">
                            <div className="h-full bg-pink-400" style={{ width: `${person.quality * 10}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No people configured</p>
                  )}
                </div>
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-bold text-muted-foreground mb-2">CURRENT STATUS</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Overall Relationship Health</span>
                    <span className="text-lg font-bold text-pink-400">{stats.relationships}%</span>
                  </div>
                </div>
              </>
            )}

            {/* Career Details */}
            {expandedArea === "career" && (
              <>
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-bold text-muted-foreground mb-3">CAREER INFO</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-foreground font-medium capitalize">
                        {getAreaDetails("career")?.status?.replace("-", " ") || "Not set"}
                      </span>
                    </div>
                    {getAreaDetails("career")?.companyName && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Company:</span>
                        <span className="text-foreground font-medium">{getAreaDetails("career").companyName}</span>
                      </div>
                    )}
                    {getAreaDetails("career")?.position && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Position:</span>
                        <span className="text-foreground font-medium">{getAreaDetails("career").position}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Satisfaction:</span>
                      <span className="text-foreground font-medium">
                        {getAreaDetails("career")?.satisfaction || 0}/10
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-bold text-muted-foreground mb-2">CURRENT STATUS</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Career Progress</span>
                    <span className="text-lg font-bold text-purple-400">{stats.career}%</span>
                  </div>
                </div>
              </>
            )}

            {/* Education Details */}
            {expandedArea === "education" && (
              <>
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-bold text-muted-foreground mb-3">EDUCATION INFO</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-foreground font-medium capitalize">
                        {getAreaDetails("education")?.status?.replace("-", " ") || "Not set"}
                      </span>
                    </div>
                    {getAreaDetails("education")?.institutionName && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Institution:</span>
                        <span className="text-foreground font-medium">
                          {getAreaDetails("education").institutionName}
                        </span>
                      </div>
                    )}
                    {getAreaDetails("education")?.fieldOfStudy && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Field:</span>
                        <span className="text-foreground font-medium">{getAreaDetails("education").fieldOfStudy}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Satisfaction:</span>
                      <span className="text-foreground font-medium">
                        {getAreaDetails("education")?.satisfaction || 0}/10
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-bold text-muted-foreground mb-2">CURRENT STATUS</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Academic Progress</span>
                    <span className="text-lg font-bold text-blue-400">{stats.studies}%</span>
                  </div>
                </div>
              </>
            )}

            {/* Health Details */}
            {expandedArea === "health" && (
              <>
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-bold text-muted-foreground mb-3">HEALTH HABITS</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Exercise:</span>
                      <span className="text-foreground font-medium capitalize">
                        {getAreaDetails("health")?.exerciseFrequency?.replace("-", " ") || "Not set"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Diet:</span>
                      <span className="text-foreground font-medium capitalize">
                        {getAreaDetails("health")?.dietQuality?.replace("-", " ") || "Not set"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sleep:</span>
                      <span className="text-foreground font-medium capitalize">
                        {getAreaDetails("health")?.sleepQuality?.replace("-", " ") || "Not set"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-bold text-muted-foreground mb-2">CURRENT STATUS</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Overall Health</span>
                    <span className="text-lg font-bold text-green-400">{stats.health}%</span>
                  </div>
                </div>
              </>
            )}

            {/* Social Details */}
            {expandedArea === "social" && (
              <>
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-bold text-muted-foreground mb-3">SOCIAL HABITS</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span className="text-foreground font-medium capitalize">
                        {getAreaDetails("social")?.socialFrequency || "Not set"}
                      </span>
                    </div>
                    {getAreaDetails("social")?.mainActivities && (
                      <div>
                        <span className="text-muted-foreground block mb-1">Activities:</span>
                        <p className="text-foreground">{getAreaDetails("social").mainActivities}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-bold text-muted-foreground mb-2">CURRENT STATUS</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Social Health</span>
                    <span className="text-lg font-bold text-yellow-400">{stats.social}%</span>
                  </div>
                </div>
              </>
            )}

            {/* Living Details */}
            {expandedArea === "living" && (
              <>
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-bold text-muted-foreground mb-3">LIVING SITUATION</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Housing:</span>
                      <span className="text-foreground font-medium capitalize">
                        {getAreaDetails("living")?.housingType || "Not set"}
                      </span>
                    </div>
                    {getAreaDetails("living")?.livingWith && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Living with:</span>
                        <span className="text-foreground font-medium">{getAreaDetails("living").livingWith}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Satisfaction:</span>
                      <span className="text-foreground font-medium">
                        {getAreaDetails("living")?.satisfaction || 0}/10
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-bold text-muted-foreground mb-2">CURRENT STATUS</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Living Quality</span>
                    <span className="text-lg font-bold text-orange-400">{stats.living}%</span>
                  </div>
                </div>
              </>
            )}

            {/* Personal Details */}
            {expandedArea === "personal" && (
              <>
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-bold text-muted-foreground mb-3">HOBBIES & INTERESTS</h4>
                  {getAreaDetails("personal")?.hobbies?.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {getAreaDetails("personal").hobbies.map((hobby: string) => (
                        <span
                          key={hobby}
                          className="px-3 py-1 bg-accent/20 border border-accent/50 rounded-full text-sm"
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mb-3">No hobbies configured</p>
                  )}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weekly Hours:</span>
                      <span className="text-foreground font-medium">
                        {getAreaDetails("personal")?.weeklyHours || 0}h
                      </span>
                    </div>
                    {getAreaDetails("personal")?.mainGoals && (
                      <div>
                        <span className="text-muted-foreground block mb-1">Goals:</span>
                        <p className="text-foreground">{getAreaDetails("personal").mainGoals}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-sm font-bold text-muted-foreground mb-2">CURRENT STATUS</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Personal Growth</span>
                    <span className="text-lg font-bold text-cyan-400">{stats.personal}%</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-primary/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-primary/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-primary/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-primary/20 pointer-events-none" />
    </main>
  )
}

function StatBar({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) {
  return (
    <div className="hover:bg-background/50 p-3 rounded-lg transition-all duration-200 cursor-pointer group border border-transparent hover:border-border/30">
      <div className="flex items-center justify-between text-xs mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color} group-hover:scale-110 transition-transform`} />
          <span className="text-muted-foreground font-medium">{label}</span>
        </div>
        <span className={`font-bold font-mono ${color} text-sm`}>{value}</span>
      </div>
      <div className="h-2 bg-background rounded-full overflow-hidden">
        <div
          className={`h-full ${color.replace("text-", "bg-")} transition-all duration-500 group-hover:opacity-90`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
