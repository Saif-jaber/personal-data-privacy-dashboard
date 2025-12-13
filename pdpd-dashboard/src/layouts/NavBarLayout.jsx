import NavBar from "../components/NavBar.jsx";
import { Outlet } from "react-router-dom";

const NavBarLayout = () => {
  return (
    <div className="layout">
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default NavBarLayout;
