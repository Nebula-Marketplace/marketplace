"use client";
import { useState, ChangeEvent } from "react";
import UploadProfile from "../element/UploadProfile";
import Image from "next/image";
import {constructInstantiateMessage,constructClaimMessage} from "@/utils/constructMessage"
import useWallet from "@/hooks/useWallet";
import { useShuttle } from "@delphi-labs/shuttle-react";
export default function UpdateMetadata() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [getSelectCover, setSelectCover] = useState<number | null>(null);
    const wallet  = useWallet();
    // multi image upload
    const multiConverHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        if (
            files?.length <= 2 &&
            Number(files?.length) + Number(selectedFiles?.length) <= 2
        ) {
            setSelectedFiles([...selectedFiles, ...files.slice(0, 2)]);
            const urls = files.map((file) => URL.createObjectURL(file));
            setPreviewUrls([...previewUrls, ...urls]);
        }
    };

    // select image handler
    const selectCoverImage = (select: number) => {
        setSelectCover(select);
    };

    // delete handler
    const deleteConver = (select: string) => {
        const deleteResult2 = previewUrls?.filter((item) => item !== select);
        setPreviewUrls(deleteResult2);
        setSelectedFiles([]);
    };
    const { connect,sign,recentWallet, simulate,broadcast  } = useShuttle();

