(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/brands/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BrandsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
/* ── HERO SLIDES ── */ const heroSlides = [
    {
        image: "https://ik.imagekit.io/wn1nobtx5/laptop/banner_2.png",
        badge: "Top Brands",
        title: "Our Brands",
        subtitle: "Top laptop manufacturers  trusted worldwide."
    },
    {
        image: "https://ik.imagekit.io/wn1nobtx5/laptop/banner_4.png",
        badge: "Premium Quality",
        title: "Built to Perform",
        subtitle: "From gaming beasts to office workhorses  we have it all."
    },
    {
        image: "https://ik.imagekit.io/wn1nobtx5/laptop/banner_3.png",
        badge: "All Categories",
        title: "Every Brand, One Place",
        subtitle: "ASUS, Lenovo, HP, Dell, MSI, Acer  explore them all."
    }
];
/* ── BRAND DATA ──
   wallpaper: background image shown in the card
   logo: small icon shown on top of the wallpaper */ const brands = [
    {
        name: "ASUS",
        logo: "https://ik.imagekit.io/wn1nobtx5/laptop/asus-logo.jpg",
        wallpaper: "https://ik.imagekit.io/wn1nobtx5/laptop/banner_card4.jpg",
        color: "from-blue-50 to-blue-100",
        text: "text-blue-700",
        desc: "Gaming & Professional Laptops"
    },
    {
        name: "Lenovo",
        logo: "https://ik.imagekit.io/wn1nobtx5/laptop/lenovo-logo.jpg",
        wallpaper: "https://ik.imagekit.io/wn1nobtx5/laptop/lenovo_banner.jpg",
        color: "from-red-50 to-red-100",
        text: "text-red-700",
        desc: "ThinkPad, Legion & IdeaPad Series"
    },
    {
        name: "HP",
        logo: "https://ik.imagekit.io/wn1nobtx5/laptop/hp-logo.jpg",
        wallpaper: "https://ik.imagekit.io/wn1nobtx5/laptop/hp_banner.jpg",
        color: "from-sky-50 to-sky-100",
        text: "text-sky-700",
        desc: "Pavilion, Victus & Spectre Series"
    },
    {
        name: "Dell",
        logo: "https://ik.imagekit.io/wn1nobtx5/laptop/dell-logo.jpg",
        wallpaper: "https://ik.imagekit.io/wn1nobtx5/laptop/dell_wallpaper.jpg",
        color: "from-cyan-50 to-cyan-100",
        text: "text-cyan-700",
        desc: "XPS, Inspiron & Gaming Series"
    },
    {
        name: "MSI",
        logo: "https://ik.imagekit.io/wn1nobtx5/laptop/msi_logo.jpg",
        wallpaper: "https://ik.imagekit.io/wn1nobtx5/laptop/msi_banner.jpg",
        color: "from-rose-50 to-rose-100",
        text: "text-rose-700",
        desc: "Gaming & Creator Laptops"
    },
    {
        name: "Acer",
        logo: "https://ik.imagekit.io/wn1nobtx5/laptop/acer-logo.jpg",
        wallpaper: "https://ik.imagekit.io/wn1nobtx5/laptop/acer_banner.jpg",
        color: "from-green-50 to-green-100",
        text: "text-green-700",
        desc: "Aspire, Nitro & Swift Series"
    }
];
function BrandsPage() {
    _s();
    const [slide, setSlide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [prevSlide, setPrevSlide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [animKey, setAnimKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BrandsPage.useEffect": ()=>{
            const timer = setInterval({
                "BrandsPage.useEffect.timer": ()=>{
                    setSlide({
                        "BrandsPage.useEffect.timer": (prev)=>{
                            setPrevSlide(prev);
                            setAnimKey({
                                "BrandsPage.useEffect.timer": (k)=>k + 1
                            }["BrandsPage.useEffect.timer"]);
                            return (prev + 1) % heroSlides.length;
                        }
                    }["BrandsPage.useEffect.timer"]);
                }
            }["BrandsPage.useEffect.timer"], 5000);
            return ({
                "BrandsPage.useEffect": ()=>clearInterval(timer)
            })["BrandsPage.useEffect"];
        }
    }["BrandsPage.useEffect"], []);
    function goToSlide(i) {
        setPrevSlide(slide);
        setAnimKey((k)=>k + 1);
        setSlide(i);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative h-64 overflow-hidden bg-gray-950",
                children: [
                    prevSlide !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 animate-hero-fade-out",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: heroSlides[prevSlide].image,
                            alt: "",
                            fill: true,
                            className: "object-cover opacity-60"
                        }, void 0, false, {
                            fileName: "[project]/src/app/brands/page.js",
                            lineNumber: 55,
                            columnNumber: 13
                        }, this)
                    }, `prev-${prevSlide}`, false, {
                        fileName: "[project]/src/app/brands/page.js",
                        lineNumber: 54,
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
                            fileName: "[project]/src/app/brands/page.js",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    }, `curr-${slide}`, false, {
                        fileName: "[project]/src/app/brands/page.js",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/40 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/app/brands/page.js",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center animate-hero-text",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white",
                                children: heroSlides[slide].badge
                            }, void 0, false, {
                                fileName: "[project]/src/app/brands/page.js",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mt-3 text-4xl font-extrabold text-white sm:text-5xl",
                                children: heroSlides[slide].title
                            }, void 0, false, {
                                fileName: "[project]/src/app/brands/page.js",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-gray-300",
                                children: heroSlides[slide].subtitle
                            }, void 0, false, {
                                fileName: "[project]/src/app/brands/page.js",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, animKey, true, {
                        fileName: "[project]/src/app/brands/page.js",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2",
                        children: heroSlides.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>goToSlide(i),
                                className: `h-2 rounded-full transition-all duration-300 ${i === slide ? "w-8 bg-blue-400" : "w-2 bg-gray-500 hover:bg-gray-300"}`,
                                "aria-label": `Slide ${i + 1}`
                            }, i, false, {
                                fileName: "[project]/src/app/brands/page.js",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/brands/page.js",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/brands/page.js",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "px-4 sm:px-6 py-14",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl sm:text-2xl font-bold text-gray-900",
                            children: "All Brands"
                        }, void 0, false, {
                            fileName: "[project]/src/app/brands/page.js",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm text-gray-500",
                            children: "Click a brand to browse its laptops."
                        }, void 0, false, {
                            fileName: "[project]/src/app/brands/page.js",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                            children: brands.map((brand)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/laptops?brand=${encodeURIComponent(brand.name)}`,
                                    className: "group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative h-36 w-full overflow-hidden bg-gray-200",
                                            children: [
                                                brand.wallpaper ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: brand.wallpaper,
                                                    alt: brand.name,
                                                    fill: true,
                                                    className: "object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/brands/page.js",
                                                    lineNumber: 98,
                                                    columnNumber: 21
                                                }, this) : /* Fallback gradient if no wallpaper */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `absolute inset-0 bg-gradient-to-br ${brand.color}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/brands/page.js",
                                                    lineNumber: 106,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 bg-black/20"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/brands/page.js",
                                                    lineNumber: 109,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-md overflow-hidden",
                                                        children: brand.logo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            src: brand.logo,
                                                            alt: brand.name,
                                                            width: 48,
                                                            height: 48,
                                                            className: "object-contain p-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/brands/page.js",
                                                            lineNumber: 115,
                                                            columnNumber: 25
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-xl font-extrabold ${brand.text}`,
                                                            children: brand.name[0]
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/brands/page.js",
                                                            lineNumber: 117,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/brands/page.js",
                                                        lineNumber: 113,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/brands/page.js",
                                                    lineNumber: 112,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/brands/page.js",
                                            lineNumber: 95,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-center px-4 py-3 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: `text-lg font-extrabold ${brand.text}`,
                                                    children: brand.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/brands/page.js",
                                                    lineNumber: 125,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-0.5 text-xs text-gray-500",
                                                    children: brand.desc
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/brands/page.js",
                                                    lineNumber: 126,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `mt-2 text-xs font-semibold ${brand.text} opacity-0 group-hover:opacity-100 transition-opacity`,
                                                    children: [
                                                        "Browse ",
                                                        brand.name,
                                                        " →"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/brands/page.js",
                                                    lineNumber: 127,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/brands/page.js",
                                            lineNumber: 124,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, brand.name, true, {
                                    fileName: "[project]/src/app/brands/page.js",
                                    lineNumber: 89,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/brands/page.js",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/brands/page.js",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/brands/page.js",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/brands/page.js",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(BrandsPage, "85U/IdHd8oFEdm7ncBJHOcznNzc=");
_c = BrandsPage;
var _c;
__turbopack_context__.k.register(_c, "BrandsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_brands_page_1y02w7g.js.map