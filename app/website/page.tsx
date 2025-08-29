"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CreditCard, DollarSign, Clock, Shield, MapPin, ArrowRight, CheckCircle, Menu, X } from "lucide-react"
import Link from "next/link"

export default function CampusWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [studentId, setStudentId] = useState("")
  const [balance, setBalance] = useState<number | null>(null)

  const handleBalanceCheck = () => {
    // Mock balance check - in real app would call API
    const mockBalance = Math.floor(Math.random() * 500) + 50
    setBalance(mockBalance)
  }

  const features = [
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "Contactless Payments",
      description: "Quick and secure payments at all campus dining locations with just a tap.",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-primary" />,
      title: "Budget Tracking",
      description: "Monitor your spending with real-time balance updates and transaction history.",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "24/7 Access",
      description: "Check your balance and manage your account anytime, anywhere on campus.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure & Protected",
      description: "Advanced security features protect your funds and personal information.",
    },
  ]

  const mealPlans = [
    {
      name: "Basic Plan",
      price: "$299",
      period: "per semester",
      meals: "10 meals/week",
      dining: "$50 dining dollars",
      features: ["Access to all dining halls", "Rollover unused meals", "Guest meal options"],
    },
    {
      name: "Standard Plan",
      price: "$449",
      period: "per semester",
      meals: "15 meals/week",
      dining: "$100 dining dollars",
      features: ["Access to all dining halls", "Rollover unused meals", "Guest meal options", "Late night dining"],
      popular: true,
    },
    {
      name: "Premium Plan",
      price: "$599",
      period: "per semester",
      meals: "Unlimited meals",
      dining: "$200 dining dollars",
      features: [
        "Access to all dining halls",
        "Unlimited guest meals",
        "Premium dining locations",
        "Late night dining",
        "Catering discounts",
      ],
    },
  ]

  const locations = [
    { name: "Main Dining Hall", hours: "7:00 AM - 10:00 PM", type: "All-you-can-eat" },
    { name: "Student Union Café", hours: "8:00 AM - 8:00 PM", type: "À la carte" },
    { name: "Library Coffee Shop", hours: "6:00 AM - 12:00 AM", type: "Coffee & Snacks" },
    { name: "Recreation Center Grill", hours: "11:00 AM - 9:00 PM", type: "Fast Casual" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">CampusCard</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#plans" className="text-foreground hover:text-primary transition-colors">
                Meal Plans
              </a>
              <a href="#locations" className="text-foreground hover:text-primary transition-colors">
                Locations
              </a>
              <a href="#balance" className="text-foreground hover:text-primary transition-colors">
                Check Balance
              </a>
              <Link href="/">
                <Button>Student Portal</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-foreground hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#plans" className="text-foreground hover:text-primary transition-colors">
                  Meal Plans
                </a>
                <a href="#locations" className="text-foreground hover:text-primary transition-colors">
                  Locations
                </a>
                <a href="#balance" className="text-foreground hover:text-primary transition-colors">
                  Check Balance
                </a>
                <Link href="/">
                  <Button className="w-full">Student Portal</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-secondary text-secondary-foreground">New Student Special</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Your Campus Dining Made <span className="text-primary">Simple</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Experience convenient, cashless dining across campus with our secure meal card system. Track spending,
                manage your balance, and enjoy delicious meals without the hassle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-card rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">Student ID: 12345</h3>
                      <p className="text-sm text-muted-foreground">Active Plan: Standard</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Current Balance</span>
                    <span className="text-2xl font-bold text-primary">$247.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Meals Remaining</span>
                    <span className="font-semibold text-card-foreground">12 this week</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Why Choose CampusCard?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed specifically for student life, our meal card system offers convenience, security, and flexibility
              for all your campus dining needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meal Plans Section */}
      <section id="plans" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Choose Your Meal Plan</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible meal plans designed to fit your lifestyle and budget. All plans include access to our premium
              dining locations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mealPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? "ring-2 ring-primary shadow-xl" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                  <CardDescription className="text-lg mt-2">
                    {plan.meals} + {plan.dining}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={plan.popular ? "default" : "outline"}>
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Balance Check Section */}
      <section id="balance" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Check Your Balance</h2>
            <p className="text-xl text-muted-foreground">Quick balance lookup using your student ID</p>
          </div>

          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Balance Inquiry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Student ID</label>
                <Input
                  placeholder="Enter your student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleBalanceCheck} disabled={!studentId}>
                Check Balance
              </Button>

              {balance !== null && (
                <div className="mt-6 p-4 bg-card rounded-lg border text-center">
                  <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                  <p className="text-3xl font-bold text-primary">${balance}</p>
                  <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Dining Locations</h2>
            <p className="text-xl text-muted-foreground">
              Use your CampusCard at any of our convenient dining locations across campus
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{location.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {location.type}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{location.hours}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-card-foreground">CampusCard</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Making campus dining convenient, secure, and enjoyable for students everywhere.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-card-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#plans" className="text-muted-foreground hover:text-primary transition-colors">
                    Meal Plans
                  </a>
                </li>
                <li>
                  <a href="#locations" className="text-muted-foreground hover:text-primary transition-colors">
                    Locations
                  </a>
                </li>
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Student Portal
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-card-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Lost Card
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-card-foreground mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Campus Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Mobile App
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Notifications
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Updates
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">© 2024 CampusCard System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
