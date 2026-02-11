import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import Layout from './components/common/Layout'
import Opening from './components/Opening'
import FileBrowser from './components/FileBrowser/FileBrowser'
import DocumentReader from './components/DocumentReader/DocumentReader'
import Notebook from './components/Notebook/Notebook'
import Ending from './components/Ending/Ending'

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Opening />} />
          <Route element={<Layout />}>
            <Route path="/browse" element={<FileBrowser />} />
            <Route path="/doc/:id" element={<DocumentReader />} />
            <Route path="/notebook" element={<Notebook />} />
          </Route>
          <Route path="/ending" element={<Ending />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  )
}
