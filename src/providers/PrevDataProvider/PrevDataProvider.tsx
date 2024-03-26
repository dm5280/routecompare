"use client";
import { useMemo, useState } from "react";
import { IDataObj } from "$/types";
import { createContext } from "$/helpers/createContext";

interface IContext {
  data: IDataObj[];
  expandedItems: string[];
  selectedDestination: string | null;
  setData: React.Dispatch<React.SetStateAction<IDataObj[]>>;
  setSelectedDestination: React.Dispatch<React.SetStateAction<string | null>>;
  setExpandedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const [PrevDataContext, usePrevDataContext] = createContext<IContext>();

export const PrevDataProvider = (props: React.PropsWithChildren) => {
  const [data, setData] = useState<IDataObj[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );

  const value = useMemo(
    () => ({
      data,
      setData,
      selectedDestination,
      setSelectedDestination,
      expandedItems,
      setExpandedItems,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(data), selectedDestination, expandedItems]
  );

  return (
    <PrevDataContext.Provider value={value}>
      {props.children}
    </PrevDataContext.Provider>
  );
};

export { usePrevDataContext };
