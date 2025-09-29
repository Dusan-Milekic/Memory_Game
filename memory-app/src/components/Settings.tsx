import { useAppDispatch } from "../redux/hooks/hooks";
import {
  setSettings,
  type SettingsState,
} from "../redux/reducers/settingsSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Settings() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    theme: "numbers",
    activeThemeBtn1: true,
    activeThemeBtn2: false,
    players: 1,
    activeNumberPlayers1: true,
    activeNumberPlayers2: false,
    activeNumberPlayers3: false,
    activeNumberPlayers4: false,
    grid: 4,
    activeGridSize1: true,
    activeGridSize2: false,
  });

  const shareSettings = () => {
    const settings: SettingsState = {
      theme: state.theme,
      players: state.players,
      gridSize: state.grid,
    };
    dispatch(setSettings(settings));
    navigate("/game");
  };

  return (
    <>
      <div className="settings bg-gray-50 min-w-xs sm:min-w-xl px-5 sm:pt-8 rounded-xl">
        <div className="theme pt-5 pb-5 sm:pb-8">
          <div className="title pb-2">
            <h2 className="text-xl text-blue-400 font-bold">Select Theme</h2>
          </div>
          <div className="buttons flex justify-around pt-2 font-bold text-2xl ">
            <button
              className={`cursor-pointer text-gray-50 min-w-32 sm:min-w-3xs pb-1 h-10 rounded-3xl ${
                state.activeThemeBtn1 ? "bg-blue-800" : "bg-blue-300"
              }`}
              onClick={() => {
                setState({
                  ...state,
                  theme: "numbers",
                  activeThemeBtn1: true,
                  activeThemeBtn2: false,
                });
              }}
            >
              Numbers
            </button>
            <button
              className={`cursor-pointer text-gray-50 min-w-32 sm:min-w-3xs pb-1 h-10 rounded-3xl ${
                state.activeThemeBtn2 ? "bg-blue-800" : "bg-blue-300"
              }`}
              onClick={() => {
                setState({
                  ...state,
                  theme: "icons",
                  activeThemeBtn1: false,
                  activeThemeBtn2: true,
                });
              }}
            >
              Icons
            </button>
          </div>
        </div>

        <div className="num_players pb-5 sm:pb-8">
          <div className="title pb-2 ">
            <h2 className="text-xl text-blue-400 font-bold">
              Number of players
            </h2>
          </div>
          <div className="buttons flex justify-around pt-2 font-bold text-2xl">
            <button
              className={`cursor-pointer text-gray-50 text min-w-16 sm:min-w-28 pb-1 h-10 rounded-3xl ${
                state.activeNumberPlayers1 ? "bg-blue-800" : "bg-blue-300"
              }`}
              onClick={() => {
                setState({
                  ...state,
                  players: 1,
                  activeNumberPlayers1: true,
                  activeNumberPlayers2: false,
                  activeNumberPlayers3: false,
                  activeNumberPlayers4: false,
                });
              }}
            >
              1
            </button>
            <button
              className={`cursor-pointer text-gray-50 min-w-16 sm:min-w-28 h-10 pb-1 rounded-3xl ${
                state.activeNumberPlayers2 ? "bg-blue-800" : "bg-blue-300"
              }`}
              onClick={() => {
                setState({
                  ...state,
                  players: 2,
                  activeNumberPlayers1: false,
                  activeNumberPlayers2: true,
                  activeNumberPlayers3: false,
                  activeNumberPlayers4: false,
                });
              }}
            >
              2
            </button>
            <button
              className={`cursor-pointer text-gray-50 min-w-16 sm:min-w-28 h-10 pb-1 rounded-3xl ${
                state.activeNumberPlayers3 ? "bg-blue-800" : "bg-blue-300"
              }`}
              onClick={() => {
                setState({
                  ...state,
                  players: 3,
                  activeNumberPlayers1: false,
                  activeNumberPlayers2: false,
                  activeNumberPlayers3: true,
                  activeNumberPlayers4: false,
                });
              }}
            >
              3
            </button>
            <button
              className={`cursor-pointer text-gray-50 min-w-16 sm:min-w-28 h-10 pb-1 rounded-3xl ${
                state.activeNumberPlayers4 ? "bg-blue-800" : "bg-blue-300"
              }`}
              onClick={() => {
                setState({
                  ...state,
                  players: 4,
                  activeNumberPlayers1: false,
                  activeNumberPlayers2: false,
                  activeNumberPlayers3: false,
                  activeNumberPlayers4: true,
                });
              }}
            >
              4
            </button>
          </div>
        </div>

        <div className="grid_size pb-5 sm:pb-8">
          <div className="title pb-2">
            <h2 className="text-xl text-blue-400 font-bold">Grid Size</h2>
          </div>
          <div className="buttons flex justify-around pt-2 font-bold text-2xl">
            <button
              className={`cursor-pointer text-gray-50 text min-w-32 sm:min-w-3xs pb-1 h-10 rounded-3xl ${
                state.activeGridSize1 ? "bg-blue-800" : "bg-blue-300"
              }`}
              onClick={() => {
                setState({
                  ...state,
                  grid: 4,
                  activeGridSize1: true,
                  activeGridSize2: false,
                });
              }}
            >
              4x4
            </button>
            <button
              className={`cursor-pointer text-gray-50 min-w-32 sm:min-w-3xs pb-1 h-10 rounded-3xl ${
                state.activeGridSize2 ? "bg-blue-800" : "bg-blue-300"
              }`}
              onClick={() => {
                setState({
                  ...state,
                  grid: 6,
                  activeGridSize1: false,
                  activeGridSize2: true,
                });
              }}
            >
              6x6
            </button>
          </div>
        </div>

        <div className="start_game pb-5 sm:pb-8 text-2xl ">
          <button
            className="cursor-pointer bg-orange-400 text-gray-50 w-full pb-1 h-10 rounded-3xl font-bold"
            onClick={shareSettings}
          >
            Start game
          </button>
        </div>
      </div>
    </>
  );
}
