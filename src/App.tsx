import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Send,
  MessageCircle,
  ArrowRight,
  Compass,
  Camera,
  Utensils,
  Sun,
  Users,
  Moon,
  Calendar,
  User,
} from "lucide-react";

/* ───────── DATA ───────── */

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Safaris", href: "#safaris" },
  { label: "Experiences", href: "#experiences" },
  { label: "Destinations", href: "#destinations" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

const partners = [
  "Kenya Tourism Board",
  "Tanzania National Parks",
  "Uganda Wildlife Authority",
  "Rwanda Development Board",
  "African Safari Association",
  "World Travel & Tourism Council",
  "National Geographic",
  "SafariBookings",
];

const safaris = [
  {
    title: "Classic Kenya Safari",
    image: "/safari-classic.jpg",
    price: "From $2,850",
    description:
      "Experience the legendary Maasai Mara, Amboseli with Kilimanjaro views, and the diverse landscapes of Kenya's finest national parks.",
    tags: ["7 Days", "Kenya", "Big Five"],
  },
  {
    title: "Serengeti Migration Safari",
    image: "/safari-serengeti.jpg",
    price: "From $3,200",
    description:
      "Witness the greatest wildlife spectacle on Earth as millions of wildebeest thunder across the Serengeti plains.",
    tags: ["8 Days", "Tanzania", "Migration"],
  },
  {
    title: "Gorilla Trekking Adventure",
    image: "/safari-gorilla.jpg",
    price: "From $4,500",
    description:
      "Trek through misty rainforests to encounter endangered mountain gorillas in their natural habitat.",
    tags: ["5 Days", "Uganda / Rwanda", "Gorillas"],
  },
  {
    title: "Zanzibar Beach & Spice",
    image: "/safari-zanzibar.jpg",
    price: "From $2,100",
    description:
      "Unwind on pristine white-sand beaches, explore historic Stone Town, and discover aromatic spice plantations.",
    tags: ["6 Days", "Zanzibar", "Beach"],
  },
  {
    title: "Grand East Africa Safari",
    image: "/safari-grand.jpg",
    price: "From $6,800",
    description:
      "The ultimate 14-day journey spanning Kenya, Tanzania, and Uganda — the most comprehensive East African adventure.",
    tags: ["14 Days", "Multi-Country", "Ultimate"],
  },
  {
    title: "Photography Safari",
    image: "/safari-photo.jpg",
    price: "From $3,800",
    description:
      "Capture stunning wildlife moments with expert photography guides in Kenya and Tanzania's most photogenic locations.",
    tags: ["9 Days", "Kenya / Tanzania", "Photography"],
  },
];

const carouselItems = [
  { title: "Balloon Safari", image: "/carousel-1.jpg", icon: Compass },
  { title: "Walking Safari", image: "/carousel-2.jpg", icon: MapPin },
  { title: "Bush Dinner", image: "/carousel-3.jpg", icon: Utensils },
  { title: "Sundowner", image: "/carousel-4.jpg", icon: Sun },
  { title: "Cultural Visit", image: "/carousel-5.jpg", icon: Users },
  { title: "Night Drive", image: "/carousel-6.jpg", icon: Moon },
];

const testimonials = [
  {
    name: "Sarah & James Mitchell",
    location: "London, UK",
    image: "/testimonial-1.jpg",
    quote:
      "An absolutely unforgettable experience. The Maasai Warriors team went above and beyond to make our honeymoon safari perfect. Every detail was taken care of, from the luxury lodges to the incredible game drives.",
  },
  {
    name: "Michael Chen",
    location: "Singapore",
    image: "/testimonial-2.jpg",
    quote:
      "I've traveled to over 50 countries, and this safari ranks as one of my top experiences. The guides were incredibly knowledgeable, and we saw the Big Five on our very first day in the Mara.",
  },
  {
    name: "Elena Rodriguez",
    location: "Barcelona, Spain",
    image: "/testimonial-3.jpg",
    quote:
      "The gorilla trekking was a life-changing moment. Maasai Warriors made the entire journey seamless — from permits to accommodations. Highly recommend their services to anyone visiting East Africa.",
  },
];

const journalPosts = [
  {
    title: "The Great Migration: Nature's Greatest Spectacle",
    image: "/blog-migration.jpg",
    excerpt:
      "Every year, over two million wildebeest, zebras, and gazelles embark on a circular journey across the Serengeti-Mara ecosystem. Discover the best times and places to witness this natural wonder.",
    date: "June 15, 2026",
    readTime: "5 min read",
  },
  {
    title: "Gorilla Trekking: A Once-in-a-Lifetime Encounter",
    image: "/blog-gorilla.jpg",
    excerpt:
      "Trekking through the misty rainforests of Uganda and Rwanda to meet endangered mountain gorillas is one of the most profound wildlife experiences on Earth. Here's everything you need to know.",
    date: "May 28, 2026",
    readTime: "7 min read",
  },
  {
    title: "Maasai Culture: Traditions That Stand the Test of Time",
    image: "/blog-maasai.jpg",
    excerpt:
      "The Maasai people have preserved their traditional way of life for centuries. Learn about their customs, ceremonies, and the important role they play in East African conservation efforts.",
    date: "May 10, 2026",
    readTime: "6 min read",
  },
];

const destStripImages = [
  "/dest-strip-1.jpg",
  "/dest-strip-2.jpg",
  "/dest-strip-3.jpg",
  "/dest-strip-4.jpg",
  "/dest-strip-5.jpg",
];

const heroRows = [
  ["/hero-row1-1.jpg", "/hero-row1-2.jpg", "/hero-row1-3.jpg", "/hero-row1-4.jpg"],
  ["/hero-row2-1.jpg", "/hero-row2-2.jpg", "/hero-row2-3.jpg", "/hero-row2-4.jpg"],
  ["/hero-row3-1.jpg", "/hero-row3-2.jpg", "/hero-row3-3.jpg", "/hero-row3-4.jpg"],
  ["/hero-row4-1.jpg", "/hero-row4-2.jpg", "/hero-row4-3.jpg", "/hero-row4-4.jpg"],
];

/* ───────── COMPONENT ───────── */

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [carouselAngle, setCarouselAngle] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: "",
    dates: "",
    groupSize: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  /* Scroll reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .stagger-children").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);

  /* 3D carousel auto-rotate */
  useEffect(() => {
    const id = setInterval(() => {
      setCarouselAngle((a) => a + 60);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const prevTestimonial = useCallback(() => {
    setTestimonialIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  }, []);

  const nextTestimonial = useCallback(() => {
    setTestimonialIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#eaddc5]">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#1a1209]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#home" className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Maasai Warriors Tours"
                className="h-12 w-12 rounded-full object-cover"
              />
              <span className="text-[#f3e9d8] font-bold text-lg hidden sm:block font-heading">
                Maasai Warriors
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} className="nav-link">
                  {l.label}
                </a>
              ))}
              <a
                href="https://wa.me/254722572068"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "#d4a03a", color: "#1a1209" }}
              >
                Book Now
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-[#f3e9d8] p-2"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#1a1209]/95 border-t border-white/10 px-4 pb-6">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block py-3 text-[#f3e9d8] hover:text-[#d4a03a] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/254722572068"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{ backgroundColor: "#d4a03a", color: "#1a1209" }}
              onClick={() => setMobileOpen(false)}
            >
              Book Now
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="relative h-screen overflow-hidden">
        {/* Scrolling image rows behind video */}
        <div className="absolute inset-0 flex flex-col justify-center gap-2 opacity-40">
          {heroRows.map((row, ri) => (
            <div
              key={ri}
              className={`flex gap-2 ${
                ri % 2 === 0 ? "scroll-left" : "scroll-right"
              }`}
              style={{
                animationDuration: `${25 + ri * 5}s`,
              }}
            >
              {[...row, ...row].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="h-32 w-48 object-cover rounded-lg flex-shrink-0"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Video overlay */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="hero-overlay absolute inset-0" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-20 sm:pb-28 px-4 sm:px-8 lg:px-16">
          <div className="max-w-3xl reveal active">
            <img
              src="/logo.jpg"
              alt="Maasai Warriors"
              className="h-16 w-16 rounded-full object-cover mb-6"
            />
            <p className="label-accent mb-4">Luxury East African Safaris</p>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-[#d4a03a] tracking-wide leading-tight mb-2 font-heading uppercase">
              Maasai Warriors
              <br />
              Tours &amp; Safaris
            </h1>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#f3e9d8] leading-tight mb-6 font-heading">
              Discover the Wild
              <br />
              <span style={{ color: "#d4a03a" }}>Heart of Africa</span>
            </h2>
            <p className="text-[#f3e9d8]/80 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
              Experience unforgettable safari adventures across Kenya, Tanzania,
              Uganda, and Rwanda. Expertly crafted journeys that connect you with
              nature, wildlife, and authentic African cultures.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#safaris"
                className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "#d4a03a", color: "#1a1209" }}
              >
                Explore Safaris
              </a>
              <a
                href="https://wa.me/254722572068"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-semibold text-sm border border-[#f3e9d8]/30 text-[#f3e9d8] hover:bg-[#f3e9d8]/10 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERS MARQUEE ── */}
      <section className="py-8 bg-[#1a1209] border-y border-white/5 overflow-hidden">
        <div className="logo-scroll flex whitespace-nowrap">
          {[...partners, ...partners].map((p, i) => (
            <span
              key={i}
              className="text-[#f3e9d8]/40 text-sm font-medium mx-12 flex items-center gap-2"
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#d4a03a" }}
              />
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center reveal">
          <img
            src="/logo.jpg"
            alt="Maasai Warriors"
            className="h-20 w-20 rounded-full object-cover mx-auto mb-8"
          />
          <p className="label-accent mb-4">Our Philosophy</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1209] mb-8 font-heading leading-tight">
            Rooted in Tradition,
            <br />
            <span style={{ color: "#c17a38" }}>Guided by Nature</span>
          </h2>
          <p className="text-[#1a1209]/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-16">
            Born from the ancient wisdom of the Maasai people and a deep reverence
            for the African wilderness, we craft journeys that go beyond ordinary
            travel. Every safari is a carefully woven tapestry of wildlife
            encounters, cultural immersion, and luxury hospitality — designed to
            leave you transformed.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 stagger-children">
            {[
              { num: "15+", label: "Years of Experience" },
              { num: "4", label: "Countries Explored" },
              { num: "2,000+", label: "Happy Travelers" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-4xl sm:text-5xl font-bold mb-2 font-heading"
                  style={{ color: "#d4a03a" }}
                >
                  {s.num}
                </div>
                <div className="text-[#1a1209]/60 text-sm font-medium uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED JOURNEY ── */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        <img
          src="/blog-migration.jpg"
          alt="Great Migration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a1209]/60" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-3xl reveal">
            <p className="label-accent mb-4">Featured Journey</p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#f3e9d8] mb-6 font-heading leading-tight">
              The Great Migration
            </h2>
            <p className="text-[#f3e9d8]/80 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Witness the greatest wildlife spectacle on Earth as over two million
              wildebeest and zebras thunder across the Serengeti-Mara ecosystem.
            </p>
            <a
              href="https://wa.me/254722572068"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "#d4a03a", color: "#1a1209" }}
            >
              Inquire Now <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── SAFARIS GRID ── */}
      <section id="safaris" className="py-20 sm:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="label-accent mb-4">Curated Adventures</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1209] font-heading">
              Our Safari Collection
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {safaris.map((s) => (
              <div
                key={s.title}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#d4a03a] text-[#1a1209]">
                    {s.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1a1209] mb-2 font-heading">
                    {s.title}
                  </h3>
                  <p className="text-[#1a1209]/60 text-sm leading-relaxed mb-4">
                    {s.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#eaddc5] text-[#1a1209]/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="#contact"
                      className="flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:opacity-90"
                      style={{ backgroundColor: "#1a1209", color: "#f3e9d8" }}
                    >
                      Inquire
                    </a>
                    <a
                      href="https://wa.me/254722572068"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 rounded-lg text-sm font-semibold border transition-all duration-300 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white"
                      style={{
                        borderColor: "#25D366",
                        color: "#25D366",
                      }}
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCES CAROUSEL ── */}
      <section id="experiences" className="py-20 sm:py-28 px-4 bg-[#1a1209]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="label-accent mb-4">Unforgettable Moments</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f3e9d8] font-heading">
              Signature Experiences
            </h2>
          </div>

          <div className="relative h-[400px] sm:h-[500px] flex items-center justify-center perspective-[1000px]">
            <div
              className="relative w-64 h-80 sm:w-80 sm:h-96"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${carouselAngle}deg)`,
                transition: "transform 1s ease-in-out",
              }}
            >
              {carouselItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                      transform: `rotateY(${i * 60}deg) translateZ(280px)`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#1a1209]/50 flex flex-col items-center justify-end pb-8">
                      <Icon
                        size={32}
                        className="mb-3"
                        style={{ color: "#d4a03a" }}
                      />
                      <h3 className="text-xl font-bold text-[#f3e9d8] font-heading">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {carouselItems.map((_, i) => (
              <button
                key={i}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    (carouselAngle / 60) % 6 === i
                      ? "#d4a03a"
                      : "rgba(243,233,216,0.3)",
                }}
                onClick={() => setCarouselAngle(i * 60)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATION STRIP ── */}
      <section id="destinations" className="py-16 overflow-hidden">
        <div className="space-y-4">
          {/* Row 1 — scroll left */}
          <div className="scroll-left flex gap-4" style={{ width: "max-content" }}>
            {[...destStripImages, ...destStripImages, ...destStripImages].map(
              (img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="h-40 w-60 object-cover rounded-xl flex-shrink-0"
                />
              )
            )}
          </div>
          {/* Row 2 — scroll right */}
          <div className="scroll-right flex gap-4" style={{ width: "max-content" }}>
            {[...destStripImages, ...destStripImages, ...destStripImages].map(
              (img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="h-40 w-60 object-cover rounded-xl flex-shrink-0"
                />
              )
            )}
          </div>
          {/* Row 3 — scroll left slow */}
          <div className="scroll-left-slow flex gap-4" style={{ width: "max-content" }}>
            {[...destStripImages, ...destStripImages, ...destStripImages].map(
              (img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="h-40 w-60 object-cover rounded-xl flex-shrink-0"
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* ── DESTINATION TICKER ── */}
      <section className="py-6 overflow-hidden" style={{ backgroundColor: "#c17a38" }}>
        <div className="ticker-animate flex whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, ri) => (
            <span key={ri} className="flex items-center">
              {["KENYA", "TANZANIA", "UGANDA", "RWANDA", "ZANZIBAR"].map(
                (d, i) => (
                  <span key={i} className="text-[#f3e9d8] text-sm font-bold mx-6 uppercase tracking-[0.2em] flex items-center gap-4">
                    {d}
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f3e9d8]" />
                  </span>
                )
              )}
            </span>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="label-accent mb-4">Traveler Stories</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1209] font-heading">
              What Our Guests Say
            </h2>
          </div>

          <div className="relative reveal">
            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <img
                  src={testimonials[testimonialIdx].image}
                  alt={testimonials[testimonialIdx].name}
                  className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                />
                <div className="text-center sm:text-left">
                  <p className="text-[#1a1209]/80 text-base sm:text-lg leading-relaxed italic mb-6">
                    "{testimonials[testimonialIdx].quote}"
                  </p>
                  <div className="font-bold text-[#1a1209] font-heading">
                    {testimonials[testimonialIdx].name}
                  </div>
                  <div className="text-sm text-[#1a1209]/50">
                    {testimonials[testimonialIdx].location}
                  </div>
                </div>
              </div>
            </div>

            {/* Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1a1209] hover:bg-[#d4a03a] hover:text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1a1209] hover:bg-[#d4a03a] hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    i === testimonialIdx ? "#d4a03a" : "rgba(26,18,9,0.2)",
                }}
                onClick={() => setTestimonialIdx(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 sm:py-28 px-4 bg-[#1a1209]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left — info */}
            <div className="reveal">
              <p className="label-accent mb-4">Get in Touch</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f3e9d8] mb-8 font-heading">
                Start Your Adventure
              </h2>
              <p className="text-[#f3e9d8]/60 mb-10 leading-relaxed">
                Ready to plan your dream safari? Our team of experienced travel
                specialists is here to help you craft the perfect East African
                adventure tailored to your preferences.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(212,160,58,0.15)" }}
                  >
                    <Phone size={20} style={{ color: "#d4a03a" }} />
                  </div>
                  <div>
                    <div className="text-xs text-[#f3e9d8]/40 uppercase tracking-wider mb-0.5">
                      Phone
                    </div>
                    <a
                      href="tel:+254722572068"
                      className="text-[#f3e9d8] hover:text-[#d4a03a] transition-colors"
                    >
                      +254 722 572 068
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(212,160,58,0.15)" }}
                  >
                    <Mail size={20} style={{ color: "#d4a03a" }} />
                  </div>
                  <div>
                    <div className="text-xs text-[#f3e9d8]/40 uppercase tracking-wider mb-0.5">
                      Email
                    </div>
                    <a
                      href="mailto:hello@maasaiwarriorstours.com"
                      className="text-[#f3e9d8] hover:text-[#d4a03a] transition-colors"
                    >
                      hello@maasaiwarriorstours.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(212,160,58,0.15)" }}
                  >
                    <MapPin size={20} style={{ color: "#d4a03a" }} />
                  </div>
                  <div>
                    <div className="text-xs text-[#f3e9d8]/40 uppercase tracking-wider mb-0.5">
                      Address
                    </div>
                    <span className="text-[#f3e9d8]">
                      P.O Box 66-20116, Gilgil, Kenya
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="reveal">
              <form
                onSubmit={handleFormSubmit}
                className="space-y-5 bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
              >
                {formSubmitted && (
                  <div className="p-4 rounded-lg bg-green-500/20 text-green-400 text-sm text-center">
                    Thank you! We'll be in touch shortly.
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-[#f3e9d8]/50 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#f3e9d8]/50 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#f3e9d8]/50 uppercase tracking-wider mb-2">
                    Destination
                  </label>
                  <select
                    className="form-input appearance-none"
                    value={formData.destination}
                    onChange={(e) =>
                      setFormData({ ...formData, destination: e.target.value })
                    }
                    required
                  >
                    <option value="" className="bg-[#1a1209]">
                      Select destination
                    </option>
                    <option value="kenya" className="bg-[#1a1209]">
                      Kenya
                    </option>
                    <option value="tanzania" className="bg-[#1a1209]">
                      Tanzania
                    </option>
                    <option value="uganda" className="bg-[#1a1209]">
                      Uganda
                    </option>
                    <option value="rwanda" className="bg-[#1a1209]">
                      Rwanda
                    </option>
                    <option value="zanzibar" className="bg-[#1a1209]">
                      Zanzibar
                    </option>
                    <option value="multi" className="bg-[#1a1209]">
                      Multi-Country
                    </option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-[#f3e9d8]/50 uppercase tracking-wider mb-2">
                      Travel Dates
                    </label>
                    <div className="relative">
                      <Calendar
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f3e9d8]/40"
                      />
                      <input
                        type="text"
                        className="form-input pl-10"
                        placeholder="e.g., July 2026"
                        value={formData.dates}
                        onChange={(e) =>
                          setFormData({ ...formData, dates: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#f3e9d8]/50 uppercase tracking-wider mb-2">
                      Group Size
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f3e9d8]/40"
                      />
                      <input
                        type="text"
                        className="form-input pl-10"
                        placeholder="e.g., 2 adults"
                        value={formData.groupSize}
                        onChange={(e) =>
                          setFormData({ ...formData, groupSize: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#f3e9d8]/50 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    className="form-input min-h-[120px] resize-y"
                    placeholder="Tell us about your dream safari..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#d4a03a", color: "#1a1209" }}
                >
                  <Send size={16} />
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNAL ── */}
      <section id="journal" className="py-20 sm:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="label-accent mb-4">Stories & Insights</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1209] font-heading">
              From Our Journal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            {journalPosts.map((post) => (
              <article
                key={post.title}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#1a1209]/40 mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#1a1209]/30" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1209] mb-3 font-heading leading-snug group-hover:text-[#c17a38] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#1a1209]/60 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
                    style={{ color: "#d4a03a" }}
                  >
                    Read More <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a1209] border-t border-white/10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Logo + desc */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/logo.jpg"
                  alt="Maasai Warriors"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="text-[#f3e9d8] font-bold font-heading">
                  Maasai Warriors
                </span>
              </div>
              <p className="text-[#f3e9d8]/50 text-sm leading-relaxed">
                Crafting unforgettable safari experiences across East Africa with
                deep respect for wildlife, culture, and tradition.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-[#f3e9d8] font-bold mb-4 font-heading">
                Explore
              </h4>
              <ul className="space-y-2.5">
                {navLinks.slice(1).map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[#f3e9d8]/50 text-sm hover:text-[#d4a03a] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#f3e9d8] font-bold mb-4 font-heading">
                Contact
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="tel:+254722572068"
                    className="text-[#f3e9d8]/50 text-sm hover:text-[#d4a03a] transition-colors"
                  >
                    +254 722 572 068
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@maasaiwarriorstours.com"
                    className="text-[#f3e9d8]/50 text-sm hover:text-[#d4a03a] transition-colors"
                  >
                    hello@maasaiwarriorstours.com
                  </a>
                </li>
                <li className="text-[#f3e9d8]/50 text-sm">
                  P.O Box 66-20116, Gilgil, Kenya
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-[#f3e9d8] font-bold mb-4 font-heading">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#f3e9d8]/50 hover:text-[#d4a03a] hover:border-[#d4a03a] transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#f3e9d8]/50 hover:text-[#d4a03a] hover:border-[#d4a03a] transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#f3e9d8]/50 hover:text-[#d4a03a] hover:border-[#d4a03a] transition-all duration-300"
                  aria-label="Twitter"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#f3e9d8]/30 text-xs text-center sm:text-left">
              &copy; 2026 Maasai Warriors Tours & Safaris. P.O Box 66-20116
              Gilgil. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-[#f3e9d8]/30 text-xs hover:text-[#d4a03a] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-[#f3e9d8]/30 text-xs hover:text-[#d4a03a] transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href="https://wa.me/254722572068"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} color="white" fill="white" />
      </a>
    </div>
  );
}
