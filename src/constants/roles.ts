export const ROLES = [
  "Carry",
  "Mid",
  "Offlane",
  "Soft Support",
  "Hard Support",
] as const;

export type Role = (typeof ROLES)[number];
