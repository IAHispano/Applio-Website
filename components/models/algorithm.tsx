import React, { useState } from "react"

type SelectCallback = (value: string | null) => void

interface SortByProps {
  onSelect: SelectCallback
}

export default function SortByAlgorithm({ onSelect }: SortByProps) {
  const by = [
    { value: "rmvpe", label: "Rmvpe" },
    { value: "harvest", label: "Harvest" },
    { value: "crepe", label: "Crepe" },
    { value: "mangio-crepe", label: "Mangio-crepe" },
    { value: "fcpe", label: "Fcpe" },
  ]

  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null)

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectedAnimal(value)
    onSelect(value)
  }

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <select
        className="max-w-xs bg-white/20 rounded-full border border-white/20 w-fit px-4 h-10"
        onChange={handleSelect}
        value={selectedAnimal || "Rmvpe"}
      >
        {by.map((animal) => (
          <option
            key={animal.value}
            value={animal.value}
            className="text-black"
          >
            {animal.label}
          </option>
        ))}
      </select>
    </div>
  )
}
