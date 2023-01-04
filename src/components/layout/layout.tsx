import Navbar from "./navbar";
import Footer from "./footer";
import React from "react";
import "@fontsource/arvo"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={"flex min-h-screen flex-col items-center justify-center bg-slate-800"} style={{fontFamily: "Arvo"}}>
      <Navbar />
      { children }
      <Footer />
    </div>
  )
}

export default Layout;