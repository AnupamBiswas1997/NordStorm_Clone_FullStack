import "../styles/banner1style.css";
import banner1 from "../assets/banner1.PNG";

export function Banner1(){
    return (
        <div className="banner1Parent">
            <div className="banner1img1"><img src={banner1} alt="Content 2 Img 6" /></div>
        </div>
    );
}