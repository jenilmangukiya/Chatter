import { createSlice } from "@reduxjs/toolkit";

export interface ChatState {
  newMessageAlerts: { chatId: string; count: number }[];
}

const initialState: ChatState = {
  newMessageAlerts: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNewMessageCount: (state: any, { payload }: any) => {
      const chatId = payload;
      const findIndex = state.newMessageAlerts.findIndex(
        (item: any) => item.chatId === chatId
      );

      if (findIndex !== -1) {
        state.newMessageAlerts[findIndex].count =
          state.newMessageAlerts[findIndex].count + 1;
      } else {
        state.newMessageAlerts.push({ chatId, count: 1 });
      }
      state.newMessageAlerts = [...state.newMessageAlerts];
    },
    resetNewMessageCount: (state, { payload }) => {
      const chatId = payload;
      const findIndex = state.newMessageAlerts.findIndex(
        (item) => item.chatId === chatId
      );

      if (findIndex !== -1) {
        state.newMessageAlerts[findIndex] = {
          chatId: chatId,
          count: 0,
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementNewMessageCount, resetNewMessageCount } =
  chatSlice.actions;

export default chatSlice.reducer;
