import { n as useGuardian } from "./guardian-store-sckPVCRq.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { G as Car, P as Cpu, _ as OctagonAlert, d as Radar, f as Power, g as Palette, k as Gauge, o as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.vehicles-j-QrYRp2.js
var import_jsx_runtime = require_jsx_runtime();
var statusStates = [
	{
		key: "safe",
		label: "Safe",
		icon: ShieldCheck,
		text: "text-success",
		ring: "ring-success",
		glow: "var(--color-success)"
	},
	{
		key: "motion",
		label: "Motion Detected",
		icon: Radar,
		text: "text-warning",
		ring: "ring-warning",
		glow: "var(--color-warning)"
	},
	{
		key: "unauthorized",
		label: "Unauthorized Access",
		icon: OctagonAlert,
		text: "text-destructive",
		ring: "ring-destructive",
		glow: "var(--color-destructive)"
	},
	{
		key: "immobilized",
		label: "Vehicle Immobilized",
		icon: Power,
		text: "text-destructive",
		ring: "ring-destructive",
		glow: "var(--color-destructive)"
	}
];
function Vehicles() {
	const state = useGuardian();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-bold sm:text-3xl",
				children: "My Vehicles"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "glass rounded-3xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl bg-gradient-primary p-4 shadow-[0_8px_24px_-8px_rgba(59,130,246,0.6)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, { className: "h-8 w-8 text-primary-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "truncate font-display text-lg font-bold",
							children: state.vehicleName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Tesla · Sedan · Midnight Silver"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
							icon: Cpu,
							label: "Device ID",
							value: "GC-ESP32-00A1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
							icon: Gauge,
							label: "Vehicle No.",
							value: "MH12 AB 1234"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
							icon: Palette,
							label: "Color",
							value: "Silver"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
							icon: Car,
							label: "Type",
							value: "Sedan"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-display text-lg font-semibold",
				children: "Vehicle Status States"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: statusStates.map((s, i) => {
					const active = state.vehicleStatus === s.key;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: i * .06 },
						className: `glass rounded-2xl p-5 ${active ? `ring-2 ${s.ring}` : ""}`,
						style: active ? { boxShadow: `0 0 30px -8px ${s.glow}` } : void 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: `h-7 w-7 ${s.text}` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display font-semibold",
								children: s.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: active ? "Current state" : "Standby"
							})
						]
					}, s.key);
				})
			})] })
		]
	});
}
function Spec({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-secondary/40 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-accent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm font-medium",
				children: value
			})
		]
	});
}
//#endregion
export { Vehicles as component };
