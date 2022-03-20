import { ReactNode } from "react"

interface CTAButtonProps {
  handleClick: () => void
  children?: ReactNode
}

export default function CTAButton({handleClick, children}: CTAButtonProps) {
  return (
    <button 
        className="shadow bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        onClick={e => {
          e.preventDefault()
          handleClick()
        }}
      >
        {children}
      </button>
  )
}