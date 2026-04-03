"use client";

import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/components/Profile/Profile";
import Overview from "@/components/Overview/Overview";
import Career from "@/components/Career/Career";
import Skills from "@/components/Skills/Skills";
import Research from "@/components/Research/Research";
import Projects from "@/components/Projects/Projects";
import Interests from "@/components/Interests/Interests";
import Footer from "@/components/Footer/Footer";
import { useSection } from "@/contexts/SectionContext";

const sectionVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function HomePage() {
  const { activeSection } = useSection();

  const renderSection = () => {
    switch (activeSection) {
      case "top":
      case "purpose":
      case "values":
      case "about-me":
        return (
          <>
            <Profile />
            <Overview />
          </>
        );
      case "career-timeline":
        return <Career />;
      case "skills":
        return <Skills />;
      case "research":
        return <Research />;
      case "projects":
        return <Projects />;
      case "interests":
        return <Interests />;
      default:
        return (
          <>
            <Profile />
            <Overview />
          </>
        );
    }
  };

  return (
    <>
      <Navbar />
      <div id="top" style={{ height: "1px", position: "absolute", top: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AnimatePresence mode="wait">
          <motion.main
            key={activeSection}
            className="profile-page"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h1 className="visually-hidden">小寺奏怜｜プロフィール</h1>
            {renderSection()}
          </motion.main>
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}
