"use client";
import Link from "next/link";
import Image from "next/image";
import useDarkModeCheck from "@/hooks/useDarkModeCheck";

export default function MainHero(): JSX.Element {
    const isDark = useDarkModeCheck();
    
    return (
        <>
            <section className="flat-title-page style2">
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
                <div className="shape item-w-16" />
                <div className="shape item-w-22" />
                <div className="shape item-w-32" />
                <div className="shape item-w-48" />
                <div className="shape style2 item-w-51" />
                <div className="shape style2 item-w-51 position2" />
                <div className="shape item-w-68" />
                <div className="overlay" />

                <div className="ibthemes-container">
                    <div className="wrap-heading flat-slider flex">
                        <div className="content">
                                            <h2 className="heading">
                                                Discover, and collect
                                            </h2>
                                            <h2 className="heading">
                                                extraordinary
                                            </h2>
                                            <h2 className="heading h3">
                                                <span className="fill">
                                                    Monster{" "}
                                                </span>
                                                NFTs
                                            </h2>
                                            <p className="sub-heading mt-29 mb-35">
                                                Marketplace for monster
                                                character cllections non
                                                fungible token NFTs
                                            </p>
                                            <div className="flat-bt-slider flex style2">
                                                <a
                                                    href="/explore-1"
                                                    className="sc-button header-slider style style-1 rocket fl-button pri-1"
                                                >
                                                    <span>Explore</span>
                                                </a>
                                                <Link
                                                    href="/create-item"
                                                    className="sc-button header-slider style style-1 note fl-button pri-1"
                                                >
                                                    <span>Create</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

            </section>
        </>
    );
}
