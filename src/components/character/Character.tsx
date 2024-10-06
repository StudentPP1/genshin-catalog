import { useEffect, useState } from 'react'
import '../../styles/character.css'

function Character() {
  const character = (window.location.pathname).split("/")[1];

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [birthday, setBirthday] = useState('');
  const [constellation, setConstellation] = useState('');
  const [description, setDescription] = useState('');
  const [rarity, setRarity] = useState<number>(0);
  const [weapon, setWeapon] = useState('');
  const [nation, setNation] = useState('');
  const [image, setImage] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const getCharacterInfo = async () => {
      const url = `https://genshin.jmp.blue/characters/${character}`;
      const result = await fetch(url);
      const json = await result.json()
      setName(json.name)
      setTitle(json.title)
      setBirthday(json.birthday)
      setConstellation(json.constellation)
      setDescription(json.description)
      setRarity(json.rarity)
      setNation(json.nation)
      setWeapon(json.weapon)
    }

    const getImage = async () => {
      const imageUrl = `https://genshin.jmp.blue/characters/${character}/icon-big`;
      const imageResult = await fetch(imageUrl);
      setImage(URL.createObjectURL(await imageResult.blob())?.toString())
    }

    getImage()
    .catch((e: Error) => {
      setHttpError(e.message)
      setIsLoading(false)
    })
    .then(() => {
      getCharacterInfo().catch((e: Error) => {
        setHttpError(e.message)
        setIsLoading(false)
    })
    .then(() => setIsLoading(false))
    })
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
    <div className='
    py-6 px-4 sm:p-6 md:py-10 md:px-10 
    lg:grid lg:grid-cols-2 lg:gap-4
    md:grid md:grid-cols-2 md:gap-4
    sm:flex-wrap sm:items-center sm:justify-center
    '>
      <div className='grid-col-1 flex flex-col'>
        <img src={image} className='character-image' alt="portrait" />
        <h1 className='font-whitney text-2xl xl:text-3xl py-2 center'>{name}</h1>
        <div className="flex items-center center">
          {Array.from({ length: rarity }, (_, i) =>
          <svg  key={i} className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          )}
        </div>
      </div>

      <div className='grid-col-2'>
        <table className="text-sm w-full text-left">
          <tbody>
            <tr className="border-b border-black hover:scale-105 hover:shadow-sm hover:shadow-white">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Title
              </th>
              <td className="px-6 py-4 font-medium text-right">
                {title}
              </td>
            </tr>

            <tr className="border-b border-black hover:scale-105 hover:shadow-sm hover:shadow-white">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Nation
              </th>
              <td className="px-6 py-4 font-medium text-right">
                {nation}
              </td>
            </tr>

            <tr className="border-b border-black hover:scale-105 hover:shadow-sm hover:shadow-white">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Birthday
              </th>
              <td className="px-6 py-4 font-medium text-right">
                {`${birthday.split('-')[1]}/${birthday.split('-')[2]}`}
              </td>
            </tr>

            <tr className="border-b border-black hover:scale-105 hover:shadow-sm hover:shadow-white">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Constellation
              </th>
              <td className="px-6 py-4 font-medium text-right">
                {constellation}
              </td>
            </tr>

            <tr className="border-b border-black hover:scale-105 hover:shadow-sm hover:shadow-white">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Weapon
              </th>
              <td className="px-6 py-4 font-medium text-right">
                {weapon}
              </td>
            </tr>
            <tr className="border-b border-black hover:scale-105 hover:shadow-sm hover:shadow-white">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Weapon
              </th>
              <td className="px-6 py-4 font-medium text-right">
                {weapon}
              </td>
            </tr>
          </tbody>
        </table>

        <div className='font-whitney text-2xl py-5 text-center'>
          {description}
        </div>
      </div>
    </div>
  )
}

export default Character