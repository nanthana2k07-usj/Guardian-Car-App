import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { w as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as AuthShell } from "./AuthShell-BxZANMi7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/emergency-contact-CjvzyCKF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmergencyContact() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const onSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			toast.success("Emergency contact saved");
			navigate({ to: "/dashboard" });
		}, 1e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthShell, {
		title: "Emergency contact",
		subtitle: "Who should we alert in an emergency?",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Contact Name",
					id: "cname",
					placeholder: "Sarah Carter"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Relationship",
					id: "rel",
					placeholder: "Spouse"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Phone Number",
					id: "phone",
					placeholder: "+91 98765 43210",
					type: "tel"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Alternate Phone Number",
					id: "alt",
					placeholder: "+91 91234 56780",
					type: "tel",
					required: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: loading,
					className: "w-full rounded-xl bg-gradient-primary text-primary-foreground hover:scale-[1.02] transition-transform",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Save Contact & Finish"
				})
			]
		})
	});
}
function Field({ label, id, placeholder, type = "text", required = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: id,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id,
			name: id,
			type,
			required,
			placeholder,
			className: "rounded-xl bg-input/40"
		})]
	});
}
//#endregion
export { EmergencyContact as component };
