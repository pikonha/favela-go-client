import { QRCode } from "react-qr-svg";

const QrGenerator = ({ value }: { value: string }) => {
    return (
        <>
            <QRCode
                level="Q"
                style={{ width: 256 }}
                value={value}
            >
            </QRCode>
        </>
    )
};

export default QrGenerator;