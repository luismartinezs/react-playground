import { createContext, useContext, useEffect } from "react";
import { useFeatureB, SubB, ContextB, type TContextB } from "./ContextB";
import { useFeatureA, SubA, ContextA, type TContextA } from "./ContextA";

export const MyContext = createContext<TContextB & TContextA>({
  ...ContextA,
  ...ContextB,
});

export function developerWarning(): never {
  throw new Error("Don't use a11y outside of accessibility provider");
}

export function useMyContext() {
  return useContext(MyContext);
}

export function MyContextProvider({ children }: { children: React.ReactNode }) {
  const { registerB, subscribeB } = useFeatureB();
  const context = {
    ...useFeatureA(),
    useSubB: subscribeB,
    useObsB: registerB,
  };

  return (
    <MyContext.Provider value={context}>
      <SubA />
      <SubB />
      {children}
    </MyContext.Provider>
  );
}
