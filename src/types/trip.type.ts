export type TTrip = {
  id: string;
  userId: string;
  photos: string[];
  destination: string;
  travelType: string;
  budget: number;
  startDate: string;
  endDate: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TTravelBuddyRequest = {
  id: string;
  userId: string;
  tripId: string;
  status: string;
  type: "REQUEST" | "INVITE";
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
};
