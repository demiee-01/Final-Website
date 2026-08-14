(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/about/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AboutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollReveal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ScrollReveal.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const heroSlides = [
    {
        image: "https://ik.imagekit.io/wn1nobtx5/laptop/banner_3.png",
        badge: "About Us",
        title: "We Love Laptops",
        subtitle: "Your trusted destination for premium computing gear."
    },
    {
        image: "/https://ik.imagekit.io/wn1nobtx5/laptop/banner_6.png",
        badge: "Our Story",
        title: "Built With Passion",
        subtitle: "From gamers to professionals — we have something for everyone."
    },
    {
        image: "https://ik.imagekit.io/wn1nobtx5/laptop/banner_4.png",
        badge: "Since 2020",
        title: "Years of Excellence",
        subtitle: "Delivering the best laptops at the best prices."
    }
];
const values = [
    {
        icon: "/icon/target.png",
        title: "Our Mission",
        desc: "Making premium laptops accessible to everyone — students, creators, and gamers."
    },
    {
        icon: "/icon/quality.png",
        title: "Quality First",
        desc: "Strict quality checks on every product for performance and durability."
    },
    {
        icon: "/icon/innovation.png",
        title: "Innovation",
        desc: "Always updating our catalog with the latest RTX GPUs and next-gen processors."
    },
    {
        icon: "/icon/customer-focus.png",
        title: "Customer Focused",
        desc: "Fast support, easy returns, and honest advice — customers always come first."
    }
];
const floatingLaptops = [
    {
        src: "https://ik.imagekit.io/wn1nobtx5/laptop/asus_1.png",
        pos: "top-[6%]     left-[3%]",
        rotate: "-rotate-6",
        size: "w-28"
    },
    {
        src: "https://ik.imagekit.io/wn1nobtx5/laptop/lenovo_1.png",
        pos: "top-[3%]     left-[30%]",
        rotate: "rotate-3",
        size: "w-24"
    },
    {
        src: "https://ik.imagekit.io/wn1nobtx5/laptop/dell_1.png",
        pos: "top-[6%]     right-[3%]",
        rotate: "-rotate-4",
        size: "w-26"
    },
    {
        src: "https://ik.imagekit.io/wn1nobtx5/laptop/hp_1.png",
        pos: "top-[40%]    left-[2%]",
        rotate: "rotate-2",
        size: "w-24"
    },
    {
        src: "https://ik.imagekit.io/wn1nobtx5/laptop/hp_2.png",
        pos: "top-[40%]    right-[2%]",
        rotate: "-rotate-2",
        size: "w-24"
    },
    {
        src: "https://ik.imagekit.io/wn1nobtx5/laptop/msi_1.png",
        pos: "bottom-[6%]  left-[3%]",
        rotate: "rotate-5",
        size: "w-24"
    },
    {
        src: "https://ik.imagekit.io/wn1nobtx5/laptop/asus_2.png",
        pos: "bottom-[3%]  left-[30%]",
        rotate: "-rotate-3",
        size: "w-20"
    },
    {
        src: "https://ik.imagekit.io/wn1nobtx5/laptop/lenovo_2.png",
        pos: "bottom-[6%]  right-[3%]",
        rotate: "rotate-4",
        size: "w-24"
    }
];
const floatClasses = [
    "animate-float-1",
    "animate-float-2",
    "animate-float-3"
];
function AboutPage() {
    _s();
    const [slide, setSlide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [prevSlide, setPrevSlide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [animKey, setAnimKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AboutPage.useEffect": ()=>{
            const timer = setInterval({
                "AboutPage.useEffect.timer": ()=>{
                    setSlide({
                        "AboutPage.useEffect.timer": (prev)=>{
                            setPrevSlide(prev);
                            setAnimKey({
                                "AboutPage.useEffect.timer": (k)=>k + 1
                            }["AboutPage.useEffect.timer"]);
                            return (prev + 1) % heroSlides.length;
                        }
                    }["AboutPage.useEffect.timer"]);
                }
            }["AboutPage.useEffect.timer"], 5000);
            return ({
                "AboutPage.useEffect": ()=>clearInterval(timer)
            })["AboutPage.useEffect"];
        }
    }["AboutPage.useEffect"], []);
    function goToSlide(i) {
        setPrevSlide(slide);
        setAnimKey((k)=>k + 1);
        setSlide(i);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative h-72 overflow-hidden bg-gray-950",
                children: [
                    prevSlide !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 animate-hero-fade-out",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: heroSlides[prevSlide].image,
                            alt: "",
                            fill: true,
                            className: "object-cover opacity-60"
                        }, void 0, false, {
                            fileName: "[project]/src/app/about/page.js",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this)
                    }, `prev-${prevSlide}`, false, {
                        fileName: "[project]/src/app/about/page.js",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 animate-hero-fade-in",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: heroSlides[slide].image,
                            alt: heroSlides[slide].title,
                            fill: true,
                            priority: true,
                            className: "object-cover opacity-60"
                        }, void 0, false, {
                            fileName: "[project]/src/app/about/page.js",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    }, `curr-${slide}`, false, {
                        fileName: "[project]/src/app/about/page.js",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/40 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/app/about/page.js",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center animate-hero-text",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white",
                                children: heroSlides[slide].badge
                            }, void 0, false, {
                                fileName: "[project]/src/app/about/page.js",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mt-3 text-4xl font-extrabold text-white sm:text-5xl",
                                children: heroSlides[slide].title
                            }, void 0, false, {
                                fileName: "[project]/src/app/about/page.js",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-gray-300",
                                children: heroSlides[slide].subtitle
                            }, void 0, false, {
                                fileName: "[project]/src/app/about/page.js",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this)
                        ]
                    }, animKey, true, {
                        fileName: "[project]/src/app/about/page.js",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2",
                        children: heroSlides.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>goToSlide(i),
                                className: `h-2 rounded-full transition-all duration-300 ${i === slide ? "w-8 bg-blue-400" : "w-2 bg-gray-500 hover:bg-gray-300"}`,
                                "aria-label": `Slide ${i + 1}`
                            }, i, false, {
                                fileName: "[project]/src/app/about/page.js",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/about/page.js",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/about/page.js",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative overflow-hidden py-12 sm:py-20 md:py-40 px-4 sm:px-6",
                style: {
                    backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                    backgroundColor: "#f8fafc"
                },
                children: [
                    floatingLaptops.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `absolute ${l.pos} ${l.size} ${l.rotate} ${floatClasses[i % 3]} hidden md:block`,
                            style: {
                                animationDelay: `${i * 0.5}s`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/60 bg-white/50 p-2 shadow-xl backdrop-blur-md",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: l.src,
                                    alt: "laptop",
                                    width: 110,
                                    height: 80,
                                    className: "w-full h-auto object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/about/page.js",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/about/page.js",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this)
                        }, i, false, {
                            fileName: "[project]/src/app/about/page.js",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex flex-col items-center justify-center text-center px-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollReveal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-blue-500",
                                    children: "Who We Are"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/about/page.js",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight",
                                    children: "Our Story"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/about/page.js",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto mt-3 h-1 w-12 rounded-full bg-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/about/page.js",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 max-w-sm sm:max-w-md text-xs sm:text-sm text-gray-500 leading-relaxed",
                                    children: "Founded in 2020, Computer Store started as a passion project by tech enthusiasts who wanted to make finding the right laptop simple and affordable. Today we serve thousands of customers — from students to pro gamers — with hand-picked products from the world's top brands."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/about/page.js",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/about/page.js",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/about/page.js",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/about/page.js",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative overflow-hidden py-10 sm:py-12 md:py-20 px-4 sm:px-6",
                style: {
                    backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                    backgroundColor: "#f8fafc"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative mx-auto max-w-7xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollReveal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-600",
                                        children: "What We Stand For"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/about/page.js",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-2 text-2xl sm:text-3xl font-bold text-gray-900",
                                        children: "Our Values"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/about/page.js",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/about/page.js",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/about/page.js",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 sm:mt-12 grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                            children: values.map((v, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollReveal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    delay: i + 1,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: v.icon,
                                                alt: v.title,
                                                width: 52,
                                                height: 52,
                                                className: "object-contain"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/about/page.js",
                                                lineNumber: 134,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "mt-4 text-base sm:text-lg font-extrabold text-gray-900",
                                                children: v.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/about/page.js",
                                                lineNumber: 135,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-xs sm:text-sm leading-relaxed text-gray-500 max-w-[240px] sm:max-w-[180px]",
                                                children: v.desc
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/about/page.js",
                                                lineNumber: 136,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/about/page.js",
                                        lineNumber: 132,
                                        columnNumber: 17
                                    }, this)
                                }, v.title, false, {
                                    fileName: "[project]/src/app/about/page.js",
                                    lineNumber: 131,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/about/page.js",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/about/page.js",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/about/page.js",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/about/page.js",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(AboutPage, "85U/IdHd8oFEdm7ncBJHOcznNzc=");
_c = AboutPage;
var _c;
__turbopack_context__.k.register(_c, "AboutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ScrollReveal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useInView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useInView.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/* ============================================================
   ScrollReveal.js — Wrapper component
   Wraps any element and animates it when it scrolls into view.
   Props:
   - delay: 1–6 (stagger index for cards in a row)
   - className: extra classes for the wrapper div
   ============================================================ */ "use client";
;
function ScrollReveal({ children, delay = 0, className = "" }) {
    _s();
    const [ref, inView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useInView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const delayClass = delay ? `scroll-delay-${delay}` : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `${inView ? `scroll-visible ${delayClass}` : "scroll-hidden"} ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ScrollReveal.js",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(ScrollReveal, "GpcLnEGLCRT/LcXgsVwPMCbjDPg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useInView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = ScrollReveal;
var _c;
__turbopack_context__.k.register(_c, "ScrollReveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useInView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useInView
]);
/* ============================================================
   useInView.js — Custom hook
   Returns a ref and a boolean `inView`.
   When the element enters the viewport, inView becomes true.
   Used to trigger scroll animations.
   ============================================================ */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useInView(options = {}) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [inView, setInView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInView.useEffect": ()=>{
            const observer = new IntersectionObserver({
                "useInView.useEffect": ([entry])=>{
                    if (entry.isIntersecting) {
                        setInView(true);
                        observer.disconnect(); /* Animate only once */ 
                    }
                }
            }["useInView.useEffect"], {
                threshold: 0.12,
                ...options
            });
            if (ref.current) observer.observe(ref.current);
            return ({
                "useInView.useEffect": ()=>observer.disconnect()
            })["useInView.useEffect"];
        }
    }["useInView.useEffect"], []);
    return [
        ref,
        inView
    ];
}
_s(useInView, "K+dCFMkCcTyPMHOI0MxAWPXS6Js=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0cs4u82._.js.map