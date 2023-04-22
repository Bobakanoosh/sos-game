import { createSignal } from "solid-js";
import BoardTile from "~/components/BoardTile";
import { ScoreTiles } from "~/components/ScoreTiles";
import { TileTypeSelectionModal } from "~/components/TileTypeSelectionModal";
import { TileTypePlayable, createBoard } from "~/util/createBoard";

const BOARD_SIZE = 10;

export default function Home() {
	const { storage, play, currentPlayer, points, assertCanPlay } = createBoard(
		BOARD_SIZE,
		BOARD_SIZE
	);
	const [playPosition, setPlayPosition] = createSignal<{ x: number; y: number } | null>(null);

	function confirmPlay(tileType: TileTypePlayable) {
		const position = playPosition();
		if (position) {
			const { x, y } = position;
			play(x, y, tileType);
			setPlayPosition(null);
		}
	}

	function boardTileClicked(x: number, y: number) {
		try {
			assertCanPlay(x, y);
			setPlayPosition({ x, y });
		} catch (e) {}
	}

	// TODO finished state
	// TODO restart button

	return (
		<div class="flex flex-col items-center w-screen h-screen bg-zinc-900 text-zinc-50 px-2 py-16  gap-y-4 sm:p-6 md:p-8 md:gap-y-10 md:justify-center">
			{playPosition() && (
				<TileTypeSelectionModal
					currentPlayer={currentPlayer()}
					onClickOutside={() => setPlayPosition(null)}
					play={confirmPlay}
				/>
			)}
			<ScoreTiles currentPlayer={currentPlayer()} points={points()} />
			<div
				class="relative w-full h-[90vw] grid gap-0.5 xl:w-[50vw] xl:h-[50vw]"
				style={{ "grid-template-columns": `repeat(${BOARD_SIZE}, minmax(0, 1fr))` }}
			>
				{storage().map((row, i) =>
					row.map((cell, j) => (
						<>
							<BoardTile
								value={cell}
								currentPlayer={currentPlayer()}
								onClick={() => boardTileClicked(i, j)}
							/>
						</>
					))
				)}
			</div>
		</div>
	);
}
