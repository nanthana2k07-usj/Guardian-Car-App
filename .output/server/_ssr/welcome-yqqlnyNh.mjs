import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Logo } from "./Logo-mtP24o_f.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Cloud, X as Activity, Y as ArrowRight, f as Power, m as PhoneCall, o as ShieldCheck, q as BellRing } from "../_libs/lucide-react.mjs";
import { t as AnimatedBackground } from "./AnimatedBackground-Beh2Ht14.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/welcome-yqqlnyNh.js
var import_jsx_runtime = require_jsx_runtime();
var features = [
	{
		icon: Activity,
		title: "Real-Time Monitoring",
		desc: "24/7 live sensor tracking of your vehicle's security state."
	},
	{
		icon: BellRing,
		title: "Instant Alerts",
		desc: "Get notified the moment motion or intrusion is detected."
	},
	{
		icon: Power,
		title: "Remote Immobilization",
		desc: "Disable the engine remotely with a single secure command."
	},
	{
		icon: Cloud,
		title: "Cloud Connectivity",
		desc: "Firebase-backed realtime sync across all your devices."
	},
	{
		icon: ShieldCheck,
		title: "Secure Authentication",
		desc: "Multi-step verification keeps your account locked down."
	},
	{
		icon: PhoneCall,
		title: "Emergency Support",
		desc: "One tap to alert contacts and share live location."
	}
];
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 30
	},
	show: (i) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * .08,
			duration: .5
		}
	})
};
function Welcome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedBackground, { particleCount: 30 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: "Login"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "rounded-full bg-gradient-primary text-primary-foreground hover:scale-105 transition-transform",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/signup",
							children: "Get Started"
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-10 lg:grid-cols-2 lg:pt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .5 },
						className: "mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs font-medium text-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-pulse rounded-full bg-success" }), "AI & IoT Security · Live"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
						initial: {
							opacity: 0,
							y: 24
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .6,
							delay: .1
						},
						className: "font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl",
						children: ["Protect Your Vehicle ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient",
							children: "Anytime, Anywhere"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 24
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .6,
							delay: .2
						},
						className: "mt-5 max-w-lg text-lg text-muted-foreground",
						children: "AI-powered vehicle theft detection with instant alerts and remote immobilization."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 24
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .6,
							delay: .3
						},
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "rounded-full bg-gradient-primary text-primary-foreground shadow-[0_10px_40px_-10px_rgba(59,130,246,0.7)] hover:scale-105 transition-transform",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/signup",
								children: ["Create Account ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							className: "rounded-full border-border bg-card/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Login"
							})
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .9
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: {
						duration: .8,
						delay: .2
					},
					className: "relative mx-auto flex items-center justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "absolute h-72 w-72 rounded-full bg-primary/25 blur-3xl",
						animate: {
							scale: [
								1,
								1.15,
								1
							],
							opacity: [
								.5,
								.9,
								.5
							]
						},
						transition: {
							duration: 3,
							repeat: Infinity
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { y: [
							0,
							-14,
							0
						] },
						transition: {
							duration: 4,
							repeat: Infinity,
							ease: "easeInOut"
						},
						className: "relative glass glow rounded-[2.5rem] p-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
							size: 200,
							showText: false,
							animated: true
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-6 pb-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						className: "mb-3 text-center font-display text-3xl font-bold",
						children: ["Everything you need to stay ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient",
							children: "protected"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mb-12 max-w-xl text-center text-muted-foreground",
						children: "Enterprise-grade security features powered by AI and connected IoT hardware."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							custom: i,
							variants: fadeUp,
							initial: "hidden",
							whileInView: "show",
							viewport: { once: true },
							whileHover: { y: -6 },
							className: "glass group rounded-2xl p-6 transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(59,130,246,0.5)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-4 inline-flex rounded-xl bg-gradient-primary p-3 shadow-[0_8px_24px_-8px_rgba(59,130,246,0.6)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-6 w-6 text-primary-foreground" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-1.5 font-display text-lg font-semibold",
									children: f.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: f.desc
								})
							]
						}, f.title))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-border/60 py-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "justify-center" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "Smart Protection. Instant Response."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground/70",
						children: "© 2026 GuardianCar Technologies"
					})
				]
			})
		]
	});
}
//#endregion
export { Welcome as component };
