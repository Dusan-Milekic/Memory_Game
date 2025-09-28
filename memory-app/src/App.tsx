import Settings from "./components/Settings";

function App() {
  return (
    <>
      <div className="flex  flex-col justify-center items-center h-dvh">
        <h1 className="pb-10 text-3xl">Memory Settings</h1>
        <Settings></Settings>
      </div>
    </>
  );
}

export default App;
