"use client"
import React, { useState, useEffect } from 'react';

interface Country {
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
}

export default function SearchPage() {
    const [flagData, setFlagData] = useState<Country[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://countriesnow.space/api/v0.1/countries/flag/images`, { cache: 'force-cache' });
                const data = await response.json();
                setFlagData(data.data as Country[]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-2 gap-4">
            {flagData.map((country, index) => (
                <div key={index} className="flex items-center">
                    <img src={country.flag} alt={`Flag of ${country.name}`} className="w-8 h-8 rounded-full mr-2" />
                    <span>{country.name}</span>
                </div>
            ))}
        </div>
    );
}
