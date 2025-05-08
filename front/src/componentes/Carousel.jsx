import React, { useContext } from 'react';
import { Context } from '../assets/funcoes/context.js';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ContentCarousel from "./ContentCarousel";
import pegaLivrosAleatorios from "../assets/funcoes/pegaLivroAleatorio.js";


const Carousel = () => {
  const { livros } = useContext(Context);
  const listaLivros = pegaLivrosAleatorios(livros,3);
  return (
    <div className="containerCarrossel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={livros.length > 1} // Evita erro de loop se houver apenas 1 livro
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 4000, // Tempo entre cada slide (em ms)
          disableOnInteraction: false, // Continua mesmo após interação do usuário
        }}
        speed={600} // Duração da transição (em ms)
      >
        {listaLivros.map((livro, index) => (
          <SwiperSlide key={index}>
            < ContentCarousel livro={livro} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;

