import { useEffect, useState } from 'react'
import '../../styles/loader.css'
import Card from '../card/Card';

function Catalog() {
    const [characterList, setCharacterList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<String | null>(null);
    const [images, setImages] = useState<any>({});

    useEffect(() => {
        const getCharacterList = async () => {
            const url = "https://genshin.jmp.blue/characters";
            const result = await fetch(url);
            const json = await result.json();

            const finish = json.map(async (character: string) => {
                setIsLoading(true)
                const url = `https://genshin.jmp.blue/characters/${character}/icon`;
                const result = await fetch(url);
                images[character] = URL.createObjectURL(await result.blob())?.toString()
                setImages(images)
            })
    
            Promise.all(finish).then(() => {
                setCharacterList(json);
                setIsLoading(false);
            })
        }

        getCharacterList().catch((e: Error) => {
            setHttpError(e.message)
            setIsLoading(false)
        })
    }, [])

    if (httpError) {
        return (
            <div>
                {httpError}
            </div>
        )
    }
    
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
      
    return (
        <>
        <div className="mb-4"></div>
            <h1 className='text-center font-whitney text-2xl'>
                Characters
            </h1>
            <div className='py-6 px-4 sm:p-6 md:py-10 md:px-4'>
                <div className='flex flex-wrap justify-center gap-5'>
                    {characterList.map((character) =>
                    <div>
                        <Card character={character} image={images[character]}/>
                    </div>
                    )}
                </div>
            </div>
        </>    
    )
}

export default Catalog;