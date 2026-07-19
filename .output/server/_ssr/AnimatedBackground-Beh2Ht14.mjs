import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AnimatedBackground-Beh2Ht14.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnimatedBackground({ particleCount = 26, className = "" }) {
	const [particles, setParticles] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setParticles(Array.from({ length: particleCount }).map((_, i) => ({
			id: i,
			left: Math.random() * 100,
			top: Math.random() * 100,
			size: 1 + Math.random() * 3,
			delay: Math.random() * 5,
			duration: 6 + Math.random() * 8
		})));
	}, [particleCount]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "absolute inset-0 h-full w-full opacity-[0.15]",
				preserveAspectRatio: "none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "circuitG",
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0",
						stopColor: "#3b82f6"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "#22d3ee"
					})]
				}) }), [
					15,
					35,
					55,
					75,
					90
				].map((y, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M-50 ${y * 8} H ${200 + i * 60} l 40 40 H 2000`,
					stroke: "url(#circuitG)",
					strokeWidth: "1.5",
					fill: "none",
					strokeDasharray: "8 14",
					style: { animation: `dash-flow ${18 + i * 4}s linear infinite` }
				}, i))]
			}),
			particles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "absolute rounded-full bg-accent/70",
				style: {
					left: `${p.left}%`,
					top: `${p.top}%`,
					width: p.size,
					height: p.size
				},
				animate: {
					y: [
						0,
						-30,
						0
					],
					x: [
						0,
						15,
						0
					],
					opacity: [
						.3,
						1,
						.3
					]
				},
				transition: {
					duration: p.duration,
					delay: p.delay,
					repeat: Infinity,
					ease: "easeInOut"
				}
			}, p.id))
		]
	});
}
//#endregion
export { AnimatedBackground as t };
