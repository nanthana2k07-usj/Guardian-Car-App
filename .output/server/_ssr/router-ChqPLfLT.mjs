import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { createHmac } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/router-ChqPLfLT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CJYObWez.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-gradient",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-medium text-primary-foreground",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$18 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#0B1120"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "GuardianCar"
			},
			{ title: "GuardianCar — AI Vehicle Theft Detection & Remote Immobilization" },
			{
				name: "description",
				content: "GuardianCar: AI & IoT-powered vehicle theft detection with real-time monitoring, instant alerts, and remote immobilization. Smart Protection. Instant Response."
			},
			{
				name: "author",
				content: "GuardianCar Technologies"
			},
			{
				property: "og:title",
				content: "GuardianCar — AI Vehicle Theft Detection & Remote Immobilization"
			},
			{
				property: "og:description",
				content: "GuardianCar: AI & IoT-powered vehicle theft detection with real-time monitoring, instant alerts, and remote immobilization. Smart Protection. Instant Response."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "GuardianCar — AI Vehicle Theft Detection & Remote Immobilization"
			},
			{
				name: "twitter:description",
				content: "GuardianCar: AI & IoT-powered vehicle theft detection with real-time monitoring, instant alerts, and remote immobilization. Smart Protection. Instant Response."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/34a84a6a-a5be-41a8-aef0-553cfd6a15c9/id-preview-141dafd6--3ebc5741-5dcd-44a9-b2d1-b41bb6fcda3e.lovable.app-1783934987901.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/34a84a6a-a5be-41a8-aef0-553cfd6a15c9/id-preview-141dafd6--3ebc5741-5dcd-44a9-b2d1-b41bb6fcda3e.lovable.app-1783934987901.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
var queryClient = new QueryClient();
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			theme: "dark",
			position: "top-right",
			toastOptions: { style: {
				background: "oklch(0.21 0.035 262)",
				border: "1px solid oklch(0.7 0.08 250 / 18%)",
				color: "oklch(0.97 0.01 250)"
			} }
		})]
	});
}
var $$splitComponentImporter$14 = () => import("./welcome-yqqlnyNh.mjs");
var Route$17 = createFileRoute("/welcome")({
	head: () => ({ meta: [{ title: "GuardianCar — Protect Your Vehicle Anytime, Anywhere" }, {
		name: "description",
		content: "AI-powered vehicle theft detection with instant alerts and remote immobilization. Real-time monitoring, cloud connectivity, and emergency response."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./verify-DwaO1KCx.mjs");
var Route$16 = createFileRoute("/verify")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./vehicle-C5H0b_Yn.mjs");
var Route$15 = createFileRoute("/vehicle")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var BASE_URL = "";
var Route$14 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/welcome",
				changefreq: "weekly",
				priority: "0.9"
			},
			{
				path: "/login",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/signup",
				changefreq: "monthly",
				priority: "0.6"
			}
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$11 = () => import("./signup-mXty8c_k.mjs");
var Route$13 = createFileRoute("/signup")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./login-DFbhKQzT.mjs");
var Route$12 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./emergency-contact-CjvzyCKF.mjs");
var Route$11 = createFileRoute("/emergency-contact")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./dashboard-DsqbLgGz.mjs");
var Route$10 = createFileRoute("/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./routes-VscP0Fe1.mjs");
var Route$9 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./dashboard.index-DOO9-XNv.mjs");
var Route$8 = createFileRoute("/dashboard/")({
	head: () => ({ meta: [{ title: "Dashboard — GuardianCar" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./dashboard.vehicles-j-QrYRp2.mjs");
var Route$7 = createFileRoute("/dashboard/vehicles")({
	head: () => ({ meta: [{ title: "Vehicles — GuardianCar" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./dashboard.settings-C-CUp3HR.mjs");
var Route$6 = createFileRoute("/dashboard/settings")({
	head: () => ({ meta: [{ title: "Settings — GuardianCar" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./dashboard.profile-DF1-Uiwk.mjs");
var Route$5 = createFileRoute("/dashboard/profile")({
	head: () => ({ meta: [{ title: "Profile — GuardianCar" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./dashboard.history-CTV7aSs7.mjs");
var Route$4 = createFileRoute("/dashboard/history")({
	head: () => ({ meta: [{ title: "Incident History — GuardianCar" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./dashboard.analytics-K2fcufWK.mjs");
var Route$3 = createFileRoute("/dashboard/analytics")({
	head: () => ({ meta: [{ title: "Analytics — GuardianCar" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./dashboard.alerts-DBvj4Sbw.mjs");
var Route$2 = createFileRoute("/dashboard/alerts")({
	head: () => ({ meta: [{ title: "Alerts — GuardianCar" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var store = /* @__PURE__ */ new Map();
function normalizeEmail(email) {
	return email.trim().toLowerCase();
}
function upsertOtp(params) {
	const now = params.now ?? Date.now();
	const record = {
		email: normalizeEmail(params.email),
		codeHash: params.codeHash,
		expiresAt: now + params.ttlMs,
		attemptsLeft: params.maxAttempts,
		lastSentAt: now
	};
	store.set(normalizeEmail(params.email), record);
	return record;
}
function getOtp(email) {
	return store.get(normalizeEmail(email));
}
function consumeAttempt(email) {
	const key = normalizeEmail(email);
	const rec = store.get(key);
	if (!rec) return void 0;
	const next = {
		...rec,
		attemptsLeft: Math.max(0, rec.attemptsLeft - 1)
	};
	store.set(key, next);
	return next;
}
function clearOtp(email) {
	store.delete(normalizeEmail(email));
}
function purgeExpired(now = Date.now()) {
	for (const [key, rec] of store.entries()) if (rec.expiresAt <= now) store.delete(key);
}
var sendSchema = objectType({ email: stringType().email() });
var verifySchema = objectType({
	email: stringType().email(),
	code: stringType().regex(/^\d{6}$/)
});
function env(name) {
	return globalThis?.process?.env?.[name] ?? globalThis?.ENV?.[name];
}
function otpTtlMs() {
	const v = env("OTP_TTL_MS");
	const n = v ? Number(v) : NaN;
	return Number.isFinite(n) ? n : 300 * 1e3;
}
function maxAttempts() {
	const v = env("OTP_MAX_ATTEMPTS");
	const n = v ? Number(v) : NaN;
	return Number.isFinite(n) ? n : 5;
}
function otpCooldownMs() {
	const v = env("OTP_RESEND_COOLDOWN_MS");
	const n = v ? Number(v) : NaN;
	return Number.isFinite(n) ? n : 3e4;
}
function generateCode() {
	return String(Math.floor(1e5 + Math.random() * 9e5));
}
function codeHash(code) {
	return createHmac("sha256", env("OTP_HASH_SECRET") || "dev-otp-secret").update(code).digest("hex");
}
function buildEmailHtml(code) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GuardianCar Verification Code</title>
</head>
<body style="margin:0;padding:0;background-color:#0B1120;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0B1120;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td align="center" style="background:linear-gradient(135deg,#6C63FF 0%,#3ECFCF 100%);border-radius:16px 16px 0 0;padding:36px 40px 28px;">
            <div style="display:inline-block;background:rgba(255,255,255,0.12);border-radius:50%;padding:14px;margin-bottom:14px;">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">GuardianCar</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">AI Vehicle Theft Detection &amp; Protection</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#131C30;padding:40px;border-radius:0 0 0 0;">
            <h2 style="margin:0 0 8px;color:#F1F5F9;font-size:20px;font-weight:600;">Verify Your Email Address</h2>
            <p style="margin:0 0 28px;color:#94A3B8;font-size:15px;line-height:1.6;">
              You requested to verify your email for your GuardianCar account. Use the secure code below to complete verification.
            </p>

            <!-- OTP Box -->
            <div style="background:#0B1120;border:2px solid #6C63FF;border-radius:12px;padding:28px;text-align:center;margin-bottom:28px;">
              <p style="margin:0 0 8px;color:#94A3B8;font-size:13px;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Your Verification Code</p>
              <div style="font-size:42px;font-weight:800;letter-spacing:12px;color:#6C63FF;font-family:'Courier New',monospace;margin:4px 0;">${code}</div>
              <p style="margin:10px 0 0;color:#64748B;font-size:13px;">This code expires in <strong style="color:#F97316;">5 minutes</strong></p>
            </div>

            <p style="margin:0 0 8px;color:#94A3B8;font-size:14px;line-height:1.6;">
              If you did not request this code, please ignore this email. Your account remains secure.
            </p>
          </td>
        </tr>

        <!-- Security Notice -->
        <tr>
          <td style="background:#0F1A2E;padding:20px 40px;border-top:1px solid #1E2D45;">
            <p style="margin:0;color:#475569;font-size:12px;line-height:1.6;">
              <strong style="color:#64748B;">&#128274; Security Notice:</strong> GuardianCar will never ask for your OTP over the phone or chat. Do not share this code with anyone.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="background:#0B1120;padding:24px 40px;border-radius:0 0 16px 16px;border-top:1px solid #1E2D45;">
            <p style="margin:0;color:#334155;font-size:12px;">&copy; 2025 GuardianCar Technologies. All rights reserved.</p>
            <p style="margin:6px 0 0;color:#334155;font-size:12px;">This is an automated email, please do not reply.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
function buildEmailText(code) {
	return [
		"GuardianCar — Email Verification",
		"",
		"Your one-time verification code is:",
		"",
		`  ${code}`,
		"",
		"This code expires in 5 minutes.",
		"If you did not request this, please ignore this email.",
		"",
		"— GuardianCar Security Team"
	].join("\n");
}
async function sendEmailOtp(toEmail, code) {
	const mode = (env("OTP_EMAIL_MODE") || "console").toLowerCase();
	if (mode === "console") {
		console.log(`[OTP] send to ${toEmail}: ${code}`);
		return;
	}
	if (mode === "resend") {
		const apiKey = env("RESEND_API_KEY");
		if (!apiKey) throw new Error("Resend API key missing. Set OTP_EMAIL_MODE=resend and provide RESEND_API_KEY.");
		const fromEmail = env("RESEND_FROM") || "onboarding@resend.dev";
		const res = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${apiKey}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				from: fromEmail,
				to: toEmail,
				subject: "Your GuardianCar verification code",
				text: buildEmailText(code),
				html: buildEmailHtml(code)
			})
		});
		if (!res.ok) throw new Error(`Resend API failed: ${await res.text()}`);
		return;
	}
	if (mode === "smtp") {
		const nodemailer = await import("../_libs/nodemailer+unenv.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
		const SMTP_HOST = env("SMTP_HOST");
		const SMTP_PORT = env("SMTP_PORT");
		const SMTP_USER = env("SMTP_USER");
		const SMTP_PASS = env("SMTP_PASS");
		const SMTP_FROM = env("SMTP_FROM");
		if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) throw new Error("SMTP env vars missing.");
		await nodemailer.createTransport({
			host: SMTP_HOST,
			port: Number(SMTP_PORT),
			secure: Number(SMTP_PORT) === 465,
			auth: {
				user: SMTP_USER,
				pass: SMTP_PASS
			}
		}).sendMail({
			from: SMTP_FROM,
			to: toEmail,
			subject: "Your GuardianCar verification code",
			text: buildEmailText(code),
			html: buildEmailHtml(code)
		});
		return;
	}
	throw new Error(`Unknown OTP_EMAIL_MODE: ${mode}`);
}
async function POST(req) {
	purgeExpired();
	const pathname = new URL(req.url).pathname;
	if (pathname.endsWith("/send")) {
		const body = sendSchema.parse(await req.json());
		const rec = getOtp(body.email);
		const now = Date.now();
		if (rec && now - rec.lastSentAt < otpCooldownMs()) return Response.json({
			ok: true,
			cooldown: true
		});
		const code = generateCode();
		const hashed = codeHash(code);
		upsertOtp({
			email: body.email,
			codeHash: hashed,
			ttlMs: otpTtlMs(),
			maxAttempts: maxAttempts(),
			now
		});
		await sendEmailOtp(body.email, code);
		return Response.json({ ok: true });
	}
	if (pathname.endsWith("/verify")) {
		const body = verifySchema.parse(await req.json());
		const rec = getOtp(body.email);
		if (!rec) return new Response(JSON.stringify({
			ok: false,
			message: "OTP not found. Please resend."
		}), {
			status: 400,
			headers: { "content-type": "application/json" }
		});
		if (Date.now() > rec.expiresAt) {
			clearOtp(body.email);
			return new Response(JSON.stringify({
				ok: false,
				message: "OTP expired. Please resend."
			}), {
				status: 400,
				headers: { "content-type": "application/json" }
			});
		}
		if (codeHash(body.code) !== rec.codeHash) {
			const next = consumeAttempt(body.email);
			if (next && next.attemptsLeft <= 0) {
				clearOtp(body.email);
				return new Response(JSON.stringify({
					ok: false,
					message: "Too many attempts. Please resend."
				}), {
					status: 400,
					headers: { "content-type": "application/json" }
				});
			}
			return new Response(JSON.stringify({
				ok: false,
				message: "Invalid OTP"
			}), {
				status: 400,
				headers: { "content-type": "application/json" }
			});
		}
		clearOtp(body.email);
		return Response.json({ ok: true });
	}
	return new Response(JSON.stringify({
		ok: false,
		message: "Unknown OTP endpoint"
	}), {
		status: 404,
		headers: { "content-type": "application/json" }
	});
}
var Route$1 = createFileRoute("/api/auth/otp/verify")({ server: { handlers: { POST: async ({ request }) => {
	return POST(request);
} } } });
var Route = createFileRoute("/api/auth/otp/send")({ server: { handlers: { POST: async ({ request }) => {
	return POST(request);
} } } });
var WelcomeRoute = Route$17.update({
	id: "/welcome",
	path: "/welcome",
	getParentRoute: () => Route$18
});
var VerifyRoute = Route$16.update({
	id: "/verify",
	path: "/verify",
	getParentRoute: () => Route$18
});
var VehicleRoute = Route$15.update({
	id: "/vehicle",
	path: "/vehicle",
	getParentRoute: () => Route$18
});
var SitemapDotxmlRoute = Route$14.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$18
});
var SignupRoute = Route$13.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$18
});
var LoginRoute = Route$12.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$18
});
var EmergencyContactRoute = Route$11.update({
	id: "/emergency-contact",
	path: "/emergency-contact",
	getParentRoute: () => Route$18
});
var DashboardRoute = Route$10.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$18
});
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$18
});
var DashboardIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => DashboardRoute
});
var DashboardVehiclesRoute = Route$7.update({
	id: "/vehicles",
	path: "/vehicles",
	getParentRoute: () => DashboardRoute
});
var DashboardSettingsRoute = Route$6.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => DashboardRoute
});
var DashboardProfileRoute = Route$5.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => DashboardRoute
});
var DashboardHistoryRoute = Route$4.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => DashboardRoute
});
var DashboardAnalyticsRoute = Route$3.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => DashboardRoute
});
var DashboardAlertsRoute = Route$2.update({
	id: "/alerts",
	path: "/alerts",
	getParentRoute: () => DashboardRoute
});
var ApiAuthOtpVerifyRoute = Route$1.update({
	id: "/api/auth/otp/verify",
	path: "/api/auth/otp/verify",
	getParentRoute: () => Route$18
});
var ApiAuthOtpSendRoute = Route.update({
	id: "/api/auth/otp/send",
	path: "/api/auth/otp/send",
	getParentRoute: () => Route$18
});
var DashboardRouteChildren = {
	DashboardAlertsRoute,
	DashboardAnalyticsRoute,
	DashboardHistoryRoute,
	DashboardProfileRoute,
	DashboardSettingsRoute,
	DashboardVehiclesRoute,
	DashboardIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	DashboardRoute: DashboardRoute._addFileChildren(DashboardRouteChildren),
	EmergencyContactRoute,
	LoginRoute,
	SignupRoute,
	SitemapDotxmlRoute,
	VehicleRoute,
	VerifyRoute,
	WelcomeRoute,
	ApiAuthOtpSendRoute,
	ApiAuthOtpVerifyRoute
};
var routeTree = Route$18._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
