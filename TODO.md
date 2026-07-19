# TODO — Email OTP verification

- [ ] Wire backend OTP endpoints (already added under `src/server/api/auth/otp.ts` via Nitro-style handlers)
- [ ] Update `src/routes/signup.tsx` to call `/api/auth/otp/send` and navigate to `/verify?email=...`
- [ ] Update `src/routes/verify.tsx` to call `/api/auth/otp/send` (mount + resend) and `/api/auth/otp/verify` (submit)
- [ ] Add shared client helpers (`src/lib/otp-client.ts`) and use them in UI (already added)
- [ ] Run typecheck + lint + dev smoke test

