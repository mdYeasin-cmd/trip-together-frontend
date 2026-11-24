import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const buddyInvitationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    inviteTraveller: build.mutation({
      query: ({ tripId, buddyId }) => ({
        url: `/travel-buddy-invitations/${tripId}`,
        method: "POST",
        contentType: "application/json",
        data: { buddyId },
      }),
      invalidatesTags: [tagTypes.buddyInvitations],
    }),

    getInvitations: build.query({
      query: ({ tripId }) => ({
        url: `/travel-buddy-invitations/${tripId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.buddyInvitations],
    }),

    getInvitationHistroy: build.query({
      query: () => ({
        url: `/travel-buddy-invitations/history`,
        method: "GET",
      }),
      providesTags: [tagTypes.buddyInvitations],
    }),
  }),
});

export const {
  useInviteTravellerMutation,
  useGetInvitationsQuery,
  useGetInvitationHistroyQuery,
} = buddyInvitationApi;
