import { n as useGuardian } from "./guardian-store-sckPVCRq.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as FileSpreadsheet, _ as OctagonAlert, d as Radar, f as Power, j as FileDown, m as PhoneCall, o as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.history-CTV7aSs7.js
var import_jsx_runtime = require_jsx_runtime();
var kindMeta = {
	motion: {
		icon: Radar,
		tone: "text-warning"
	},
	unauthorized: {
		icon: OctagonAlert,
		tone: "text-destructive"
	},
	immobilize: {
		icon: Power,
		tone: "text-destructive"
	},
	authorized: {
		icon: ShieldCheck,
		tone: "text-success"
	},
	contact: {
		icon: PhoneCall,
		tone: "text-accent"
	}
};
function HistoryPage() {
	const { history } = useGuardian();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "truncate font-display text-2xl font-bold sm:text-3xl",
				children: "Incident History"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => toast.success("PDF exported"),
					variant: "outline",
					size: "sm",
					className: "rounded-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "h-4 w-4" }), " PDF"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => toast.success("CSV exported"),
					variant: "outline",
					size: "sm",
					className: "rounded-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-4 w-4" }), " CSV"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass rounded-3xl p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative space-y-6 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border",
				children: history.map((h, i) => {
					const m = kindMeta[h.kind];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							x: -20
						},
						animate: {
							opacity: 1,
							x: 0
						},
						transition: { delay: i * .06 },
						className: "relative flex gap-4 pl-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary ring-4 ring-background ${m.tone}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 pb-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: h.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: h.detail
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-xs text-muted-foreground/70",
									children: h.time
								})
							]
						})]
					}, h.id);
				})
			})
		})]
	});
}
//#endregion
export { HistoryPage as component };
