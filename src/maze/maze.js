import React, { useState, useEffect } from 'react';
import { generateComplexMaze } from './generation'

const MazeSolver = ({ rows=10, cols=10, height=400, wight=400}) => {
    const [maze, setMaze] = useState(null);
    const [solution, setSolution] = useState(null);
    const [solutionJust, setSolutionJust] = useState(null);
    const [solutionI, setSolutionI] = useState(null);
    const [redyNoMorSolution, setRedyNoMorSolution] = useState(false);
    const [path, setPath] = useState(null);

    useEffect(() => {
        setSolution(null)
        setSolutionJust(null)
        setSolutionI(null)
        setRedyNoMorSolution(null)
        setPath(null)
    }, [maze]);

    useEffect(() => {
        setMaze(null)
        setSolution(null)
        setSolutionJust(null)
        setSolutionI(null)
        setRedyNoMorSolution(null)
        setPath(null)
    }, [rows, cols]);

    useEffect(() => {
        const newMaze = generateComplexMaze(rows, cols);
        setMaze(newMaze);
        console.log("les taille en px", `wight${wight}`, `rows${rows}`, {width: `${(wight * cols) / 100}px`, height: `${(height * rows) / 100}x`})
    }, [rows, cols, wight, height]);

    const reverseMazePiece = (colIndex, rowIndex) => {
        const mazeCopy = [...maze.map(row => [...row])];

        mazeCopy[rowIndex][colIndex] =
            mazeCopy[rowIndex][colIndex] === 1
                ? 0
                : mazeCopy[rowIndex][colIndex] === 0
                    ? 1
                    : mazeCopy[rowIndex][colIndex];

        setMaze(mazeCopy);
    };

    const solvePath = () => {
        if (path === null) {
            setPath([{ x: 0, y: 0 }])
        } else if (solutionJust !== null && !(path[path.length - 1].x === rows - 1 && path[path.length - 1].y === cols - 1)) {
            const x = path[path.length - 1].x
            const y = path[path.length - 1].y
            if (x + 1 < solutionJust[y].length && solutionJust[y][x + 1] > -1 && solutionJust[y][x + 1] < solutionJust[y][x]) {
                const newPath = [...path.map(point => ({ ...point })), { x: x + 1, y: y }]
                setPath(newPath)
            } else if (x - 1 >= 0 && solutionJust[y][x - 1] > -1 && solutionJust[y][x - 1] < solutionJust[y][x]) {
                const newPath = [...path.map(point => ({ ...point })), { x: x - 1, y: y }]
                setPath(newPath)
            } else if (y + 1 < solutionJust.length && solutionJust[y + 1][x] > -1 && solutionJust[y + 1][x] < solutionJust[y][x]) {
                const newPath = [...path.map(point => ({ ...point })), { x: x, y: y + 1 }]
                setPath(newPath)
            } else if (y - 1 >= 0 && solutionJust[y - 1][x] > -1 && solutionJust[y - 1][x] < solutionJust[y][x]) {
                const newPath = [...path.map(point => ({ ...point })), { x: x, y: y - 1 }]
                setPath(newPath)
            }

        }
    }

    function isInPath(x, y) {
        if (path === null)
            return false
        for (let i = 0; i < path.length; i++) {
            if (x === path[i].x && y === path[i].y) {
                return (true)
            }
        }
        return false
    }

    function bodySnake(x, y) {
        if (path === null)
            return ''
        for (let i = 0; i < path.length; i++) {
            if (x === path[i].x && y === path[i].y) {
                if (i === path.length - 1) {
                    // Téte du serpent
                    if (path.length === 1) {
                        return './sprite/snake/headB.png'
                    }
                    const vector = { x: path[i - 1].x - x, y: path[i - 1].y - y }
                    // direction tete du serpent
                    if (vector.x === -1) {
                        return './sprite/snake/headR.png'
                    } else if (vector.x === 1) {
                        return './sprite/snake/headL.png'
                    } else if (vector.y === 1) {
                        return './sprite/snake/headT.png'
                    } else if (vector.y === -1) {
                        return './sprite/snake/headB.png'
                    }
                } else if (i >= 1) {
                    // corp du serpent
                    const vector = { x: path[i - 1].x - x, y: path[i - 1].y - y }
                    const vectorP = { x: path[i + 1].x - x, y: path[i + 1].y - y }
                    // direction tete du serpent
                    if (vector.x === -1 && vector.y === 0 && vectorP.x === 1 && vectorP.y === 0) {
                        return './sprite/snake/bodyLR.png'
                    } else if (vector.x === 1 && vector.y === 0 && vectorP.x === -1 && vectorP.y === 0) {
                        return './sprite/snake/bodyLR.png'
                    } else if (vector.y === 1 && vector.x === 0 && vectorP.x === 0 && vectorP.y === -1) {
                        return './sprite/snake/bodyTB.png'
                    } else if (vector.y === -1 && vector.x === 0 && vectorP.x === 0 && vectorP.y === 1) {
                        return './sprite/snake/bodyTB.png'
                    }
                    else if (vector.x === -1 && vector.y === 0 && vectorP.x === 0 && vectorP.y === 1) {
                        return './sprite/snake/bodyBL.png' // lui c sur
                    } else if (vector.x === -1 && vector.y === 0 && vectorP.x === 0 && vectorP.y === -1) {
                        return './sprite/snake/bodyLT.png' // lui c sur
                    } else if (vector.x === 1 && vector.y === 0 && vectorP.x === 0 && vectorP.y === -1) {
                        return './sprite/snake/bodyTR.png' // lui c sur
                    } else if (vector.y === 1 && vector.x === 0 && vectorP.x === 1 && vectorP.y === 0) {
                        return './sprite/snake/bodyBR.png' // lui c sur
                    } else if (vector.y === -1 && vector.x === 0 && vectorP.x === -1 && vectorP.y === 0) {
                        return './sprite/snake/bodyLT.png' // lui c sur
                    } else if (vector.y === -1 && vector.x === 0 && vectorP.x === 1 && vectorP.y === 0) {
                        return './sprite/snake/bodyTR.png' // lui c sur
                    } else if (vector.y === 1 && vector.x === 0 && vectorP.x === -1 && vectorP.y === 0) {
                        return './sprite/snake/bodyBL.png' // lui c sur
                    } else if (vector.x === 1 && vector.y === 0 && vectorP.x === 0 && vectorP.y === 1) {
                        return './sprite/snake/bodyBR.png' // lui c sur
                    }
                    return './logo192.png'
                }
                if (i === 0) {
                    const vector = { x: path[i + 1].x - x, y: path[i + 1].y - y }
                    if (vector.x === 1) {
                        return ('./sprite/snake/tailL.png')
                    }
                    return ('./sprite/snake/tailT.png')
                }
            }
        }
        return ''
    }

    const solveMaze = () => {
        if (maze === null)
            return
        const mazeCopy = [...maze.map(row => [...row])];

        for (let i = 0; i < mazeCopy.length; i++) {
            for (let j = 0; j < mazeCopy[i].length; j++) {
                mazeCopy[i][j] = mazeCopy[i][j] === 1 ? -1 : 0;
            }
        }
        mazeCopy[rows - 1][cols - 1] = 1

        function aplusSolver(mazeToSolve, nbr) {
            let boolDamelioration = 0;

            for (let i = 0; i < mazeToSolve.length; i++) {
                for (let j = 0; j < mazeToSolve[i].length; j++) {
                    if (mazeToSolve[i][j] === nbr) {
                        boolDamelioration = 1;
                        if (i + 1 < mazeToSolve.length && mazeToSolve[i + 1][j] === 0)
                            mazeToSolve[i + 1][j] = nbr + 1
                        if (i - 1 >= 0 && mazeToSolve[i - 1][j] === 0)
                            mazeToSolve[i - 1][j] = nbr + 1
                        if (j + 1 < mazeToSolve[i].length && mazeToSolve[i][j + 1] === 0)
                            mazeToSolve[i][j + 1] = nbr + 1
                        if (j - 1 >= 0 && mazeToSolve[i][j - 1] === 0)
                            mazeToSolve[i][j - 1] = nbr + 1
                    }
                }
            }
            if (boolDamelioration === 0) {
                setRedyNoMorSolution(true)
            }
            if (solutionJust === null && mazeToSolve[0][0] !== 0) {
                setSolutionJust(mazeToSolve)
            }
            return (mazeToSolve)
        }
        if (solution === null) {
            setSolutionI(1)
            setSolution(aplusSolver(mazeCopy, 1));
        } else {
            setSolution(aplusSolver(solution, solutionI + 1));
            setSolutionI(solutionI + 1)
        }
    };

    function generateGradientColor(index) {
        if (index === 0)
            return ('gray')
        const hue = (index - 1) * 2;

        const color = `hsl(${hue}, 100%, 50%)`;
        return color;
    }



    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!redyNoMorSolution)
                solveMaze()
            else {
                solvePath()
            }
        }, 20);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line
    }, [solveMaze, redyNoMorSolution]);

    return (
        <div>
            {maze !== null && (
                <div style={{ display: 'flex', backgroundColor: 'black', width: `${wight}px`, height: `${height}px`}}>
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${maze[0].length}, ${(wight / cols)}px)` }}>
                        {maze.map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <div
                                    onClick={() => reverseMazePiece(colIndex, rowIndex)}
                                    key={`${rowIndex}-${colIndex}`}
                                    style={{
                                        display: 'flex',
                                        width: `${(wight / cols)}px`,
                                        height: `${(height / rows)}px`,
                                        backgroundColor: cell === 1 ? 'black' : solution === null ? 'white' : generateGradientColor(solution[rowIndex][colIndex]),
                                    }}
                                >
                                    {isInPath(colIndex, rowIndex) &&
                                        <img alt='snake body' style={{ width: '100%', height: '100%', objectFit: 'fill'}} src={bodySnake(colIndex, rowIndex)} />
                                    }
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MazeSolver;
