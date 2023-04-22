import { Player, TileData } from "~/util/createBoard";

export interface BoardTileProps {
	value: TileData;
	currentPlayer: Player;
	onClick: () => void;
}

export default function BoardTile(props: BoardTileProps) {
	return (
		<button
			class="relative w-full h-full border rounded-lg transition-all md:border-2 xl:border-4"
			classList={{
				"hover:bg-p1-primary/10":
					props.value.player === undefined && props.currentPlayer === "player1",
				"hover:bg-p2-primary/10":
					props.value.player === undefined && props.currentPlayer === "player2",
				"border-zinc-800": props.value.player === undefined,
				"border-p1-primary text-p1-primary hover:bg-p1-primary/10":
					props.value.player === "player1",
				"border-p2-primary text-p2-primary hover:bg-p2-primary/10":
					props.value.player === "player2",
			}}
			onClick={props.onClick}
		>
			<span class="absolute top-0 left-0 w-full h-full flex justify-center items-center text-2xl sm:text-3xl md:text-4xl font-bold">
				{props.value.type}
			</span>
		</button>
	);
}
