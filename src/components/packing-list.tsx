'use client'

import React, { useState, useEffect } from 'react'
import { Share2, ChevronDown, Sun, Plus } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PackingItem {
  id: number;
  text: string;
  isPacked: boolean;
}

interface Activity {
  id: number;
  name: string;
  packingItems: PackingItem[];
}

export function PackingList() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [newItems, setNewItems] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await fetch('/api/tripDetails?userId=1&tripId=1')
        if (!response.ok) {
          throw new Error('Failed to fetch trip details')
        }
        const data = await response.json()
        setActivities(data.activities)
        setNewItems(Object.fromEntries(data.activities.map((activity: Activity) => [activity.name, ''])))
      } catch (error) {
        console.error('Error fetching trip details:', error)
      }
    }

    fetchTripDetails()
  }, [])

  const toggleItem = async (activityId: number, itemId: number) => {
    console.log("XXXX: ", activityId, itemId);
    try {
      const response = await fetch('/api/packingItems', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: itemId,
          activity_id: activityId,
          is_packed: !activities.find(a => a.id === activityId)?.packingItems.find(i => i.id === itemId)?.isPacked
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update packing item')
      }

      setActivities(prevActivities =>
        prevActivities.map(activity =>
          activity.id === activityId
            ? {
                ...activity,
                packingItems: activity.packingItems.map(item =>
                  item.id === itemId ? { ...item, isPacked: !item.isPacked } : item
                )
              }
            : activity
        )
      )
    } catch (error) {
      console.error('Error updating packing item:', error)
    }
  }

  const addNewItem = async (activityId: number, activityName: string) => {
    if (newItems[activityName].trim() !== '') {
      try {
        const response = await fetch('/api/packingItems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            activity_id: activityId,
            text: newItems[activityName],
            is_packed: false,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to add new packing item')
        }

        const newItem = await response.json()
        setActivities(prevActivities =>
          prevActivities.map(activity =>
            activity.id === activityId
              ? { ...activity, packingItems: [...activity.packingItems, newItem] }
              : activity
          )
        )
        setNewItems(prev => ({ ...prev, [activityName]: '' }))
      } catch (error) {
        console.error('Error adding new packing item:', error)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-teal-400 to-teal-600 font-sans">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="w-6" /> {/* Spacer */}
        <div className="text-2xl font-bold tracking-wide absolute left-1/2 transform -translate-x-1/2">PackIT</div>
        <Button variant="ghost" size="icon" className="text-white">
          <Share2 className="h-6 w-6" />
        </Button>
      </header>

      <div className="fixed top-16 left-0 right-0 z-10 bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-light text-teal-600">Newport Beach</div>
            <div className="text-sm text-gray-500">October 17 - October 19</div>
          </div>
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <main className="flex-grow overflow-y-auto mt-40 mb-16 bg-white">
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="text-xs font-semibold text-gray-500 mb-2">LOCAL WEATHER FORECAST</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sun className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="text-teal-600 text-lg">Clear Day</span>
            </div>
            <div className="text-4xl font-light text-teal-600">67°</div>
          </div>
          <div className="mt-1 text-sm text-gray-500">▼ 63° ▲ 71°</div>
        </div>

        {activities.map((activity) => (
          <div key={activity.id}>
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-teal-700">{activity.name.toUpperCase()}</h2>
                <span className="text-sm text-teal-600">
                  {activity.packingItems.filter(item => item.isPacked).length}/{activity.packingItems.length}
                </span>
              </div>
            </div>
            {activity.packingItems.map((item) => (
              <div key={item.id} className="flex items-center p-4 border-b border-gray-200">
                <Checkbox
                  id={`item-${item.id}`}
                  checked={item.isPacked}
                  onCheckedChange={() => toggleItem(activity.id, item.id)}
                  className="border-2 border-teal-400 rounded-full h-6 w-6"
                />
                <label
                  htmlFor={`item-${item.id}`}
                  className={`ml-4 text-lg ${item.isPacked ? 'line-through text-gray-400' : 'text-gray-800'}`}
                >
                  {item.text}
                </label>
              </div>
            ))}
            <div className="flex items-center p-4 border-b border-gray-200">
              <Plus className="h-6 w-6 text-teal-500 mr-4" />
              <Input
                placeholder={`Type new ${activity.name.toLowerCase()} item...`}
                value={newItems[activity.name] || ''}
                onChange={(e) => setNewItems(prev => ({ ...prev, [activity.name]: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && addNewItem(activity.id, activity.name)}
                className="flex-grow text-lg placeholder-gray-400 border-none focus:ring-0"
              />
            </div>
          </div>
        ))}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-teal-600 p-4">
        {/* Footer content removed */}
      </footer>
    </div>
  )
}