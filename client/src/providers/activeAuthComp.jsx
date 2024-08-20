import { createContext, useContext, useState, useEffect } from "react";

const ActiveAuthCompContext = createContext();

export const useActiveAuthComp = () => {
  return useContext(ActiveAuthCompContext);
};

export const ActiveAuthCompProvider = ({ children }) => {
  const [activeAuthComp, setActiveAuthComp] = useState(
    localStorage.getItem("activeAuthComp") || 0
  );

  useEffect(() => {
    localStorage.setItem("activeAuthComp", activeAuthComp);
  }, [activeAuthComp]);

  return (
    <ActiveAuthCompContext.Provider
      value={{ activeAuthComp, setActiveAuthComp }}
    >
      {children}
    </ActiveAuthCompContext.Provider>
  );
};
