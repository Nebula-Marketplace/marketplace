"use client";
import Link from "next/link";
import Image from "next/image";
import useDarkModeCheck from "@/hooks/useDarkModeCheck";

export default function MainHero(): JSX.Element {
    const isDark = useDarkModeCheck();
    
    return (
        <>
            <section className="flat-title-page style3 home-7">
                <Image
                    width={528}
                    height={327}
                    className="bgr-gradient gradient1"
                    src="/assets/images/backgroup-secsion/bg-gradient1.png"
                    alt="Gradient 1"
                />
                <Image
                    width={315}
                    height={195}
                    className="bgr-gradient gradient2"
                    src="/assets/images/backgroup-secsion/bg-gradient2.png"
                    alt="Gradient 2"
                />
                <Image
                    width={178}
                    height={110}
                    className="bgr-gradient gradient3"
                    src="/assets/images/backgroup-secsion/bg-gradient3.png"
                    alt="Gradient 3"
                />
                <div className="overlay" />
                <div className="ibthemes-container home s1 pad-t-20 pad-b-20">
                    <div className="wrap-heading flat-slider flex">
                        <div className="content mg-t-40 mg-bt-40">
                            <h2 className="heading m-t-15">Featured Project</h2>

                            <h1 className="heading"><span className="tf-text style">A5tound</span></h1>
                            <p className="sub-heading mg-t-19 mg-bt-40">
                            For the community. Ran by the community. Brand , Inspired by Fashion , Music , and the 90s
                            </p>
                            <div className="flat-bt-slider flex style2">                
                                <Link
                                    href="/launchpad/234262342"
                                    className="sc-button header-slider style style-1 note fl-button pri-1"
                                >
                                    <span>Mint</span>
                                </Link>
                            </div>
                        </div>
                        <div className="image mg-r-100">
                            <Image
                                height={400}
                                width={400}
                                className="img-bg"
                                src="/assets/images/collections/a5tound/cover.jpeg"
                                alt="Image"/>     
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
