"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Heart, Zap, Music, Gift, Frown, Smile, Meh, ArrowLeftRight, RefreshCw, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import type { JSX } from "react/jsx-runtime"

// Pet types and personalities
type Mood = "happy" | "neutral" | "sad"
type PetType = "cat" | "dog" | "rabbit" | "fox"
type Personality = "playful" | "shy" | "grumpy" | "affectionate"

interface Pet {
  id: number
  name: string
  type: PetType
  personality: Personality
  mood: Mood
  energy: number
  affection: number
  color: string
}

// Interaction types
type InteractionType = "play" | "feed" | "pet" | "music" | "gift"

// Personality-based responses
const personalityResponses: Record<Personality, Record<InteractionType, number>> = {
  playful: {
    play: 15,
    feed: 8,
    pet: 5,
    music: 10,
    gift: 12,
  },
  shy: {
    play: 5,
    feed: 10,
    pet: 15,
    music: 12,
    gift: 8,
  },
  grumpy: {
    play: 3,
    feed: 15,
    pet: 5,
    music: 0,
    gift: 10,
  },
  affectionate: {
    play: 10,
    feed: 8,
    pet: 15,
    music: 8,
    gift: 12,
  },
}

// Pet colors
const petColors: Record<PetType, string[]> = {
  cat: ["#F97316", "#FBBF24", "#A3A3A3", "#000000"],
  dog: ["#A16207", "#FBBF24", "#FFFFFF", "#A3A3A3"],
  rabbit: ["#FFFFFF", "#A3A3A3", "#FBBF24", "#F97316"],
  fox: ["#F97316", "#FFFFFF", "#A3A3A3", "#000000"],
}

// Pet type to emoji mapping
const petEmojis: Record<PetType, string> = {
  cat: "🐱",
  dog: "🐶",
  rabbit: "🐰",
  fox: "🦊",
}

// Personality descriptions
const personalityDescriptions: Record<Personality, string> = {
  playful: "Loves to play and is always full of energy. Responds best to play and music.",
  shy: "Takes time to warm up to others. Prefers gentle petting and calm activities.",
  grumpy: "Often in a bad mood. Food is the best way to improve their mood.",
  affectionate: "Loves attention and physical affection. Responds best to petting and gifts.",
}

// Generate a random pet
const generateRandomPet = (id: number): Pet => {
  const types: PetType[] = ["cat", "dog", "rabbit", "fox"]
  const personalities: Personality[] = ["playful", "shy", "grumpy", "affectionate"]
  const petType = types[Math.floor(Math.random() * types.length)]
  const personality = personalities[Math.floor(Math.random() * personalities.length)]
  const color = petColors[petType][Math.floor(Math.random() * petColors[petType].length)]

  return {
    id,
    name: generatePetName(petType),
    type: petType,
    personality,
    mood: "neutral",
    energy: 50,
    affection: 50,
    color,
  }
}

// Generate a pet name based on type
const generatePetName = (type: PetType): string => {
  const catNames = ["Whiskers", "Mittens", "Luna", "Oliver", "Bella", "Leo"]
  const dogNames = ["Max", "Buddy", "Charlie", "Lucy", "Bailey", "Cooper"]
  const rabbitNames = ["Thumper", "Hoppy", "Cotton", "Bun-Bun", "Clover", "Daisy"]
  const foxNames = ["Rusty", "Amber", "Sly", "Ginger", "Roxy", "Firefox"]

  const nameList = {
    cat: catNames,
    dog: dogNames,
    rabbit: rabbitNames,
    fox: foxNames,
  }

  return nameList[type][Math.floor(Math.random() * nameList[type].length)]
}

// Get mood emoji
const getMoodEmoji = (mood: Mood): JSX.Element => {
  switch (mood) {
    case "happy":
      return <Smile className="w-6 h-6 text-green-500" />
    case "neutral":
      return <Meh className="w-6 h-6 text-amber-500" />
    case "sad":
      return <Frown className="w-6 h-6 text-red-500" />
  }
}

