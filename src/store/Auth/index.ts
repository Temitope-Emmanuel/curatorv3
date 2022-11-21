import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { IUser } from '../../interfaces/auth';

interface AuthState {
  currentUser: IUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
	currentUser: null,
	isAuthenticated: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			const {
				displayName,
				email,
				emailVerified,
				phoneNumber,
				photoURL,
				uid,
				providerData,
				metadata,
			} = action.payload;
			state.currentUser = {
				email,
				displayName,
				emailVerified,
				phoneNumber,
				photoURL,
				providerData,
				metadata,
				uid,
			};
			state.isAuthenticated = true;
		},
		clearUser: (state) => {
			state.currentUser = null;
			state.isAuthenticated = false;
		},
	},
});

export const { clearUser, setUser } = authSlice.actions;

export const getAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
