import { useEffect } from "react";
import { useMyContext, developerWarning } from "./Context";

export type TContextA = Readonly<{
  useSubA: () => void;
  useObsA: () => void;
}>;

export const ContextA = {
  useSubA: developerWarning,
  useObsA: developerWarning,
};

export function useFeatureA() {
  const subscribeA = () => {
    return () => {};
  };
  const registerA = () => {
    return () => {};
  };
  return {
    useObsA: () => {
      useEffect(() => {
        console.log("useObsA");
        registerA();
        return () => {
          console.log("useObsA cleanup");
        };
      });
    },
    useSubA: () => {
      useEffect(() => {
        console.log("useSubA");
        subscribeA();
        return () => {
          console.log("useSubA cleanup");
        };
      });
    },
  };
}

export function SubA() {
  const { useSubA } = useMyContext();
  useSubA();
  return null;
}
