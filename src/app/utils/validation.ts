export function validateTermWindow(startISO: string, endISO: string) {
  const start = new Date(startISO);
  const end = new Date(endISO);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start)
    return { ok: false, reason: "Invalid dates." };

  // 8–20 weeks rule (feature spec)
  const ms = end.getTime() - start.getTime();
  const weeks = ms / (1000 * 60 * 60 * 24 * 7);
  if (weeks < 8 || weeks > 20) {
    return { ok: false, reason: "Term must be between 8 and 20 weeks." };
  }
  return { ok: true, weeks: Math.round(weeks) };
}
