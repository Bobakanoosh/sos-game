import { Player } from "~/util/createBoard";

export interface ScoreTilesProps {
	currentPlayer: Player;
	points: { player1: number; player2: number };
}

export function ScoreTiles(props: ScoreTilesProps) {
	return (
		<div class="flex items-center gap-4 text-lg md:text-xl md:gap-x-8 lg:text-2xl xl:text-3xl font-bold">
			<div
				class="flex items-center rounded-lg text-zinc-500"
				classList={{ "border-2 border-p1-primary": props.currentPlayer === "player1" }}
			>
				<span
					class="px-3 py-0.5 sm:px-4 sm:py-2"
					classList={{ "bg-p1-primary text-white": props.currentPlayer === "player1" }}
				>
					PLAYER 1
				</span>
				<span
					class="px-3 py-0.5 sm:px-4 sm:py-2"
					classList={{ "text-p1-primary": props.currentPlayer === "player1" }}
				>
					{props.points.player1}
				</span>
			</div>
			<span class="text-zinc-500">-</span>
			<div
				class="flex items-center rounded-lg text-zinc-500 border-2 border-zinc-800"
				classList={{ "border-p2-primary": props.currentPlayer === "player2" }}
			>
				<span
					class="px-3 py-0.5 sm:px-4 sm:py-2"
					classList={{ "text-p2-primary": props.currentPlayer === "player2" }}
				>
					{props.points.player2}
				</span>
				<span
					class="px-3 py-0.5 sm:px-4 sm:py-2 text-zinc-500 bg-zinc-800"
					classList={{ "!bg-p2-primary text-white": props.currentPlayer === "player2" }}
				>
					PLAYER 2
				</span>
			</div>
		</div>
	);
}
