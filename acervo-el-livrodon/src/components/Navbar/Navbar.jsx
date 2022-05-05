import "./Navbar.css";
import sacola from "../../assets/icons/sacola.png";
import logo from "../../assets/LogoElLivrodon.png";
import livro from "../../assets/icons/livro.png";


export function Navbar({createLivro}) {
  
  return (
    <div className="Home__header Header">
      <div div className="row">
        <div className="Header__logo Logo">
          <img
            src={logo}
            width="70px"
            alt="Logo El Livrodon"
            className="Logo__icone"
          />
          <span className="Logo__titulo"> El Livrodon </span>
        </div>
        
        <div className="Header__opcoes Opcoes">
          <button type="button" className="Opcoes__livro Livro" onClick={() => createLivro() }>
              <img src={livro} width="40px" className="Livro__icone" alt="Adiconar Livro" />
          </button>
          <div className="Opcoes__sacola Sacola">
            <img
              src={sacola}
              width="50px"
              className="Sacola__icone"
              alt="Sacola de compras"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
