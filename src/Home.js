import React from "react";
import './Home.css';
import img from './img/Best-eCommerce-Themes-For-WordPress_photos_v2_x4_colored_toned.jpg';
import Product from "./Product";


function Home(){

    return(
        <div className="home">
            <img src={img} className="home__img"/>
            <div className="container-lg home__section">
                <div className="card-deck">
                    <Product id="1234" title="Lenovo Laptop" price={749.99} rating={5} img="https://m.media-amazon.com/images/I/517ImePoH7L._AC_UY218_.jpg"/>
                    <Product id="1235" title="Smart Watch" price={149.49} rating={5} img="https://images-na.ssl-images-amazon.com/images/I/41tttgs4alL._AC_US160_.jpg"/>
                    <Product id="1236" title="Hard Disk" price={219.99} rating={5} img="https://images-na.ssl-images-amazon.com/images/I/31NBRkcO0ZL._AC_US160_.jpg"/>
                    <Product id="1237" title="Sony WH-1000XM4 Wireless Industry Leading Noise Canceling Overhead Headphones with Mic for Phone-Call and Alexa Voice Control, Black" price={69.99} rating={5} img="https://images-na.ssl-images-amazon.com/images/I/41jSuUHT8eL._AC_US160_.jpg"/>
                </div>
                <div className="card-deck">
                    <Product id="1238" title="Dowinx Gaming Chair Fabric with Pocket Spring Cushion, Massage Game Chair Cloth with Headrest, Ergonomic Computer Chair with Footrest 290LBS, Dark Grey" price={189.49} rating={4} img="https://m.media-amazon.com/images/I/612rCYuFeEL._AC_UL640_FMwebp_QL65_.jpg"/>
                    <Product id="1239" title="Playstation Sony 4, 500GB Slim System [CUH-2215AB01], Black, 3003347" price={178.20} rating={5} img="https://m.media-amazon.com/images/I/51tbWVPtckL._AC_UY436_FMwebp_QL65_.jpg"/>
                </div>
            </div>
        </div>
    );
}

export default Home;