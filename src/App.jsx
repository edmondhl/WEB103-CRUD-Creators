
import './App.css'
import Layout from './layout/Layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCreator from './pages/AddCreator'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/addCreator" element={<AddCreator />} />
        <Route path="/viewCreator/:name" element={<ViewCreator />} />
        <Route path="/editCreator/:name" element={<EditCreator />} />
      </Routes>
    </Router>
  )
}

export default App
