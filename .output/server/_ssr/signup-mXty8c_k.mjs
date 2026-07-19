import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Lock, L as CircleX, M as Eye, N as EyeOff, R as CircleCheck, i as User, p as Phone, w as LoaderCircle, x as Mail } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as AuthShell } from "./AuthShell-BxZANMi7.mjs";
import { t as sendOtp } from "./otp-client-DKQQPeUG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-mXty8c_k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
function getPasswordStrength(password) {
	if (!password) return 0;
	let score = 0;
	if (password.length >= 8) score++;
	if (password.length >= 12) score++;
	if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
	if (/\d/.test(password)) score++;
	if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
	return Math.min(4, score);
}
var STRENGTH_LABELS = [
	"",
	"Weak",
	"Fair",
	"Good",
	"Strong"
];
var STRENGTH_COLORS = [
	"",
	"#ef4444",
	"#f97316",
	"#eab308",
	"#22c55e"
];
function SignUp() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showPass, setShowPass] = (0, import_react.useState)(false);
	const [showConfirm, setShowConfirm] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [emailTouched, setEmailTouched] = (0, import_react.useState)(false);
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const emailError = emailTouched && email && !isValidEmail(email);
	const strength = getPasswordStrength(password);
	const passwordsMatch = confirm.length > 0 && password === confirm;
	const passwordsMismatch = confirm.length > 0 && password !== confirm;
	const onSubmit = async (e) => {
		e.preventDefault();
		if (!isValidEmail(email)) {
			toast.error("Please enter a valid email address");
			setEmailTouched(true);
			return;
		}
		if (strength < 2) {
			toast.error("Please choose a stronger password");
			return;
		}
		if (password !== confirm) {
			toast.error("Passwords do not match");
			return;
		}
		setLoading(true);
		try {
			setTimeout(async () => {
				try {
					await sendOtp(email);
					toast.success("Account created! OTP sent to your email.");
					navigate({
						to: "/verify",
						search: { email }
					});
				} catch (err) {
					toast.error(err instanceof Error ? err.message : "Failed to send OTP");
				} finally {
					setLoading(false);
				}
			}, 800);
		} catch (err) {
			setLoading(false);
			toast.error(err instanceof Error ? err.message : "Signup failed");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthShell, {
		title: "Create your account",
		subtitle: "Start protecting your vehicle in minutes",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Already have an account?",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "font-medium text-accent hover:underline",
				children: "Login"
			})
		] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "name",
						children: "Full Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							name: "name",
							type: "text",
							required: true,
							placeholder: "John Carter",
							className: "rounded-xl bg-input/40 pl-10"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email Address"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									name: "email",
									type: "email",
									required: true,
									placeholder: "you@example.com",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									onBlur: () => setEmailTouched(true),
									className: `rounded-xl bg-input/40 pl-10 pr-10 transition-colors ${emailError ? "border-red-500 focus-visible:ring-red-500" : ""}`
								}),
								emailTouched && email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute right-3 top-1/2 -translate-y-1/2",
									children: isValidEmail(email) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4 text-red-500" })
								})
							]
						}),
						emailError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-red-500",
							children: "Please enter a valid email address (e.g. you@example.com)"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "mobile",
						children: "Mobile Number"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "mobile",
							name: "mobile",
							type: "tel",
							required: true,
							placeholder: "+91 98765 43210",
							className: "rounded-xl bg-input/40 pl-10"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "password",
							children: "Password"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "password",
									name: "password",
									type: showPass ? "text" : "password",
									required: true,
									placeholder: "Min. 8 characters",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "rounded-xl bg-input/40 pl-10 pr-10"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowPass((v) => !v),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
									children: showPass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
								})
							]
						}),
						password.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1",
								children: [
									1,
									2,
									3,
									4
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 flex-1 rounded-full transition-all duration-300",
									style: { background: i <= strength ? STRENGTH_COLORS[strength] : "hsl(var(--border))" }
								}, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-medium",
								style: { color: STRENGTH_COLORS[strength] },
								children: [
									STRENGTH_LABELS[strength],
									" password",
									strength < 3 && " — add uppercase, numbers & symbols"
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "confirm",
							children: "Confirm Password"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "confirm",
									name: "confirm",
									type: showConfirm ? "text" : "password",
									required: true,
									placeholder: "Re-enter your password",
									value: confirm,
									onChange: (e) => setConfirm(e.target.value),
									className: `rounded-xl bg-input/40 pl-10 pr-10 transition-colors ${passwordsMismatch ? "border-red-500" : passwordsMatch ? "border-green-500" : ""}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowConfirm((v) => !v),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
									children: showConfirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
								})
							]
						}),
						passwordsMatch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-green-500 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Passwords match"]
						}),
						passwordsMismatch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-red-500 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3 w-3" }), " Passwords do not match"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: loading,
					className: "mt-2 w-full rounded-xl bg-gradient-primary text-primary-foreground hover:scale-[1.02] transition-transform",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Create Account & Send OTP"
				})
			]
		})
	});
}
//#endregion
export { SignUp as component };
