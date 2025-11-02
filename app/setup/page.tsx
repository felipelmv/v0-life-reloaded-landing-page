"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  DollarSign,
  Heart,
  Briefcase,
  GraduationCap,
  Users,
  Home,
  Dumbbell,
  Sparkles,
  Check,
  Plus,
  X,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const lifeAreas = [
  {
    id: "finance",
    title: "Finance",
    description: "Money, investments, and financial decisions",
    icon: DollarSign,
  },
  {
    id: "relationships",
    title: "Relationships",
    description: "Love, family, and personal connections",
    icon: Heart,
  },
  {
    id: "career",
    title: "Career",
    description: "Work, professional growth, and ambitions",
    icon: Briefcase,
  },
  {
    id: "education",
    title: "Education",
    description: "Learning, skills, and knowledge",
    icon: GraduationCap,
  },
  {
    id: "social",
    title: "Social Life",
    description: "Friends, community, and social activities",
    icon: Users,
  },
  {
    id: "living",
    title: "Living Situation",
    description: "Home, location, and lifestyle choices",
    icon: Home,
  },
  {
    id: "health",
    title: "Health & Fitness",
    description: "Physical and mental wellbeing",
    icon: Dumbbell,
  },
  {
    id: "personal",
    title: "Personal Growth",
    description: "Hobbies, passions, and self-development",
    icon: Sparkles,
  },
]

type Person = {
  id: string
  name: string
  relationship: string
  quality: number
}

type FinanceConfig = {
  startingCash: number
  monthlyIncome: number
  monthlyExpenses: number
  savingsGoal: number
}

type RelationshipsConfig = {
  people: Person[]
}

type CareerConfig = {
  status: string
  companyName: string
  position: string
  satisfaction: number
}

type EducationConfig = {
  status: string
  institutionName: string
  fieldOfStudy: string
  satisfaction: number
}

type SocialConfig = {
  socialFrequency: string
  mainActivities: string
}

type LivingConfig = {
  housingType: string
  livingWith: string
  satisfaction: number
}

type HealthConfig = {
  exerciseFrequency: string
  dietQuality: string
  sleepQuality: string
}

type PersonalConfig = {
  hobbies: string[]
  weeklyHours: number
  mainGoals: string
}

type AreaConfig =
  | FinanceConfig
  | RelationshipsConfig
  | CareerConfig
  | EducationConfig
  | SocialConfig
  | LivingConfig
  | HealthConfig
  | PersonalConfig

