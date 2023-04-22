import { onCleanup } from "solid-js";

export default function clickOutside(el: Element, accessor: () => () => unknown) {
	const onClick = (e: any) => !el.contains(e.target) && accessor()?.();
	document.body.addEventListener("click", onClick);
	onCleanup(() => document.body.removeEventListener("click", onClick));
}

declare module "solid-js" {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface DirectiveFunctions {
			clickOutside: typeof clickOutside;
		}
	}
}
