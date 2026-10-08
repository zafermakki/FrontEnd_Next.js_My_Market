"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { makeStore } from "@/store/store";

type StoreProviderProps = {
  children: React.ReactNode;
};

const StoreProvider = ({
  children,
}: StoreProviderProps) => {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(
    null
  );

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
};

export default StoreProvider;