import React , { useState, useEffect } from 'react'
import AdmHeader from '../componentes/AdmHeader'
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';



const InserirLivro = () => {
  const [listaGeneros, setListaGeneros] = useState([]);

  useEffect(() => {
      const buscarGeneros = async () => {
      try {
        const resposta = await axios.get("http://localhost:3000/generos"); 
        setListaGeneros(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar gêneros:", erro);
      }
    };
    buscarGeneros();
  }, []);
  
  const generosDisponiveis = (indexAtual) => {
    return listaGeneros.filter(genero =>
      !livro.generos.some((g, idx) => g === genero.nome && idx !== indexAtual)
    );
  };
  

    const [livro, setLivro] = useState({
        titulo: '',
        autor: '',
        editora: '',
        anoPublicacao: '',
        generos: ['', '', ''],
        exemplares: '',
        paginas: '',
        sinopse: '',
        capa: '',
      });
      
      const handleChange = (e) => {
        const { id, value } = e.target;
      
        if (id.startsWith("generoLivro")) {
          const index = parseInt(id.replace("generoLivro", "")) - 1;
          const novosGeneros = [...livro.generos];
          novosGeneros[index] = value;
          setLivro({ ...livro, generos: novosGeneros });
        } else {
          setLivro({ ...livro, [id]: value });
        }
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await axios.post("http://localhost:3000/livros", livro);
          alert("Livro cadastrado com sucesso!");
          setLivro({
            titulo: '',
            autor: '',
            editora: '',
            anoPublicacao: '',
            generos: ['', '', ''],
            exemplares: '',
            paginas: '',
            sinopse: '',
            capa: '',
          });
        } catch (err) {
          alert("Erro ao cadastrar livro.");
          console.error(err);
        }
      };

  return (
    <>
        < AdmHeader />
        <main className="bg-secondary mainTeste">

            <section>
                <div className="container" style={{ marginTop: '70px' }}>
                    <div className="card bg-dark text-light">
                        <div className="card-body">
                            <h3 className="card-title">Formulário de Inserção de Livros</h3>

                            <form onSubmit={handleSubmit} className="mt-3">
                                <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="tituloLivro" className="form-label">Título do Livro:</label>
                                    <input type="text" id="titulo" className="form-control" placeholder="Ex: O doador de memórias" value={livro.titulo} onChange={handleChange} required />
                                </div>

                                <div className="mb-3 col-md-6">
                                    <label htmlFor="autorLivro" className="form-label">Autor do Livro:</label>
                                    <input type="text" id="autor" className="form-control" placeholder="Ex: Machado de Assis" value={livro.autor} onChange={handleChange} required />
                                </div>

                                <div className="mb-3 col-md-4">
                                    <label htmlFor="editoraLivro" className="form-label">Editora do Livro:</label>
                                    <input type="text" id="editora" className="form-control" placeholder="Ex: Saraiva"  value={livro.editora} onChange={handleChange} required/>
                                </div>

                                <div className="mb-3 col-md-2">
                                  <label htmlFor="anoPublicacao" className="form-label">Publicado:</label>
                                  <input
                                    type="number"
                                    id="anoPublicacao"
                                    className="form-control"
                                    min="1500"
                                    max={new Date().getFullYear()}
                                    placeholder="Ex: 2005"
                                    value={livro.anoPublicacao}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>

                                <div className="mb-3 col-md-2">
                                    <label htmlFor="generoLivro1" className="form-label">Gênero 1:</label>
                                    <select id="generoLivro1" className="form-select" value={livro.generos[0]}onChange={handleChange} required>
                                    <option value="">Selecione</option>
                                    {generosDisponiveis(0).map((genero) => (
                                      <option key={genero._id} value={genero.nome}>
                                        {genero.nome}
                                      </option>
                                      ))}
                                    </select>
                                </div>

                                <div className="mb-3 col-md-2">
                                    <label htmlFor="generoLivro2" className="form-label">Gênero 2:</label>
                                    <select id="generoLivro2" className="form-select" value={livro.generos[1]}  onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    {generosDisponiveis(1).map((genero) => (
                                      <option key={genero._id} value={genero.nome}>
                                        {genero.nome}
                                      </option>
                                    ))}
                                    </select>
                                </div>

                                <div className="mb-3 col-md-2">
                                    <label htmlFor="generoLivro3" className="form-label">Gênero 3:</label>
                                    <select id="generoLivro3" className="form-select" value={livro.generos[2]}  onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    {generosDisponiveis(2).map((genero) => (
                                      <option key={genero._id} value={genero.nome}>
                                        {genero.nome}
                                      </option>
                                    ))}
                                    </select>
                                </div>

                                {/* <div className="mb-3 col-md-5">
                                    <label htmlFor="ISBN10" className="form-label">ISBN-10:</label>
                                    <input type="number" id="ISBN10" className="form-control" placeholder="Ex: ---"  value={livro.ISBN10} onChange={handleChange}/>
                                </div>

                                <div className="mb-3 col-md-5">
                                    <label htmlFor="ISBN13" className="form-label">ISBN-13:</label>
                                    <input type="number" id="ISBN13" className="form-control" placeholder="Ex: ---"  value={livro.ISBN13} onChange={handleChange} />
                                </div> */}

                                <div className="mb-3 col-md-2">
                                    <label htmlFor="exemplaresLivros" className="form-label">Exemplares:</label>
                                    <input type="number" id="exemplares" className="form-control" placeholder="Ex: 80"  value={livro.exemplares} onChange={handleChange}  required/>
                                </div>

                                <div className="mb-3 col-md-2">
                                    <label htmlFor="pafinasLivros" className="form-label">Páginas:</label>
                                    <input type="number" id="paginas" className="form-control" placeholder="Ex: 230"  value={livro.paginas} onChange={handleChange}  required/>
                                </div>

                                <div className="mb-3 col-12">
                                    <label htmlFor="sinopseLivro" className="form-label">Sinopse:</label>
                                    <textarea className="form-control" id="sinopse" rows="5" value={livro.sinopse} onChange={handleChange} required></textarea>
                                </div>

                                <div className="mb-3 col-12">
                                    <label htmlFor="imagemLivro" className="form-label">Selecione a imagem de capa:</label>
                                    <input type="text" id="capa" className="form-control" placeholder="Url do arquivo" value={livro.capa} onChange={handleChange} required />
                                </div>
                                </div>

                                <div className="d-flex justify-content-end mt-3">
                                <button type="submit" className="btn btn-warning me-2">Enviar</button>
                                <button type="reset" className="btn btn-danger">Apagar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    </>
  )
}

export default InserirLivro