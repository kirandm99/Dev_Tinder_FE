import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
