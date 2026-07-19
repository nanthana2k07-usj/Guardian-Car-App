export type OtpRecord = {
  email: string;
  codeHash: string;
  expiresAt: number;
  attemptsLeft: number;
  lastSentAt: number;
};

const store = new Map<string, OtpRecord>();

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function upsertOtp(params: {
  email: string;
  codeHash: string;
  ttlMs: number;
  maxAttempts: number;
  now?: number;
}) {
  const now = params.now ?? Date.now();
  const record: OtpRecord = {
    email: normalizeEmail(params.email),
    codeHash: params.codeHash,
    expiresAt: now + params.ttlMs,
    attemptsLeft: params.maxAttempts,
    lastSentAt: now,
  };
  store.set(normalizeEmail(params.email), record);
  return record;
}

export function getOtp(email: string) {
  return store.get(normalizeEmail(email));
}

export function consumeAttempt(email: string) {
  const key = normalizeEmail(email);
  const rec = store.get(key);
  if (!rec) return undefined;
  const next = { ...rec, attemptsLeft: Math.max(0, rec.attemptsLeft - 1) };
  store.set(key, next);
  return next;
}

export function clearOtp(email: string) {
  store.delete(normalizeEmail(email));
}

export function purgeExpired(now = Date.now()) {
  for (const [key, rec] of store.entries()) {
    if (rec.expiresAt <= now) store.delete(key);
  }
}

