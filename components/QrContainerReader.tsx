import { QrReader } from 'react-qr-reader';

import React, { useState } from "react";
import { ERC20 } from '../contracts/types';

const QrContainer = ({ contract, address }: { contract: ERC20, address: string }) => {
    const [data, setData] = useState('No result');
    const [error, setError] = useState('');

    async function handlerScan(result, error) {
        if (error) {
            console.error(error)
            setError(error.message)
            return
        }

        const idNFT = result?.id;
        if (idNFT) {
            
            // TODO: verify the geolocation cords

            try {
                setData(idNFT)

                await contract.safeMint(address, result.id)
                alert(`NFT ${idNFT} minted with success :D`)
            } catch (err) {
                console.error(err)
            }
        }

        setData("No info QR Code");
    }

    return (
        <>
            <QrReader
                scanDelay={100}
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