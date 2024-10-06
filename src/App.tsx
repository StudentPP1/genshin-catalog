import { BrowserRouter, Route, Routes } from "react-router-dom"
import Catalog from "./components/catalog/Catalog"
import Character from "./components/character/Character"

function App() {
  return (
      <div className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
        <BrowserRouter>
          <Routes>
            <Route element={<Catalog/>} path="/"/>
            <Route element={<Character/>} path="/:character"/>
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
