import { useQuery } from "@tanstack/react-query";

export default function getInjPrice() {
    return useQuery({
      queryKey: ["inj-price"],
      queryFn: async () => {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=injective-protocol&vs_currencies=usd"
        );
        const json = await response.json();
        return parseInt(json["injective-protocol"].usd);
      },
    });
}