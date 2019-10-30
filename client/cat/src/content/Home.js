import React from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import './Home.css'

import Image1 from "./images/img01.jpg";
import Image2 from "./images/img02.jpg";
import Image3 from "./images/img03.jpg";

const App = () => (
    <div
        className="App"
        style={{ width: "100%", margin: "0px" }}
    >
        <Carousel arrows infinite>
            <img style={{ width: "100%", height: "50%", margin: "50px" }} src={Image1} />
            <img style={{ width: "100%", height: "50%", margin: "50px" }} src={Image2} />
            <img style={{ width: "100%", height: "50%", margin: "50px" }} src={Image3} />
        </Carousel>
    </div>
);

export default App;