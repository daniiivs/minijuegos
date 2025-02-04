import Menu from "../components/Menu.jsx";
import ChainedGame from "../components/ChainedGame.jsx";

// Página de juego de palabras encadenadas
function ChainedPage() {
  return (
    <>
      <Menu page={"Palabras encadenadas"} />
      <ChainedGame/>
    </>
  );
}

export default ChainedPage;