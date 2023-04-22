import { Player, TileTypePlayable } from "~/util/createBoard";
import clickOutside from "../directives/clickOutside.directive";
clickOutside;

export interface TileTypeSelectionModalProps {
	currentPlayer: Player;
	onClickOutside: () => void;
	play: (type: TileTypePlayable) => void;
}

export function TileTypeSelectionModal(props: TileTypeSelectionModalProps) {
	const { currentPlayer, play, onClickOutside } = props;
	return (
		<div class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/90 z-50">
			<div
				class="flex items-center gap-6 bg-zinc-900 px-8 py-6 rounded-lg shadow-md"
				use:clickOutside={onClickOutside}
			>
				<Button type="S" currentPlayer={currentPlayer} onClick={() => play("S")} />
				<span class="text-xl text-zinc-500">or</span>
				<Button type="O" currentPlayer={currentPlayer} onClick={() => play("O")} />
			</div>
		</div>
	);
}

interface Button {
	type: TileTypePlayable;
	currentPlayer: Player;
	onClick: () => void;
}

function Button(props: Button) {
	const { type, currentPlayer, onClick } = props;
	return (
		<button
			class="bg-blue-500 w-16 h-16 text-4xl font-bold rounded-md text-zinc-50 hover:scale-110 transition-all duration-200"
			classList={{
				"bg-p1-primary": currentPlayer === "player1",
				"bg-p2-primary": currentPlayer === "player2",
			}}
			onClick={onClick}
		>
			{type}
		</button>
	);
}