// Update mood based on energy and affection
const updateMood = (pet: Pet): Mood => {
  const average = (pet.energy + pet.affection) / 2
  if (average > 70) return "happy"
  if (average < 30) return "sad"
  return "neutral"
}

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([])
  const [selectedPet, setSelectedPet] = useState<number | null>(null)
  const [interactionTarget, setInteractionTarget] = useState<number | null>(null)
  const [interactionHistory, setInteractionHistory] = useState<string[]>([])
  const [showInfo, setShowInfo] = useState(true)

  // Initialize pets
  useEffect(() => {
    setPets([generateRandomPet(1), generateRandomPet(2)])
  }, [])

  // Handle pet selection
  const selectPet = (id: number) => {
    if (selectedPet === id) {
      setSelectedPet(null)
    } else {
      setSelectedPet(id)
      setInteractionTarget(null)
    }
  }

  // Handle interaction target selection
  const selectInteractionTarget = (id: number) => {
    if (selectedPet === null) return
    if (selectedPet === id) return

    setInteractionTarget(id)
  }

  // Perform interaction between pets
  const performInteraction = (type: InteractionType) => {
    if (selectedPet === null || interactionTarget === null) return

    const updatedPets = [...pets]
    const activePet = updatedPets.find((p) => p.id === selectedPet)
    const targetPet = updatedPets.find((p) => p.id === interactionTarget)

    if (!activePet || !targetPet) return

    // Calculate response based on personality
    const responseValue = personalityResponses[targetPet.personality][type]

    // Update target pet stats
    let newAffection = targetPet.affection + responseValue
    let newEnergy = targetPet.energy

    if (type === "play") {
      newEnergy += 10
    } else if (type === "feed") {
      newEnergy += 15
    }

    // Ensure values stay within bounds
    newAffection = Math.max(0, Math.min(100, newAffection))
    newEnergy = Math.max(0, Math.min(100, newEnergy))

    // Update the target pet
    targetPet.affection = newAffection
    targetPet.energy = newEnergy
    targetPet.mood = updateMood(targetPet)

    // Also slightly affect the active pet
    activePet.energy = Math.max(0, Math.min(100, activePet.energy - 5))
    activePet.mood = updateMood(activePet)

    // Update pets state
    setPets(updatedPets)

    // Add to interaction history
    const interactionMessage = `${activePet.name} ${getInteractionVerb(type)} ${targetPet.name}. ${getResponseMessage(targetPet, responseValue)}`
    setInteractionHistory((prev) => [interactionMessage, ...prev.slice(0, 4)])
  }

  // Get verb for interaction type
  const getInteractionVerb = (type: InteractionType): string => {
    switch (type) {
      case "play":
        return "played with"
      case "feed":
        return "fed"
      case "pet":
        return "petted"
      case "music":
        return "played music for"
      case "gift":
        return "gave a gift to"
    }
  }

  // Get response message based on pet's reaction
  const getResponseMessage = (pet: Pet, responseValue: number): string => {
    if (responseValue > 10) {
      return `${pet.name} loved it!`
    } else if (responseValue > 5) {
      return `${pet.name} enjoyed it.`
    } else if (responseValue > 0) {
      return `${pet.name} seemed indifferent.`
    } else {
      return `${pet.name} didn't like it.`
    }
  }

  // Generate new pets
  const regeneratePets = () => {
    setPets([generateRandomPet(1), generateRandomPet(2)])
    setSelectedPet(null)
    setInteractionTarget(null)
    setInteractionHistory([])
  }

  // Swap pets' positions
  const swapPets = () => {
    setPets((prev) => [prev[1], prev[0]])
  }

  if (pets.length < 2) {
    return <div className="flex items-center justify-center h-screen">Loading pets...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">Digital Pet Interaction</h1>
          <p className="text-gray-600">Select a pet to interact with another pet!</p>

          <div className="flex justify-center gap-2 mt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={regeneratePets}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    New Pets
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate new random pets</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={swapPets}>
                    <ArrowLeftRight className="h-4 w-4 mr-2" />
                    Swap
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Swap pets' positions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Info className="h-4 w-4 mr-2" />
                  Help
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>How to Play</DialogTitle>
                  <DialogDescription>Interact with your digital pets and see how they respond!</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Pet Personalities:</h3>
                    <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
                      <li>
                        <span className="font-medium">Playful:</span> {personalityDescriptions.playful}
                      </li>
                      <li>
                        <span className="font-medium">Shy:</span> {personalityDescriptions.shy}
                      </li>
                      <li>
                        <span className="font-medium">Grumpy:</span> {personalityDescriptions.grumpy}
                      </li>
                      <li>
                        <span className="font-medium">Affectionate:</span> {personalityDescriptions.affectionate}
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold">How to Interact:</h3>
                    <ol className="list-decimal pl-5 text-sm space-y-1 mt-1">
                      <li>Click on a pet to select it as the active pet</li>
                      <li>Click on the other pet to set it as the interaction target</li>
                      <li>Choose an interaction from the buttons that appear</li>
                      <li>Watch how the target pet responds based on its personality!</li>
                    </ol>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-lg shadow-md mb-6 relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowInfo(false)}
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-semibold text-purple-800 mb-2">Welcome to Digital Pet Interaction!</h2>
            <p className="text-sm text-gray-600 mb-2">
              Each pet has a unique personality that affects how they respond to different interactions.
            </p>
            <p className="text-sm text-gray-600">
              Select a pet, then click on another pet to interact with them. Try different interactions to see how they
              respond!
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {pets.map((pet) => (
            <motion.div
              key={pet.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden ${
                selectedPet === pet.id ? "ring-4 ring-purple-400" : ""
              } ${interactionTarget === pet.id ? "ring-4 ring-pink-400" : ""}`}
              whileHover={{ scale: 1.02 }}
              onClick={() => (selectedPet === null ? selectPet(pet.id) : selectInteractionTarget(pet.id))}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{petEmojis[pet.type]}</span>
                    <h2 className="text-xl font-bold">{pet.name}</h2>
                  </div>
                  <div className="flex items-center gap-1">{getMoodEmoji(pet.mood)}</div>
                </div>

                <div className="flex gap-4 mb-4">
                  <div className="bg-purple-100 px-3 py-1 rounded-full text-sm text-purple-800">{pet.type}</div>
                  <div className="bg-pink-100 px-3 py-1 rounded-full text-sm text-pink-800">{pet.personality}</div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" /> Affection
                      </span>
                      <span>{pet.affection}%</span>
                    </div>
                    <Slider value={[pet.affection]} max={100} step={1} disabled className="cursor-default" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-amber-500" /> Energy
                      </span>
                      <span>{pet.energy}%</span>
                    </div>
                    <Slider value={[pet.energy]} max={100} step={1} disabled className="cursor-default" />
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  {selectedPet === pet.id && "Selected as active pet"}
                  {interactionTarget === pet.id && "Selected as interaction target"}
                  {selectedPet !== pet.id &&
                    interactionTarget !== pet.id &&
                    (selectedPet === null ? "Click to select" : "Click to interact with")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedPet !== null && interactionTarget !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6 mb-6"
          >
            <h2 className="text-lg font-bold mb-4">Choose an interaction</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <Button
                variant="outline"
                className="flex flex-col gap-1 h-auto py-3"
                onClick={() => performInteraction("play")}
              >
                <Zap className="h-5 w-5 text-amber-500" />
                <span>Play</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col gap-1 h-auto py-3"
                onClick={() => performInteraction("feed")}
              >
                <svg
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 12H14.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.5 15L16.5 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 4.5H7.5V18.5H3.5V4.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 4.5H20.5V8.5C20.5 8.5 17.5 9.5 17.5 12.5C17.5 15.5 20.5 16.5 20.5 16.5V20.5H7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Feed</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col gap-1 h-auto py-3"
                onClick={() => performInteraction("pet")}
              >
                <Heart className="h-5 w-5 text-red-500" />
                <span>Pet</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col gap-1 h-auto py-3"
                onClick={() => performInteraction("music")}
              >
                <Music className="h-5 w-5 text-blue-500" />
                <span>Music</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col gap-1 h-auto py-3"
                onClick={() => performInteraction("gift")}
              >
                <Gift className="h-5 w-5 text-purple-500" />
                <span>Gift</span>
              </Button>
            </div>
          </motion.div>
        )}

        {interactionHistory.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Interaction History</h2>
            <ul className="space-y-2">
              {interactionHistory.map((interaction, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm text-gray-700 p-2 bg-gray-50 rounded"
                >
                  {interaction}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  )
}

