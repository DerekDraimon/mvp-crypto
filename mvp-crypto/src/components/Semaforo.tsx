import { useState } from 'react'

function Semaforo() {
  const [colorLuz, setColorLuz] = useState('rojo')

  const cambiarColor = () => {
    setColorLuz(colorLuz === 'rojo' ? 'verde' : 'rojo')
  }

  return (
    <div className="semaforo">
      <div
        className="luz-semaforo"
        style={{ backgroundColor: colorLuz === 'rojo' ? '#ef4444' : '#22c55e' }}
      />

      <button className="cart-button" type="button" onClick={cambiarColor}>
        Cambiar color
      </button>
    </div>
  )
}

export default Semaforo
