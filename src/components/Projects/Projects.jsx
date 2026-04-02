import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import projects from "@/data/projects.json";
import styles from "./Projects.module.css";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      className="profile-page__section profile-page__wide-section"
      id="projects"
    >
      <h2>
        <span className="sec-en">PROJECTS</span>
        <span className="sec-ja">プロジェクト</span>
      </h2>
      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            {...project}
            onOpenModal={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
