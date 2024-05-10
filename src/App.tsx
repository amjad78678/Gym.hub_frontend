
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import ScrollTop from './pages/common/ScrollTop'

function App() {

  return (
    <>
    <BrowserRouter>
    <ScrollTop/>
    <AppRouter/>
   </BrowserRouter>

    </>
  )
}

export default App
