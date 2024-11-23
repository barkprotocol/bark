import React from 'react'
import { Button } from "@/components/ui/button"

interface FilterButtonsProps {
  filter: 'all' | 'available' | 'coming'
  setFilter: (filter: 'all' | 'available' | 'coming') => void
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter }) => (
  <div className="flex justify-center space-x-4 mb-8">
    <Button 
      onClick={() => setFilter('all')} 
      variant={filter === 'all' ? "default" : "outline"}
    >
      All Services
    </Button>
    <Button 
      onClick={() => setFilter('available')} 
      variant={filter === 'available' ? "default" : "outline"}
    >
      Available Now
    </Button>
    <Button 
      onClick={() => setFilter('coming')} 
      variant={filter === 'coming' ? "default" : "outline"}
    >
      Coming Soon
    </Button>
  </div>
)

export default FilterButtons