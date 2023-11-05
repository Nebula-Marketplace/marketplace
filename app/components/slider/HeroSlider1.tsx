"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import  {Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useDarkModeCheck from "@/hooks/useDarkModeCheck";
import Link from "next/link";
import Image from "next/image";

export default function HeroSlider1(): JSX.Element {
    // is dark hook
    const isDark = useDarkModeCheck();

    return (
        <>
            <div className="swiper-container mainslider home auctions">
                <div className="swiper-wrapper">
                    <Swiper
                        slidesPerView={1}
                        loop={true}
                        navigation={{
                            prevEl: ".swiper-button-next",
                            nextEl: ".swiper-button-prev",
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                        onSwiper={(swiper:any) => {
                            setTimeout(() => {
                                (swiper.params.navigation as any).prevEl =
                                    ".swiper-button-prev";
                                (swiper.params.navigation as any).nextEl =
                                    ".swiper-button-next";

                                swiper.navigation.destroy();
                                swiper.navigation.init();
                                swiper.navigation.update();
                            });
                        }}
                    >
                                                <SwiperSlide>
                            <div className="swiper-slide">
                                <div className="slider-item">
                                    <div className="ibthemes-container flex">
                                        <div className="image three">
                                        <Image
                                height={400}
                                width={400}
                                src="/assets/images/collections/a5tound/cover.jpeg"
                                alt="Image"/>     
                                            <Image
                                                height={460}
                                                width={705}
                                                className="img-bg"
                                                src="/assets/images/backgroup-secsion/img-bg-sliderhome3.png"
                                                alt="Image"
                                            />
                                        </div>
                                        <div className="wrap-heading flat-slider h3 three">
                                            <h2 className="heading">
                                                Featured Project
                                            </h2>
                                            
                                            <h1 className="heading">
                                                <span
                                                    className={`tf-text ${
                                                        isDark ? "s1" : "style"
                                                    }`}
                                                >
                                                    A5tound{" "}
                                                </span>
    
                                            </h1>
                                            <p className="sub-heading mt-29 mb-35">
                                            For the community. Ran by the community. Brand , Inspired by Fashion , Music , and the 90s
                                            </p>
                                            <div className="flat-bt-slider flex style2">                
                                <Link
                                    href="/launchpad/inj16z6g70jwvrnjjxs0avy5awf57qyjkl8qum5eu5"
                                    className="sc-button header-slider style style-1 note fl-button pri-1"
                                >
                                    <span>Mint</span>
                                </Link>
                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* item*/}
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper-slide">
                                <div className="slider-item">
                                    <div className="ibthemes-container">
                                        <div className="wrap-heading flat-slider text-center two">
                                            <h2 className="heading">
                                                Nebula is the
                                            </h2>
                                            <h1 className="heading">
                                                <span
                                                    className={`tf-text ${
                                                        isDark ? "s1" : "style"
                                                    }`}
                                                >
                                                    premier{" "}
                                                </span>
                                                <span>Launchpad on Injective</span>
                                            </h1>
                                            <p className="sub-heading mg-t-29 mg-bt-50">
                                                Launch your NFT project with us today.
                                            </p>
                                            <div className="flat-bt-slider flex">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* item*/}
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="swiper-pagination" />
            </div>
            <div className="swiper-button-next btn-slide-next active" />
            <div className="swiper-button-prev btn-slide-prev" />
        </>
    );
}
