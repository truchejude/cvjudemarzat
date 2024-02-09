export function generateComplexMaze(rows, cols) {
    // Créer un tableau vide pour stocker le labyrinthe
    let maze = [];

    // Initialiser le labyrinthe avec des passages
    for (let i = 0; i < rows; i++) {
        maze[i] = [];
        for (let j = 0; j < cols; j++) {
            maze[i][j] = 0; // 0 représente un passage
        }
    }

    // Fonction pour creuser des passages
    function digPassages(row, col) {
        maze[row][col] = 1; // Marquer la cellule comme visitée
        let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right
        // Mélanger les directions pour choisir aléatoirement
        directions.sort(() => Math.random() - 0.5);
        for (let direction of directions) {
            let newRow = row + direction[0] * 2; // Nouvelle ligne
            let newCol = col + direction[1] * 2; // Nouvelle colonne
            // Vérifier si la nouvelle cellule est valide
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && maze[newRow][newCol] === 0) {
                maze[row + direction[0]][col + direction[1]] = 1; // Marquer le passage
                digPassages(newRow, newCol); // Récursion pour continuer à creuser
            }
        }
    }

    // Choisir une cellule aléatoire pour commencer
    let startRow = Math.floor(Math.random() * (rows / 2)) * 2; // Pour s'assurer que nous commençons sur une cellule impaire
    let startCol = Math.floor(Math.random() * (cols / 2)) * 2; // Pour s'assurer que nous commençons sur une cellule impaire

    // Commencer à creuser des passages
    digPassages(startRow, startCol);
    if (rows > 1 && cols > 1) {
        maze[0][0] = 0
        maze[1][0] = 0
        maze[0][1] = 0
        maze[rows - 1][cols - 1] = 0
        maze[rows - 2][cols - 1] = 0
        maze[rows - 1][cols - 2] = 0
    }
    let mazeCpy = maze.map(row => [...row]);

    function contamination(y, x) {
        if (y >= 0 && y < rows && x >= 0 && x < cols && mazeCpy[y][x] === 0) {
            mazeCpy[y][x] = 2
            contamination(y + 1, x)
            contamination(y - 1, x)
            contamination(y, x + 1)
            contamination(y, x - 1)
            return true
        }
    }
    contamination(rows - 1, cols - 1)

    function wallToBreak(y, x) {
        if (y >= 0 && y < rows && x >= 0 && x < cols) {
            if (y + 1 < rows && y - 1 >= 0) {
                if (mazeCpy[y - 1][x] !== mazeCpy[y + 1][x] && mazeCpy[y - 1][x] !== 1 && mazeCpy[y + 1][x] !== 1) {
                    return true
                }
            }
            if (x + 1 < cols && x - 1 >= 0 && mazeCpy[y][x - 1] !== 1 && mazeCpy[y][x + 1] !== 1) {
                if (mazeCpy[y][x - 1] !== mazeCpy[y][x + 1]) {
                    return true
                }
            }
        }
        return false
    }
    let wallToBreakTab = []

    do {
        wallToBreakTab = []

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (mazeCpy[i][j] === 1)
                    if (wallToBreak(i, j)) {
                        wallToBreakTab.push({ row: i, col: j })
                    }
            }
        }
        if (wallToBreakTab.length === 0)
            break
        const wallToBreakTabElement = wallToBreakTab[Math.floor(Math.random() * wallToBreakTab.length)]
        mazeCpy[wallToBreakTabElement.row][wallToBreakTabElement.col] = 0
        maze[wallToBreakTabElement.row][wallToBreakTabElement.col] = 0
        contamination(wallToBreakTabElement.row, wallToBreakTabElement.col)
    } while (wallToBreakTab.length !== 0)
    return maze;
}