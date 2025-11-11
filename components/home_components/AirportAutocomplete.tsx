"use client";

import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

// Sample data for demonstration (IATA code, City Name)
const AIRPORT_DATA = [
    // India Major
    { id: 'DEL', name: 'Indira Gandhi Int\'l Airport', city: 'New Delhi' },
    { id: 'BOM', name: 'Chhatrapati Shivaji Maharaj Int\'l Airport', city: 'Mumbai' },
    { id: 'BLR', name: 'Kempegowda Int\'l Airport', city: 'Bengaluru' },
    { id: 'MAA', name: 'Chennai International Airport', city: 'Chennai' },
    { id: 'HYD', name: 'Rajiv Gandhi Int\'l Airport', city: 'Hyderabad' },
    
    // Europe Major
    { id: 'LHR', name: 'Heathrow Airport', city: 'London' },
    { id: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris' },
    { id: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam' },
    { id: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt' },
    { id: 'FCO', name: 'Leonardo da Vinci-Fiumicino Airport', city: 'Rome' },

    // Middle East / Asia Major
    { id: 'DXB', name: 'Dubai International Airport', city: 'Dubai' },
    { id: 'DOH', name: 'Hamad International Airport', city: 'Doha' },
    { id: 'SIN', name: 'Changi Airport Singapore', city: 'Singapore' },
    { id: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok' },
    { id: 'DPS', name: 'Ngurah Rai International Airport', city: 'Bali' }, // For Bali

    // North America Major
    { id: 'JFK', name: 'John F. Kennedy Int\'l Airport', city: 'New York' },
    { id: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles' },
    { id: 'ORD', name: 'O\'Hare International Airport', city: 'Chicago' },
    { id: 'YYZ', name: 'Toronto Pearson International Airport', city: 'Toronto' },

    // South America
    { id: 'GIG', name: 'Rio de Janeiro Galeão Int\'l Airport', city: 'Rio de Janeiro' },
    
    // Oceania
    { id: 'SYD', name: 'Sydney Airport', city: 'Sydney' },
];

interface AirportAutocompleteProps {
    value: string;
    onChange: (id: string, name: string) => void;
    placeholder: string;
    className?: string;
}

export function AirportAutocomplete({ value, onChange, placeholder, className }: AirportAutocompleteProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(value);
    
    // Filter the list based on user input
    const filteredAirports = useMemo(() => {
        if (!query) return AIRPORT_DATA;
        const lowerCaseQuery = query.toLowerCase();
        return AIRPORT_DATA.filter(airport =>
            airport.name.toLowerCase().includes(lowerCaseQuery) ||
            airport.city.toLowerCase().includes(lowerCaseQuery) ||
            airport.id.toLowerCase().includes(lowerCaseQuery)
        );
    }, [query]);

    // Display value formatting
    const displayValue = AIRPORT_DATA.find(a => a.id === value) 
        ? `${AIRPORT_DATA.find(a => a.id === value)?.city} (${value})`
        : query;

    const handleSelect = (id: string, name: string) => {
        onChange(id, name);
        setQuery(name); // Display the airport name in the input field
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Input
                    value={displayValue}
                    placeholder={placeholder}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setOpen(true)}
                    className={cn("text-lg font-bold border-0 border-b rounded-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0", className)}
                />
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput 
                        placeholder="Search airport or city..." 
                        value={query}
                        onValueChange={setQuery}
                    />
                    <CommandList>
                        {filteredAirports.length === 0 ? (
                            <CommandEmpty>No results found.</CommandEmpty>
                        ) : (
                            <CommandGroup heading="Suggestions">
                                {filteredAirports.map((airport) => (
                                    <CommandItem
                                        key={airport.id}
                                        value={`${airport.city} ${airport.name} ${airport.id}`}
                                        onSelect={() => handleSelect(airport.id, airport.name)}
                                        className="cursor-pointer"
                                    >
                                        <div className='flex justify-between w-full'>
                                            <span>{airport.city}, {airport.name}</span>
                                            <span className='font-bold'>{airport.id}</span>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}