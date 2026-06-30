import styles from "../styles/Projects.module.css";

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

const PROJECTS_DATA: Project[] = [
  {
    title: "DevMetrics SaaS Dashboard",
    description: "An analytics web application that visualizes Git commits, pull requests, and production build health. Built with performance optimizations like Redis caching, dynamic dashboards, and secure JSON Web Token authorization flow.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Chart.js"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "ShopCraft E-Commerce Engine",
    description: "A highly resilient backend engine and headless cart solution utilizing Stripe billing webhooks, inventory stock check concurrency control, and rapid MongoDB database indexing for sub-100ms response cycles.",
    tags: ["Node.js", "Express", "MongoDB", "Stripe API", "Docker"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "SyncDoc Real-time Editor",
    description: "Collaborative editor where team members edit markdown content simultaneously. Operates on WebSockets for near-zero sync lag, integrating conflict resolution algorithms to handle typing collisions gracefully.",
    tags: ["React", "Socket.io", "Express", "Node.js", "Mongoose"],
    githubUrl: "#",
    liveUrl: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            A selection of recent projects built using clean architecture and modern stacks.
          </p>
        </div>

        <div className={styles.grid}>
          {PROJECTS_DATA.map((project, idx) => (
            <article key={idx} className={styles.card}>
              <div className={styles.cardContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
                
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.links}>
                  <a href={project.githubUrl} className={styles.link} target="_blank" rel="noopener noreferrer">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Source Code
                  </a>
                  <a href={project.liveUrl} className={styles.link} target="_blank" rel="noopener noreferrer">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"></path>
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
