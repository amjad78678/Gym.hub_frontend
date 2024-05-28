
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import ScrollTop from './pages/common/ScrollTop'
import{ SkeletonTheme } from 'react-loading-skeleton';

function App() {

  return (
    <>
    <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
    <BrowserRouter>
    <ScrollTop/>
    <AppRouter/>
   </BrowserRouter>
   </SkeletonTheme>
    </>
  )
}

export default App
