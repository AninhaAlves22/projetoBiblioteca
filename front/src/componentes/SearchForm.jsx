import useHandleSearch from "../assets/funcoes/useBusca.js";  

function SearchForm() {
  const { search, setSearch, handleSubmit } = useHandleSearch();  
    
  return (
    <>
      <form onSubmit={handleSubmit}  className="searchForm" role="search">
        <input
          type="search"
          className="searchBar"
          placeholder="Título, gênero ou autor"
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />
        <button  type="submit" className="btnSearch">
          Pesquise
        </button>
      </form>
    </>
  );
}

export default SearchForm;
