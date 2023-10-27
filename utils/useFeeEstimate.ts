import {
    WalletConnection,
    TransactionMsg,
  } from "@delphi-labs/shuttle";
  import { useShuttle } from "@delphi-labs/shuttle-react";
  import { useQuery } from "@tanstack/react-query";
  
  type Props = {
    wallet: WalletConnection;
    messages: TransactionMsg[];
  };
  
  export default function useFeeEstimate({ wallet, messages }: Props) {
    try{
    const { simulate } = useShuttle();
  console.log("THIS")
    return useQuery({
        queryKey: ["fee-estimate", JSON.stringify(messages), wallet?.id],
        queryFn: async () => {
            if (!messages || messages.length <= 0 || !wallet) {
              return null;
            }
      
            const response: any = await simulate({
              messages,
              wallet,
            });
      
            return {
              fee: response.fee?.amount[0],
              gasLimit: response.fee?.gas,
            };
          },
          enabled: !!messages && messages.length > 0 && !!wallet,
        }
      );
    }catch(e){
        console.log(e)
    }
  }