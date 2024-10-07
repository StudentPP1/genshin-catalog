import React from "react"
import '../../styles/card.css'
import { Link } from "react-router-dom";

export const Card: React.FC<{ character: string , image: string}> = (props) => {

  function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <Link to={`/${props.character}`} className="rounded-lg text-center h-128 w-128">
      <div className="card hover:scale-110 rounded-lg">
        <img className="card-img rounded-t-lg" src={props.image} alt="icon" />
        <div className="card-title rounded-b-lg">
          {capitalize(props.character)}
        </div>
      </div>
    </Link>
  )
}

export default Card;