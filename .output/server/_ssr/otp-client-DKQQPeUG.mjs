import { n as objectType, t as booleanType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/otp-client-DKQQPeUG.js
var sendSchema = objectType({ ok: booleanType() });
var verifyRespSchema = objectType({ ok: booleanType() });
async function sendOtp(email) {
	const res = await fetch("/api/auth/otp/send", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ email })
	});
	const payload = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(payload?.message ?? "Failed to send OTP");
	return sendSchema.parse(payload);
}
async function verifyOtp(email, code) {
	const res = await fetch("/api/auth/otp/verify", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			email,
			code
		})
	});
	const payload = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(payload?.message ?? "OTP verification failed");
	return verifyRespSchema.parse(payload);
}
//#endregion
export { verifyOtp as n, sendOtp as t };
