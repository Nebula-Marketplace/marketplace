"use client";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "../store";
import { Analytics } from '@vercel/analytics/react';
//#region Wallet Stuff
import {
  CosmostationExtensionProvider,
  KeplrExtensionProvider,
  LeapCosmosExtensionProvider,
  MetamaskExtensionProvider,
  StationExtensionProvider,
  XDEFICosmosExtensionProvider,
  CosmostationMobileProvider,
  KeplrMobileProvider,
  LeapCosmosMobileProvider,
  LeapMetamaskCosmosSnapExtensionProvider,
  MetamaskMobileProvider,
  ShuttleProvider,
} from "@delphi-labs/shuttle-react";

import {
  OSMOSIS_MAINNET,
  MARS_MAINNET,
  TERRA_MAINNET,
  TERRA_TESTNET,
  INJECTIVE_MAINNET,
  INJECTIVE_TESTNET,
  NEUTRON_MAINNET,
  NEUTRON_TESTNET,
} from "@/config/networks";
  
const extensionProviders = [
  new XDEFICosmosExtensionProvider({
    networks: [TERRA_MAINNET, TERRA_TESTNET, OSMOSIS_MAINNET, MARS_MAINNET],
  }),
  new CosmostationExtensionProvider({
    networks: [
      OSMOSIS_MAINNET,
      TERRA_MAINNET,
      TERRA_TESTNET,
      INJECTIVE_MAINNET,
      INJECTIVE_TESTNET,
      NEUTRON_MAINNET,
      NEUTRON_TESTNET,
    ],
  }),
  new LeapCosmosExtensionProvider({
    networks: [OSMOSIS_MAINNET, TERRA_MAINNET, TERRA_TESTNET, INJECTIVE_MAINNET, INJECTIVE_TESTNET],
  }),
  new LeapMetamaskCosmosSnapExtensionProvider({
    networks: [
      OSMOSIS_MAINNET,
      MARS_MAINNET,
      TERRA_MAINNET,
      TERRA_TESTNET,
      INJECTIVE_MAINNET,
      INJECTIVE_TESTNET,
      NEUTRON_MAINNET,
      NEUTRON_TESTNET,
    ],
  }),
  new StationExtensionProvider({
    networks: [OSMOSIS_MAINNET, MARS_MAINNET, TERRA_MAINNET, TERRA_TESTNET],
  }),
  new KeplrExtensionProvider({
    networks: [
      OSMOSIS_MAINNET,
      MARS_MAINNET,
      TERRA_MAINNET,
      TERRA_TESTNET,
      INJECTIVE_MAINNET,
      INJECTIVE_TESTNET,
      NEUTRON_MAINNET,
      NEUTRON_TESTNET,
    ],
  }),
  new MetamaskExtensionProvider({
    networks: [INJECTIVE_MAINNET, INJECTIVE_TESTNET],
  }),
];

const mobileProviders = [
  new KeplrMobileProvider({
    networks: [
      OSMOSIS_MAINNET,
      MARS_MAINNET,
      TERRA_MAINNET,
      TERRA_TESTNET,
      INJECTIVE_MAINNET,
      INJECTIVE_TESTNET,
      NEUTRON_MAINNET,
      NEUTRON_TESTNET,
    ],
  }),
  new LeapCosmosMobileProvider({
    networks: [OSMOSIS_MAINNET, MARS_MAINNET, TERRA_MAINNET, TERRA_TESTNET, INJECTIVE_MAINNET, INJECTIVE_TESTNET],
  }),
  new CosmostationMobileProvider({
    networks: [TERRA_MAINNET, OSMOSIS_MAINNET, MARS_MAINNET, NEUTRON_MAINNET, NEUTRON_TESTNET],
  }),
  new MetamaskMobileProvider({
    networks: [INJECTIVE_MAINNET, INJECTIVE_TESTNET],
  }),
];

const WC_PROJECT_ID = "f103541210b7aa9f2eecb3712f99922a";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
          <ThemeProvider
              attribute="class"
              enableSystem={false}
              themes={["is_light", "is_dark"]}
          >
            <ShuttleProvider
              walletConnectProjectId={WC_PROJECT_ID}
                mobileProviders={mobileProviders}
                extensionProviders={extensionProviders}
                persistent
                persistentKey={"shuttle-v2"}
            >
              <Provider store={store}>
                    {children}
                    <Analytics />
              </Provider>
            </ShuttleProvider>
          </ThemeProvider>
    );
}
