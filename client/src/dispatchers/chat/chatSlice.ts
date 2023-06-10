import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';

interface InitialChat {
  isOpen: boolean;
}

const initialState: InitialChat = {
  isOpen: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    openChat: (state) => {
      state.isOpen = true;
    },
    closeChat: (state) => {
      state.isOpen = false;
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const { openChat, closeChat } = chatSlice.actions;
export const selectChatIsOpen = (state: RootState) => state.chat.isOpen;
