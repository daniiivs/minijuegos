import Menu from "../components/Menu.jsx";
import RememberGame from "../components/RememberGame.jsx"

// Página de juego de memoria
function RememberPage() {
  return (
    <>
      <Menu page={"Recordar palabras"} />
      <RememberGame/>
    </>
  );
}

export default RememberPage;