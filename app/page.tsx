"use client";
import { useState } from "react";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Tile } from "@/app/components/tile";

import questions from "@/data/questions-sample.json"
import Gameboard from "./components/gameboard";
import { GameboardProvider, useGameboard } from "./providers";
import Scoreboard from "./components/scoreboard";
import FinalJeopardy from "./components/finaljeopardy";
import { Button } from "@nextui-org/button";

// We're making jeopardy! We need a set of tiles to represent the points, where each tile is clickable and has a point value. We also need a way to keep track of the points and the selected tiles.
export default function Home() {
	const { winner, setWinner, resetGame } = useGameboard();
	return (
		<>
		{winner == null ? (
			<>
			<section className="flex flex-row items-center justify-between gap-4 pt-6 md:pt-6">
				<Gameboard />
				<Scoreboard />
			</section>
			<section className="flex flex-row items-center justify-around gap-6">
				<FinalJeopardy />
			</section>
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
