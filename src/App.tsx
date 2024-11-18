import Board from "./components/board";

import github from "./assets/github.png";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-white bg-zinc-900 relative">
      <h1 className="text-[44px] font-medium mb-6 select-none">
        Sudoku Solver
      </h1>
      <hr className="border-zinc-700 w-1/3 mb-6" />
      <Board />
      <footer className="flex flex-col-reverse items-center justify-center absolute bottom-0 w-full h-28 gap-4 z-50 overflow-hidden">
        <span className="text-sm text-gray-900 dark:text-gray-200">
          © 2024 Created by Ahmet Furkan Meriç
        </span>
        <a
          href="https://github.com/AhmetFM"
          target="_blank"
          className="hover:bg-zinc-700 duration-300 p-2 rounded-full"
        >
          <img src={github} alt="github" width={24} height={24} />
        </a>
      </footer>
    </div>
  );
}

export default App;
