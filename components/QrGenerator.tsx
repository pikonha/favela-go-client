import { QRCode } from "react-qr-svg";

const QrGenerator = ({ value, id }: { value: string, id: string }) => {
    return (
        <>
            <QRCode
                id={id}
                level="M"
                style={{ width: 200 }}
                value={value}
            >
            </QRCode>
        </>
    )
};

export default QrGenerator;