"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const heroSlides = [
  { image: "https://ik.imagekit.io/wn1nobtx5/laptop/banner_3.png", badge: "About Us",    title: "We Love Laptops",      subtitle: "Your trusted destination for premium computing gear." },
  { image: "/https://ik.imagekit.io/wn1nobtx5/laptop/banner_6.png", badge: "Our Story",   title: "Built With Passion",   subtitle: "From gamers to professionals — we have something for everyone." },
  { image: "https://ik.imagekit.io/wn1nobtx5/laptop/banner_4.png", badge: "Since 2020",  title: "Years of Excellence",  subtitle: "Delivering the best laptops at the best prices." },
];

const values = [
  { icon: "/icon/target.png",         title: "Our Mission",     desc: "Making premium laptops accessible to everyone — students, creators, and gamers." },
  { icon: "/icon/quality.png",        title: "Quality First",   desc: "Strict quality checks on every product for performance and durability." },
  { icon: "/icon/innovation.png",     title: "Innovation",      desc: "Always updating our catalog with the latest RTX GPUs and next-gen processors." },
  { icon: "/icon/customer-focus.png", title: "Customer Focused",desc: "Fast support, easy returns, and honest advice — customers always come first." },
];

const floatingLaptops = [
  { src: "https://ik.imagekit.io/wn1nobtx5/laptop/asus_1.png",    pos: "top-[6%]     left-[3%]",    rotate: "-rotate-6",  size: "w-28" },
  { src: "https://ik.imagekit.io/wn1nobtx5/laptop/lenovo_1.png", pos: "top-[3%]     left-[30%]",   rotate: "rotate-3",   size: "w-24" },
  { src: "https://ik.imagekit.io/wn1nobtx5/laptop/dell_1.png",     pos: "top-[6%]     right-[3%]",   rotate: "-rotate-4",  size: "w-26" },
  { src: "https://ik.imagekit.io/wn1nobtx5/laptop/hp_1.png",         pos: "top-[40%]    left-[2%]",    rotate: "rotate-2",   size: "w-24" },
  { src: "https://ik.imagekit.io/wn1nobtx5/laptop/hp_2.png",         pos: "top-[40%]    right-[2%]",   rotate: "-rotate-2",  size: "w-24" },
  { src: "https://ik.imagekit.io/wn1nobtx5/laptop/msi_1.png",       pos: "bottom-[6%]  left-[3%]",    rotate: "rotate-5",   size: "w-24" },
  { src: "https://ik.imagekit.io/wn1nobtx5/laptop/asus_2.png",     pos: "bottom-[3%]  left-[30%]",   rotate: "-rotate-3",  size: "w-20" },
  { src: "https://ik.imagekit.io/wn1nobtx5/laptop/lenovo_2.png", pos: "bottom-[6%]  right-[3%]",   rotate: "rotate-4",   size: "w-24" },
];
const floatClasses = ["animate-float-1", "animate-float-2", "animate-float-3"];

export default function AboutPage() {
  const [slide, setSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => {
        setPrevSlide(prev);
        setAnimKey((k) => k + 1);
        return (prev + 1) % heroSlides.length;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function goToSlide(i) {
    setPrevSlide(slide);
    setAnimKey((k) => k + 1);
    setSlide(i);
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── HERO SLIDER ── */}
      <section className="relative h-72 overflow-hidden bg-gray-950">
        {prevSlide !== null && (
          <div key={`prev-${prevSlide}`} className="absolute inset-0 animate-hero-fade-out">
            <Image src={heroSlides[prevSlide].image} alt="" fill className="object-cover opacity-60" />
          </div>
        )}
        <div key={`curr-${slide}`} className="absolute inset-0 animate-hero-fade-in">
          <Image src={heroSlides[slide].image} alt={heroSlides[slide].title} fill priority className="object-cover opacity-60" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/40 to-transparent" />
        <div key={animKey} className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center animate-hero-text">
          <span className="inline-block rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">{heroSlides[slide].badge}</span>
          <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">{heroSlides[slide].title}</h1>
          <p className="mt-2 text-gray-300">{heroSlides[slide].subtitle}</p>
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === slide ? "w-8 bg-blue-400" : "w-2 bg-gray-500 hover:bg-gray-300"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── FLOATING LAPTOPS VISUAL ── */}
      <section
        className="relative overflow-hidden py-12 sm:py-20 md:py-40 px-4 sm:px-6"
        style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px", backgroundColor: "#f8fafc" }}
      >
        {/* Floating laptop glass cards — positioned around center, hidden on mobile */}
        {floatingLaptops.map((l, i) => (
          <div
            key={i}
            className={`absolute ${l.pos} ${l.size} ${l.rotate} ${floatClasses[i % 3]} hidden md:block`}
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <div className="rounded-2xl border border-white/60 bg-white/50 p-2 shadow-xl backdrop-blur-md">
              <Image src={l.src} alt="laptop" width={110} height={80} className="w-full h-auto object-contain" />
            </div>
          </div>
        ))}

        {/* Center text — absolutely centered */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-blue-500">Who We Are</p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Our Story
            </h2>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-blue-500" />
            <p className="mt-4 max-w-sm sm:max-w-md text-xs sm:text-sm text-gray-500 leading-relaxed">
              Founded in 2020, Computer Store started as a passion project by tech enthusiasts who wanted to make finding the right laptop simple and affordable. Today we serve thousands of customers — from students to pro gamers — with hand-picked products from the world's top brands.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── OUR VALUES — dotted background, no boxes ── */}
      <section className="relative overflow-hidden py-10 sm:py-12 md:py-20 px-4 sm:px-6"
        style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px", backgroundColor: "#f8fafc" }}
      >

        <div className="relative mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-600">What We Stand For</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">Our Values</h2>
            </div>
          </ScrollReveal>

          <div className="mt-8 sm:mt-12 grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i + 1}>
                <div className="flex flex-col items-center text-center">
                  {/* Icon — no box, just the image */}
                  <Image src={v.icon} alt={v.title} width={52} height={52} className="object-contain" />
                  <h3 className="mt-4 text-base sm:text-lg font-extrabold text-gray-900">{v.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-500 max-w-[240px] sm:max-w-[180px]">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
