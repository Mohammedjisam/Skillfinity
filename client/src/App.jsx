import { Routes, Route, BrowserRouter } from 'react-router-dom'
import UserRoutes from './routes/UserRoutes'
import TutorRoutes from './routes/TutorRoutes'
import AdminRoutes from './routes/AdminRoutes'
import { Toaster } from 'sonner';
import { Provider } from 'react-redux'
import store from './redux/Store'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Toaster richColors position='top-right' />
      <Provider store={store}>
      <Routes>
        <Route path='/*' element={<UserRoutes />}/>
        <Route path='/tutor/*' element={<TutorRoutes />}/>
        <Route path='/admin/*' element={<AdminRoutes />}/>
      </Routes>
      </Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
