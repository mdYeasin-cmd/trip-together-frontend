import { redirect } from "next/navigation";

// Managing happens per post: /dashboard/traveler/travel-posts/manage/[tripId]
const ManageTravelPostsIndex = () => {
  redirect("/dashboard/traveler/travel-posts");
};

export default ManageTravelPostsIndex;
