import { QrReader } from 'react-qr-reader';

import React, { useState } from "react";
import { ERC20 } from '../contracts/types';

const QrContainer = ({ contract, address }: { contract: ERC20, address: string }) => {
    const [data, setData] = useState('No result');
    const [error, setError] = useState('');

    async function handlerScan(result, error) {
        if (error) {
            console.error(error)
            setError("No QR Code at the camera, please scan the QR Code")
            return
        }

        if (!result) {
            console.error(error)
            setError("NFT Identifier is null, verify the QR Code")
            return
        }

        const obj = JSON.parse(result.text)
        const { id, lat, lng } = obj;
        if (id !== null && id !== undefined) {
            // TODO: verify the geolocation cords

            try {
                setData(id)

                console.log(`ID ${id} para o address ${address}`)

                const txHash = await contract.safeMint(address, id)
                alert(`NFT ${id} minted with success - '${txHash}' =D`)
            } catch (err) {
                console.error(err)
            }
        } else {
            setData("No info QR Code");
        }
    }

    return (
        <>
            <QrReader
                scanDelay={500}
                onResult={handlerScan}
                constraints={{ facingMode: 'user' }}
                videoStyle={{ width: '50%' }}
                videoContainerStyle={{
                    height: 300,
                    width: 300,
                    display: 'flex',
                    justifyContent: 'center'
                }}
                containerStyle={{}}
            />
            <p>
                {data}
            </p>
            <p>
                {error}
            </p>
        </>
    );
};

export default QrContainer;