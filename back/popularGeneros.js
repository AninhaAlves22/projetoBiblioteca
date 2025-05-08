import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // carrega .env

const MONGO_URI = process.env.DB_CONNECTION_STRING;
console.log("URI do Mongo:", MONGO_URI); // Deve imprimir a URI real


const generoSchema = new mongoose.Schema({
  nome: String,
});

const Genero = mongoose.model('Genero', generoSchema);

const listaDeGeneros = [
  { nome: 'Ficção Científica' },
  { nome: 'Fantasia' },
  { nome: 'Romance' },
  { nome: 'Terror' },
  { nome: 'Suspense' },
  { nome: 'Mistério' },
  { nome: 'Aventura' },
  { nome: 'Drama' },
  { nome: 'Comédia' },
  { nome: 'Histórico' },
  { nome: 'Biografia' },
  { nome: 'Autoajuda' },
  { nome: 'Poesia' },
  { nome: 'Didático' },
  { nome: 'Religião' }
];

try {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Conectado ao MongoDB');
  await Genero.insertMany(listaDeGeneros);
  console.log('✅ Gêneros inseridos com sucesso!');
  mongoose.disconnect();
} catch (err) {
  console.error('❌ Erro ao conectar ou inserir:', err);
}
