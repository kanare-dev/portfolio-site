"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const SectionContext = createContext();

const TOP_SUBSECTIONS = ["purpose", "values", "about-me"];

const normalizeSectionId = (sectionId) => {
  if (!sectionId || TOP_SUBSECTIONS.includes(sectionId)) {
    return "top";
  }
  return sectionId;
};

export function SectionProvider({ children }) {
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    // クライアントサイドのみ: URLハッシュから初期セクションを取得
    const hash = window.location.hash.replace("#", "");
    setActiveSection(normalizeSectionId(hash));

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveSection(normalizeSectionId(hash));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const changeSection = (sectionId) => {
    const normalizedId = normalizeSectionId(sectionId);
    setActiveSection(normalizedId);
    history.replaceState(null, "", `#${normalizedId}`);
  };

  return (
    <SectionContext.Provider value={{ activeSection, changeSection }}>
      {children}
    </SectionContext.Provider>
  );
}

export const useSection = () => useContext(SectionContext);
