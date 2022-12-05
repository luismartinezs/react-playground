import { useMyContext, developerWarning } from "./Context";

export type TContextB = Readonly<{
  useSubB: () => void;
  useObsB: () => void;
}>;

export const ContextB = {
  useSubB: developerWarning,
  useObsB: developerWarning,
};

export function useFeatureB() {
  return {
    registerB: () => {
      return () => {};
    },
    subscribeB: () => {
      return () => {};
    },
  };
}

export function SubB() {
  const { useSubB } = useMyContext();
  useSubB();
  return null;
}
