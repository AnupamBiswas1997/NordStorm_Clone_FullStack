import { Navbar } from './navbar'
import { Navbar2 } from './navbar2';
import { Titlebar1 } from './titlebar1';
import { Content1 } from './content1';
import { ContentX0 } from './content0';
import { Titlebar2 } from './titlebar2';
import { Content2 } from './content2';
import { Banner1 } from './banner1';
import { BannerX1 } from './bannerX1';
import { BannerX2 } from './bannerX2';
import { BannerX3 } from './bannerX3';
import { Footer } from './footer';

export function Home() {
    return (
        <>
            <Navbar />
            <Navbar2/>
            <BannerX1/>
            <BannerX2/>
            <ContentX0/>
            {/* <Titlebar1/> */}
            <Content1/>
            <Titlebar2/>
            <Content2/>
            <BannerX3/>
            <Footer/>
        </>
    );
}