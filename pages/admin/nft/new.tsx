import { useState } from "react"
import CTAButton from "../../../components/CTAButton"

export default function NewNFTForm() {
  const [name, nameSet] = useState<String>()
  const [enabled, enabledSet] = useState<Boolean>(false)
  const [file, fileSet] = useState<String>()
  const [location, locationSet] = useState<String>()
  
  function returnJson(){
    const obj = {
      name: name,
      image: file,
      details: location,
      hidden: enabled
    }
    
    // console.log(JSON.stringify(obj));
  }

  return (
    <div className="mx-4">
      <form className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
              Nome da atração
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
              type="text"
              required={true}
              onChange={e => nameSet(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
              Localização
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
              type="text"
              required={true}
              onChange={e => locationSet(e.target.value)}
          />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
              Imagem
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
              type="file"
              accept="image/*"
              required={true}
              onChange={e => fileSet(URL.createObjectURL(e.target.files[0]))}
          />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
          <label className="md:w-2/3 block text-gray-500 font-bold">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              onClick={() => enabledSet(e => !e)}
            />
            <span className="text-sm">
              Habilitado
            </span>
          </label>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <CTAButton value="Confimar" handleClick={() => {returnJson()}} />
          </div>
        </div>
      </form>
    </div>
  )
}