import "../styles/bannerX3style.css";
import banner1 from "../assets/bannerX3.PNG";

export function BannerX3(){
    return (
        <div className="bannerX3Parent">
            <div className="bannerX3img1"><img src={banner1} alt="Content 2 Img 6" /></div>
        </div>
    );
}