import { Player } from "~/util/createBoard";

export interface ScoreTilesProps {
	currentPlayer: Player;
	points: { player1: number; player2: number };
}

export function ScoreTiles(props: ScoreTilesProps) {
	return (
		<div class="flex items-center gap-x-8 text-3xl font-bold">
			<div
				class="flex rounded-lg text-zinc-500"
				classList={{ "border-2 border-p1-primary": props.currentPlayer === "player1" }}
			>
				<span
					class=" px-4 py-2"
					classList={{ "bg-p1-primary text-white": props.currentPlayer === "player1" }}
				>
					PLAYER 1
				</span>
				<span
					class="py-2 px-4"
					classList={{ "text-p1-primary": props.currentPlayer === "player1" }}
				>
					{props.points.player1}
				</span>
			</div>
			<span class="text-zinc-500">-</span>
			<div
				class="flex rounded-lg text-zinc-500"
				classList={{ "border-2 border-p2-primary": props.currentPlayer === "player2" }}
			>
				<span
					class="py-2 px-4"
					classList={{ "text-p2-primary": props.currentPlayer === "player2" }}
				>
					{props.points.player2}
				</span>
				<span
					class="px-4 py-2 "
					classList={{ "bg-p2-primary text-white": props.currentPlayer === "player2" }}
				>
					PLAYER 2
				</span>
			</div>
		</div>
	);
}
