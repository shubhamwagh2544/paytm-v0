import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUpPage } from './pages/SignUpPage'
import { SignInPage } from './pages/SignInPage'
import { DashboardPage } from './pages/DashboardPage'
import { SendMoneyPage } from './pages/SendMoneyPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/send' element={<SendMoneyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
