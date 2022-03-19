interface CTAButtonProps {
  value: string
  handleClick: () => void
}

export default function CTAButton({value, handleClick}: CTAButtonProps) {
  return (
    <button 
        className="shadow bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        onClick={e => {
          e.preventDefault()
          handleClick()
        }}
      >
        {value}
      </button>
  )
}