const createCollection =async()=>{
  const getData =  constructInstantiateMessage(
        wallet?.account?.address,
         "inj10htqhgf76tnjhqtl968v5e3mue9mldnx0gteg5",
         "TEST NFTS",
         "TTT",
         100,
         650,
         [{
            "share": 100,
            "address": "inj1dxprjkxz06cpahgqrv90hug9d8z504j52ms07n",
        }],
    )
    try{
        const messages=[getData]
        console.log(getData)
        const response: any = await simulate({
          messages,
          wallet,
        });
        console.log(response)
        console.log("THIS")
        }catch(e){
          console.log(e)
          
        }
    await broadcast({
        messages: [getData],
        feeAmount: "5000000", 
        gasLimit: "5000000", 
        // memo: "",
        wallet:recentWallet
    }).then((result: any) => {
      console.log("Sign result", result);
    //   console.log(new TextDecoder().decode(result.signatures))
    //   console.log(new TextDecoder().decode(result.response.signatures))
    //   console.log(new TextDecoder().decode(result.response.bodyBytes))
    })
    .catch((error:any) => {
      console.error("Sign error", error);
    });
    
}
const claimCollection=async()=>{
  const claimMessage=  constructClaimMessage(
        wallet?.account?.address,
        "inj1tz7gv5rvgtdv24u5dttszuum593n2ul8stmqhn",
        { banner_uri: "https://pbs.twimg.com/profile_banners/1455777767815974917/1666960664/1500x500",
        logo_uri: "https://pbs.twimg.com/profile_images/1665411712793686016/jfBwea04_400x400.jpg",
            description: "Test",
            basis_points: 100, // 100 == 1% royalty
            creators: [{
                share: 100,
                address: "inj1dxprjkxz06cpahgqrv90hug9d8z504j52ms07n",
            }]}
    )
    try{
        console.log(claimMessage)
        const messages=[claimMessage]
        const response: any = await simulate({
          messages,
          wallet,
        });
        console.log(response)
        console.log("THIS")
        }catch(e){
          console.log(e)
        }
    await broadcast({
        messages: [claimMessage],
        feeAmount: "50000000", 
        gasLimit: "50000000", 
        // memo: "",
        wallet:recentWallet
    }).then((result: any) => {
      console.log("Sign result", result);
    })
    .catch((error:any) => {
      console.error("Sign error", error);
    }); 
}
    return (
        <>
            <div className="tf-connect-wallet tf-section">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="tf-title-heading ct style-2 mg-bt-12">
                                Claim Collection
                            </h2>
                            <h5 className="sub-title ct style-1 pad-400">
                                Claim this collection on Nebula and update it's metadata by connecting your wallet and following an on-chain signing process. 
                            </h5>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                            <UploadProfile />
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-12 col-12">
                            <div className="form-upload-profile">
                                <h4 className="title-create-item">
                                    Choose your Cover image
                                </h4>
                                <div className="option-profile clearfix">
                                    <form action="#">
                                        <label className="uploadFile">
                                            <input
                                                type="file"
                                                className="inputfile form-control"
                                                name="file"
                                                accept="png,jpg,gif,jpeg"
                                                onChange={multiConverHandler}
                                                multiple
                                            />
                                        </label>
                                    </form>
                                    {previewUrls.map((url, index) => (
                                        <div
                                            key={index}
                                            className={`position-relative ${
                                                getSelectCover !== null &&
                                                getSelectCover === index
                                                    ? "image"
                                                    : "image style2"
                                            }`}
                                            style={{ marginRight: "15px" }}
                                        >
                                            <Image
                                                height={500}
                                                width={500}
                                                onClick={() =>
                                                    selectCoverImage(index)
                                                }
                                                src={url}
                                                alt="Cover Photo"
                                            />
                                            <a
                                                onClick={() =>
                                                    deleteConver(url)
                                                }
                                                className="ui-cover-cross"
                                            >
                                                <i className="far fa-times"></i>
                                            </a>
                                        </div>
                                    ))}
                                    {previewUrls.length === 0 && (
                                        <>
                                            <div
                                                onClick={() =>
                                                    selectCoverImage(0)
                                                }
                                                className={
                                                    getSelectCover !== null &&
                                                    getSelectCover === 0
                                                        ? "image"
                                                        : "image style2"
                                                }
                                                style={{ marginRight: "15px" }}
                                            >
                                                <Image
                                                    height={500}
                                                    width={500}
                                                    src="/assets/images/backgroup-secsion/option1_bg_profile.jpg"
                                                    alt="Conver Photo"
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    selectCoverImage(1)
                                                }
                                                className={
                                                    getSelectCover !== null &&
                                                    getSelectCover === 1
                                                        ? "image"
                                                        : "image style2"
                                                }
                                            >
                                                <Image
                                                    height={500}
                                                    width={500}
                                                    src="/assets/images/backgroup-secsion/option2_bg_profile.jpg"
                                                    alt=""
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <form className="form-profile">
                                    <div className="form-infor-profile">
                                        <div className="info-account">
                                            <h4 className="title-create-item">
                                                Collection Information
                                            </h4>
                                            <fieldset>
                                                <h4 className="title-infor-account">
                                                    Collection Name
                                                </h4>
                                                <input
                                                    type="text"
                                                    placeholder="Nebula NFTs"
                                                    required
                                                />
                                            </fieldset>
                                            <fieldset>
                                                <h4 className="title-infor-account">
                                                    Website URL
                                                </h4>
                                                <input
                                                    type="text"
                                                    placeholder="https://collection.info"
                                                    required
                                                />
                                            </fieldset>
                                            <fieldset>
                                                <h4 className="title-infor-account">
                                                    Contact Email
                                                </h4>
                                                <input
                                                    type="email"
                                                    placeholder="Contact email"
                                                    required
                                                />
                                            </fieldset>
                                            <fieldset>
                                                <h4 className="title-infor-account">
                                                    Description
                                                </h4>
                                                <textarea
                                                    tabIndex={4}
                                                    rows={5}
                                                    required
                                                    defaultValue={""}
                                                />
                                            </fieldset>
                                        </div>
                                        <div className="info-social">
                                            <h4 className="title-create-item">
                                                Social media
                                            </h4>
                                            <fieldset>
                                                <h4 className="title-infor-account">
                                                    Twitter (X)
                                                </h4>
                                                <input
                                                    type="text"
                                                    placeholder="Twitter (X) Handle"
                                                    required
                                                />
                                            </fieldset>
                                            <fieldset>
                                                <h4 className="title-infor-account">
                                                    Telegram
                                                </h4>
                                                <input
                                                    type="text"
                                                    placeholder="Telegram URL"
                                                    required
                                                />
                                            </fieldset>
                                            <fieldset>
                                                <h4 className="title-infor-account">
                                                    Discord URL
                                                </h4>
                                                <input
                                                    type="text"
                                                    placeholder="Discord URL"
                                                    required
                                                />
                                            </fieldset>
                                        </div>
                                    </div>
                                   
                                </form>
                                <button
                                        className="tf-button-submit mg-t-15"
                                        onClick={()=>claimCollection()}
                                    >
                                        Update Collection Metadata
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
