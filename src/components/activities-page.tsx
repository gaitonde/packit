'use client'

import React, { useState } from 'react'
import { ChevronLeft, Check, Waves, Snowflake, Laptop, Flame, Dumbbell, Camera, Globe, Umbrella, Baby, Mountain, Bike, PersonStanding, Utensils } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link' // Import Link component

const activities = [
  { id: 'swimming', icon: Waves, name: 'Swimming' },
  { id: 'snow', icon: Snowflake, name: 'Snow sports' },
  { id: 'working', icon: Laptop, name: 'Working' },
  { id: 'camping', icon: Flame, name: 'Camping' },
  { id: 'gym', icon: Dumbbell, name: 'Gym' },
  { id: 'photography', icon: Camera, name: 'Photography' },
  { id: 'international', icon: Globe, name: 'International' },
  { id: 'beach', icon: Umbrella, name: 'Beach' },
  { id: 'baby', icon: Baby, name: 'Baby' },
  { id: 'hiking', icon: Mountain, name: 'Hiking' },
  { id: 'bicycling', icon: Bike, name: 'Bicycling' },
  { id: 'running', icon: PersonStanding, name: 'Running' },
  { id: 'fancy-dinner', icon: Utensils, name: 'Fancy dinner' },
  { id: 'motorcycling', icon: Bike, name: 'Motorcycling' },
]

export function ActivitiesPageComponent() {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])

  const toggleActivity = (id: string) => {
    setSelectedActivities(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f0ece3] font-sans">
      <header className="flex items-center p-4 bg-[#7fbfb0] text-white">
        <Link href="/travel-info" className="flex items-center"> {/* Link to travel-info page */}
          <Button variant="ghost" size="icon" className="mr-2 text-white">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-normal">Activities</h1>
        </Link>
      </header>

      <main className="flex-grow p-4">
        <div className="grid grid-cols-3 gap-2">
          {activities.map((activity) => (
            <Button
              key={activity.id}
              variant="outline"
              className={`h-24 flex flex-col items-center justify-center p-2 rounded-lg ${
                selectedActivities.includes(activity.id) ? 'bg-[#7fbfb0] text-white' : 'bg-white text-[#7fbfb0]'
              }`}
              onClick={() => toggleActivity(activity.id)}
            >
              {selectedActivities.includes(activity.id) && (
                <div className="absolute top-1 right-1">
                  <Check className="h-4 w-4 text-yellow-400" />
                </div>
              )}
              <activity.icon className="h-8 w-8 mb-2" />
              <span className="text-xs text-center">{activity.name}</span>
            </Button>
          ))}
        </div>
      </main>

      <footer className="p-4">
        <Link href="/packing-list"> {/* Link to packing list page */}
          <Button className="w-full bg-[#ffa500] hover:bg-[#ff9000] text-white text-xl font-normal p-4 rounded-lg">
            Begin Packing
          </Button>
        </Link>
      </footer>
    </div>
  )
}