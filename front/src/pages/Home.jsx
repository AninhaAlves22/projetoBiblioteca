import React from 'react'
import Header from '../componentes/Header'
import Footer from '../componentes/Footer'
import garota from "../assets/img/garota_lendo.png"
import Carousel from '../componentes/Carousel'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      < Header />
      <main>
        <section className="bg-dark text-bg-dark section_title" >
          <div className="container"  id="banner">

              <div className="text-center ">
                  <h1 className="display-1 section_title_h1">Dê uma olhada ao <span className="text-warning">redor</span></h1>
              </div>

          </div>
        </section>
      
        <div className="container contaiiner_home--carousel">
          <div className="card text-bg-warning">
              <div className="card-header">
                  <h3>Um pouco de Leitura</h3>
              </div>
          </div>
        </div>

        < Carousel />

        <section className="mt-4">
          <div className="container">
            <div className="card bg-warning">
              <div className="card-body">
                <div className="row">
                    <div className="col-md-8">

                      <h3 className="card-title text-black">Descomplicando a Biblioteca Física</h3>
                      <h5 className="card-subtitle text-dark-emphasis" style={{ fontStyle: "italic" }}>Entenda como o nosso site funciona</h5>
                      <p className="card-text mt-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt purus et posuere vulputate. In ac posuere tellus. Quisque a dui tortor. Vivamus sit amet mi sit amet leo pellentesque tincidunt nec ac ante. Cras id placerat neque. Nullam lorem arcu, porttitor nec nisi vitae, bibendum varius velit. Vivamus viverra elit et iaculis accumsan. Ut vitae mauris enim. Mauris consequat urna in lacinia laoreet. Integer risus lectus, aliquet nec pulvinar eget, dapibus sit amet lectus.
                      </p>
                      <p className="card-text">
                          Fusce suscipit nibh eget lectus laoreet elementum. Suspendisse in ante a dui auctor venenatis varius eget justo. Fusce vestibulum pellentesque nulla, id mollis justo. Vivamus lobortis sodales pulvinar. Praesent molestie est odio, vitae sodales ex porta eu. Praesent tincidunt blandit ultricies. Pellentesque nec scelerisque nunc. Sed faucibus convallis nunc, et molestie ante maximus quis. Fusce eu sapien ac ligula vulputate volutpat. Cras in ligula maximus, scelerisque nibh sed, pharetra dui. Donec a elit tincidunt, lobortis tortor eget, maximus arcu. Fusce blandit, massa ut viverra placerat, ante nunc tincidunt urna, non accumsan tortor odio sit amet lacus.                        
                      </p>
                      <p className="card-text">Conheça mais sobre os desenvolvedores em <Link to="#" className="card-link">Sobre nós</Link></p>
                    </div>

                    <div className="col-md-4">
                      <img src={garota} className="img-fluid garota" alt="" />
                    </div>
                </div>

              </div>
            </div>

          </div>
        </section>

      </main>
      < Footer />
    </>
  )
}

export default Home