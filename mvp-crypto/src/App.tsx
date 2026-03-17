import Header from './components/Header'
import Section from './components/Section'
import Footer from './components/Footer'
import ProfileCard from './components/ProfileCard'
import Gallery from './components/Gallery'
import MiniX from './mini-x'

function App() {

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
            <Gallery />
          </Section>

          <Section id="comentarios" title="Sección de Comentarios">
            <p>Zona para leer y dejar comentarios.</p>
          </Section>
        </main>

        <MiniX />

        <Footer />
      </div>
    </>
  )
}

export default App
