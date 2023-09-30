"use client";
import Link from "next/link";
import Navigation from "./Navigation";
import Mode from "./Mode";
import useDarkModeCheck from "@/hooks/useDarkModeCheck";
import { usePathname } from "next/navigation";
import useStickyMenu from "@/hooks/useStickyMenu";
import Search1 from "./Search1";
import Search2 from "./Search2";
import WalletConnectButton from "../button/WalletConnectButton";
import Image from "next/image";
import Brand from "../image/Brand";

export default function Header(): JSX.Element {
  const path = usePathname();

  // is dark hook
  const isDark = useDarkModeCheck();

  // sticky menu
  const isSticky1 = true;
  const isSticky2 = true;

  return (
    <>
      <header
        id="header_main"
        className="header_1 js-header style header_2 style2"
       
      >
        <div className="ibthemes-container">
          <div className="row">
            <div className="col-md-12">
              <div id="site-header-inner">
                <div className="wrap-box flex">
                  <div id="site-logo" className="clearfix">
                    <Brand data={{isDark: false,altTag:"Nebula Home",size:{height:20,width:125}}} />
                  </div>
                  <div
                    data-bs-toggle="offcanvas"
                    data-bs-target="#menu"
                    aria-controls="menu"
                    className="mobile-button "
                  >
                    <span />
                  </div>

                  <Search1 />

                  <Navigation />

                  <div className="flat-search-btn flex">
<<<<<<< HEAD
                    <WalletConnectButton />
=======
                  <WalletConnectButton />
>>>>>>> 46d476e (wip)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}