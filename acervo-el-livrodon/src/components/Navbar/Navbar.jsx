import "./Navbar.css";
import sacola from "../../assets/icons/sacola.svg";
import logo from "../../assets/LogoElLivrodon.png";
// import paleta from "../../assets/icons/paleta.svg";


export function Navbar(createPaleta) {
  
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
        {/* <button type="button" className="Opcoes__paleta Paleta" onClick={() => createPaleta() }>
              <img src={paleta} width="40px" className="Paleta__icone" alt="Adiconar paleta" />
          </button> */}
          <div className="Opcoes__sacola Sacola">
            <img
              src={sacola}
              width="40px"
              className="Sacola__icone"
              alt="Sacola de compras"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
