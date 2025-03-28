import "../styles/bannerX2style.css";
import banner1 from "../assets/bannerX2.PNG";

export function BannerX2(){
    return (
        <div className="bannerX2Parent">
            <div className="bannerX2img1"><img src={banner1} alt="Content 2 Img 6" /></div>
        </div>
    );
}