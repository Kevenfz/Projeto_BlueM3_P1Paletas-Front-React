import "./Home.css";
import "../../assets/styles/main.css";
import {LivroLista} from "../../components/LivroLista/Livrolista"
import { Navbar } from "../../components/Navbar/Navbar";


export function Home() {
  return (
    <div className="Home">
      <Navbar />
      <div className="Home__container">
        <LivroLista />
      </div>
    </div>
  );
}

