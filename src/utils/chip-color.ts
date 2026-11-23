import { UserStatus } from "@/constants";
import { RequestAndInviteStatus } from "@/constants/requestAndInviteStatus";

export const getStatusChipColor = (
  status?: string,
): "success" | "warning" | "error" | "default" => {
  if (status === UserStatus.ACTIVE) return "success";
  if (status === UserStatus.BLOCKED) return "warning";
  if (status === UserStatus.DELETED) return "error";
  return "default";
};

export const getRequestStatusChipColor = (
  status?: string,
): "success" | "warning" | "error" | "default" => {
  if (status === RequestAndInviteStatus.ACCEPT) return "success";
  if (status === RequestAndInviteStatus.PENDING) return "warning";
  if (status === RequestAndInviteStatus.REJECT) return "error";
  return "default";
};
