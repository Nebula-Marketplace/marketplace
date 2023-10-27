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
];

export function Providers({ children }: { children: React.ReactNode }) {
    return (
          <ThemeProvider
              attribute="class"
              enableSystem={false}
              themes={["is_light", "is_dark"]}
          >
            <ShuttleProvider
                mobileProviders={mobileProviders}
                extensionProviders={extensionProviders}
            >
              <Provider store={store}>
                    {children}
                    <Analytics />
              </Provider>
            </ShuttleProvider>
          </ThemeProvider>
    );
}
