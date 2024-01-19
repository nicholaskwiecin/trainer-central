import React from 'react';

export interface PokemonDetailsProps {
    details: {
        name: string;
        height: number;
        base_experience: number;
        weight: number;
    }
}
const PokemonDetails: React.FC<PokemonDetailsProps> = ({details}) => {
   // console.log(details)
    return (
            <table className='dark:text-white'>
                <tbody>
                    {Object.entries(details).filter(([key,])=>['name','height','base_experience','weight'].includes(key)).map(([key, value]) => (
                        <tr key={key}>
                            <td>{key.replaceAll('_',' ')}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    );
};

export default PokemonDetails;
