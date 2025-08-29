"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Star } from "lucide-react"
import { useState } from "react"

interface MealPlan {
  id: string
  name: string
  description: string
  price: number
  location: string
  availableTime: string
  rating: number
  category: string
  estimatedWait: string
}

export default function MealPlanner() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const mealPlans: MealPlan[] = [
    {
      id: "1",
      name: "Healthy Bowl",
      description: "Quinoa, grilled chicken, mixed vegetables",
      price: 9.5,
      location: "Main Cafeteria",
      availableTime: "11:00 AM - 3:00 PM",
      rating: 4.5,
      category: "healthy",
      estimatedWait: "5-10 min",
    },
    {
      id: "2",
      name: "Pizza Slice Combo",
      description: "2 slices + drink + side",
      price: 7.25,
      location: "Student Union",
      availableTime: "11:00 AM - 9:00 PM",
      rating: 4.2,
      category: "quick",
      estimatedWait: "2-5 min",
    },
    {
      id: "3",
      name: "Gourmet Sandwich",
      description: "Artisan bread, premium ingredients",
      price: 8.75,
      location: "Library Cafe",
      availableTime: "8:00 AM - 6:00 PM",
      rating: 4.7,
      category: "premium",
      estimatedWait: "8-12 min",
    },
    {
      id: "4",
      name: "Stir Fry Special",
      description: "Fresh vegetables, choice of protein",
      price: 10.25,
      location: "Asian Kitchen",
      availableTime: "12:00 PM - 8:00 PM",
      rating: 4.4,
      category: "healthy",
      estimatedWait: "10-15 min",
    },
  ]

  const categories = [
    { id: "all", name: "All Meals" },
    { id: "healthy", name: "Healthy" },
    { id: "quick", name: "Quick Bites" },
    { id: "premium", name: "Premium" },
  ]

  const filteredMeals =
    selectedCategory === "all" ? mealPlans : mealPlans.filter((meal) => meal.category === selectedCategory)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Today's Meal Options</h2>
        <p className="text-sm text-muted-foreground">Plan your meals and check availability</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Meal Cards */}
      <div className="space-y-3">
        {filteredMeals.map((meal) => (
          <Card key={meal.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{meal.name}</h3>
                    <p className="text-sm text-muted-foreground">{meal.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">${meal.price.toFixed(2)}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{meal.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{meal.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{meal.estimatedWait}</span>
                  </div>
                  <div className="flex items-center gap-1 col-span-2">
                    <Calendar className="h-3 w-3" />
                    <span>{meal.availableTime}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-green-600 hover:bg-green-700">Pre-order Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily Budget Tracker */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-blue-800">Daily Budget Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-blue-700">Today's Spending</span>
              <span className="font-semibold text-blue-800">$12.75 / $20.00</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "63.75%" }}></div>
            </div>
            <p className="text-xs text-blue-600">$7.25 remaining for today</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
