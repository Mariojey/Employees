import React from "react";

import Navbar from "../elements/Navbar";
import Footer from "../elements/Footer";
import Search from "../modules/Search";

export default function Home() {
    return(
        <div className="home">
            <Navbar />
            <Search />
            <Footer />
        </div>
    )
}