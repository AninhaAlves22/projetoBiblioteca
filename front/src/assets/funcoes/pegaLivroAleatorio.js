
function pegaLivrosAleatorios(listaLivros, nSlides){

    let listaIndices = new Set();
    let listaNova = [];
    if (nSlides>listaLivros.length){
        nSlides=listaLivros.length
    }
    
    while (listaNova.length < nSlides) {
        let indiceAleatorio;
        
        do {
            indiceAleatorio = Math.floor(Math.random() * listaLivros.length);
        } while (listaIndices.has(indiceAleatorio));
    
        listaNova.push(listaLivros[indiceAleatorio]); 
        listaIndices.add(indiceAleatorio); 
    }

    return listaNova;

}

export default pegaLivrosAleatorios;


