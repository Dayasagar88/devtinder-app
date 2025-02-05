import { Facebook, HashIcon, TwitterIcon, Youtube } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const Footer = () => {

  const user = useSelector(store => store?.user)

  return !user && (
    <footer className="footer text-gray-200  items-center p-4 "  style={{
      background: "linear-gradient(to right, #3B3A73, #1F78A4)", // Slightly darker tones
    }}
    >
  <aside className="grid-flow-col items-center">
    <HashIcon className=''/>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <TwitterIcon/>
   <Youtube/>
    <Facebook/>
  </nav>
</footer>
  )
}

export default Footer