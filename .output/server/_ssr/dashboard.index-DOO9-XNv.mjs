import { o as __toESM } from "../_runtime.mjs";
import { t as animate } from "../_libs/framer-motion.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as useGuardian, t as guardianStore } from "./guardian-store-sckPVCRq.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as Cloud, I as Clock, J as BatteryCharging, O as HeartPulse, P as Cpu, X as Activity, _ as OctagonAlert, b as MapPin, d as Radar, f as Power, o as ShieldCheck, r as Wifi, t as Zap } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.index-DOO9-XNv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
function AnimatedCounter({ value, suffix = "", decimals = 0 }) {
	const [display, setDisplay] = (0, import_react.useState)(0);
	const started = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (started.current) return;
		started.current = true;
		const controls = animate(0, value, {
			duration: 1.2,
			ease: "easeOut",
			onUpdate: (v) => setDisplay(v)
		});
		return () => controls.stop();
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "tabular-nums",
		children: [display.toFixed(decimals), suffix]
	});
}
var statusMeta = {
	safe: {
		label: "Safe",
		color: "text-success",
		icon: ShieldCheck
	},
	authorized: {
		label: "Authorized",
		color: "text-success",
		icon: ShieldCheck
	},
	motion: {
		label: "Motion Detected",
		color: "text-warning",
		icon: Radar
	},
	unauthorized: {
		label: "Unauthorized Access",
		color: "text-destructive",
		icon: OctagonAlert
	},
	immobilized: {
		label: "Vehicle Immobilized",
		color: "text-destructive",
		icon: Power
	}
};
function Overview() {
	const state = useGuardian();
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setLoading(false), 900);
		return () => clearTimeout(t);
	}, []);
	const sm = statusMeta[state.vehicleStatus];
	const cards = [
		{
			title: "Vehicle Status",
			value: sm.label,
			icon: sm.icon,
			tone: sm.color
		},
		{
			title: "Motion Detection",
			value: state.motion ? "Active" : "Clear",
			icon: Radar,
			tone: state.motion ? "text-warning" : "text-success"
		},
		{
			title: "Security Health",
			value: "98%",
			icon: HeartPulse,
			tone: "text-success"
		},
		{
			title: "Device Status",
			value: state.device === "online" ? "Online" : "Offline",
			icon: Cpu,
			tone: state.device === "online" ? "text-success" : "text-destructive"
		},
		{
			title: "Battery Status",
			value: `${state.battery}%`,
			icon: BatteryCharging,
			tone: "text-accent"
		},
		{
			title: "Internet Status",
			value: state.internet === "connected" ? "Connected" : "Offline",
			icon: Wifi,
			tone: "text-success"
		},
		{
			title: "Firebase Status",
			value: state.firebase === "synced" ? "Synced" : "Syncing",
			icon: Cloud,
			tone: "text-accent"
		},
		{
			title: "Last Updated",
			value: state.lastUpdated,
			icon: Clock,
			tone: "text-muted-foreground"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "truncate font-display text-2xl font-bold sm:text-3xl",
						children: "Command Center"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: state.vehicleName
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => {
						if (!guardianStore.triggerMotion()) toast.error("Guardian Mode is off — activate it to run detection.");
					},
					disabled: !state.guardianActive,
					className: "shrink-0 rounded-full bg-gradient-primary text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4" }), " Simulate Motion"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: `glass rounded-3xl p-6 ${state.guardianActive ? "ring-1 ring-success/40" : ""}`,
				style: state.guardianActive ? { boxShadow: "0 0 40px -14px var(--color-success)" } : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: state.guardianActive ? { scale: [
								1,
								1.08,
								1
							] } : {},
							transition: {
								repeat: Infinity,
								duration: 1.8
							},
							className: `rounded-2xl p-4 ${state.guardianActive ? "bg-success/20" : "bg-secondary/60"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: `h-8 w-8 ${state.guardianActive ? "text-success" : "text-muted-foreground"}` })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Guardian Mode"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: state.guardianActive ? "Armed — real-time theft detection is active." : "Standby — the system is off. Detection will not run."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `flex items-center gap-1.5 text-xs font-medium ${state.guardianActive ? "text-success" : "text-muted-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${state.guardianActive ? "animate-pulse bg-success" : "bg-muted-foreground"}` }), state.guardianActive ? "ONLINE" : "OFFLINE"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								if (state.guardianActive) {
									guardianStore.stopGuardian();
									toast("Guardian Mode stopped");
								} else {
									guardianStore.startGuardian();
									toast.success("Guardian Mode started — system is armed");
								}
							},
							className: `rounded-full ${state.guardianActive ? "bg-destructive text-destructive-foreground" : "bg-gradient-primary text-primary-foreground"} hover:brightness-110`,
							children: state.guardianActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Power, { className: "h-4 w-4" }), " Stop System"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Power, { className: "h-4 w-4" }), " Start System"] })
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: loading ? Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-2xl" }, i)) : cards.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: i * .05 },
					whileHover: { y: -5 },
					className: "glass rounded-2xl p-5 transition-shadow hover:shadow-[0_18px_44px_-20px_rgba(59,130,246,0.5)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: c.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: `h-5 w-5 ${c.tone}` })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `mt-3 font-display text-xl font-bold ${c.tone}`,
						children: c.value
					})]
				}, c.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "glass rounded-3xl p-6 lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-accent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg font-semibold",
									children: "Live Monitoring"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-auto flex items-center gap-1.5 text-xs text-success",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-pulse rounded-full bg-success" }), " Realtime"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
									label: "Vehicle",
									value: sm.label,
									tone: sm.color
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
									label: "Motion",
									value: state.motion ? "Detected" : "Clear",
									tone: state.motion ? "text-warning" : "text-success"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
									label: "Device",
									value: state.device,
									tone: "text-success"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
									label: "Firebase",
									value: state.firebase,
									tone: "text-accent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
									label: "Relay",
									value: state.relay === 1 ? "ON (1)" : "OFF (0)",
									tone: state.relay === 1 ? "text-destructive" : "text-muted-foreground"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
									label: "Connection",
									value: state.connection,
									tone: "text-success"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent),radial-gradient(circle_at_70%_70%,rgba(34,211,238,0.12),transparent)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mx-auto h-8 w-8 text-accent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm font-medium",
										children: "Last Known Location"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Google Maps · 19.0760° N, 72.8777° E"
									})
								]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "glass rounded-3xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 font-display text-lg font-semibold",
						children: "Recent Activity"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: state.history.slice(0, 5).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 rounded-xl bg-secondary/40 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: h.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: h.time
								})]
							})]
						}, h.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					{
						label: "Threats Blocked",
						value: 142,
						suffix: ""
					},
					{
						label: "Uptime",
						value: 99.9,
						suffix: "%",
						decimals: 1
					},
					{
						label: "Response Time",
						value: 1.2,
						suffix: "s",
						decimals: 1
					}
				].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .95
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: { delay: i * .1 },
					className: "glass rounded-2xl p-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl font-extrabold text-gradient",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, {
							value: s.value,
							suffix: s.suffix,
							decimals: s.decimals ?? 0
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: s.label
					})]
				}, s.label))
			})
		]
	});
}
function MiniStat({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-secondary/40 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 text-sm font-semibold capitalize ${tone}`,
			children: value
		})]
	});
}
//#endregion
export { Overview as component };
