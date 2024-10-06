import React from "react"
import '../../styles/card.css'
import { Link } from "react-router-dom";

export const Card: React.FC<{ character: string , image: string}> = (props) => {

  function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <Link to={`/${props.character}`} className="rounded-lg text-center h-128 w-128 hover:scale-110">
      <img className="catalog-card rounded-t-lg" src={props.image} alt="icon" />
      <div className="card-title rounded-b-lg">
        {capitalize(props.character)}
      </div>
    </Link>
  )
}

export default Card;