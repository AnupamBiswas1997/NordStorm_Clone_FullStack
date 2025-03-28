import "../styles/content2style.css";
import Content2Img1 from "../assets/Content2Img1.PNG";
import Content2Img2 from "../assets/Content2Img2.PNG";
import Content2Img3 from "../assets/Content2Img3.PNG";
import Content2Img4 from "../assets/Content2Img4.PNG";
import Content2Img5 from "../assets/Content2Img5.PNG";
import Content2Img6 from "../assets/Content2Img6.PNG";
import { Link } from "react-router-dom";

export function Content2(){
    return (
        <div className="content2Parent">

            <Link to="/product/67571c3f2645d7397807a9dc"><div className="content2img"><img src={Content2Img1} alt="Content 2 Img 1" /></div></Link>
            <Link to="/product/67572774cd6695662625f5b5"><div className="content2img"><img src={Content2Img2} alt="Content 2 Img 2" /></div></Link>
            <Link to="/product/67571c3f2645d7397807a9dc"><div className="content2img"><img src={Content2Img3} alt="Content 2 Img 3" /></div></Link>
            <Link to="/product/67571c3f2645d7397807a9dc"><div className="content2img"><img src={Content2Img4} alt="Content 2 Img 4" /></div></Link>
            <Link to="/product/67571c3f2645d7397807a9dc"><div className="content2img"><img src={Content2Img5} alt="Content 2 Img 5" /></div></Link>
            <Link to="/product/67571c3f2645d7397807a9dc"><div className="content2img"><img src={Content2Img6} alt="Content 2 Img 6" /></div></Link>
        </div>
    );
}