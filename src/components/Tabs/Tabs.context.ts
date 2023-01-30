import { createContext } from "react";

import { TabsValue } from "./Tabs.types";

interface TabsContext {
  id: string;
  value: TabsValue;
  onTabChange(value: TabsValue): void;
}

export const TabsContext = createContext<TabsContext>({
  id: 'Tabs component was not found in the tree',
  value: 'Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value',
  onTabChange: () => {
    throw new Error('Tabs component was not found in the tree');
  }
});