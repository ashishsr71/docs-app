
import { createBrowserRouter, createRoutesFromElements, Route,  RouterProvider } from "react-router-dom"
import Document from "./pages/Document"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Auth from "./pages/Auth"
import Signup from "./pages/Signup"



function App() {
const router=createBrowserRouter(createRoutesFromElements(<Route >
<Route path="/"  element={<Auth><Home/></Auth>}/>
<Route path="/:id" element={<Auth><Document/></Auth>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>
</Route>))

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App;
