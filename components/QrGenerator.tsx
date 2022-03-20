import { QRCode } from "react-qr-svg";

const QrGenerator = ({ value, id }: { value: string, id: string }) => {
  return (
    <QRCode
      id={id}
      level="Q"
      value={value}
    />
  )
};

export default QrGenerator;