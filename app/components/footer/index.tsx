import useDarkModeCheck from "@/hooks/useDarkModeCheck";
import Image from "next/image";
import Link from "next/link";
import FooterItems from "./FooterItems";
import Social from "./Social";
import SubscribeForm from "./SubscribeForm";
import Brand from "../image/Brand";

export default function Footer() {
  // is dark hook
  const isDark = useDarkModeCheck();

  return (
    <>
      <footer id="footer" className="footer-light-style clearfix">
        <div className="ibthemes-container">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-12">
              <div className="widget widget-logo">
                <Brand data={{isDark: false,altTag:"Nebula Home",size:{height:20,width:125}}} />
                <p className="sub-widget-logo">
                  Nebula is the premier launchpad and marketplace on Injective.
                </p>
                <p>
                  © {new Date().getFullYear()} Nebula — All Rights Reserved{" "}
                </p>
              </div>
            </div>
            {/* End col */}

            <div className="col-lg-3 col-md-6 col-sm-7 col-12">
              <div className="widget widget-subcribe">
                
                {/*
                <h5 className="title-widget">Reach Out To Us</h5>
                <div className="form-subcribe">
                  <SubscribeForm />
                </div>*/}
                <div className="widget-social style-1 mg-t32">
                  <ul>
                    <Social />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
