import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Section from './components/Section'
import Footer from './components/Footer'
import ProfileCard from './components/ProfileCard'
import Gallery from './components/Gallery'
import Semaforo from './components/Semaforo'
import MiniX from './mini-x'

function App() {
  const [showCart, setShowCart] = useState(false)
  const [purchaseCompleted, setPurchaseCompleted] = useState(false)

  const cartItems = [
    { name: 'Bitcoin', price: '$69,000' },
    { name: 'Ethereum', price: '$3,500' },
    { name: 'Solana', price: '$180' },
  ]

  const openCartModal = () => {
    setShowCart(true)
    setPurchaseCompleted(false)
  }

  const closeCartModal = () => {
    setShowCart(false)
    setPurchaseCompleted(false)
  }

  const getPriceNumber = (price: string) => {
    const cleanPrice = price.replace(/[^0-9.]/g, '')
    return Number(cleanPrice) || 0
  }

  const total = cartItems.reduce((accumulator, item) => accumulator + getPriceNumber(item.price), 0)

  const handlePay = () => {
    setPurchaseCompleted(true)
  }

  return (
    <>
      <div className="body">
        <Header />

        <main>
          <Section id="grafica" title="Sección de Gráficas">
            <p>Aquí iría el contenido visual de las gráficas.</p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
              <ProfileCard
                avatar="😐"
                name="Estudiante Master"
                role="Web Developer Apprentice"
              />
              <ProfileCard
                avatar="🚀"
                name="Crypto Expert"
                role="Senior Analyst"
                buttonText="Investigar"
              />
            </div>
          </Section>

          <hr />

          <Section id="historicos" title="Sección de Históricos">
            <div className="cart-actions">
              <button className="cart-button" type="button" onClick={openCartModal}>
                Ver lista de compra
              </button>
            </div>
            <Gallery />
          </Section>

          <Section id="comentarios" title="Sección de Comentarios">
            <p>Zona para leer y dejar comentarios.</p>
            <Semaforo />
          </Section>
        </main>

        <MiniX />

        <Footer />

        {showCart && (
          <div className="modal-overlay">
            <div className="cart-modal">
              <button className="close-button" type="button" onClick={closeCartModal}>
                X
              </button>

              {!purchaseCompleted ? (
                <>
                  <h2>Productos seleccionados</h2>

                  <ul className="cart-list">
                    {cartItems.map((item, index) => (
                      <li className="cart-item" key={`${item.name}-${index}`}>
                        <span>{item.name}</span>
                        <span>{item.price}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="cart-total">
                    <span>Total</span>
                    <strong>${total.toLocaleString('en-US')}</strong>
                  </div>

                  <button className="pay-button" type="button" onClick={handlePay}>
                    Pagar
                  </button>
                </>
              ) : (
                <div className="success-box">
                  <h2>Compra exitosa</h2>
                  <p>El pago se realizó correctamente.</p>
                  <button className="pay-button" type="button" onClick={closeCartModal}>
                    Cerrar
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
