import { chatReducer } from '@/dispatchers/chat/chatSlice';
import { participantsReducer } from '@/dispatchers/participant/participantsSlice';
import { partiesReducer } from '@/dispatchers/party/partiesSlice';
import { usersReducer } from '@/dispatchers/user/usersSlice';
import { wishlistsReducer } from '@/dispatchers/wishlist/wishlistsSlice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    reducer: {
      users: usersReducer,
      parties: partiesReducer,
      participants: participantsReducer,
      wishlists: wishlistsReducer,
      chat: chatReducer,
    },
    devTools: true,
  });

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = RootStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<RootStore>(makeStore);
