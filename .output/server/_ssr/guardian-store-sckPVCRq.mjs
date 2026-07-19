import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guardian-store-sckPVCRq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var now = () => (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit"
});
var state = {
	guardianActive: false,
	vehicleStatus: "safe",
	motion: false,
	relay: 0,
	device: "online",
	battery: 87,
	internet: "connected",
	firebase: "synced",
	connection: "stable",
	lastUpdated: now(),
	vehicleName: "Tesla Model 3 — MH12 AB 1234",
	profile: {
		name: "John Carter",
		email: "john@guardiancar.io",
		mobile: "+91 98765 43210",
		emergencyContact: "Sarah Carter · Spouse"
	},
	alerts: [
		{
			id: "a1",
			time: "09:42",
			type: "Motion Detected",
			severity: "medium",
			vehicle: "Model 3",
			status: "Resolved"
		},
		{
			id: "a2",
			time: "08:15",
			type: "Unauthorized Access",
			severity: "critical",
			vehicle: "Model 3",
			status: "Immobilized"
		},
		{
			id: "a3",
			time: "Yesterday",
			type: "Device Reconnected",
			severity: "low",
			vehicle: "Model 3",
			status: "Info"
		},
		{
			id: "a4",
			time: "Yesterday",
			type: "Motion Detected",
			severity: "medium",
			vehicle: "Model 3",
			status: "Authorized"
		}
	],
	history: [
		{
			id: "h1",
			time: "Today 09:42",
			kind: "motion",
			title: "Motion Detected",
			detail: "Sensor triggered near driver door."
		},
		{
			id: "h2",
			time: "Yesterday 22:10",
			kind: "immobilize",
			title: "Vehicle Immobilized",
			detail: "Remote relay command executed in 1.2s."
		},
		{
			id: "h3",
			time: "Yesterday 22:08",
			kind: "unauthorized",
			title: "Unauthorized Access",
			detail: "Owner flagged access as unauthorized."
		}
	]
};
var listeners = /* @__PURE__ */ new Set();
var emit = () => listeners.forEach((l) => l());
function set(patch) {
	state = {
		...state,
		...patch,
		lastUpdated: now()
	};
	emit();
}
var guardianStore = {
	subscribe(cb) {
		listeners.add(cb);
		return () => listeners.delete(cb);
	},
	get: () => state,
	startGuardian() {
		set({
			guardianActive: true,
			vehicleStatus: "safe",
			motion: false
		});
		state.history = [{
			id: crypto.randomUUID(),
			time: "Now",
			kind: "authorized",
			title: "Guardian Mode Activated",
			detail: "Real-time theft detection is now armed and monitoring."
		}, ...state.history];
	},
	stopGuardian() {
		set({
			guardianActive: false,
			motion: false,
			vehicleStatus: "safe"
		});
		state.history = [{
			id: crypto.randomUUID(),
			time: "Now",
			kind: "contact",
			title: "Guardian Mode Deactivated",
			detail: "Monitoring paused. The system is now standing by."
		}, ...state.history];
	},
	updateProfile(patch) {
		set({ profile: {
			...state.profile,
			...patch
		} });
	},
	triggerMotion() {
		if (!state.guardianActive) return false;
		set({
			motion: true,
			vehicleStatus: "motion"
		});
		state.history = [{
			id: crypto.randomUUID(),
			time: "Now",
			kind: "motion",
			title: "Motion Detected",
			detail: "IoT sensor detected movement near the vehicle."
		}, ...state.history];
		return true;
	},
	authorize() {
		set({
			motion: false,
			vehicleStatus: "authorized"
		});
		state.history = [{
			id: crypto.randomUUID(),
			time: "Now",
			kind: "authorized",
			title: "Authorized Access Verified",
			detail: "Owner confirmed access as authorized."
		}, ...state.history];
		state.alerts = [{
			id: crypto.randomUUID(),
			time: now().slice(0, 5),
			type: "Motion Detected",
			severity: "medium",
			vehicle: "Model 3",
			status: "Authorized"
		}, ...state.alerts];
	},
	markUnauthorized() {
		set({ vehicleStatus: "unauthorized" });
	},
	immobilize() {
		set({
			relay: 1,
			vehicleStatus: "immobilized",
			motion: false
		});
		state.history = [{
			id: crypto.randomUUID(),
			time: "Now",
			kind: "immobilize",
			title: "Vehicle Immobilized",
			detail: "relay = 1 written to Firebase. Engine disabled."
		}, ...state.history];
		state.alerts = [{
			id: crypto.randomUUID(),
			time: now().slice(0, 5),
			type: "Unauthorized Access",
			severity: "critical",
			vehicle: "Model 3",
			status: "Immobilized"
		}, ...state.alerts];
	},
	reset() {
		set({
			relay: 0,
			vehicleStatus: "safe",
			motion: false
		});
	}
};
function useGuardian() {
	return (0, import_react.useSyncExternalStore)(guardianStore.subscribe, guardianStore.get, guardianStore.get);
}
//#endregion
export { useGuardian as n, guardianStore as t };
