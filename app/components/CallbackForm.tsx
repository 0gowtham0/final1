'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CallbackForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log('Callback requested for:', { name, phone })
    // Reset form
    setName('')
    setPhone('')
  }

  return (
    <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg w-full h-full flex flex-col justify-center text-white">
      <h2 className="text-2xl font-bold mb-4">Get a Callback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-300">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-gray-800 text-white border-gray-700"
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full bg-gray-800 text-white border-gray-700"
          />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Request Callback
        </Button>
      </form>
    </div>
  )
}

