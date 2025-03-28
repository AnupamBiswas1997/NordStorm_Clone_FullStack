import "../styles/footerStyle.css";

import SLogo1 from "../assets/SLogo1.png";
import SLogo2 from "../assets/SLogo2.png";
import SLogo3 from "../assets/SLogo3.png";
import SLogo4 from "../assets/SLogo4.png";
import SLogo5 from "../assets/SLogo5.png";
import SLogo6 from "../assets/SLogo6.png";

export function Footer(){
    return (
        <div id="footerParent">
            <Footer1div>
                <FooterColumnDiv>
                    <FooterBoldText>Know Us</FooterBoldText>
                    <FooterNormalText>About Us</FooterNormalText>
                    <FooterNormalText>Contact Us</FooterNormalText>
                    <FooterNormalText>Press Coverage</FooterNormalText>
                    <FooterNormalText>Careers</FooterNormalText>
                    <FooterNormalText>Business</FooterNormalText>
                    <FooterNormalText>Partnership</FooterNormalText>
                    <FooterNormalText>Corporate</FooterNormalText>
                </FooterColumnDiv>
                <FooterColumnDiv>
                    <FooterBoldText>Our Policies</FooterBoldText>
                    <FooterNormalText>Privacy Policy</FooterNormalText>
                    <FooterNormalText>Terms and Conditions</FooterNormalText>
                    <FooterNormalText>Editorial Policy
                    </FooterNormalText>
                    <FooterNormalText>Return Policy
                    </FooterNormalText>
                    <FooterNormalText>IP Policy</FooterNormalText>
                    <FooterNormalText>Policy</FooterNormalText>
                    <FooterNormalText>Disclaimer</FooterNormalText>
                </FooterColumnDiv>
                <FooterColumnDiv>
                    <FooterBoldText>Connect</FooterBoldText>
                    <FooterNormalText>Social Links</FooterNormalText>
                    <FooterSocialDiv>
                        <FooterSocial src={SLogo1}></FooterSocial>
                        <FooterSocial src={SLogo2}></FooterSocial>
                        <FooterSocial src={SLogo3}></FooterSocial>
                        <FooterSocial src={SLogo4}></FooterSocial>
                    </FooterSocialDiv>
                </FooterColumnDiv>
                <FooterColumnDiv>
                    <FooterBoldText>Download App</FooterBoldText>
                    <FooterSocialDiv1>
                        <FooterSocial src={SLogo5}></FooterSocial>
                        <FooterSocial src={SLogo6}></FooterSocial>
                    </FooterSocialDiv1> 
                </FooterColumnDiv>
            </Footer1div>
            <Footer2div>

            </Footer2div>
        </div>
    );
}

export function Footer1div({children}){
    return (
        <div id="footerdiv1">
            {children}
        </div>
    );
}

export function FooterColumnDiv({children}){
    return (
        <div id="footerColumn">
            {children}
        </div>
    );
}

export function FooterBoldText({children}){
    return (
        <div id="footerBoldText">
            {children}
        </div>
    );
}

export function FooterNormalText({children}){
    return (
        <div id="footerNormalText">
            {children}
        </div>
    );
}

export function FooterSocialDiv({children}){
    return (
        <div id="footerSocialDiv">
            {children}
        </div>
    );
}

export function FooterSocialDiv1({children}){
    return (
        <div id="footerSocialDiv1">
            {children}
        </div>
    );
}

export function FooterSocial({src}){
    return (
        <div id="socialDiv">
            <img src={src} />
        </div>
    );
}

export function Footer2div({children}){
    return (
        <div id="footerdiv2">
            {children}
        </div>
    );
}






















