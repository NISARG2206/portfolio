import styles from "../styles/About.module.css";

const FRONTEND_SKILLS = ["React", "Next.js", "TypeScript", "HTML5/CSS3", "JavaScript", "Tailwind CSS", "Redux Toolkit"];
const BACKEND_SKILLS = ["Node.js", "Express", "GraphQL", "REST APIs", "Socket.io", "Python", "Golang"];
const DATABASE_SKILLS = ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Prisma ORM", "Mongoose"];
const TOOLS_SKILLS = ["Git & GitHub", "Docker", "AWS", "Vercel", "Linux", "CI/CD"];

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A software engineer dedicated to building seamless digital experiences.
          </p>
        </div>

        <div className={styles.content}>
          {/* Bio text & stats column */}
          <div className={styles.bioText}>
            <h3>Designing and coding high-performance software systems.</h3>
            <p>
              Hello! I&apos;m <span className={styles.highlightText}>Nisarg Patel</span>, a fullstack developer focused on creating fast, accessible, and elegant solutions. I enjoy bridging the gap between design and technology — creating systems that not only look spectacular but also run with optimal performance under heavy loads.
            </p>
            <p>
              Whether it is architecting scalable REST or GraphQL APIs, designing responsive single page applications, or deploying robust cloud infrastructures, I love learning new tools and pushing boundaries.
            </p>

            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>3+</span>
                <span className={styles.statLabel}>Years Exp</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>20+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>Commitment</span>
              </div>
            </div>
          </div>

          {/* Technical skills column */}
          <div className={styles.skillsSection}>
            <div className={styles.skillsGroup}>
              <h4>Frontend Development</h4>
              <div className={styles.skillsGrid}>
                {FRONTEND_SKILLS.map((skill) => (
                  <span key={skill} className={styles.skillBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.skillsGroup}>
              <h4>Backend & Frameworks</h4>
              <div className={styles.skillsGrid}>
                {BACKEND_SKILLS.map((skill) => (
                  <span key={skill} className={styles.skillBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.skillsGroup}>
              <h4>Databases & Caching</h4>
              <div className={styles.skillsGrid}>
                {DATABASE_SKILLS.map((skill) => (
                  <span key={skill} className={styles.skillBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.skillsGroup}>
              <h4>Tools & Cloud DevOps</h4>
              <div className={styles.skillsGrid}>
                {TOOLS_SKILLS.map((skill) => (
                  <span key={skill} className={styles.skillBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
