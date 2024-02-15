import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUpPage } from './components/SignUpPage'
import { SignInPage } from './components/SignInPage'
import { DashboardPage } from './components/DashboardPage'
import { SendMoneyPage } from './components/SendMoneyPage'

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
