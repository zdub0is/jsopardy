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

import { createContext, useContext, useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { loadCategories, loadCategory, loadFinalJeopardy } from "./utils/loadFiles";


export const useGameboard = () => {
	const context = useContext(GameboardContext);
	if (!context) {
		throw new Error("useGameboard must be used within a GameboardProvider");
	}
	return context;
};
interface Question {
	id: string;
	text: string;
	answer: string;
	point: number;
}
export const GameboardProvider = ({ children }: { children: React.ReactNode }) => {

	const [categories, setCategories] = useState([]);
	const [finalJeopardies, setFinalJeopardies] = useState([]);
	const categoriesArr = categories.map((c: {name: string}) => c.name);
	const [finalJeopardy, setFinalJeopardy] = useState(null);
	const [questions, setQuestions] = useState<Array<Question[]>>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [teamAScore, setTeamAScore] = useState(0);
	const [teamBScore, setTeamBScore] = useState(0);
	const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
	const [front, setFront] = useState(true);
	const [selectedQuestion, setSelectedQuestion] = useState(null);
	const [winner, setWinner] = useState(null);
	const categoriesToLoad = React.useMemo(() => Array.from(selectedCategories), [selectedCategories]);

	const {isOpen, onOpen, onClose} = useDisclosure();

	useEffect(() => {
		loadCategories().then(setCategories);
		loadFinalJeopardy().then(setFinalJeopardies);
	  }, []);
	const handleTilePress = (id: string) => {
		setSelectedTiles([...selectedTiles, id]);
		// let questionsArr = questions.reduce((accum: Question[], curr: {questions: Question[]}) => [...curr.questions, ...accum], [])
		let questionsArr = questions.flat();
        // console.log(questionsArr)
		//@ts-ignore
        setSelectedQuestion(questionsArr.find((q: Question) => q.id === id));
		// setSelectedQuestion(question);
	};

	const resetGame = () => {
		setTeamAScore(0);
		setTeamBScore(0);
		setSelectedTiles([]);
		setQuestions([]);
		setFront(true);
		setSelectedCategories([]);
		setWinner(null);
	}

	const startGame = async () => {
		setQuestions([]);
		
		categoriesToLoad.forEach((category: string) => {
			loadCategoryQuestions(category);
		});
		// send to /game


	}

	const loadCategoryQuestions = async (category: string) => {
		//@ts-ignore
		const questionsFind = await loadCategory(categories.find((c: {name: string}) => c.name === category).file);
		setQuestions(prev => [...prev, questionsFind]);
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
				resetGame,
				loadCategoryQuestions,
				categoriesArr,
				selectedCategories,
				setSelectedCategories,
				finalJeopardies,
				finalJeopardy,
				setFinalJeopardy,
				startGame,
				categoriesToLoad
			}}
		>
			{children}
		</GameboardContext.Provider>
	);
};

export const GameboardContext = createContext<any>(null);