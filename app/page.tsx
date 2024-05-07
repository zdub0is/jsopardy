"use client";

import React from "react";
/**
 * This page is for creating a new game of Jeopardy. It will allow the user to select a set of categories and questions to use for the game. 
 * The user will be able to select the number of teams and the names of the teams.
 */

import { GameboardProvider, useGameboard } from "./providers";
import { Button, Listbox, ListboxSection, ListboxItem, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";


export default function Create() {
    const { categoriesArr, selectedCategories, setSelectedCategories, startGame, finalJeopardies, finalJeopardy, setFinalJeopardy} = useGameboard();
	const selectedValues = React.useMemo(() => Array.from(selectedCategories), [selectedCategories]);
	const router = useRouter();
	const handleClick = () => {
		// startGame and navigate to the gameboard
		startGame();
		router.push('/game');
	}
    return (
        <>
            <h1 className="text-5xl font-bold text-center pt-6">Create a New Game</h1>
            <section className="flex flex-row items-center justify-between gap-4 pt-6 md:pt-6 h-50 min-h-50 max-w-7xl mx-auto">
				<section className="flex flex-row items-top justify-between gap-6 text-2xl">
                <Listbox
                    onChange={(value) => setSelectedCategories(value)}
                    selectionMode="multiple"
                    selectedKeys={selectedCategories}
                    onSelectionChange={setSelectedCategories}
                    className="w-full"
					aria-label='categories'
					
                >
                    <ListboxSection title="Categories">
                        {categoriesArr.map((category: string) => (
                            <ListboxItem key={category} value={category}>
                                {category}
                            </ListboxItem>
                        ))}
                    </ListboxSection>
                </Listbox>
				{/* final jeopardy list, with answer being the main text and then `{category} | {text}` as description */}
				<Listbox
					onChange={(value) => setFinalJeopardy(value)}
					selectionMode="single"
					selectedKeys={finalJeopardy}
					onSelectionChange={setFinalJeopardy}
					className="w-full h-full"
					aria-label='final jeopardy'
				>
					<ListboxSection title="Final Jeopardy">
						{finalJeopardies.map((el: any) => (
							
							<ListboxItem key={el.id} value={el.id} description={`${el.category} | ${el.text}`}>
								{el.answer}
							</ListboxItem>
							
						))}
					</ListboxSection>
				</Listbox>
				</section>
                <Button className="text-2xl py-8 px-4" variant="shadow" color="success" onClick={()=> handleClick()} isDisabled={selectedValues.length !== 6 || (finalJeopardy == null || finalJeopardy.size == 0)}>Start Game</Button>
            </section>
        </>
    );
}