export default function SetupPage() {
  const router = useRouter()
  const [step, setStep] = useState<"basic" | "areas">("basic")
  const [name, setName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [city, setCity] = useState("")

  const [areaConfigs, setAreaConfigs] = useState<Record<string, AreaConfig>>({})
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null)

  const [tempFinance, setTempFinance] = useState<FinanceConfig>({
    startingCash: 5000,
    monthlyIncome: 3000,
    monthlyExpenses: 2000,
    savingsGoal: 10000,
  })
  const [tempRelationships, setTempRelationships] = useState<RelationshipsConfig>({ people: [] })
  const [tempCareer, setTempCareer] = useState<CareerConfig>({
    status: "",
    companyName: "",
    position: "",
    satisfaction: 5,
  })
  const [tempEducation, setTempEducation] = useState<EducationConfig>({
    status: "",
    institutionName: "",
    fieldOfStudy: "",
    satisfaction: 5,
  })
  const [tempSocial, setTempSocial] = useState<SocialConfig>({ socialFrequency: "", mainActivities: "" })
  const [tempLiving, setTempLiving] = useState<LivingConfig>({ housingType: "", livingWith: "", satisfaction: 5 })
  const [tempHealth, setTempHealth] = useState<HealthConfig>({
    exerciseFrequency: "",
    dietQuality: "",
    sleepQuality: "",
  })
  const [tempPersonal, setTempPersonal] = useState<PersonalConfig>({ hobbies: [], weeklyHours: 5, mainGoals: "" })

  const isBasicInfoValid = name.trim() !== "" && dateOfBirth !== "" && city.trim() !== ""
  const allAreasConfigured = lifeAreas.every((area) => areaConfigs[area.id])

  const openAreaConfig = (areaId: string) => {
    const existing = areaConfigs[areaId]
    setSelectedAreaId(areaId)

    if (existing) {
      switch (areaId) {
        case "finance":
          setTempFinance(existing as FinanceConfig)
          break
        case "relationships":
          setTempRelationships(existing as RelationshipsConfig)
          break
        case "career":
          setTempCareer(existing as CareerConfig)
          break
        case "education":
          setTempEducation(existing as EducationConfig)
          break
        case "social":
          setTempSocial(existing as SocialConfig)
          break
        case "living":
          setTempLiving(existing as LivingConfig)
          break
        case "health":
          setTempHealth(existing as HealthConfig)
          break
        case "personal":
          setTempPersonal(existing as PersonalConfig)
          break
      }
    }
  }

  const saveAreaConfig = () => {
    if (!selectedAreaId) return

    let config: AreaConfig | null = null
    let isValid = false

    switch (selectedAreaId) {
      case "finance":
        isValid = tempFinance.startingCash >= 0 && tempFinance.monthlyIncome >= 0
        config = tempFinance
        break
      case "relationships":
        isValid = true
        config = tempRelationships
        break
      case "career":
        isValid = tempCareer.status !== ""
        config = tempCareer
        break
      case "education":
        isValid = tempEducation.status !== ""
        config = tempEducation
        break
      case "social":
        isValid = tempSocial.socialFrequency !== ""
        config = tempSocial
        break
      case "living":
        isValid = tempLiving.housingType !== ""
        config = tempLiving
        break
      case "health":
        isValid = tempHealth.exerciseFrequency !== "" && tempHealth.dietQuality !== "" && tempHealth.sleepQuality !== ""
        config = tempHealth
        break
      case "personal":
        isValid = tempPersonal.hobbies.length > 0
        config = tempPersonal
        break
    }

    if (isValid && config) {
      setAreaConfigs({
        ...areaConfigs,
        [selectedAreaId]: config,
      })
      setSelectedAreaId(null)
    }
  }

  const handleBeginSimulation = () => {
    localStorage.setItem(
      "lifeReloadedConfig",
      JSON.stringify({
        name,
        dateOfBirth,
        city,
        areaConfigs,
      }),
    )
    router.push("/game-screen")
  }

  const selectedArea = lifeAreas.find((area) => area.id === selectedAreaId)

  const addPerson = () => {
    setTempRelationships({
      people: [...tempRelationships.people, { id: Date.now().toString(), name: "", relationship: "", quality: 5 }],
    })
  }

  const removePerson = (id: string) => {
    setTempRelationships({
      people: tempRelationships.people.filter((p) => p.id !== id),
    })
  }

  const updatePerson = (id: string, field: keyof Person, value: string | number) => {
    setTempRelationships({
      people: tempRelationships.people.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    })
  }

  const addHobby = (hobby: string) => {
    if (hobby.trim() && !tempPersonal.hobbies.includes(hobby.trim())) {
      setTempPersonal({ ...tempPersonal, hobbies: [...tempPersonal.hobbies, hobby.trim()] })
    }
  }

  const removeHobby = (hobby: string) => {
    setTempPersonal({ ...tempPersonal, hobbies: tempPersonal.hobbies.filter((h) => h !== hobby) })
  }

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <Link href="/" className="inline-block mb-6 text-primary hover:text-accent transition-colors">
            <span className="text-sm font-mono">← Back to Home</span>
          </Link>
          <h1
            className="text-5xl md:text-6xl font-black tracking-tighter mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent">
              CONFIGURE
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {step === "basic"
              ? "Set up your profile before the simulation begins."
              : "Configure each life area to shape your 2008 experience."}
          </p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-2">
          <div className={`h-1.5 w-24 rounded-full ${step === "basic" ? "bg-accent" : "bg-accent/50"}`} />
          <div className={`h-1.5 w-24 rounded-full ${step === "areas" ? "bg-accent" : "bg-muted"}`} />
          <div className="h-1.5 w-24 bg-muted rounded-full" />
        </div>
        <p className="text-center text-sm text-muted-foreground mb-12 font-mono">
          STEP {step === "basic" ? "1" : "2"} OF 3
        </p>

        {step === "basic" && (
          <>
            <Card className="p-8 mb-12 bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <Label htmlFor="dob" className="text-sm font-medium text-foreground mb-2 block">
                    Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    max="2008-12-31"
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors [color-scheme:dark]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Click to open calendar picker</p>
                </div>

                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-foreground mb-2 block">
                    City in 2008
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Where were you living in 2008?"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </Card>

            <div className="text-center">
              <Button
                size="lg"
                disabled={!isBasicInfoValid}
                onClick={() => setStep("areas")}
                className={`
                  text-lg px-12 py-7 font-bold tracking-wide transition-all
                  ${
                    isBasicInfoValid
                      ? "bg-accent hover:bg-accent/90 text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(134,239,172,0.5)] border-2 border-accent/50"
                      : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                  }
                `}
              >
                Continue to Life Areas
              </Button>
              {!isBasicInfoValid && (
                <p className="mt-4 text-sm text-muted-foreground">Complete all fields to continue</p>
              )}
            </div>
          </>
        )}

        {step === "areas" && (
          <>
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-3 text-foreground">Configure Your Life Areas</h2>
                <p className="text-gray-400 mb-2">Click each area to set up your starting situation for 2008</p>
                <p className="text-sm text-accent font-mono">
                  {Object.keys(areaConfigs).length}/{lifeAreas.length} configured
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {lifeAreas.map((area) => {
                  const Icon = area.icon
                  const isConfigured = !!areaConfigs[area.id]

                  return (
                    <button
                      key={area.id}
                      onClick={() => openAreaConfig(area.id)}
                      className={`
                        group relative p-6 rounded-lg border-2 transition-all duration-300
                        ${
                          isConfigured
                            ? "bg-accent/10 border-accent shadow-[0_0_20px_rgba(134,239,172,0.3)]"
                            : "bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card/70"
                        }
                        hover:scale-102
                      `}
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div
                          className={`
                          p-3 rounded-full transition-colors
                          ${isConfigured ? "bg-accent/20 text-accent" : "bg-muted/50 text-muted-foreground group-hover:text-primary"}
                        `}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className={`font-bold mb-1 ${isConfigured ? "text-accent" : "text-foreground"}`}>
                            {area.title}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{area.description}</p>
                        </div>
                      </div>

                      {isConfigured && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-black" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep("basic")}
                className="text-lg px-8 py-6 border-border/50 hover:border-primary/50"
              >
                Back
              </Button>
              <Button
                size="lg"
                disabled={!allAreasConfigured}
                onClick={handleBeginSimulation}
                className={`
                  text-lg px-12 py-7 font-bold tracking-wide transition-all
                  ${
                    allAreasConfigured
                      ? "bg-accent hover:bg-accent/90 text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(134,239,172,0.5)] border-2 border-accent/50"
                      : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                  }
                `}
              >
                Begin Simulation
              </Button>
            </div>
            {!allAreasConfigured && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Configure all {lifeAreas.length} life areas to continue
              </p>
            )}
          </>
        )}
      </div>

      <Dialog open={selectedAreaId !== null} onOpenChange={() => setSelectedAreaId(null)}>
        <DialogContent className="bg-card border-border/50 max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {selectedArea && (
                <>
                  <div className="p-2 rounded-full bg-primary/20 text-primary">
                    <selectedArea.icon className="w-6 h-6" />
                  </div>
                  {selectedArea.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">{selectedArea?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {selectedAreaId === "finance" && (
              <>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Starting Cash <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="number"
                    value={tempFinance.startingCash}
                    onChange={(e) => setTempFinance({ ...tempFinance, startingCash: Number(e.target.value) })}
                    className="bg-background border-border/50 focus:border-primary"
                    min="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Monthly Income <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="number"
                    value={tempFinance.monthlyIncome}
                    onChange={(e) => setTempFinance({ ...tempFinance, monthlyIncome: Number(e.target.value) })}
                    className="bg-background border-border/50 focus:border-primary"
                    min="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">Monthly Expenses</Label>
                  <Input
                    type="number"
                    value={tempFinance.monthlyExpenses}
                    onChange={(e) => setTempFinance({ ...tempFinance, monthlyExpenses: Number(e.target.value) })}
                    className="bg-background border-border/50 focus:border-primary"
                    min="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">Savings Goal</Label>
                  <Input
                    type="number"
                    value={tempFinance.savingsGoal}
                    onChange={(e) => setTempFinance({ ...tempFinance, savingsGoal: Number(e.target.value) })}
                    className="bg-background border-border/50 focus:border-primary"
                    min="0"
                  />
                </div>
              </>
            )}

            {selectedAreaId === "relationships" && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-medium text-foreground">Important People in Your Life</Label>
                    <Button size="sm" onClick={addPerson} className="bg-accent hover:bg-accent/90 text-black">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Person
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {tempRelationships.people.map((person) => (
                      <Card key={person.id} className="p-4 bg-background/50 border-border/50">
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <Label className="text-xs text-muted-foreground mb-1 block">Name</Label>
                              <Input
                                value={person.name}
                                onChange={(e) => updatePerson(person.id, "name", e.target.value)}
                                placeholder="Person's name"
                                className="bg-background border-border/50"
                              />
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removePerson(person.id)}
                              className="mt-5 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground mb-1 block">Relationship Type</Label>
                            <select
                              value={person.relationship}
                              onChange={(e) => updatePerson(person.id, "relationship", e.target.value)}
                              className="w-full px-3 py-2 rounded-md bg-background border border-border/50 focus:border-primary focus:outline-none text-foreground text-sm"
                            >
                              <option value="">Select...</option>
                              <option value="parent">Parent</option>
                              <option value="sibling">Sibling</option>
                              <option value="partner">Partner/Spouse</option>
                              <option value="child">Child</option>
                              <option value="friend">Friend</option>
                              <option value="colleague">Colleague</option>
                              <option value="mentor">Mentor</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground mb-1 block">
                              Relationship Quality: {person.quality}/10
                            </Label>
                            <input
                              type="range"
                              min="0"
                              max="10"
                              value={person.quality}
                              onChange={(e) => updatePerson(person.id, "quality", Number(e.target.value))}
                              className="w-full accent-accent"
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                    {tempRelationships.people.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No people added yet. Click "Add Person" to start.
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {selectedAreaId === "career" && (
              <>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Employment Status <span className="text-destructive">*</span>
                  </Label>
                  <select
                    value={tempCareer.status}
                    onChange={(e) => setTempCareer({ ...tempCareer, status: e.target.value })}
                    className="w-full px-4 py-2 rounded-md bg-background border border-border/50 focus:border-primary focus:outline-none text-foreground"
                  >
                    <option value="">Select status...</option>
                    <option value="employed">Employed Full-time</option>
                    <option value="part-time">Employed Part-time</option>
                    <option value="self-employed">Self-employed</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                {(tempCareer.status === "employed" || tempCareer.status === "part-time") && (
                  <>
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-2 block">Company Name</Label>
                      <Input
                        value={tempCareer.companyName}
                        onChange={(e) => setTempCareer({ ...tempCareer, companyName: e.target.value })}
                        placeholder="Where do you work?"
                        className="bg-background border-border/50 focus:border-primary"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-2 block">Position/Role</Label>
                      <Input
                        value={tempCareer.position}
                        onChange={(e) => setTempCareer({ ...tempCareer, position: e.target.value })}
                        placeholder="Your job title"
                        className="bg-background border-border/50 focus:border-primary"
                      />
                    </div>
                  </>
                )}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Career Satisfaction: {tempCareer.satisfaction}/10
                  </Label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={tempCareer.satisfaction}
                    onChange={(e) => setTempCareer({ ...tempCareer, satisfaction: Number(e.target.value) })}
                    className="w-full accent-accent"
                  />
                </div>
              </>
            )}

            {selectedAreaId === "education" && (
              <>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Education Status <span className="text-destructive">*</span>
                  </Label>
                  <select
                    value={tempEducation.status}
                    onChange={(e) => setTempEducation({ ...tempEducation, status: e.target.value })}
                    className="w-full px-4 py-2 rounded-md bg-background border border-border/50 focus:border-primary focus:outline-none text-foreground"
                  >
                    <option value="">Select status...</option>
                    <option value="high-school">High School Student</option>
                    <option value="undergraduate">Undergraduate Student</option>
                    <option value="graduate">Graduate Student</option>
                    <option value="completed">Completed Education</option>
                    <option value="not-studying">Not Currently Studying</option>
                  </select>
                </div>
                {(tempEducation.status === "high-school" ||
                  tempEducation.status === "undergraduate" ||
                  tempEducation.status === "graduate") && (
                  <>
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-2 block">Institution Name</Label>
                      <Input
                        value={tempEducation.institutionName}
                        onChange={(e) => setTempEducation({ ...tempEducation, institutionName: e.target.value })}
                        placeholder="School/University name"
                        className="bg-background border-border/50 focus:border-primary"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-2 block">Field of Study</Label>
                      <Input
                        value={tempEducation.fieldOfStudy}
                        onChange={(e) => setTempEducation({ ...tempEducation, fieldOfStudy: e.target.value })}
                        placeholder="What are you studying?"
                        className="bg-background border-border/50 focus:border-primary"
                      />
                    </div>
                  </>
                )}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Education Satisfaction: {tempEducation.satisfaction}/10
                  </Label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={tempEducation.satisfaction}
                    onChange={(e) => setTempEducation({ ...tempEducation, satisfaction: Number(e.target.value) })}
                    className="w-full accent-accent"
                  />
                </div>
              </>
            )}

            {selectedAreaId === "social" && (
              <>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Social Activity Frequency <span className="text-destructive">*</span>
                  </Label>
                  <select
                    value={tempSocial.socialFrequency}
                    onChange={(e) => setTempSocial({ ...tempSocial, socialFrequency: e.target.value })}
                    className="w-full px-4 py-2 rounded-md bg-background border border-border/50 focus:border-primary focus:outline-none text-foreground"
                  >
                    <option value="">Select frequency...</option>
                    <option value="daily">Daily - Very social</option>
                    <option value="weekly">Several times a week</option>
                    <option value="biweekly">Once or twice a week</option>
                    <option value="monthly">A few times a month</option>
                    <option value="rarely">Rarely - Prefer solitude</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">Main Social Activities</Label>
                  <textarea
                    value={tempSocial.mainActivities}
                    onChange={(e) => setTempSocial({ ...tempSocial, mainActivities: e.target.value })}
                    placeholder="What do you usually do with friends? (parties, sports, gaming, etc.)"
                    rows={3}
                    className="w-full px-4 py-2 rounded-md bg-background border border-border/50 focus:border-primary focus:outline-none text-foreground resize-none"
                  />
                </div>
              </>
            )}

            {selectedAreaId === "living" && (
              <>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Housing Type <span className="text-destructive">*</span>
                  </Label>
                  <select
                    value={tempLiving.housingType}
                    onChange={(e) => setTempLiving({ ...tempLiving, housingType: e.target.value })}
                    className="w-full px-4 py-2 rounded-md bg-background border border-border/50 focus:border-primary focus:outline-none text-foreground"
                  >
                    <option value="">Select type...</option>
                    <option value="apartment">Apartment/Flat</option>
                    <option value="house">House</option>
                    <option value="dorm">Dormitory</option>
                    <option value="shared">Shared Housing</option>
                    <option value="parents">Living with Parents</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">Living With</Label>
                  <Input
                    value={tempLiving.livingWith}
                    onChange={(e) => setTempLiving({ ...tempLiving, livingWith: e.target.value })}
                    placeholder="Alone, roommates, family, partner..."
                    className="bg-background border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Living Situation Satisfaction: {tempLiving.satisfaction}/10
                  </Label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={tempLiving.satisfaction}
                    onChange={(e) => setTempLiving({ ...tempLiving, satisfaction: Number(e.target.value) })}
                    className="w-full accent-accent"
                  />
                </div>
              </>
            )}

            {selectedAreaId === "health" && (
              <>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Exercise Frequency <span className="text-destructive">*</span>
                  </Label>
                  <select
                    value={tempHealth.exerciseFrequency}
                    onChange={(e) => setTempHealth({ ...tempHealth, exerciseFrequency: e.target.value })}
                    className="w-full px-4 py-2 rounded-md bg-background border border-border/50 focus:border-primary focus:outline-none text-foreground"
                  >
                    <option value="">Select frequency...</option>
                    <option value="daily">Daily</option>
                    <option value="4-6-week">4-6 times per week</option>
                    <option value="2-3-week">2-3 times per week</option>
                    <option value="once-week">Once a week</option>
                    <option value="rarely">Rarely/Never</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Diet Quality <span className="text-destructive">*</span>
                  </Label>
                  <select
                    value={tempHealth.dietQuality}
                    onChange={(e) => setTempHealth({ ...tempHealth, dietQuality: e.target.value })}
                    className="w-full px-4 py-2 rounded-md bg-background border border-border/50 focus:border-primary focus:outline-none text-foreground"
                  >
                    <option value="">Select quality...</option>
                    <option value="excellent">Excellent - Very healthy</option>
                    <option value="good">Good - Mostly healthy</option>
                    <option value="average">Average - Mixed</option>
                    <option value="poor">Poor - Mostly unhealthy</option>
                    <option value="very-poor">Very Poor</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Sleep Quality <span className="text-destructive">*</span>
                  </Label>
                  <select
                    value={tempHealth.sleepQuality}
                    onChange={(e) => setTempHealth({ ...tempHealth, sleepQuality: e.target.value })}
                    className="w-full px-4 py-2 rounded-md bg-background border border-border/50 focus:border-primary focus:outline-none text-foreground"
                  >
                    <option value="">Select quality...</option>
                    <option value="excellent">Excellent - 8+ hours, restful</option>
                    <option value="good">Good - 7-8 hours, decent</option>
                    <option value="average">Average - 6-7 hours</option>
                    <option value="poor">Poor - Less than 6 hours</option>
                    <option value="very-poor">Very Poor - Insomnia/issues</option>
                  </select>
                </div>
              </>
            )}

            {selectedAreaId === "personal" && (
              <>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Hobbies & Interests <span className="text-destructive">*</span>
                  </Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a hobby..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addHobby(e.currentTarget.value)
                            e.currentTarget.value = ""
                          }
                        }}
                        className="bg-background border-border/50 focus:border-primary"
                      />
                      <Button
                        size="sm"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement
                          addHobby(input.value)
                          input.value = ""
                        }}
                        className="bg-accent hover:bg-accent/90 text-black"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tempPersonal.hobbies.map((hobby) => (
                        <div
                          key={hobby}
                          className="flex items-center gap-1 px-3 py-1 bg-accent/20 border border-accent/50 rounded-full text-sm"
                        >
                          <span>{hobby}</span>
                          <button onClick={() => removeHobby(hobby)} className="text-accent hover:text-accent/70">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    {tempPersonal.hobbies.length === 0 && (
                      <p className="text-xs text-muted-foreground">Press Enter or click + to add hobbies</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Weekly Hours Dedicated: {tempPersonal.weeklyHours}h
                  </Label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={tempPersonal.weeklyHours}
                    onChange={(e) => setTempPersonal({ ...tempPersonal, weeklyHours: Number(e.target.value) })}
                    className="w-full accent-accent"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">Personal Goals for 2008</Label>
                  <textarea
                    value={tempPersonal.mainGoals}
                    onChange={(e) => setTempPersonal({ ...tempPersonal, mainGoals: e.target.value })}
                    placeholder="What do you want to achieve in your personal development?"
                    rows={3}
                    className="w-full px-4 py-2 rounded-md bg-background border border-border/50 focus:border-primary focus:outline-none text-foreground resize-none"
                  />
                </div>
              </>
            )}

            <div className="flex gap-3 justify-end pt-4 border-t border-border/30">
              <Button variant="outline" onClick={() => setSelectedAreaId(null)}>
                Cancel
              </Button>
              <Button onClick={saveAreaConfig} className="bg-accent hover:bg-accent/90 text-black">
                Save Configuration
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/30" />
    </main>
  )
}
