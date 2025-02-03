import Menu from "../components/Menu.jsx";
import RememberGame from "../components/RememberGame.jsx"

function RememberPage() {
  return (
    <>
      <Menu page={"Recordar palabras"} />
      <RememberGame/>
    </>
  );
}

export default RememberPage;