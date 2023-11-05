import { createContext, useState, useContext, ReactNode } from 'react';

type GlobalStateContextType = {
  listed: any[];
  setListed: React.Dispatch<React.SetStateAction<any[]>>;
  collections: any[];
  setCollections: React.Dispatch<React.SetStateAction<any[]>>;
};

export const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

type GlobalStateProviderProps = {
  children: ReactNode;
}

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [listed, setListed] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  return (
    <GlobalStateContext.Provider value={{listed, setListed, collections, setCollections}}>
      {children}
    </GlobalStateContext.Provider>
  );
};