import React from 'react'


const SecaoPesquisa = ({ 
  titulo, 
  placeholder,
  search, 
  setSearch, 
  handleSubmit, 
  resultados = [], 
  buscaFeita = false,
  renderItem 
}) => {
  return (
    <section className="bg-secondary section-teste" style={{ border: "solid transparent 1px" }}>
      <div className="container" style={{ marginTop: "70px" }}>
        <div className="card bg-dark text-light">
          <div className="card-body">
            <h3 className="card-title">{`Seção de Pesquisa - ${titulo}`}</h3>

            <form onSubmit={handleSubmit} className="mt-5 form-teste" role="search">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder={placeholder} 
                      value={search} 
                      onChange={(e) => setSearch(e.target.value)} 
                    />
                    <button className="btn btn-light">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Resultados */}
            {resultados.map((item) => renderItem(item))}

            {/* Nenhum resultado */}
            {resultados.length === 0 && buscaFeita && (
              <p className="mt-4 text-warning fw-bold">Nenhum resultado encontrado</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecaoPesquisa;
