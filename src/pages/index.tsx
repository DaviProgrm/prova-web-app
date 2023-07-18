import { useEffect, useState } from "react";
import api from "../utils/api";

interface Sandalia {
  nome: string;
  cor: string;
  tamanho: number;
  preco: number;
  links: {
    rel: string;
    href: string;
  }[];
}

export default function Home() {
  const [sandalias, setSandalias] = useState<Sandalia[]>([]);

  const [nome, setNome] = useState("");
  const [cor, setCor] = useState("");
  const [tamanho, setTamanho] = useState(0);
  const [preco, setPreco] = useState(0);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/produto/cadastrarproduto",
        {
          nome,
          cor,
          tamanho,
          preco,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJBcGlSZXN0RGVtbyIsInN1YiI6ImRhdml0aHVnIiwiZXhwIjoxNjg5NjkzMTU0LCJpYXQiOjE2ODk2ODk1NTQsInNjb3BlIjoiVVNFUiJ9.ZqA3LSKxzwmb8HZ1U5RDeIfLUPohKZBq363hktWaBakGa1TJIqCFNN5uwovvbp3WtyiisLspeGeRSXbB370EtSrw9QRghoM11s7ktVB7Xst0p-A6c3oEOBnm3m3H59OltCL3xGrmFOzbRGqYmLdbqiBVKlwE3JE8OG9s87yveYbQrlPg9hPlYAJHrxQPX73op698z2I5CcAzG9qDOj2eVD9-TkXuvYl8KdQJRNmC85Jm66OpkmQmVt6F3umqW7W2fEmeOTWGNq4Gjh1QNhU50VwYqBImVPgFRgBaLoCb2A2s4BBQhmh4YwoJAV_q_eE98H7YosLk0JKtoQBNHV-_qQ",
          },
        }
      );
      console.log(response.data); // Faça algo com a resposta da API, como redirecionar o usuário ou atualizar a lista de produtos

      // Limpar os campos do formulário após o envio bem-sucedido
      setNome("");
      setCor("");
      setTamanho(0);
      setPreco(0);

      // Recarregar a página após o envio
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar o produto:", error);
    }
  };

  async function getSandalias() {
    try {
      const response = await api.get("/produto", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJBcGlSZXN0RGVtbyIsInN1YiI6ImRhdml0aHVnIiwiZXhwIjoxNjg5NjkzMTU0LCJpYXQiOjE2ODk2ODk1NTQsInNjb3BlIjoiVVNFUiJ9.ZqA3LSKxzwmb8HZ1U5RDeIfLUPohKZBq363hktWaBakGa1TJIqCFNN5uwovvbp3WtyiisLspeGeRSXbB370EtSrw9QRghoM11s7ktVB7Xst0p-A6c3oEOBnm3m3H59OltCL3xGrmFOzbRGqYmLdbqiBVKlwE3JE8OG9s87yveYbQrlPg9hPlYAJHrxQPX73op698z2I5CcAzG9qDOj2eVD9-TkXuvYl8KdQJRNmC85Jm66OpkmQmVt6F3umqW7W2fEmeOTWGNq4Gjh1QNhU50VwYqBImVPgFRgBaLoCb2A2s4BBQhmh4YwoJAV_q_eE98H7YosLk0JKtoQBNHV-_qQ",
        },
      });
      setSandalias(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSandalias();
  }, []);

  return (
    <div>
      <h1 id="h1">Sandálias</h1>
      <form onSubmit={handleFormSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="nome" className="block mb-2 font-medium">
            Marca:
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cor" className="block mb-2 font-medium">
            Cor:
          </label>
          <input
            type="text"
            id="cor"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tamanho" className="block mb-2 font-medium">
            Tamanho:
          </label>
          <input
            type="number"
            id="tamanho"
            value={tamanho}
            onChange={(e) => setTamanho(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="preco" className="block mb-2 font-medium">
            Preço:
          </label>
          <input
            type="number"
            id="preco"
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Criar Produto
        </button>
        <h1>------------------------------</h1>
        <h1>Lista de Sandalías</h1>
      </form>
      <div className="flex flex-wrap justify-center m-8">
        {sandalias.map((sandalia, index) => (
          <div
            key={index}
            className="w-1/2 max-w-sm rounded overflow-hidden shadow-lg flex flex-col justify-center items-center p-4"
          >
            <h2>Marca: {sandalia.nome}</h2>
            <p>Cor: {sandalia.cor}</p>
            <p>Tamanho: {sandalia.tamanho}</p>
            <p>Preço: {sandalia.preco}R$</p>
          </div>
        ))}
      </div>
    </div>
  );
}

