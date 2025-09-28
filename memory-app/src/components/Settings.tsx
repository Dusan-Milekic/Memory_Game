import { Component, type ReactNode } from "react";

export default class Settings extends Component {
  constructor() {
    super([]);
    this.state = {};
  }
  render(): ReactNode {
    return (
      <>
        <div className="settings bg-gray-50 min-w-xs sm:min-w-xl px-5 sm:pt-8 rounded-xl">
          <div className="theme pt-5 sm:pb-8">
            <div className="title pb-2">
              <h2 className="text-xl text-blue-400 font-bold">Select Theme</h2>
            </div>
            <div className="buttons flex justify-around pt-2 font-bold text-2xl ">
              <button className="cursor-pointer bg-blue-300 text-gray-50 text min-w-32 sm:min-w-3xs pb-1 h-10 rounded-3xl bg-blue-800">
                Numbers
              </button>
              <button className="cursor-pointer bg-blue-300 text-gray-50 min-w-32 sm:min-w-3xs pb-1 h-10 rounded-3xl">
                Icons
              </button>
            </div>
          </div>

          <div className="num_players sm:pb-8">
            <div className="title pb-2 ">
              <h2 className="text-xl text-blue-400 font-bold">
                Number of players
              </h2>
            </div>
            <div className="buttons flex justify-around pt-2 font-bold text-2xl">
              <button className="cursor-pointer bg-blue-300 text-gray-50 text min-w-16  sm:min-w-28 pb-1 h-10 rounded-3xl bg-blue-800">
                1
              </button>
              <button className="cursor-pointer bg-blue-300 text-gray-50 min-w-16  sm:min-w-28 h-10 pb-1 rounded-3xl">
                2
              </button>
              <button className="cursor-pointer bg-blue-300 text-gray-50 min-w-16   sm:min-w-28 h-10 pb-1 rounded-3xl">
                3
              </button>
              <button className="cursor-pointer bg-blue-300 text-gray-50 min-w-16  sm:min-w-28 h-10 pb-1 rounded-3xl">
                4
              </button>
            </div>
          </div>
          <div className="grid_size pb-5 sm:pb-8">
            <div className="title pb-2">
              <h2 className="text-xl text-blue-400 font-bold">Grid Size</h2>
            </div>
            <div className="buttons flex justify-around pt-2 font-bold text-2xl">
              <button className="cursor-pointer bg-blue-300 text-gray-50 text min-w-32 sm:min-w-3xs pb-1 h-10 rounded-3xl bg-blue-800">
                4x4
              </button>
              <button className="cursor-pointer bg-blue-300 text-gray-50 min-w-32 sm:min-w-3xs pb-1 h-10 rounded-3xl">
                6x6
              </button>
            </div>
          </div>
          <div className="start_game pb-5  sm:pb-8 text-2xl ">
            <button className="cursor-pointer bg-orange-400 text-gray-50 w-full pb-1 h-10 rounded-3xl font-bold">
              Start game
            </button>
          </div>
        </div>
      </>
    );
  }
}
