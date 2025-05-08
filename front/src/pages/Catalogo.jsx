import React from 'react'
import Header from '../componentes/Header'
import Footer from '../componentes/Footer'
import ContentCatalogo from '../componentes/ContentCatalogo'

const Catalogo = () => {
  return (
    <div className='page-wrapper'>
        < Header />
        < ContentCatalogo />
        < Footer />
    </div>
)
}

export default Catalogo