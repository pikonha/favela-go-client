import { pinataCreds } from "../util";
import { useEffect, useState } from "react";
import axios from "axios";

export default function useUpload(stream: Blob) {
  const [upload, setUpload] = useState({});
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const pinFile = async () => {
    const creds = pinataCreds();

    let data = new FormData();
    data.append("file", stream);

    const result = await axios.post(url, data, {
      // maxBodyLength: 'Infinity', //this is needzed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data;`,
        pinata_api_key: creds.pinata_api_key,
        pinata_secret_api_key: creds.pinata_secret_api_key,
      },
    });
    return result;
  };
  pinFile().then(setUpload);

  return upload;
}
