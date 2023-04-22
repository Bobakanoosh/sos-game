import { createSignal } from "solid-js";
import BoardTile from "~/components/BoardTile";
import { ScoreTiles } from "~/components/ScoreTiles";
import { TileTypeSelectionModal } from "~/components/TileTypeSelectionModal";
import { TileTypePlayable, createBoard } from "~/util/createBoard";

const BOARD_SIZE = 10;

export default function Home() {
	const { storage, play, currentPlayer, points } = createBoard(BOARD_SIZE, BOARD_SIZE);
	const [playPosition, setPlayPosition] = createSignal<{ x: number; y: number } | null>(null);

	function confirmPlay(tileType: TileTypePlayable) {
		const position = playPosition();
		if (position) {
			const { x, y } = position;
			play(x, y, tileType);
			setPlayPosition(null);
		}
	}

	return (
		<div class="flex flex-col gap-y-10 justify-center items-center w-screen h-screen bg-zinc-900 text-zinc-50">
			{playPosition() && (
				<TileTypeSelectionModal
					currentPlayer={currentPlayer()}
					onClickOutside={() => setPlayPosition(null)}
					play={confirmPlay}
				/>
			)}
			<ScoreTiles currentPlayer={currentPlayer()} points={points()} />
			<div
				class="relative w-[1000px] h-[1000px] grid gap-0.5"
				style={{ "grid-template-columns": `repeat(${BOARD_SIZE}, minmax(0, 1fr))` }}
			>
				{storage().map((row, i) =>
					row.map((cell, j) => (
						<>
							<BoardTile
								value={cell}
								currentPlayer={currentPlayer()}
								onClick={() => setPlayPosition({ x: i, y: j })}
							/>
						</>
					))
				)}
			</div>
		</div>
	);
}
