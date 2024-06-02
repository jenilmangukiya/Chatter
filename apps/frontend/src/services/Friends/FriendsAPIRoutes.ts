export const GET_FRIEND_REQUEST = "/requests";

export const CANCEL_FRIEND_REQUEST = (requestId: string) =>
  `/requests/${requestId}`;

export const APPROVE_FRIEND_REQUEST = (requestId: string) =>
  `/requests/approveRequest/${requestId}`;
