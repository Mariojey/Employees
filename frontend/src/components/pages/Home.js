import React from "react";
import './Home.css';

import Navbar from "../elements/Navbar";
import Footer from "../elements/Footer";
import Search from "../modules/Search";

export default function Home() {
    return(
        <div className="home">
            <Navbar />
            <div className="homeContent">
                <div className="center oversize searchbar">
                    <Search />
                </div>
            </div>
            <Footer />
        </div>
    )
}