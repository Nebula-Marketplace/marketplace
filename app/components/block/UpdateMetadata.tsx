"use client";
import { useState, ChangeEvent } from "react";
import UploadProfile from "../element/UploadProfile";
import UploadBanner from "../element/UploadBanner";

import Image from "next/image";
import {constructInstantiateMessage,constructClaimMessage} from "@/utils/constructMessage"
import {checkIfExchangeExists,getCollectionOwner} from "@/utils/exchangeApi"
import useWallet from "@/hooks/useWallet";
import { useShuttle } from "@delphi-labs/shuttle-react";
import { usePathname } from "next/navigation";
export default function UpdateMetadata() {
    interface FormData {
        collectionName: string;
        symbol: string;
        supply: number;
        basisPoints:number;
        websiteURL: string;
        contactEmail: string;
        description: string;
        twitterHandle: string;
        telegramURL: string;
        discordURL: string;
    }
    
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [getSelectCover, setSelectCover] = useState<number | null>(null);
    const [displayImage, setDisplayImage] = useState<string>("/assets/images/avatar/avata_profile.jpg");
    const [displayBannerImage, setDisplayBannerImage] = useState<string>("/assets/images/avatar/avata_profile.jpg");

    const [formData, setFormData] = useState({
        collectionName: '',
        symbol: '',
        supply: 100,
        basisPoints:100,
        websiteURL: '',
        contactEmail: '',
        description: '',
        twitterHandle: '',
        telegramURL: '',
        discordURL: '',
        
    });
    const wallet  = useWallet();
    const pathname = usePathname();
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

const createCollection =async(formData:FormData)=>{
  const getData =  constructInstantiateMessage(
        wallet?.account?.address,
        pathname.replace("/collections/claim/",""),
        formData.collectionName,
        formData.symbol,
        formData.supply,
        formData.basisPoints,
         [{
            "share": 100,
            "address": wallet?.account?.address,
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
const claimCollection=async(formData:FormData)=>{
if(wallet){
  const claimMessage=  constructClaimMessage(
        wallet?.account?.address,
        pathname.replace("/collections/claim/",""),
        { banner_uri: displayBannerImage,
        logo_uri: displayImage,
            description: formData.description,
            basis_points: 100, // 100 == 1% royalty
            creators: [{
                share: 100,
                address: wallet?.account.address
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
    // await broadcast({
    //     messages: [claimMessage],
    //     feeAmount: "50000000", 
    //     gasLimit: "50000000", 
    //     // memo: "",
    //     wallet:recentWallet
    // }).then((result: any) => {
    //   console.log("Sign result", result);
    // })
    // .catch((error:any) => {
    //   console.error("Sign error", error);
    // }); 
}
}


const handleChange = (e:any) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = async(e:any) => {
    e.preventDefault();
    console.log("tets")
    
    const collectionOwner = await getCollectionOwner(pathname.replace("/collections/claim/",""))
    const exchangeExists =await checkIfExchangeExists(pathname.replace("/collections/claim/",""),)

    if(collectionOwner==wallet?.account.address){
        if(exchangeExists){
            alert("exchange exists")
            claimCollection(formData)
               
        }else{
            alert("exchange doesn't exists")

            createCollection(formData) 
        }
    }else{
    alert("You don't own this collections")
    }
    // claimCollection(formData);
};

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
                            <UploadProfile 
                            displayImage={displayImage}
                            setDisplayImage={setDisplayImage}
                            />
                            <br/>
                              <UploadBanner 
                            displayBannerImage={displayBannerImage}
                            setDisplayBannerImage={setDisplayBannerImage}
                            />
                        </div>
                       
                        <div className="col-xl-9 col-lg-8 col-md-12 col-12">
                            <div className="form-upload-profile">
                                <form className="form-profile" onSubmit={handleSubmit}>
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
                                                    name="collectionName"
                                                    required
                                                />
                                            </fieldset>
                                            <fieldset>
                                                <h4 className="title-infor-account">
                                                Symbol
                                                </h4>
                                              
                                                <input
                                                    type="text"
                                                    placeholder="NEBULA"
                                                    name="symbol"
                                                    required
                                                />
                                            </fieldset>
                                            <fieldset>
                                                <h4 className="title-infor-account">
                                                   Supply  
                                                </h4>
                                              
                                                <input
                                                    type="number"
                                                    placeholder="50000"
                                                    name="supply"
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
                                                    name="websiteURL"
                                                    required
                                                />
                                            </fieldset>
                                            <fieldset>
                                                <h4 className="title-infor-account">
                                                    Royalty Fee 100=1%
                                                </h4>
                                                <input
                                                    type="number"
                                                    placeholder="100"
                                                    name="basisPoints"
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
                                                    name="email"
                                                    required
                                                />
                                            </fieldset>
                                            <fieldset>
                                                <h4 className="title-infor-account">
                                                    Description
                                                </h4>
                                                <textarea
                                                    tabIndex={4}
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={(e)=>setFormData({
                                                        ...formData,
                                                        [e.target.name]: e.target.value
                                                    })}
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
                                    <button
                                        className="tf-button-submit mg-t-15"
                                        type="submit"
                                        // onClick={}
                                    >
                                        Create Exchange
                                    </button>  
                                    <button
                                        className="tf-button-submit mg-t-15"
                                        type="submit"
                                        // onClick={}
                                    >
                                        Update Collection Metadata
                                    </button>   
                                </form>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
