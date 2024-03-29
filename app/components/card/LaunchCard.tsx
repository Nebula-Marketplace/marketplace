import Image from "next/image";
import Link from "next/link";

interface Props {
  data: {
    id: number;
    img: string;
    icon: string;
    title: string;
    description: string;
    type: number;
    supply: string;
    date: string;
  };
}

export default function LaunchCard({ data }: Props): JSX.Element {
  return (
    <>
      <div className="sc-card-activity style1">
        <div className="content">
          <div className="media">
            { 
                data.img &&
                    <Image
                    height={200}
                    width={200}
                    src={data.img}
                    alt="Activity Image"
                    />    
            }
            
          </div>
          <div className="infor">
            <h3>
              {data.title}
            </h3>
            {data.type === 1 && (
              <div className="status">
                <span className="author">{data.description}</span>
              </div>
            )}
            {data.type === 2 && (
              <div className="status">
                <span className="quote">{data.supply} Tokens</span>
              </div>
            )}
            <div className="time">{data.date}</div>
          </div>
        </div>
        <div className={`button-active icon ${data.icon}`} />
      </div>
    </>
  );
}
