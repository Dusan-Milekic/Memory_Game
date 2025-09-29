import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
export interface SettingsState {
  theme: string; // Bilo koji string
  players: number; // Bilo koji broj
  gridSize: number; // Bilo koji broj
}

const initialState: SettingsState = {
  theme: "numbers",
  players: 1,
  gridSize: 4,
};

export const settingsSlice = createSlice({
  name: "settings",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSettings: (_state, action: PayloadAction<SettingsState>) => {
      return action.payload;
    },
  },
});

export const { setSettings } = settingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;
