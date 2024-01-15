'use client';
import React, { useEffect, useState } from 'react';

const Pokemon: React.FC = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.example.com/data');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* Render the fetched data */}
            {data && (
                <ul>
                    {data.map((item: any) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Pokemon;
