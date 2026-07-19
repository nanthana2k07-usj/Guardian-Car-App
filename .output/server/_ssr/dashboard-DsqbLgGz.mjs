import { o as __toESM } from "../_runtime.mjs";
import { r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as useGuardian, t as guardianStore } from "./guardian-store-sckPVCRq.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Logo } from "./Logo-mtP24o_f.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as History, G as Car, R as CircleCheck, S as LogOut, T as LayoutDashboard, W as ChartColumn, a as TriangleAlert, b as MapPin, c as Settings, f as Power, i as User, n as X, p as Phone, q as BellRing, s as ShieldAlert, w as LoaderCircle, y as Menu } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DsqbLgGz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MotionAlertFlow() {
	const state = useGuardian();
	const [stage, setStage] = (0, import_react.useState)("idle");
	const [countdown, setCountdown] = (0, import_react.useState)(30);
	const prevMotion = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (state.motion && !prevMotion.current && stage === "idle") setStage("verify");
		prevMotion.current = state.motion;
	}, [state.motion, stage]);
	(0, import_react.useEffect)(() => {
		if (stage !== "emergency") return;
		setCountdown(30);
		const t = setInterval(() => setCountdown((c) => c <= 1 ? 0 : c - 1), 1e3);
		return () => clearInterval(t);
	}, [stage]);
	const authorize = () => {
		guardianStore.authorize();
		setStage("idle");
		toast.success("Authorized Access Verified", { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-success" }) });
	};
	const unauthorized = () => {
		guardianStore.markUnauthorized();
		setStage("emergency");
	};
	const immobilize = () => {
		setStage("immobilizing");
		setTimeout(() => {
			guardianStore.immobilize();
			setStage("done");
			toast.success("Vehicle Immobilized Successfully");
			setTimeout(() => setStage("idle"), 2200);
		}, 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, { children: [stage === "verify" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .85,
				y: 20
			},
			animate: {
				scale: 1,
				y: 0
			},
			exit: {
				scale: .85,
				opacity: 0
			},
			className: "glass glow w-full max-w-md rounded-3xl p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					animate: { scale: [
						1,
						1.08,
						1
					] },
					transition: {
						repeat: Infinity,
						duration: 1.6
					},
					className: "mx-auto mb-5 inline-flex rounded-2xl bg-warning/20 p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-9 w-9 text-warning" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-bold",
					children: "Security Verification"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Motion has been detected near your vehicle. Is the person accessing your vehicle authorized?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: authorize,
						className: "rounded-xl bg-success text-success-foreground hover:brightness-110",
						children: "🟢 Yes, It's Me"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: unauthorized,
						className: "rounded-xl bg-destructive text-destructive-foreground hover:brightness-110",
						children: "🔴 No, Unauthorized Access"
					})]
				})
			]
		})
	}, "verify"), (stage === "emergency" || stage === "immobilizing" || stage === "done") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-50 flex items-center justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "absolute inset-0 bg-background/90 backdrop-blur-md",
			animate: { backgroundColor: [
				"rgba(11,17,32,0.9)",
				"rgba(60,10,10,0.92)",
				"rgba(11,17,32,0.9)"
			] },
			transition: {
				repeat: Infinity,
				duration: 1.2
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { scale: .9 },
			animate: { scale: 1 },
			className: "relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-destructive bg-card/80 p-8 text-center",
			style: { boxShadow: "0 0 60px -5px rgba(239,68,68,0.6)" },
			children: stage === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { scale: 0 },
						animate: { scale: 1 },
						transition: { type: "spring" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-20 w-20 text-success" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-2xl font-bold",
						children: "Vehicle Immobilized Successfully"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Engine disabled · relay = 1 · Execution time 1.2s"
					})
				]
			}) : stage === "immobilizing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto h-16 w-16 animate-spin text-destructive" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-xl font-bold",
						children: "Sending immobilize command…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Writing relay = 1 to Firebase"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					animate: {
						scale: [
							1,
							1.15,
							1
						],
						rotate: [
							0,
							-5,
							5,
							0
						]
					},
					transition: {
						repeat: Infinity,
						duration: 1
					},
					className: "mx-auto mb-4 inline-flex rounded-2xl bg-destructive/25 p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-12 w-12 text-destructive" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
					animate: { opacity: [
						1,
						.5,
						1
					] },
					transition: {
						repeat: Infinity,
						duration: .9
					},
					className: "font-display text-3xl font-extrabold text-destructive",
					children: "🚨 VEHICLE THEFT ALERT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"Unauthorized access confirmed. Auto-escalating in",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold tabular-nums text-destructive",
							children: [countdown, "s"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: immobilize,
							className: "rounded-xl bg-destructive text-destructive-foreground hover:brightness-110",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Power, { className: "h-4 w-4" }), " Immobilize"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => toast("Police notified · 100"),
							variant: "outline",
							className: "rounded-xl border-destructive/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), " Contact Police"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => toast.success("Live location shared"),
							variant: "outline",
							className: "rounded-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), " Share Location"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setStage("idle"),
							variant: "ghost",
							className: "rounded-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), " Dismiss"]
						})
					]
				})
			] })
		})]
	}, "emergency")] });
}
var nav = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/dashboard/vehicles",
		label: "Vehicles",
		icon: Car
	},
	{
		to: "/dashboard/alerts",
		label: "Alerts",
		icon: BellRing
	},
	{
		to: "/dashboard/history",
		label: "History",
		icon: History
	},
	{
		to: "/dashboard/analytics",
		label: "Analytics",
		icon: ChartColumn
	},
	{
		to: "/dashboard/settings",
		label: "Settings",
		icon: Settings
	},
	{
		to: "/dashboard/profile",
		label: "Profile",
		icon: User
	}
];
function DashboardLayout() {
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const logout = () => {
		toast.success("Logged out");
		navigate({ to: "/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 34 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 lg:flex",
							children: nav.map((n) => {
								const active = "exact" in n ? pathname === n.to : pathname.startsWith(n.to);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: n.to,
									className: `flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${active ? "bg-gradient-primary text-primary-foreground shadow-[0_6px_20px_-8px_rgba(59,130,246,0.7)]" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "h-4 w-4" }), n.label]
								}, n.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: logout,
								variant: "ghost",
								size: "sm",
								className: "hidden rounded-full text-muted-foreground lg:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Logout"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded-lg p-2 text-foreground lg:hidden",
								onClick: () => setOpen((o) => !o),
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.nav, {
					initial: {
						height: 0,
						opacity: 0
					},
					animate: {
						height: "auto",
						opacity: 1
					},
					exit: {
						height: 0,
						opacity: 0
					},
					className: "overflow-hidden border-t border-border/60 lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1 px-4 py-3",
						children: [nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: n.to,
							onClick: () => setOpen(false),
							className: "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "h-4 w-4" }),
								" ",
								n.label
							]
						}, n.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: logout,
							className: "flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Logout"]
						})]
					})
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-7xl px-4 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-8 border-t border-border/60 py-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
						className: "justify-center",
						size: 30
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Smart Protection. Instant Response."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground/70",
						children: "© 2026 GuardianCar Technologies"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionAlertFlow, {})
		]
	});
}
//#endregion
export { DashboardLayout as component };
