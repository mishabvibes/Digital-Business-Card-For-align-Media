"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownToLine,
  Share2,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Globe,
  Home,
  Layers3,
  GraduationCap,
  MessageCircle,
  X,
  Check,
  Copy,
  QrCode,
  Sparkles,
  Plus,
  Play,
  Palette,
  Film,
  ScanLine,
} from "lucide-react";
import QRCode from "qrcode";

type Tab = "Home" | "Work" | "Academy" | "Connect";
type Project = {
  title: string;
  category: string;
  tag: string;
  style: string;
  heading: string;
  description: string;
};
const projects: Project[] = [
  {
    title: "A fresh perspective",
    category: "Branding",
    tag: "IDENTITY EXPLORATION",
    style: "citrus",
    heading: "fresh\nby nature.",
    description:
      "A playful direction for a fresh food brand, exploring expressive typography, a sunny palette and a memorable brand mark.",
  },
  {
    title: "Make some noise",
    category: "Design",
    tag: "POSTER EXPLORATION",
    style: "noise",
    heading: "MAKE\nSOME\nNOISE.",
    description:
      "An editorial poster concept exploring oversized typography, contrast and graphic rhythm.",
  },
  {
    title: "Ideas in motion",
    category: "Video",
    tag: "MOTION STUDY",
    style: "motion",
    heading: "move\nwith purpose.",
    description:
      "An interactive CSS motion study exploring rhythm and a simple visual identity. This is a design demonstration, not a client video.",
  },
  {
    title: "Less, but better",
    category: "Branding",
    tag: "PACKAGING EXPLORATION",
    style: "minimal",
    heading: "form.\n& feeling.",
    description:
      "A quiet packaging direction with simple forms and a considered typographic system.",
  },
];
const services = [
  {
    name: "Branding",
    detail: "An identity that feels like you.",
    icon: ScanLine,
  },
  {
    name: "Graphic Design",
    detail: "Ideas, beautifully made visible.",
    icon: Palette,
  },
  {
    name: "Video Editing",
    detail: "Stories that make people stop.",
    icon: Film,
  },
  {
    name: "Digital Marketing",
    detail: "Connect with the right people.",
    icon: Globe,
  },
];
const googleUrl = "https://share.google/uqZaxiRFI70LtAZWz";
const phone = "+919562827463";
const navIcons = {
  Home,
  Work: Layers3,
  Academy: GraduationCap,
  Connect: MessageCircle,
};
function Mark({ small = false }: { small?: boolean }) {
  return (
    <span className={`mark ${small ? "small" : ""}`} aria-hidden="true">
      <i />
      <b />
    </span>
  );
}
function Art({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <div className={`art ${project.style} ${large ? "large" : ""}`}>
      <span className="art-label">{project.tag}</span>
      <div className="art-shape" />
      <strong>
        {project.heading.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </strong>
      <span className="art-bottom">
        ALIGN STUDIO EXPLORATIONS <ArrowUpRight size={17} />
      </span>
      {project.category === "Video" && (
        <span className="play-badge">
          <Play size={17} fill="currentColor" />
        </span>
      )}
    </div>
  );
}
export default function Page() {
  const [tab, setTab] = useState<Tab>("Home");
  const [filter, setFilter] = useState("All");
  const [sheet, setSheet] = useState<"share" | "enquiry" | "project" | null>(
    null,
  );
  const [selected, setSelected] = useState("Branding");
  const [project, setProject] = useState<Project>(projects[0]);
  const [brief, setBrief] = useState("");
  const [language, setLanguage] = useState("English");
  const [qr, setQr] = useState("");
  const [toast, setToast] = useState("");
  const [qrError, setQrError] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const priorFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (["Home", "Work", "Academy", "Connect"].includes(hash))
      setTab(hash as Tab);
    const onHash = () => {
      const t = window.location.hash.slice(1);
      if (["Home", "Work", "Academy", "Connect"].includes(t)) setTab(t as Tab);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(id);
  }, [toast]);
  useEffect(() => {
    if (!sheet) return;
    priorFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheet(null);
      if (e.key === "Tab") {
        const els = Array.from(
          document.querySelectorAll<HTMLElement>(
            ".sheet button, .sheet a[href], .sheet input, .sheet textarea, .sheet select",
          ),
        ).filter((e) => !e.hasAttribute("disabled"));
        const first = els[0],
          last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", key);
      priorFocus.current?.focus();
    };
  }, [sheet]);
  function navigate(t: Tab) {
    setTab(t);
    window.location.hash = t;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function enquire(service = "Branding") {
    setSelected(service);
    setBrief("");
    setSheet("enquiry");
  }
  async function share() {
    setSheet("share");
    setQrError(false);
    try {
      setQr(
        await QRCode.toDataURL(window.location.origin, {
          width: 480,
          margin: 2,
          color: { dark: "#282532", light: "#ffffff" },
        }),
      );
    } catch {
      setQrError(true);
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setToast("Card link copied");
    } catch {
      setToast("Copy the address from your browser to share");
    }
  }
  async function nativeShare() {
    try {
      if (navigator.share)
        await navigator.share({
          title: "Align Media",
          text: "Creative Agency & Media Academy. Learn. Create. Grow.",
          url: window.location.origin,
        });
      else await copy();
    } catch (e) {
      if ((e as Error).name !== "AbortError")
        setToast("Sharing unavailable. Use Copy link.");
    }
  }
  const message =
    language === "Malayalam"
      ? `ഹായ് Align Media, ${selected} സംബന്ധിച്ച് കൂടുതൽ അറിയാൻ ആഗ്രഹിക്കുന്നു.${brief ? "\n\n" + brief : ""}`
      : `Hi Align Media! I’m interested in ${selected}.${brief ? "\n\n" + brief : ""}\n\nI found you through your digital card.`;
  const whatsApp = `https://wa.me/919562827463?text=${encodeURIComponent(message)}`;
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="shell" inert={sheet ? true : undefined}>
        <aside className="profile">
          <div className="profile-top">
            <a
              className="wordmark"
              href="#Home"
              onClick={() => navigate("Home")}
            >
              <Mark small />
              align<span>media</span>
              
            </a>
            <button
              className="icon-btn mobile-share"
              onClick={share}
              aria-label="Share digital card"
            >
              <Share2 size={19} />
            </button>
            <span className="desktop-dot">A LITTLE INTRODUCTION</span>
          </div>
          <div className="profile-main">
            <div className="avatar">
              <Mark />
              <span className="avatar-spark">✳</span>
            </div>
            <div className="profile-name">
              <h1>Align Media</h1>
              <p>
                Creative Agency &<br className="desktop-break" /> Media Academy
              </p>
            </div>
            <span className="location">
              <MapPin size={14} /> Mannarkkad, Kerala
            </span>
            <div className="profile-rule" />
            <p className="profile-copy">
              Good ideas deserve
              <br />
              great design. Let’s make
              <br />
              something that matters.
            </p>
            <div className="tagline">
              <span>Learn</span>
              <i /> <span>Create</span>
              <i />
              <span>Grow</span>
            </div>
            <button
              className="button primary profile-cta"
              onClick={() => enquire()}
            >
              Let’s talk <ArrowUpRight size={19} />
            </button>
            <a href="/align-media.vcf" download className="button save">
              <ArrowDownToLine size={16} /> Save contact
            </a>
            <div className="socials">
              <a
                href="https://www.instagram.com/align__media/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={19} />
              </a>
              <a
                href="https://www.linkedin.com/in/align-media"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={19} />
              </a>
              <a href={`tel:${phone}`} aria-label="Call Align Media">
                <Phone size={18} />
              </a>
              <a
                href="mailto:alignmediamkd@gmail.com"
                aria-label="Email Align Media"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>
          <button onClick={share} className="profile-footer">
            <QrCode size={17} /> Your next connection starts here{" "}
            <ArrowUpRight size={15} />
          </button>
        </aside>
        <main id="main" className="main">
          <header className="desktop-nav">
            <nav aria-label="Main navigation">
              {(["Home", "Work", "Academy", "Connect"] as Tab[]).map((t) => (
                <button
                  aria-current={tab === t ? "page" : undefined}
                  className={tab === t ? "active" : ""}
                  onClick={() => navigate(t)}
                  key={t}
                >
                  {t}
                </button>
              ))}
            </nav>
            <button className="share-top" onClick={share}>
              <Share2 size={16} /> Share card
            </button>
          </header>
          <div className="content" key={tab}>
            {tab === "Home" && (
              <>
                <section className="hero">
                  <div className="hero-text">
                    <div className="eyebrow">
                      <span /> INDEPENDENT MINDS. ALIGNED IDEAS.
                    </div>
                    <h2>
                      A little creativity.
                      <br />A <em>big</em> difference
                      <span className="purple">.</span>
                    </h2>
                    <p>
                      We build brands. Tell stories. And help the
                      <br className="desktop-break" /> next generation of
                      creatives find their spark.
                    </p>
                    <div className="hero-actions">
                      <button className="button dark" onClick={() => enquire()}>
                        Start a project <ArrowUpRight size={17} />
                      </button>
                      <button
                        className="text-button"
                        onClick={() => navigate("Academy")}
                      >
                        Explore academy <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="hero-art" aria-hidden="true">
                    <div className="orbit orbit-one" />
                    <div className="orbit orbit-two" />
                    <span className="art-star">✳</span>
                    <div className="floating-label">
                      a fresh point of view <ArrowUpRight size={13} />
                    </div>
                    <span className="coordinate">IDEAS IN ALIGNMENT</span>
                  </div>
                  <div className="hero-foot">
                    <span>YOUR CREATIVE PARTNER, FROM IDEA TO IMPACT.</span>
                    <span>↘</span>
                  </div>
                </section>
                <div className="intro-row">
                  <span>
                    <span className="tiny-spark">✳</span> Made of ideas. Built
                    for people.
                  </span>
                  <a href={googleUrl} target="_blank" rel="noreferrer">
                    Find us on Google <ArrowUpRight size={14} />
                  </a>
                </div>
                <section className="section">
                  <div className="section-heading">
                    <div>
                      <span className="eyebrow muted">THE CREATIVE SIDE</span>
                      <h3>
                        Good work starts here<span>.</span>
                      </h3>
                    </div>
                    <button
                      className="text-button"
                      onClick={() => navigate("Work")}
                    >
                      Explore work <ArrowUpRight size={16} />
                    </button>
                  </div>
                  <div className="project-grid">
                    {projects.slice(0, 2).map((p) => (
                      <button
                        className="project-card"
                        key={p.title}
                        onClick={() => {
                          setProject(p);
                          setSheet("project");
                        }}
                      >
                        <Art project={p} />
                        <div className="project-meta">
                          <div>
                            <h4>{p.title}</h4>
                            <span>{p.category} · Concept study</span>
                          </div>
                          <span className="circle-arrow">
                            <ArrowUpRight size={18} />
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
                <section className="section services-section">
                  <div className="section-heading">
                    <div>
                      <span className="eyebrow muted">WHAT WE DO</span>
                      <h3>A good idea, well executed.</h3>
                    </div>
                  </div>
                  <div className="services">
                    {services.map(({ name, detail, icon: Icon }, i) => (
                      <button key={name} onClick={() => enquire(name)}>
                        <span className="service-number">0{i + 1}</span>
                        <Icon size={21} />
                        <div>
                          <h4>{name}</h4>
                          <p>{detail}</p>
                        </div>
                        <ArrowUpRight size={18} />
                      </button>
                    ))}
                  </div>
                </section>
                <section className="academy-banner">
                  <div>
                    <span className="eyebrow">FOR THE NEXT GENERATION</span>
                    <h3>
                      Your creative journey
                      <br />
                      starts with a spark.
                    </h3>
                    <p>Learn design. Explore video. Find your voice.</p>
                    <button
                      className="button dark"
                      onClick={() => navigate("Academy")}
                    >
                      Meet the academy <ArrowUpRight size={17} />
                    </button>
                  </div>
                  <div className="academy-art" aria-hidden="true">
                    a<span>✳</span>
                    <small>
                      ALWAYS
                      <br />A STUDENT.
                    </small>
                  </div>
                </section>
              </>
            )}
            {tab === "Work" && (
              <>
                <PageIntro
                  label="THE CREATIVE SIDE"
                  title="Ideas, made tangible."
                  description="A glimpse into visual possibilities. Explore branding, graphic design and motion."
                />
                <div className="notice">
                  <Sparkles size={16} />
                  <p>
                    Studio explorations — illustrative concepts, not
                    commissioned client work.
                  </p>
                </div>
                <div className="filters" aria-label="Filter portfolio">
                  {["All", "Branding", "Design", "Video"].map((f) => (
                    <button
                      aria-pressed={filter === f}
                      className={filter === f ? "selected" : ""}
                      key={f}
                      onClick={() => setFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="project-grid work-grid">
                  {projects
                    .filter((p) => filter === "All" || p.category === filter)
                    .map((p) => (
                      <button
                        className="project-card"
                        key={p.title}
                        onClick={() => {
                          setProject(p);
                          setSheet("project");
                        }}
                      >
                        <Art project={p} />
                        <div className="project-meta">
                          <div>
                            <h4>{p.title}</h4>
                            <span>{p.category} · Concept study</span>
                          </div>
                          <span className="circle-arrow">
                            <ArrowUpRight size={18} />
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
                <div className="end-cta">
                  <h3>Your idea could be next.</h3>
                  <button className="button primary" onClick={() => enquire()}>
                    Let’s create together <ArrowUpRight size={17} />
                  </button>
                </div>
              </>
            )}
            {tab === "Academy" && (
              <>
                <PageIntro
                  label="ALIGN MEDIA ACADEMY"
                  title="Find your creative spark."
                  description="For curious minds with ideas to explore. Start a conversation about learning graphic design and video editing."
                />
                <div className="academy-feature">
                  <div>
                    <span className="eyebrow">LEARN • CREATE • GROW</span>
                    <h3>
                      From “what if”
                      <br />
                      to “I made this.”
                    </h3>
                    <p>
                      Explore your creative interests with a team that works in
                      design and media.
                    </p>
                    <button
                      className="button dark"
                      onClick={() => enquire("Academy admissions")}
                    >
                      Enquire about learning <ArrowUpRight size={16} />
                    </button>
                  </div>
                  <div className="learning-art" aria-hidden="true">
                    <span>Aa</span>
                    <i />
                    <b>✳</b>
                    <small>
                      MAKE ROOM
                      <br />
                      FOR IDEAS.
                    </small>
                  </div>
                </div>
                <div className="section-heading course-heading">
                  <div>
                    <span className="eyebrow muted">CHOOSE YOUR DIRECTION</span>
                    <h3>What will you create?</h3>
                  </div>
                </div>
                <div className="course-grid">
                  {[
                    {
                      name: "Graphic Design",
                      icon: Palette,
                      desc: "Explore visual communication, typography, layout and brand design.",
                      number: "01",
                    },
                    {
                      name: "Video Editing",
                      icon: Film,
                      desc: "Explore storytelling, editing rhythm and bringing moving images together.",
                      number: "02",
                    },
                  ].map(({ name, icon: Icon, desc, number }) => (
                    <article className="course" key={name}>
                      <div className="course-top">
                        <Icon size={27} />
                        <span>{number}</span>
                      </div>
                      <h3>{name}</h3>
                      <p>{desc}</p>
                      <button
                        className="text-button"
                        onClick={() => enquire(`${name} training`)}
                      >
                        Ask about this course <ArrowUpRight size={17} />
                      </button>
                    </article>
                  ))}
                </div>
                <div className="details-note">
                  <GraduationCap size={25} />
                  <div>
                    <h4>Let’s find the right starting point.</h4>
                    <p>
                      Contact the academy for the current syllabus, fees,
                      duration and batch availability.
                    </p>
                  </div>
                </div>
                <section className="faq">
                  <h3>A few things you might wonder.</h3>
                  {[
                    {
                      q: "Can I enquire as a complete beginner?",
                      a: "Yes. Tell us what you want to learn and your current experience. The team can explain suitable learning options.",
                    },
                    {
                      q: "Where is the academy located?",
                      a: "Align Media is based near the Bus Stand in Mannarkkad, Kerala. Contact the team to arrange a visit and confirm directions.",
                    },
                    {
                      q: "How do I get course and batch details?",
                      a: "Use the course enquiry button to open a WhatsApp conversation. The team can share current fees, schedules and course information.",
                    },
                  ].map((item) => (
                    <details key={item.q}>
                      <summary>
                        {item.q}
                        <Plus size={18} />
                      </summary>
                      <p>{item.a}</p>
                    </details>
                  ))}
                </section>
              </>
            )}
            {tab === "Connect" && (
              <>
                <PageIntro
                  label="GOOD THINGS START WITH A HELLO"
                  title="Let’s make a connection."
                  description="A project in mind? A creative skill to explore? We’d love to hear from you."
                />
                <div className="contact-grid">
                  <button
                    className="contact-card lavender"
                    onClick={() => enquire()}
                  >
                    <MessageCircle size={26} />
                    <h3>Say hello on WhatsApp</h3>
                    <p>Tell us what you have in mind.</p>
                    <ArrowUpRight size={22} />
                  </button>
                  <a className="contact-card" href={`tel:${phone}`}>
                    <Phone size={25} />
                    <h3>Give us a call</h3>
                    <p>+91 95628 27463</p>
                    <ArrowUpRight size={22} />
                  </a>
                  <a
                    className="contact-card"
                    href="mailto:alignmediamkd@gmail.com"
                  >
                    <Mail size={25} />
                    <h3>Drop us a line</h3>
                    <p>alignmediamkd@gmail.com</p>
                    <ArrowUpRight size={22} />
                  </a>
                  <a
                    className="contact-card mint"
                    href={googleUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MapPin size={26} />
                    <h3>Meet us in Mannarkkad</h3>
                    <p>
                      Near Bus Stand, Mannarkkad
                      <br />
                      Palakkad, Kerala 678582
                    </p>
                    <ArrowUpRight size={22} />
                  </a>
                </div>
                <div className="connect-links">
                  <a
                    href="https://www.instagram.com/align__media/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Instagram />
                    <div>
                      <h4>Behind the scenes & beyond</h4>
                      <span>@align__media on Instagram</span>
                    </div>
                    <ArrowUpRight />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/align-media"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin />
                    <div>
                      <h4>Let’s grow our network</h4>
                      <span>Connect on LinkedIn</span>
                    </div>
                    <ArrowUpRight />
                  </a>
                  <a href={googleUrl} target="_blank" rel="noreferrer">
                    <Globe />
                    <div>
                      <h4>Your experience matters</h4>
                      <span>Read or leave a review on Google</span>
                    </div>
                    <ArrowUpRight />
                  </a>
                </div>
                <div className="save-banner">
                  <QrCode size={35} />
                  <div>
                    <h3>Keep us in your corner.</h3>
                    <p>Save our contact or share this card with a friend.</p>
                  </div>
                  <a href="/align-media.vcf" download className="button dark">
                    <ArrowDownToLine size={17} /> Save contact
                  </a>
                  <button
                    className="icon-btn"
                    onClick={share}
                    aria-label="Share this card"
                  >
                    <Share2 size={19} />
                  </button>
                </div>
              </>
            )}
            <footer className="footer">
              <span>© {new Date().getFullYear()} Align Media</span>
              <span>
                Made with purpose. <span className="purple">✳</span>
              </span>
              <button onClick={share}>
                Pass it on <ArrowUpRight size={14} />
              </button>
            </footer>
          </div>
        </main>
      </div>
      <nav
        inert={sheet ? true : undefined}
        className="mobile-nav"
        aria-label="Mobile navigation"
      >
        {(["Home", "Work", "Academy", "Connect"] as Tab[]).map((t) => {
          const Icon = navIcons[t];
          return (
            <button
              key={t}
              aria-current={tab === t ? "page" : undefined}
              className={tab === t ? "active" : ""}
              onClick={() => navigate(t)}
            >
              <Icon size={21} />
              <span>{t}</span>
            </button>
          );
        })}
      </nav>
      {sheet && (
        <div
          className="overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSheet(null);
          }}
        >
          <section
            className={`sheet ${sheet === "project" ? "project-sheet" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
          >
            <div className="sheet-handle" />
            <button
              ref={closeRef}
              className="icon-btn close"
              onClick={() => setSheet(null)}
              aria-label="Close dialog"
            >
              <X size={21} />
            </button>
            {sheet === "share" && (
              <>
                <span className="eyebrow muted">GOOD IDEAS TRAVEL</span>
                <h2 id="sheet-title">Small card. Big possibilities.</h2>
                <p>Scan to connect with Align Media.</p>
                <div className="qr-wrap">
                  {qr ? (
                    <img
                      src={qr}
                      alt="QR code linking to this Align Media digital card"
                      width={220}
                      height={220}
                    />
                  ) : (
                    <p>
                      {qrError
                        ? "QR unavailable. Use the link below."
                        : "Creating your QR…"}
                    </p>
                  )}
                  <span>ALIGN MEDIA · LEARN / CREATE / GROW</span>
                </div>
                <button className="button primary full" onClick={nativeShare}>
                  <Share2 size={17} /> Share card
                </button>
                <div className="share-options">
                  <button className="button save" onClick={copy}>
                    <Copy size={17} /> Copy link
                  </button>
                  {qr && (
                    <a
                      href={qr}
                      download="align-media-qr.png"
                      className="button save"
                    >
                      <ArrowDownToLine size={17} /> Save QR
                    </a>
                  )}
                </div>
                <p className="small-note">
                  You can also add this card to your home screen from your
                  browser menu.
                </p>
              </>
            )}
            {sheet === "enquiry" && (
              <>
                <span className="eyebrow muted">LET’S MAKE SOMETHING GOOD</span>
                <h2 id="sheet-title">What’s on your mind?</h2>
                <p>A little context helps us get started.</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.open(whatsApp, "_blank", "noopener,noreferrer");
                  }}
                >
                  <label htmlFor="interest">I’m interested in</label>
                  <select
                    id="interest"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                  >
                    {Array.from(
                      new Set([
                        selected,
                        "Branding",
                        "Graphic Design",
                        "Video Editing",
                        "Digital Marketing",
                        "Website Design",
                        "Printing",
                        "Academy admissions",
                        "Graphic Design training",
                        "Video Editing training",
                      ]),
                    ).map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <label htmlFor="brief">
                    A little about your idea <span>(optional)</span>
                  </label>
                  <textarea
                    id="brief"
                    placeholder="Tell us about your project, goals or what you’d like to learn…"
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    maxLength={1200}
                  />
                  <label htmlFor="language">Message language</label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option>English</option>
                    <option>Malayalam</option>
                  </select>
                  <button className="button primary full" type="submit">
                    <MessageCircle size={18} /> Continue in WhatsApp{" "}
                    <ArrowUpRight size={17} />
                  </button>
                  <p className="small-note">
                    Opens WhatsApp with your draft. You review and send it
                    there.
                  </p>
                </form>
              </>
            )}
            {sheet === "project" && (
              <>
                <span className="eyebrow muted">
                  {project.category.toUpperCase()} · CONCEPT STUDY
                </span>
                <h2 id="sheet-title">{project.title}</h2>
                <Art project={project} large />
                <p className="project-description">{project.description}</p>
                <p className="small-note">
                  Illustrative studio exploration. Not commissioned client work.
                </p>
                <button
                  className="button primary full"
                  onClick={() =>
                    enquire(
                      project.category === "Design"
                        ? "Graphic Design"
                        : project.category === "Video"
                          ? "Video Editing"
                          : "Branding",
                    )
                  }
                >
                  Create something like this <ArrowUpRight size={17} />
                </button>
              </>
            )}
          </section>
        </div>
      )}
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
    </>
  );
}
function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <span className="eyebrow muted">{label}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
