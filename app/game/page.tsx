"use client";

import Gameboard from "../components/gameboard";
import { GameboardProvider, useGameboard } from "../providers";
import Scoreboard from "../components/scoreboard";
import FinalJeopardy from "../components/finaljeopardy";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

// We're making jeopardy! We need a set of tiles to represent the points, where each tile is clickable and has a point value. We also need a way to keep track of the points and the selected tiles.
export default function Home() {
	const { winner, setWinner, resetGame, categoriesToLoad } = useGameboard();
	const router = useRouter();
	return (
		<>
		{winner == null ? (
			<>
			{categoriesToLoad.length == 0 ? <div className="flex flex-col items-center gap-4">
                    <h1 className="text-4xl font-bold">No Categories. Go Back?</h1>
                    <Button color="primary" variant="shadow" onClick={() => router.push('/')}>Go Back</Button>
                </div> :
				<section className="flex flex-row items-center justify-around gap-20 pt-6 md:pt-6">
			<section className="flex flex-row items-center justify-between gap-6 flex-grow">
				<Gameboard />
				
			</section>
			<section className="flex flex-col gap-6 justify-around items-center">
				<Scoreboard />
				<FinalJeopardy />
			</section>
		</section>
			}
			</>
		)
			: (
			<section className="flex flex-row items-center justify-between gap-4 pt-6 md:pt-6">
				<h1 className="text-4xl font-bold text-center">{winner ? "Team A Wins!" : "Team B Wins!"}</h1>
				<Button className="text-2xl py-8 px-4" variant="shadow" color="success" onClick={() => resetGame()}>Play Again</Button>
			</section>
		)}
		</>
	);
}
