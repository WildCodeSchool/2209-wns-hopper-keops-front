import React, { createContext, useContext, useState } from "react";

export const TestContext = createContext<{
  someData: string;
  setSomeData: (n: string) => void;
} | null>(null);

export function TestProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [message, setMessage] = useState("");

  return (
    <TestContext.Provider
      value={{
        someData: message,
        setSomeData: setMessage,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const ctx = useContext(TestContext);
  if (ctx) {
    return ctx;
  } else {
    throw new Error("ctx_not_set");
  }
}
