import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const projectTimestamp = (dates = "") => {
  const monthFirst = dates.match(/(\d{1,2})\/(\d{4})/);
  if (monthFirst) return Number(monthFirst[2]) * 12 + Number(monthFirst[1]);
  const yearFirst = dates.match(/(\d{4})\/(\d{1,2})/);
  return yearFirst ? Number(yearFirst[1]) * 12 + Number(yearFirst[2]) : 0;
};
const isCurrent = (dates = "") => /current|present|現|ç¾|現在/i.test(dates);

function ProjectCard({ project, index, featured = false }) {
  return <Motion.article className={`project-card ${featured ? "project-card--featured" : ""}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} viewport={{ once: true, amount: .12 }}>
    <div className="project-image">
      <img src={project.image} alt={`${project.title} interface`} loading="lazy" />
      <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
      {isCurrent(project.dates) && <span className="project-current"><i /> Current project</span>}
      <a href={project.link || "#"} className="project-arrow" aria-label={`View ${project.title}`}><ArrowUpRight size={20} /></a>
    </div>
    <div className="project-info">
      <div className="project-title-row"><div><p className="project-date">{project.dates}</p><h3>{project.title}</h3></div>{project.company && <span className="project-company">{project.company}</span>}</div>
      <p>{project.description}</p>
      <div className="project-tech">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
    </div>
  </Motion.article>;
}

export default function Projects() {
  const { t } = useTranslation();
  const [visibleArchive, setVisibleArchive] = useState(4);
  const projects = useMemo(() => {
    const translated = t("projects", { returnObjects: true });
    return Array.isArray(translated) ? [...translated].sort((a, b) => projectTimestamp(b.dates) - projectTimestamp(a.dates)) : [];
  }, [t]);
  const active = projects.filter(project => isCurrent(project.dates));
  const archive = projects.filter(project => !isCurrent(project.dates));

  return <section id="projects" className="projects section-wrap section-space">
    <div className="section-label"><span>03</span> Selected work</div>
    <div className="projects-heading"><h2>Products made for <em>real-world use.</em></h2><p>Selected work arranged from the latest engagements to earlier projects, spanning platforms, internal tools, and customer experiences.</p></div>
    {active.length > 0 && <div className="project-group"><div className="project-group-title"><span>In progress</span><small>{active.length} current projects</small></div><div className="featured-projects">{active.map((project, index) => <ProjectCard key={project.title} project={project} index={index} featured />)}</div></div>}
    <div className="project-group project-group--archive"><div className="project-group-title"><span>Project archive</span><small>Newest to oldest</small></div><div className="project-grid">{archive.slice(0, visibleArchive).map((project, index) => <ProjectCard key={project.title} project={project} index={index + active.length} />)}</div></div>
    {visibleArchive < archive.length && <button className="button button--outline load-more" onClick={() => setVisibleArchive(archive.length)}>View older projects <span>+{archive.length - visibleArchive}</span></button>}
  </section>;
}

