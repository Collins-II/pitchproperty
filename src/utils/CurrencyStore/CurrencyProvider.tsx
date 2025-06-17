"use client"; // ✅ Make this a Client Component

import { Provider } from "react-redux";
import { store } from "@/utils/CurrencyStore/store";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
