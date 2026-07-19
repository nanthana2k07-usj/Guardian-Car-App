globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/app-icon-192.png": {
		"type": "image/png",
		"etag": "\"7b93-0hHHVVvfSgLMLGgi4bjP6uDU0/A\"",
		"mtime": "2026-07-13T10:10:22.983Z",
		"size": 31635,
		"path": "../public/app-icon-192.png"
	},
	"/app-icon-512.png": {
		"type": "image/png",
		"etag": "\"4a90-yOVJed23IjAZy2ozXJoloXFUW94\"",
		"mtime": "2026-07-13T10:10:27.476Z",
		"size": 19088,
		"path": "../public/app-icon-512.png"
	},
	"/manifest.webmanifest": {
		"type": "application/manifest+json",
		"etag": "\"295-TvCKT67RwTgXtB8++sKL6x0GRmM\"",
		"mtime": "2026-07-13T10:10:45.570Z",
		"size": 661,
		"path": "../public/manifest.webmanifest"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"374-g3oF4k11fnDxQE6uGrEiLVXUMhE\"",
		"mtime": "2026-07-13T10:10:39.738Z",
		"size": 884,
		"path": "../public/favicon.svg"
	},
	"/apple-touch-icon.png": {
		"type": "image/png",
		"etag": "\"70f2-7RdsgDqnDLUoFupUxVXKPGeZ7D8\"",
		"mtime": "2026-07-13T10:10:32.159Z",
		"size": 28914,
		"path": "../public/apple-touch-icon.png"
	},
	"/assets/AnimatePresence-jMMbamNm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"104f-Fff4il4LCjobn9bdStPamwz7lI8\"",
		"mtime": "2026-07-18T14:40:30.529Z",
		"size": 4175,
		"path": "../public/assets/AnimatePresence-jMMbamNm.js"
	},
	"/assets/AnimatedBackground-DiRSn6qP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"689-k+3M09BQ+/5hGNqj8+xKIYEZ6VY\"",
		"mtime": "2026-07-18T14:40:30.529Z",
		"size": 1673,
		"path": "../public/assets/AnimatedBackground-DiRSn6qP.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4\"",
		"mtime": "2026-07-13T10:10:51.800Z",
		"size": 23,
		"path": "../public/robots.txt"
	},
	"/assets/bell-ring-CdAOuF_o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d-3RdLBSCsuontgL4ykeuHP/9Pw2k\"",
		"mtime": "2026-07-18T14:40:30.532Z",
		"size": 397,
		"path": "../public/assets/bell-ring-CdAOuF_o.js"
	},
	"/assets/button-BMBHR76d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a4-GXIg4APuYqf5HFO0q4DsP1ZxzyA\"",
		"mtime": "2026-07-18T14:40:30.532Z",
		"size": 1956,
		"path": "../public/assets/button-BMBHR76d.js"
	},
	"/assets/AuthShell-DITVrD4_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"406-tN8jH15QCgNBqQoJIGQZZlrlDp0\"",
		"mtime": "2026-07-18T14:40:30.530Z",
		"size": 1030,
		"path": "../public/assets/AuthShell-DITVrD4_.js"
	},
	"/assets/car-pf3ewFQs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-VTiHLpdBC+8BcAhBNrRozMfkrZc\"",
		"mtime": "2026-07-18T14:40:30.533Z",
		"size": 407,
		"path": "../public/assets/car-pf3ewFQs.js"
	},
	"/assets/check-Gcr1-ydj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-fC12Jb16WEgKYUf80aNjlfSOeuE\"",
		"mtime": "2026-07-18T14:40:30.533Z",
		"size": 124,
		"path": "../public/assets/check-Gcr1-ydj.js"
	},
	"/assets/cloud-DWaEsG9G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0-8E480DZEeNRGDdtNt+zPVBlXNx4\"",
		"mtime": "2026-07-18T14:40:30.534Z",
		"size": 160,
		"path": "../public/assets/cloud-DWaEsG9G.js"
	},
	"/assets/circle-check-S70llP4z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-7bbeRBj5/qce40M05m2kos+SZgc\"",
		"mtime": "2026-07-18T14:40:30.534Z",
		"size": 178,
		"path": "../public/assets/circle-check-S70llP4z.js"
	},
	"/assets/Combination-DsdAsUh2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55c9-qVwmH1h5E9I5woax3DvgGXIPY/I\"",
		"mtime": "2026-07-18T14:40:30.530Z",
		"size": 21961,
		"path": "../public/assets/Combination-DsdAsUh2.js"
	},
	"/assets/clsx-CjueKrWZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"170-hIN6XMVOMUzluNGmYPaM/SbauwQ\"",
		"mtime": "2026-07-18T14:40:30.535Z",
		"size": 368,
		"path": "../public/assets/clsx-CjueKrWZ.js"
	},
	"/assets/cpu-DytLVJAf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282-c1qi8pQIYVO5apHzauuEtwUagig\"",
		"mtime": "2026-07-18T14:40:30.535Z",
		"size": 642,
		"path": "../public/assets/cpu-DytLVJAf.js"
	},
	"/assets/dashboard-CA4UO38u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28d8-hhFp0L8BH/Ke45Cg6xqiNfYGNZs\"",
		"mtime": "2026-07-18T14:40:30.536Z",
		"size": 10456,
		"path": "../public/assets/dashboard-CA4UO38u.js"
	},
	"/assets/createLucideIcon-B_1GbDvl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-Y4enwiXY2yAcF1Gu2b12sxHBTW8\"",
		"mtime": "2026-07-18T14:40:30.536Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-B_1GbDvl.js"
	},
	"/assets/dashboard.alerts-DmZxpxcq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ffd-5LjdMcVmAOYs0y4S2V+RTPaegBc\"",
		"mtime": "2026-07-18T14:40:30.537Z",
		"size": 4093,
		"path": "../public/assets/dashboard.alerts-DmZxpxcq.js"
	},
	"/assets/dashboard.index-DksrvUCs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41bd-/V6ddv0y0FA9YWloE7XId5XTVhs\"",
		"mtime": "2026-07-18T14:40:30.539Z",
		"size": 16829,
		"path": "../public/assets/dashboard.index-DksrvUCs.js"
	},
	"/assets/dashboard.history-B6QtLUZb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6c-7QBYk4vbi4wRXQv2ffxsr9xZ6+Y\"",
		"mtime": "2026-07-18T14:40:30.538Z",
		"size": 2924,
		"path": "../public/assets/dashboard.history-B6QtLUZb.js"
	},
	"/assets/activity-BrHSDTiT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ea-gyZd59ZU5ySiha50WWFPzl3WAeY\"",
		"mtime": "2026-07-18T14:40:30.531Z",
		"size": 234,
		"path": "../public/assets/activity-BrHSDTiT.js"
	},
	"/assets/dashboard.analytics-vgyZR4lC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64016-+YQf/PlmVUEU0CQWANtAM7bfZq8\"",
		"mtime": "2026-07-18T14:40:30.538Z",
		"size": 409622,
		"path": "../public/assets/dashboard.analytics-vgyZR4lC.js"
	},
	"/assets/dashboard.profile-vtBhXaQ7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2854-jx2RKM2B90krG5EgHq0R/T58QEw\"",
		"mtime": "2026-07-18T14:40:30.539Z",
		"size": 10324,
		"path": "../public/assets/dashboard.profile-vtBhXaQ7.js"
	},
	"/assets/dashboard.vehicles-D6_b0P5A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7c-FYMBAy6Ys+3saDkM6/26MSLezX0\"",
		"mtime": "2026-07-18T14:40:30.540Z",
		"size": 3196,
		"path": "../public/assets/dashboard.vehicles-D6_b0P5A.js"
	},
	"/assets/dist-BeduiTmB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"894-boRZWs8O8yh7bvcUXIWUiGEKMEM\"",
		"mtime": "2026-07-18T14:40:30.541Z",
		"size": 2196,
		"path": "../public/assets/dist-BeduiTmB.js"
	},
	"/assets/dashboard.settings-Dazn7Lfn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f18-L0jJKTrUNp4os734WB57W2ARj3Q\"",
		"mtime": "2026-07-18T14:40:30.539Z",
		"size": 7960,
		"path": "../public/assets/dashboard.settings-Dazn7Lfn.js"
	},
	"/assets/dist-BRqNcF0n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"903-As32oq8fdImjtvzcNKpZWjOPv3E\"",
		"mtime": "2026-07-18T14:40:30.540Z",
		"size": 2307,
		"path": "../public/assets/dist-BRqNcF0n.js"
	},
	"/assets/dist-D605WLeO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2de-2iEuXqj9+KKEilRV5VMV7H6ywpo\"",
		"mtime": "2026-07-18T14:40:30.542Z",
		"size": 734,
		"path": "../public/assets/dist-D605WLeO.js"
	},
	"/assets/dist-CUlgLOIF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"471-Y64c1kn+ZSwZmIEQc/KArcdTRdc\"",
		"mtime": "2026-07-18T14:40:30.542Z",
		"size": 1137,
		"path": "../public/assets/dist-CUlgLOIF.js"
	},
	"/assets/dist-yM_BP_Ks.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c1-pSAtryHAgwt5DRbqBqyAhH/3wuE\"",
		"mtime": "2026-07-18T14:40:30.542Z",
		"size": 2497,
		"path": "../public/assets/dist-yM_BP_Ks.js"
	},
	"/assets/emergency-contact-BAEIxZ2l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ef-Xshoikkz7jWf3RgqSyHsnEeqTU4\"",
		"mtime": "2026-07-18T14:40:30.543Z",
		"size": 1519,
		"path": "../public/assets/emergency-contact-BAEIxZ2l.js"
	},
	"/assets/guardian-store-Dd2bHzFX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c59-GCNHJz6dD0vQkEXk0LG36koYTAw\"",
		"mtime": "2026-07-18T14:40:30.544Z",
		"size": 3161,
		"path": "../public/assets/guardian-store-Dd2bHzFX.js"
	},
	"/assets/jsx-runtime-D8nDyRPw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2210-qrBAUPDOR8ROKpBVNEla8AGnGKU\"",
		"mtime": "2026-07-18T14:40:30.544Z",
		"size": 8720,
		"path": "../public/assets/jsx-runtime-D8nDyRPw.js"
	},
	"/assets/label-BkCng-g2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"293-K1TfUSGb5b+8Uc9SAWZhph2hEq0\"",
		"mtime": "2026-07-18T14:40:30.544Z",
		"size": 659,
		"path": "../public/assets/label-BkCng-g2.js"
	},
	"/assets/loader-circle-D8psbp0G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-Acq+TaQonHAGEyTPCObIqaAAS2c\"",
		"mtime": "2026-07-18T14:40:30.544Z",
		"size": 144,
		"path": "../public/assets/loader-circle-D8psbp0G.js"
	},
	"/assets/lock-Dwoz73X0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a2-4kMJwbe7rOvUoEPUdvMlV2Fmqfo\"",
		"mtime": "2026-07-18T14:40:30.545Z",
		"size": 930,
		"path": "../public/assets/lock-Dwoz73X0.js"
	},
	"/assets/login-b3Fnf4Pm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e41-40yv47Sc77+ojZrvyABwSZ1UIN4\"",
		"mtime": "2026-07-18T14:40:30.545Z",
		"size": 7745,
		"path": "../public/assets/login-b3Fnf4Pm.js"
	},
	"/assets/Logo-D9xA0ClB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"750-INYSQkJ2IvYQA09eQvOntPcT3I8\"",
		"mtime": "2026-07-18T14:40:30.531Z",
		"size": 1872,
		"path": "../public/assets/Logo-D9xA0ClB.js"
	},
	"/assets/mail-Bvyil9PM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-cXglhi5BQU2PxRf+Fu3+76UJIuo\"",
		"mtime": "2026-07-18T14:40:30.546Z",
		"size": 213,
		"path": "../public/assets/mail-Bvyil9PM.js"
	},
	"/assets/map-pin-DgG0xWS1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-0woEcQvZiiDeDTA1kQY4x6YN7pg\"",
		"mtime": "2026-07-18T14:40:30.546Z",
		"size": 259,
		"path": "../public/assets/map-pin-DgG0xWS1.js"
	},
	"/assets/otp-client-Do1PT2gp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de81-DWi27LIa23SOLOSDF4E54ZU0uik\"",
		"mtime": "2026-07-18T14:40:30.546Z",
		"size": 56961,
		"path": "../public/assets/otp-client-Do1PT2gp.js"
	},
	"/assets/palette-CB39un2q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fe-iRPsPhOVrWCwv0YFYSLFIseaxEc\"",
		"mtime": "2026-07-18T14:40:30.547Z",
		"size": 510,
		"path": "../public/assets/palette-CB39un2q.js"
	},
	"/assets/phone-BZ_Is3rx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-D4H9aBAllVsKcujDSdRfnzerGmI\"",
		"mtime": "2026-07-18T14:40:30.547Z",
		"size": 322,
		"path": "../public/assets/phone-BZ_Is3rx.js"
	},
	"/assets/index-BREOgkiw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b00f-xHWcHEU0aiI1yqsKYhVAEt+Iwx8\"",
		"mtime": "2026-07-18T14:40:30.529Z",
		"size": 372751,
		"path": "../public/assets/index-BREOgkiw.js"
	},
	"/assets/power-Bo7hh1Ic.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad-+8jXFN57syiysYMw4hZ6IdXDYt0\"",
		"mtime": "2026-07-18T14:40:30.548Z",
		"size": 173,
		"path": "../public/assets/power-Bo7hh1Ic.js"
	},
	"/assets/phone-call-C7vfeXDP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a7-n5BPN29q02UZrCpAPIEbA5y3ZQc\"",
		"mtime": "2026-07-18T14:40:30.548Z",
		"size": 423,
		"path": "../public/assets/phone-call-C7vfeXDP.js"
	},
	"/assets/radar-DEf3XCr7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36e-6/+ffvWjaVbC6iwJibFaOaS4TaI\"",
		"mtime": "2026-07-18T14:40:30.549Z",
		"size": 878,
		"path": "../public/assets/radar-DEf3XCr7.js"
	},
	"/assets/react-dom-CrK8yE57.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dda-TYAl7GnUPUCbV+AVNcbJobxY8L4\"",
		"mtime": "2026-07-18T14:40:30.550Z",
		"size": 3546,
		"path": "../public/assets/react-dom-CrK8yE57.js"
	},
	"/assets/routes-D7aPS604.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"807-RkSKxlcZNgxb0phIkQdhlS9IftM\"",
		"mtime": "2026-07-18T14:40:30.550Z",
		"size": 2055,
		"path": "../public/assets/routes-D7aPS604.js"
	},
	"/assets/react-KEDV7yTV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d918-MSlRMXaplmIdNAUarS4r058Ik8Y\"",
		"mtime": "2026-07-18T14:40:30.549Z",
		"size": 121112,
		"path": "../public/assets/react-KEDV7yTV.js"
	},
	"/assets/select-BGHhkMnf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c252-BlRDpVDwQU1ekEgu07KGJm0guNc\"",
		"mtime": "2026-07-18T14:40:30.551Z",
		"size": 49746,
		"path": "../public/assets/select-BGHhkMnf.js"
	},
	"/assets/shield-check-BE83zHjA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-NclHJwP5EzC5TirYqN4d2ExD+XE\"",
		"mtime": "2026-07-18T14:40:30.551Z",
		"size": 320,
		"path": "../public/assets/shield-check-BE83zHjA.js"
	},
	"/assets/signup-BDPvzYWR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181c-2cc5Xokkf9+59WfBwDZnf0tFBCg\"",
		"mtime": "2026-07-18T14:40:30.551Z",
		"size": 6172,
		"path": "../public/assets/signup-BDPvzYWR.js"
	},
	"/assets/user-DPog7uCY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-EMVsHpcWO6UAEjQ8Q27bTJdle1Q\"",
		"mtime": "2026-07-18T14:40:30.552Z",
		"size": 196,
		"path": "../public/assets/user-DPog7uCY.js"
	},
	"/assets/vehicle-DoZouakF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f9-IU23ZOwwGQIUOL5loB4QRru6qaI\"",
		"mtime": "2026-07-18T14:40:30.552Z",
		"size": 2553,
		"path": "../public/assets/vehicle-DoZouakF.js"
	},
	"/assets/styles-CJYObWez.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"15872-rZ3vsZ2KBMD/BLHQHp4kYm/ohfE\"",
		"mtime": "2026-07-18T14:40:30.554Z",
		"size": 88178,
		"path": "../public/assets/styles-CJYObWez.css"
	},
	"/assets/utils-B9URw_CD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6936-IDn15ekKTsa+z3GJnrtfek/Td4M\"",
		"mtime": "2026-07-18T14:40:30.552Z",
		"size": 26934,
		"path": "../public/assets/utils-B9URw_CD.js"
	},
	"/assets/verify-pUuOKUn0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34a5-HGlOHh665w7zqifIAX9HmqU71So\"",
		"mtime": "2026-07-18T14:40:30.553Z",
		"size": 13477,
		"path": "../public/assets/verify-pUuOKUn0.js"
	},
	"/assets/welcome-Izy6xDUr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16ca-1CkI2naFKXEBmo3eUsX6j0oxt/E\"",
		"mtime": "2026-07-18T14:40:30.553Z",
		"size": 5834,
		"path": "../public/assets/welcome-Izy6xDUr.js"
	},
	"/assets/x-DSGAjANB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-WxHrmsJOJmuNp0TnIch3bRILnZY\"",
		"mtime": "2026-07-18T14:40:30.554Z",
		"size": 154,
		"path": "../public/assets/x-DSGAjANB.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_Ila94C = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_Ila94C
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
