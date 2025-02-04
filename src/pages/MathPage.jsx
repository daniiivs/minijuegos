import Menu from "../components/Menu.jsx";
import MathGame from "../components/MathGame.jsx";

// Página de juego de matemáticas
function MathPage() {
  return (
    <>
      <Menu page={"Matemáticas"} />
      <MathGame />
    </>
  );
}

export default MathPage;