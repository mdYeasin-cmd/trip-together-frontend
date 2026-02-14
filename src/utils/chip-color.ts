import { UserStatus } from "@/constants";

export const getStatusChipColor = (
  status?: string,
): "success" | "warning" | "error" | "default" => {
  if (status === UserStatus.ACTIVE) return "success";
  if (status === UserStatus.BLOCKED) return "warning";
  if (status === UserStatus.DELETED) return "error";
  return "default";
};
