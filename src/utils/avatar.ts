export const getInitials = (value?: string) => {
  const parts = (value || "").trim().split(/\s+/).filter(Boolean).slice(0, 2);

  if (!parts.length) return "TR";

  const initials = parts
    .map((p) => p[0] || "")
    .join("")
    .toUpperCase();

  return initials || "TR";
};
