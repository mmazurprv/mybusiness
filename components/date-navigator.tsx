'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function DateNavigatorComponent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const dateParam = searchParams.get('date')
    if (dateParam) {
      setDate(new Date(dateParam))
    }
  }, [searchParams])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const navigateDate = (days: number) => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + days)
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('date', newDate.toISOString().split('T')[0])
    router.push(`?${newSearchParams.toString()}`)
  }

  return (
    <Card className="">
      <CardContent className="p-4">
        <div className="flex items-center justify-between space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDate(-1)}
            aria-label="Previous day"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold text-center tabular-nums flex-grow">
            {formatDate(date)}
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDate(1)}
            aria-label="Next day"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
