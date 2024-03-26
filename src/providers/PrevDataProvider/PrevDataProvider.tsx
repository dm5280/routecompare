"use client";
import { useMemo, useState } from "react";
import { IDataObj } from "$/types";
import { createContext } from "$/helpers/createContext";

interface IContext {
  data: IDataObj[];
  setData: React.Dispatch<React.SetStateAction<IDataObj[]>>;
}

const [PrevDataContext, usePrevDataContext] = createContext<IContext>();

export const PrevDataProvider = (props: React.PropsWithChildren) => {
  const [data, setData] = useState<IDataObj[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ data, setData }), [JSON.stringify(data)]);

  return (
    <PrevDataContext.Provider value={value}>
      {props.children}
    </PrevDataContext.Provider>
  );
};

export { usePrevDataContext };
