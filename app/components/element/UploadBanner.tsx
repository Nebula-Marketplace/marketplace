import Image from "next/image";
import { useState } from "react";

interface UploadProfileProps {
    imageUrl?: string;
    displayBannerImage?: string;
    setDisplayBannerImage?: Function;
}

export default function UploadProfile({ imageUrl,displayBannerImage ,setDisplayBannerImage}: UploadProfileProps): JSX.Element {

    const uploadImage = (e: any) => {
        if (setDisplayBannerImage) {
            setDisplayBannerImage(e.target.value);
        }
    };

    return (
        <>
            <div className="sc-card-profile text-center">
                <div className="card-media" style={{height:"200px"}}>
                    <img
                        id="profileimg"
                        src={displayBannerImage}
                        style={{height:"200px"}}
                        alt="Image"
                        height={250}
                        width={500}
                    />
                </div>
                <div id="upload-profile">
                    <br/>
                    {/* <a className="btn-upload">Upload New Photo </a> */}
                    <input
                        id="tf-upload-img"
                        type="text"
                        name="profile"
                        required
                        onChange={uploadImage}
                        placeholder="Enter Banner image URL"
                    />
                </div>
                {/* <a
                    onClick={() => setDisplayBannerImage(imageUrl || "/assets/images/avatar/avata_profile.jpg")}
                    style={{ cursor: "pointer" }}
                    className="btn-upload style2"
                >
                    Delete
                </a> */}
            </div>
        </>
    );
}