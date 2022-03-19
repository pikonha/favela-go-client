import axios from "axios";
import { useState } from "react"
import CTAButton from "../../../components/CTAButton"
import { v4 as uuidv4 } from 'uuid';


export default function NewNFTForm() {
  const [name, nameSet] = useState<String>()
  const [enabled, enabledSet] = useState<Boolean>(false)
  const [file, fileSet] = useState<String>()
  const [fileBlob, fileBlobSet] = useState<Blob>()
  const [location, locationSet] = useState<String>()
  
  async function uploadImage(){
    const metadata = JSON.stringify({
      name: uuidv4(),
    });
    const resp = await pinFile(fileBlob, metadata);
    
    if(resp.status != 200)
    {
      return null;
    }
    return resp.data.IpfsHash;
  }

  async function returnJson(){
    const imageHash = await uploadImage();
    if(imageHash == null) throw Error("Image Hash cannot be null");
    const obj = {
      name: name,
      image: `ipfs://${imageHash}`,
      description: location,
      hidden: !enabled,
    }
    const json = JSON.stringify(obj);
    const blob = new Blob([json], {
      type: 'application/json',
    });

    const metadata = JSON.stringify({
      name: uuidv4(),
    });
    pinFile(blob, metadata).then(x => console.log(x));
  }
  
  async function pinFile(stream, metadata) {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const creds = {
      pinata_api_key: String("0331243f64d660dfd4e9"),
      pinata_secret_api_key: String("a60562e2190616f28dcaa6c1ca2c3d2a89e21e45754b7d728e41de60b6b1df28"),
    };
    
    let data = new FormData();
    data.append("file", stream);
    data.append('pinataMetadata', metadata);
    const result = await axios.post(url, data, {
      // maxBodyLength: 'Infinity', //this is needzed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data;`,
        pinata_api_key: creds.pinata_api_key,
        pinata_secret_api_key: creds.pinata_secret_api_key,
      },
    });
    return result;
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
              onChange={e => {
                fileBlobSet(e.target.files[0]);
                fileSet(URL.createObjectURL(e.target.files[0]))
              }}
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
            <CTAButton value="Confimar" handleClick={returnJson} />
          </div>
        </div>
      </form>
    </div>
  )
}