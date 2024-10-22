import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Background from "./pages/Background/Background";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Background>
        <Outlet />
      </Background>
    </>
  );
};

export default Layout;
