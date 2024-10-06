import { useEffect, useState } from 'react'
import '../../styles/loader.css'
import Card from '../card/Card';

function Catalog() {
    const [characterList, setCharacterList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<String | null>(null);

    useEffect(() => {
        const getCharacterList = async () => {
            const url = "https://genshin.jmp.blue/characters";
            const result = await fetch(url);
            const json = await result.json();
            setCharacterList(json)
        }

        getCharacterList().catch((e: Error) => {
            setHttpError(e.message)
            setIsLoading(false)
        })
        
        setIsLoading(false)  
    }, [])

    if (isLoading) {
        return (
            <div className="loader">
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
            </div>
        )
    }

    if (httpError) {
        return (
            <div>
                {httpError}
            </div>
        )
    }
    
    return (
        <>
            <div className="mb-4"></div>
            <h1 className='text-center font-whitney text-2xl'>
                Characters
            </h1>
            <div className='py-6 px-4 sm:p-6 md:py-10 md:px-4'>
                <div className='flex flex-wrap justify-center gap-5'>
                    {characterList.map((character) =>
                        <Card character={character}/>
                    )}
                </div>
            </div>
        </>
    )
}

export default Catalog;