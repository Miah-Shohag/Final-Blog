import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <ThemeContext.Provider
      value={{ isOpenMenu, setIsOpenMenu, loading, setLoading }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
