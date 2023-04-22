import { Accessor, Signal, createSignal } from "solid-js";

type Tile = "S" | "O" | "";
type TilePlayable = Exclude<Tile, "">;

type BoardStorage = Tile[][];

export class Board {
	private _storage: BoardStorage = [];
	private storageSignal: Signal<BoardStorage> = createSignal([]);
	public storage: Accessor<BoardStorage> = this.storageSignal[0];

	constructor(public width: number, public height: number) {
		this.initializeBoard();
	}

	private initializeBoard(): void {
		this._storage = Array.from({ length: this.height }, () => Array(this.width).fill(""));
		this.syncStorage();
	}

	public play(x: number, y: number, type: TilePlayable): boolean {
		if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
			throw new Error("Coordinates are out of bounds");
		}

		if (this._storage[y][x] !== "") {
			throw new Error("Tile already played");
		}

		this._storage[y][x] = type;
		this.syncStorage();
		return this.checkSOS(x, y, type);
	}

	private checkSOS(x: number, y: number, type: TilePlayable): boolean {
		const directions = [
			{ x: 1, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 1, y: -1 },
		];

		for (const direction of directions) {
			const firstTile1 = this.getTile(x + direction.x, y + direction.y);
			const secondTile1 = this.getTile(x + direction.x * 2, y + direction.y * 2);

			const firstTile2 = this.getTile(x - direction.x, y - direction.y);
			const secondTile2 = this.getTile(x - direction.x * 2, y - direction.y * 2);

			if ((firstTile1 === "O" && secondTile1 === type) || (firstTile2 === "O" && secondTile2 === type)) {
				return true;
			} else if (type === "O" && ((firstTile1 === "S" && secondTile1 === "S") || (firstTile2 === "S" && secondTile2 === "S"))) {
				return true;
			}
		}

		return false;
	}

	private getTile(x: number, y: number): Tile | null {
		if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
			return this._storage[y][x];
		}

		return null;
	}

	private syncStorage() {
		const [_, setStorage] = this.storageSignal;
		setStorage(this._storage);
		console.log("syncing storage", this.storage());
	}
}
