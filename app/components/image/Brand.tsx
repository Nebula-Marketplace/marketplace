import Image from "next/image";
import Link from "next/link";

interface Props {
    data: {
        isDark?: boolean;
        altTag: string;
        size: {
            height: number;
            width: number;
        };
    };
}

export default function Brand({ data }: Props): JSX.Element {
    return (
        <>
            <div id="site-logo-inner">
                <Link href="/" rel="home" className="main-logo">
                <Image
                    id="logo_header"
                    src={`/assets/images/logo/${
                    data.isDark ? "nebula_logo_white" : "nebula_logo_white"
                    }.svg`}
                    alt={data.altTag}
                    width={data.size.width}
                    height={data.size.height}
                />
                </Link>
            </div>
        </>
    );
}
