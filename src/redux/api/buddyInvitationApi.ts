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

    // invitee: accept / reject an invitation
    respondInvitation: build.mutation({
      query: ({ invitationId, tripId, status }) => ({
        url: `/travel-buddy-invitations/${invitationId}/respond`,
        method: "PATCH",
        contentType: "application/json",
        data: { tripId, status },
      }),
      // Request eligibility and request history read invite rows too.
      invalidatesTags: [tagTypes.buddyInvitations, tagTypes.buddyRequests],
    }),
  }),
});

export const {
  useInviteTravellerMutation,
  useGetInvitationsQuery,
  useGetInvitationHistroyQuery,
  useRespondInvitationMutation,
} = buddyInvitationApi;
