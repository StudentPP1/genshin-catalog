import React, { useEffect, useState } from "react"
import '../../styles/card.css'
import { Link } from "react-router-dom";

export const Card: React.FC<{ character: string }> = (props) => {
  const [image, setImage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const getCharacterImg = async (character: string) => {
      const url = `https://genshin.jmp.blue/characters/${character}/icon`;
      const result = await fetch(url);
      setImage(URL.createObjectURL(await result.blob())?.toString())
    }

    getCharacterImg(props.character).catch((e: Error) => {
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

  function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <Link to={`/${props.character}`} className="card rounded-lg text-center h-128 w-128 hover:scale-110">
      <img loading="eager" className="rounded-t-lg" src={image} alt="icon" />
      <div className="card-title rounded-b-lg">
        {capitalize(props.character)}
      </div>
    </Link>
  )
}

export default Card;