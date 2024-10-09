'use client'

import React, { useState, useEffect } from 'react'
import { Briefcase, Plane, MapPin, Calendar, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Simulated Google Maps API
const simulateGoogleMapsLookup = (input: string) => {
  const cities = [
    { name: "Newport Beach", state: "CA", country: "United States of America" },
    { name: "New York", state: "NY", country: "United States of America" },
    { name: "London", state: "", country: "United Kingdom" },
    { name: "Paris", state: "", country: "France" },
  ]
  const city = cities.find(c => c.name.toLowerCase() === input.toLowerCase())
  return city ? `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}` : null
}

export function TravelInfo() {
  const [destination, setDestination] = useState('')
  const [formattedDestination, setFormattedDestination] = useState('')
  const [date, setDate] = useState('')
  const [month, setMonth] = useState('')
  const [lengthOfStay, setLengthOfStay] = useState(1)
  const [tripType, setTripType] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      const result = simulateGoogleMapsLookup(destination)
      if (result) {
        setFormattedDestination(result)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [destination])

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <header className="flex items-center justify-center p-4 bg-[#4DC0B5] text-white">
        <div className="text-3xl font-bold">PackIT</div>
      </header>

      <main className="flex-grow p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-xl font-light text-[#4DC0B5] uppercase">Where to</Label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4DC0B5]" />
            <Input
              id="destination"
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-12 py-3 text-2xl border-0 border-b-2 border-gray-200 focus:border-[#4DC0B5] focus:ring-0 font-light"
            />
          </div>
          {formattedDestination && (
            <div className="text-sm text-gray-600 mt-1">{formattedDestination}</div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-xl font-light text-[#4DC0B5] uppercase">Date of travel</Label>
          <div className="flex space-x-2">
            <div className="relative w-1/2">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4DC0B5]" />
              <Input
                id="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-12 py-3 text-xl border-0 border-b-2 border-gray-200 focus:border-[#4DC0B5] focus:ring-0 font-light"
              />
            </div>
            <div className="relative w-1/2">
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="w-full py-3 text-xl border-0 border-b-2 border-gray-200 focus:border-[#4DC0B5] focus:ring-0 font-light">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lengthOfStay" className="text-xl font-light text-[#4DC0B5] uppercase">Length of stay</Label>
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <div className="relative">
              <Clock className="absolute left-0 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4DC0B5]" />
              <Slider
                id="lengthOfStay"
                min={1}
                max={30}
                step={1}
                value={[lengthOfStay]}
                onValueChange={(value) => setLengthOfStay(value[0])}
                className="w-full ml-8"
              />
            </div>
            <div className="text-center text-2xl font-light text-[#4DC0B5] mt-2">
              {lengthOfStay}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tripType" className="text-xl font-light text-[#4DC0B5] uppercase">Type of trip</Label>
          <div className="flex space-x-2">
            <Button
              variant={tripType === 'business' ? 'default' : 'outline'}
              className={`w-1/2 h-20 text-xl font-light ${tripType === 'business' ? 'bg-[#4DC0B5] hover:bg-[#3DA99F] text-white' : 'text-[#4DC0B5] border-[#4DC0B5] hover:bg-[#F1F5F8]'}`}
              onClick={() => setTripType('business')}
            >
              <Briefcase className="h-6 w-6 mr-2" />
              Business
            </Button>
            <Button
              variant={tripType === 'leisure' ? 'default' : 'outline'}
              className={`w-1/2 h-20 text-xl font-light ${tripType === 'leisure' ? 'bg-[#4DC0B5] hover:bg-[#3DA99F] text-white' : 'text-[#4DC0B5] border-[#4DC0B5] hover:bg-[#F1F5F8]'}`}
              onClick={() => setTripType('leisure')}
            >
              <Plane className="h-6 w-6 mr-2" />
              Leisure
            </Button>
          </div>
        </div>
      </main>

      <footer className="p-6">
        <a
          href="/activities" // Use an anchor tag for navigation
          className="w-full bg-[#4DC0B5] hover:bg-[#3DA99F] text-white text-xl font-light py-4 rounded-lg flex items-center justify-center" // Add flex for centering
        >
          Select Activities
        </a>
      </footer>
    </div>
  )
}