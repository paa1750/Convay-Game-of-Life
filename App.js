import React, {useState, useCallback, useRef} from "react";
import './App.css';

const totalrows = 30;
const totalcol = 70;

const emptyGrid = () => {
  const rows = []
  for (let i = 0; i < totalrows; i++) {
    rows.push(Array.from(Array(totalcol), () => 0))
  }
  return rows
}

const randomGrid = () => {
  const rows = []
  for (let i = 0; i < totalrows; i++) {
    rows.push(Array.from(Array(totalcol), () => (Math.random() > 0.7 ? 1 : 0)))
  }
  return rows
}

const App = () => {
  const [grid, setGrid] = useState(() => {
    return emptyGrid()
  });
  const [running, setRunning] = useState(false)
  const runref = useRef(running)
  runref.current = running

  const simulate = useCallback(
    () => {
      if (!runref.current) {
        return;
      }

      const newgrid = grid.slice()
      for (let i = 0; i < totalrows; i++) {
        for (let j = 0; j < totalcol; j++) {
          let neighbours = 0
          if (i - 1 >= 0) {
            neighbours += grid[i-1][j]
          }
          if (i + 1 < totalrows) {
            neighbours += grid[i+1][j]
          }
          if (j - 1 >= 0) {
            neighbours += grid[i][j-1]
          }
          if (j + 1 < totalcol) {
            neighbours += grid[i][j+1]
          }
          if (i - 1 >= 0 && j + 1 < totalcol) {
            neighbours += grid[i-1][j+1]
          }
          if (i + 1 < totalrows && j + 1 < totalcol) {
            neighbours += grid[i+1][j+1]
          }
          if (i + 1 < totalrows && j - 1 >= 0) {
            neighbours += grid[i+1][j-1]
          }
          if (i - 1 >= 0 && j - 1 >= 0) {
            neighbours += grid[i-1][j-1]
          }

          if (neighbours < 2 || neighbours > 3) {
            newgrid[i][j] = 0;
          } else if (grid[i][j] === 0 && neighbours === 3){
            newgrid[i][j] = 1;
          }
        }
      }
      setGrid(newgrid)

      setTimeout(simulate, 100)
    },
    []
  )
  
  return (
    <>
      <button className="Buttondesign" onClick={() => {
        setRunning(!running)
        if (!running) {
          runref.current = true;
          simulate()
        }
        }}>
          {running ? 'Stop' : "Start"}
      </button>
      <button className="Buttondesign" onClick={() => setGrid(emptyGrid())}>
          Empty Grid
      </button>
      <div className="App" style={{display: 'grid', gridTemplateColumns: `repeat(${totalcol}, 20px)`}}>
        {grid.map((rows, i) => 
          rows.map((col, k) => 
          <div key={`${i}-${k}`} 
            onClick={() => {
              const newgrid = grid.slice()
              newgrid[i][k] = grid[i][k] ? 0 : 1
              setGrid(newgrid)
            }} 
            style={{width: 20, height: 20, backgroundColor: grid[i][k] ? 'black': undefined, 
            border: "solid 0.5px black"}}>

          </div>))}
      </div>
    </>
  );
}

export default App;
