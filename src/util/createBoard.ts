import { Accessor, createSignal } from "solid-js";

export type Direction = [number, number];

export type Player = "player1" | "player2";
export type TileType = "S" | "O" | "";
export type TileTypePlayable = Exclude<TileType, "">;
export type TileData = { player?: Player; type: TileTypePlayable };

export type BoardStorage = TileData[][];
export type BoardStorageNullable = (TileData | null)[][];

export function createBoard(width: number, height: number) {
	const [storage, setStorage] = createSignal<BoardStorage>([]);
	const [currentPlayer, setCurrentPlayer] = createSignal<Player>("player1");
	const [points, setPoints] = createSignal({ player1: 0, player2: 0 });

	function initializeBoard(): void {
		setStorage(
			Array.from({ length: height }, () => Array(width).fill({ player: undefined, type: "" }))
		);
	}

	function play(x: number, y: number, type: TileTypePlayable) {
		assertCanPlay(x, y);

		setStorage((curr) => {
			curr[x][y] = { player: currentPlayer(), type };
			return [...curr];
		});

		const points = type === "S" ? handleS(x, y) : handleO(x, y);
		if (points === 0) {
			setCurrentPlayer(currentPlayer() === "player1" ? "player2" : "player1");
		}

		setPoints((curr) => {
			curr[currentPlayer()] += points;
			return { ...curr };
		});
	}

	function assertCanPlay(x: number, y: number) {
		if (x < 0 || x >= width || y < 0 || y >= height) {
			throw new Error("Coordinates are out of bounds");
		}

		if (storage()[x][y].player) {
			throw new Error("Tile already played");
		}
	}

	/**
	 * In each direction, we check if there is an O
	 * If there is, we continue in that direction and check for an S
	 * If there is, point
	 * If not, no point
	 * @param x
	 * @param y
	 */
	function handleS(x: number, y: number): number {
		const directions: Array<Direction> = [
			[1, 0],
			[1, 1],
			[0, 1],
			[-1, 1],
			[-1, 0],
			[0, -1],
			[-1, -1],
			[1, -1],
		];

		const tilesToCheck = getSubmatrix(x, y, 2);
		const [centerX, centerY] = getMatrixCenter(tilesToCheck);
		let points = 0;

		const getCheck = (dir: Direction) => [centerX + dir[0], centerY + dir[1]];

		for (const direction of directions) {
			const [checkX, checkY] = getCheck(direction);

			if (tilesToCheck[checkX][checkY]?.type === "O") {
				const rDirection = doubleDirection(direction);
				const [rcheckX, rcheckY] = getCheck(rDirection);

				if (tilesToCheck[rcheckX][rcheckY]?.type === "S") {
					points++;
				}
			}
		}

		return points;
	}

	/**
	 * In each direction, we check if there is an S
	 * If there is, go the opposite direction and check for another S
	 * If there is, point
	 * If not, no point.
	 * @param x
	 * @param y
	 */
	function handleO(x: number, y: number): number {
		const directions: Array<Direction> = [
			[1, 0],
			[1, 1],
			[0, 1],
			[-1, 1],
		];
		const tilesToCheck = getSubmatrix(x, y, 1);
		const [centerX, centerY] = getMatrixCenter(tilesToCheck);

		let points = 0;

		const getCheck = (dir: Direction) => [centerX + dir[0], centerY + dir[1]];

		for (const direction of directions) {
			const [checkX, checkY] = getCheck(direction);

			if (tilesToCheck[checkX][checkY]?.type === "S") {
				const rDirection = reverseDirection(direction);
				const [rcheckX, rcheckY] = getCheck(rDirection);

				if (tilesToCheck[rcheckX][rcheckY]?.type === "S") {
					points++;
				}
			}
		}

		return points;
	}

	function getSubmatrix(x: number, y: number, size: number): BoardStorageNullable {
		const arr = storage();
		const start_x = x - size;
		const end_x = x + size + 1;
		const start_y = y - size;
		const end_y = y + size + 1;
		const submatrix: BoardStorageNullable = [];
		for (let i = start_x; i < end_x; i++) {
			const row: (TileData | null)[] = [];
			for (let j = start_y; j < end_y; j++) {
				if (i < 0 || i >= arr.length || j < 0 || j >= arr[0].length) {
					row.push(null);
				} else {
					row.push(arr[i][j]);
				}
			}
			submatrix.push(row);
		}
		return submatrix;
	}

	function getMatrixCenter(matrix: unknown[][]): number[] {
		const rows = matrix.length;
		const cols = matrix[0].length;
		const centerX = Math.floor(cols / 2);
		const centerY = Math.floor(rows / 2);
		return [centerX, centerY];
	}

	function reverseDirection(direction: Direction): Direction {
		const [a, b] = direction;
		if (Math.abs(a) === 1 && Math.abs(b) === 1) {
			if (a === b) {
				return [b * -1, a * -1];
			}

			return [b, a];
		}

		return [a * -1, b * -1];
	}

	function doubleDirection(direction: Direction): Direction {
		const [a, b] = direction;
		return [a * 2, b * 2];
	}

	initializeBoard();

	return {
		storage,
		play,
		currentPlayer,
		points,
		assertCanPlay,
	};
}
