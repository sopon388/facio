import Navbar from "../components/Navbar/Navbar";

import "./MainLayout.css";

const MainLayout = ({ children }) => {

  return (

    <div className="layout">

      {/* NAVBAR */}
      <Navbar />


      {/* MAIN CONTENT */}
      <main className="layout-content">

        {children}

      </main>

    </div>
  );
};

export default MainLayout;