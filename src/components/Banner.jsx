import { Megaphone } from 'lucide-react'
import './banner.css'

export function Banner () {
  return (
    <div className='banner'>
      <Megaphone />
      <p>
        Este proyecto fue creado con fines educativos. Encuentra el código fuente en <a href='https://github.com/pablos-juan/stride-ecomerce' target='_blank' rel='noopener noreferrer'>mi repositorio de GitHub</a>.
      </p>
    </div>
  )
}
