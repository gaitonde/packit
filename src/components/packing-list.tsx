'use client'

import React, { useState } from 'react'
import { Share2, ChevronDown, Sun, Plus } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const packingItems = [
  { id: 1, name: 'Beach Swimsuit', category: 'Beach' },
  { id: 2, name: 'Sunglasses', category: 'Beach' },
  { id: 3, name: 'Sunscreen', category: 'Beach' },
  { id: 4, name: 'Hat', category: 'Beach' },
  { id: 5, name: 'Sandals', category: 'Beach' },
  { id: 6, name: 'Beach Towel', category: 'Beach' },
  { id: 7, name: 'Water Bottle', category: 'Gym' },
  { id: 8, name: 'Gym Shorts', category: 'Gym' },
  { id: 9, name: 'Gym Shirt', category: 'Gym' },
]

export function PackingList() {
  const [checkedItems, setCheckedItems] = useState<number[]>([])
  const [newItems, setNewItems] = useState<{ [key: string]: string }>({ Beach: '', Gym: '' })

  const toggleItem = (id: number) => {
    setCheckedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const addNewItem = (category: string) => {
    if (newItems[category].trim() !== '') {
      // In a real app, you'd add this to the packingItems array
      setNewItems(prev => ({ ...prev, [category]: '' }))
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

        {['Beach', 'Gym'].map((category) => (
          <div key={category}>
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-teal-700">{category.toUpperCase()}</h2>
                <span className="text-sm text-teal-600">
                  {checkedItems.filter(id => packingItems.find(item => item.id === id)?.category === category).length}/
                  {packingItems.filter(item => item.category === category).length}
                </span>
              </div>
            </div>
            {packingItems.filter(item => item.category === category).map((item) => (
              <div key={item.id} className="flex items-center p-4 border-b border-gray-200">
                <Checkbox
                  id={`item-${item.id}`}
                  checked={checkedItems.includes(item.id)}
                  onCheckedChange={() => toggleItem(item.id)}
                  className="border-2 border-teal-400 rounded-full h-6 w-6"
                />
                <label
                  htmlFor={`item-${item.id}`}
                  className={`ml-4 text-lg ${checkedItems.includes(item.id) ? 'line-through text-gray-400' : 'text-gray-800'}`}
                >
                  {item.name}
                </label>
              </div>
            ))}
            <div className="flex items-center p-4 border-b border-gray-200">
              <Plus className="h-6 w-6 text-teal-500 mr-4" />
              <Input
                placeholder={`Type new ${category.toLowerCase()} item...`}
                value={newItems[category]}
                onChange={(e) => setNewItems(prev => ({ ...prev, [category]: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && addNewItem(category)}
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