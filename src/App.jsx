import "regenerator-runtime/runtime";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ChainedPage from "./pages/ChainedPage.jsx"
import MathPage from "./pages/MathPage.jsx"
import RememberPage from "./pages/RememberPage.jsx"

// Navegación entre las diferentes páginas
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/chained",
        element: <ChainedPage />
      },
      {
        path: "/math",
        element: <MathPage />
      },
      {
        path: "/remember",
        element: <RememberPage/>
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
