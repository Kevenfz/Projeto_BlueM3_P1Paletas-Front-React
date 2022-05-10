import "./SacolaModal.css";
import { Modal } from "../Modal/modal";
import { SacolaService } from "../../services/SacolaService";
import { useEffect, useState } from "react";
import { LivroService } from "../../services/LivrosService";
import { useNavigate } from "react-router-dom";

export function SacolaModal({ closeModal }) {

  const [lista, setLista] = useState([]);
  const navigate = useNavigate();


  const purchase = async () => {
    await SacolaService.purchase();
    navigate("/loading");
  };

  const handleClose = async () => {
    await SacolaService.purchase();
    closeModal();
  };

  const getListas = async () => {
    const livroLista = await LivroService.getLista();
    const sacolaLista = await SacolaService.getLista();

    const encontraNome = (id) => {
      const obj = livroLista.find((i) => i.id === id);
      return (obj && obj.titulo) ?? "";
    };

    if (Array.isArray(sacolaLista)) {
      const novaLista = sacolaLista.map(({ livroId, quantidade }) => ({
        nome: encontraNome(livroId),
        quantidade,
      }));

      setLista(novaLista);
    }
  };

  useEffect(() => {
    getListas();
  }, []);

  return (
    <Modal closeModal={handleClose}>
      <div className="SacolaModal">
        <h2>Livros & Quantidades</h2>

        <div>
          {lista.map((i, idx) => (
            <div key={idx}>
              {" "}
              {i.nome + " " + i.quantidade + "x"} <br />
            </div>
          ))}
        </div>

        <br />

        <div>
          <button onClick={purchase} className="SacolaModal__confirmar">
            {" "}
            Fechar compra{" "}
          </button>
        </div>
      </div>
    </Modal>
  );
}
