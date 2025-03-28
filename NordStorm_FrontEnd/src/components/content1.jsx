import "../styles/content1style.css";
import Content1Img1 from "../assets/Content1Img1.avif";

export function Content1(){
    return (
        <div className="content1Parent">
            <div className="imgDiv">
                <div className="content1img"><img src={Content1Img1} alt="Content 1 Image" /></div>
            </div>
            <div className="imgOverlayText">
                Shop premium brands
            </div>
        </div>
    );
}