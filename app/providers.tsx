"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
		</NextUIProvider>
	);
}

// Gameboard context. Team A and Team B scores are stored here, as well as what tiles have been selected.

import { createContext, useContext, useState } from "react";
import notSanitized from "@/data/questions-sample.json";
import { useDisclosure } from "@nextui-org/react";

const sanitize = (data: any) => {
    return data.map((category: any) => {
        const { category: categoryName, ...questions } = category;
        return {
            category: categoryName,
            questions: Object.entries(questions).map(([point, { id, text, answer }]) => ({
                point: Number(point),
                id,
                text,
                answer,
            }),),
        };
    });
};



export const useGameboard = () => {
	const context = useContext(GameboardContext);
	if (!context) {
		throw new Error("useGameboard must be used within a GameboardProvider");
	}
	return context;
};

export const GameboardProvider = ({ children }: { children: React.ReactNode }) => {
	const questions = sanitize(notSanitized);
	const [teamAScore, setTeamAScore] = useState(0);
	const [teamBScore, setTeamBScore] = useState(0);
	const [selectedTiles, setSelectedTiles] = useState([]);
	const [front, setFront] = useState(true);
	const [selectedQuestion, setSelectedQuestion] = useState(null);
	const [winner, setWinner] = useState(null);

	const {isOpen, onOpen, onClose} = useDisclosure();
	const handleTilePress = (id: number) => {
		console.log(id)
		setSelectedTiles([...selectedTiles, id]);
		let questionsArr = questions.reduce((accum, curr) => [...curr.questions, ...accum], [])
        // console.log(questionsArr)
        setSelectedQuestion(questionsArr.find((q) => q.id === id));
		// setSelectedQuestion(question);
	};

	const resetGame = () => {
		setTeamAScore(0);
		setTeamBScore(0);
		setSelectedTiles([]);
		setWinner(null);
	}

	return (
		<GameboardContext.Provider
			value={{
				questions,
				teamAScore,
				setTeamAScore,
				teamBScore,
				setTeamBScore,
				selectedTiles,
				handleTilePress,
				isOpen,
				onOpen,
				onClose,
				front,
				setFront,
				selectedQuestion,
				winner,
				setWinner,
				resetGame
			}}
		>
			{children}
		</GameboardContext.Provider>
	);
};

export const GameboardContext = createContext<any>(null);