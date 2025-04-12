
import { createBrowserRouter, createRoutesFromElements, Route,  RouterProvider } from "react-router-dom"
import Document from "./pages/Document"
import Home from "./pages/Home"
import Login from "./pages/Login"



function App() {
const router=createBrowserRouter(createRoutesFromElements(<Route >
<Route path="/"  element={<Home/>}/>
<Route path="/:id" element={<Document/>}/>
<Route path="/login" element={<Login/>}/>

</Route>))

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App;
