import Image from "next/image";
import { useState } from "react";

interface UploadProfileProps {
    imageUrl?: string;
    displayImage?: string;
    setDisplayImage?: Function;
}

export default function UploadProfile({ imageUrl,displayImage ,setDisplayImage}: UploadProfileProps): JSX.Element {

    const uploadImage = (e: any) => {
        if (setDisplayImage) {
            setDisplayImage(e.target.value);
        }
    };

    return (
        <>
            <div className="sc-card-profile text-center">
                <div className="card-media">
                    <img
                        id="profileimg"
                        src={displayImage}
                        alt="Image"
                        height={500}
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
                        placeholder="Enter image URL"
                    />
                </div>
                {/* <a
                    onClick={() => setDisplayImage(imageUrl || "/assets/images/avatar/avata_profile.jpg")}
                    style={{ cursor: "pointer" }}
                    className="btn-upload style2"
                >
                    Delete
                </a> */}
            </div>
        </>
    );
}