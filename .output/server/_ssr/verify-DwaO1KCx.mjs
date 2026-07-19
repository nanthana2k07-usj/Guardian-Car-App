import { o as __toESM } from "../_runtime.mjs";
import { r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { R as CircleCheck, u as RefreshCw, v as Minus, w as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as AuthShell } from "./AuthShell-BxZANMi7.mjs";
import { n as verifyOtp, t as sendOtp } from "./otp-client-DKQQPeUG.mjs";
import { n as jt, t as Lt } from "../_libs/input-otp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-DwaO1KCx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var InputOTP = import_react.forwardRef(({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lt, {
	ref,
	containerClassName: cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName),
	className: cn("disabled:cursor-not-allowed", className),
	...props
}));
InputOTP.displayName = "InputOTP";
var InputOTPGroup = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center", className),
	...props
}));
InputOTPGroup.displayName = "InputOTPGroup";
var InputOTPSlot = import_react.forwardRef(({ index, className, ...props }, ref) => {
	const { char, hasFakeCaret, isActive } = import_react.useContext(jt).slots[index];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: cn("relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md", isActive && "z-10 ring-1 ring-ring", className),
		...props,
		children: [char, hasFakeCaret && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" })
		})]
	});
});
InputOTPSlot.displayName = "InputOTPSlot";
var InputOTPSeparator = import_react.forwardRef(({ ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	role: "separator",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
}));
InputOTPSeparator.displayName = "InputOTPSeparator";
function Verify() {
	const navigate = useNavigate();
	const [otp, setOtp] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [verified, setVerified] = (0, import_react.useState)(false);
	const { email, next } = (0, import_react.useMemo)(() => {
		if (typeof window === "undefined") return {
			email: "",
			next: "/vehicle"
		};
		const url = new URL(window.location.href);
		return {
			email: url.searchParams.get("email") ?? "",
			next: url.searchParams.get("next") ?? "/vehicle"
		};
	}, []);
	const send = async () => {
		if (!email) {
			toast.error("Missing email. Please sign up again.");
			return;
		}
		setLoading(true);
		try {
			await sendOtp(email);
			toast.success("OTP sent to your email");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to send OTP");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (email) send();
	}, [email]);
	const verify = async () => {
		if (otp.length < 6) {
			toast.error("Enter the 6-digit code");
			return;
		}
		if (!email) {
			toast.error("Missing email. Please sign up again.");
			return;
		}
		setLoading(true);
		try {
			await verifyOtp(email, otp);
			setVerified(true);
			toast.success("Email verified successfully");
			setTimeout(() => navigate({ to: next }), 1400);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "OTP verification failed");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthShell, {
		title: "Verify your email",
		subtitle: "We sent a 6-digit code to your inbox",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			mode: "wait",
			children: verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .7,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				className: "flex flex-col items-center py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { scale: 0 },
						animate: { scale: 1 },
						transition: {
							type: "spring",
							stiffness: 200
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-20 w-20 text-success" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-lg font-semibold",
						children: "Verified!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Redirecting…"
					})
				]
			}, "ok") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				exit: { opacity: 0 },
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTP, {
							maxLength: 6,
							value: otp,
							onChange: setOtp,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPGroup, { children: [
								0,
								1,
								2,
								3,
								4,
								5
							].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, {
								index: i,
								className: "h-12 w-12 rounded-xl border-border text-lg"
							}, i)) })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: verify,
						disabled: loading,
						className: "w-full rounded-xl bg-gradient-primary text-primary-foreground hover:scale-[1.02] transition-transform",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Verify"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: send,
						disabled: loading,
						className: "w-full text-center text-sm text-muted-foreground hover:text-accent disabled:opacity-60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center justify-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }),
								"Didn't receive a code? ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-accent",
									children: "Resend OTP"
								})
							]
						})
					})
				]
			}, "form")
		})
	});
}
//#endregion
export { Verify as component };
