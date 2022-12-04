import Login from "./components/login/Login";
import {Outlet, Route, Routes, useLocation, redirect} from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import About from "./components/about/About";
import Expenses from "./components/expenses/Expenses";

const WithoutNav = () => <Outlet/>
const WithNav = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}
function App() {
  const location = useLocation()
  console.log(location.pathname.includes('login'))
  return (
      <>
          <Routes>
              <Route element={<WithoutNav />}>
                  <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<WithNav />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/expenses" element={<Expenses />} />
              </Route>
          </Routes>
      </>
  )
}

export default App
