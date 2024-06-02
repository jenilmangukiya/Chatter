export const GET_FRIEND_REQUEST = "/requests";

export const CANCEL_FRIEND_REQUEST = (requestId: string) =>
  `/requests/${requestId}`;
