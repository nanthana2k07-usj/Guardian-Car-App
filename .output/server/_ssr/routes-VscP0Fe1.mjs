import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Logo } from "./Logo-mtP24o_f.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AnimatedBackground } from "./AnimatedBackground-Beh2Ht14.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-VscP0Fe1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Splash() {
	const navigate = useNavigate();
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const interval = setInterval(() => {
			setProgress((p) => {
				if (p >= 100) {
					clearInterval(interval);
					setTimeout(() => navigate({ to: "/welcome" }), 400);
					return 100;
				}
				return Math.min(100, p + Math.random() * 12 + 4);
			});
		}, 160);
		return () => clearInterval(interval);
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedBackground, { particleCount: 34 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .85,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				transition: {
					duration: .7,
					ease: "easeOut"
				},
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "absolute inset-0 rounded-full bg-primary/30 blur-3xl",
					animate: {
						scale: [
							1,
							1.2,
							1
						],
						opacity: [
							.4,
							.8,
							.4
						]
					},
					transition: {
						duration: 2.4,
						repeat: Infinity
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
					size: 132,
					showText: false,
					animated: true,
					className: "relative"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
				initial: {
					y: 20,
					opacity: 0
				},
				animate: {
					y: 0,
					opacity: 1
				},
				transition: { delay: .5 },
				className: "mt-8 font-display text-4xl font-extrabold tracking-tight sm:text-5xl",
				children: ["Guardian", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gradient",
					children: "Car"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: { delay: .8 },
				className: "mt-3 text-sm font-medium tracking-wide text-muted-foreground sm:text-base",
				children: "Smart Protection. Instant Response."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 w-full max-w-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 w-full overflow-hidden rounded-full bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "h-full rounded-full bg-gradient-primary",
						style: { width: `${progress}%` },
						transition: { ease: "easeOut" }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Initializing secure link…" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums text-accent",
						children: [Math.round(progress), "%"]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Splash as component };
