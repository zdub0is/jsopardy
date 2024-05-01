"use client";

import * as React from "react";
import { GameboardContext, useGameboard } from "../providers";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import fjJson from "@/data/fj-sample.json";

export default function FinalJeopardy() {
    const { teamAScore, teamBScore, setWinner } = useGameboard();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [front, setFront] = React.useState(true);

    const handleWinner = (teamA: boolean) => {
        if (teamA) {
            setWinner(true);
        } else {
            setWinner(false);
        }
        onOpenChange();
    }

    return (
        <>
        <Button className="text-2xl py-8 px-4" variant="shadow" color="primary" onClick={onOpen}>Open Final Jeopardy</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full" className="text-4xl py-8 px-4">
            <ModalContent>
            {(onClose) => (
                <>
            <ModalBody className="text-8xl font-bold text-center py-10 leading-relaxed">
                {front ? <h2>{fjJson.question}</h2> : <h2>{fjJson.answer}</h2>}
            </ModalBody>
            <ModalFooter>
                <Button className="text-2xl py-8 px-4" variant="shadow" onClick={() => setFront(!front)}>{front ? "Show Answer" : "Show Question"}</Button>
                <Button className="text-2xl py-8 px-4" variant="shadow" onClick={() => handleWinner(true)}>Team A</Button>
                <Button className="text-2xl py-8 px-4" variant="shadow" onClick={() => handleWinner(false)}>Team B</Button>
            </ModalFooter></>
            )}
            </ModalContent>
        </Modal>
        </>
    )
}