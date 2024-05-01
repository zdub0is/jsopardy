"use client";
import React from "react";
import {Card, CardBody, Modal, ModalBody, ModalContent, useDisclosure} from "@nextui-org/react";

interface TileProps {
    point: number;
    id: number;
    active: boolean;
    handleTilePress: (id: number) => void;
}

export const Tile = ({point, id, active, handleTilePress}: TileProps) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const handlePress = () => {
        handleTilePress(id);
        onOpen();
    };
    return (
        <>
        {active ? <Card isPressable isBlurred onPress={() => handleTilePress(id)} className="border-none bg-background/60  dark:bg-default-100/50 max-w-[610px] "
        shadow="sm">
            <CardBody className="flex flex-col items-center justify-center hover:bg-foreground/10">
                <div className="text-2xl font-bold px-9 py-3">
                    {point}
                </div>
            </CardBody>
        </Card>
        :
        <Card className="border-none bg-background/90  dark:bg-default-100/25 max-w-[610px] "
        shadow="sm">
            <CardBody className="flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-zinc-600 px-9 py-3">
                    {point}
                </div>
            </CardBody>
        </Card>
    }   
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalContent>
                {(onClose) => (<>
                <ModalBody>
                    <h1>Modal Content</h1>
                </ModalBody>
                </>
                )}
            </ModalContent>
        </Modal>
        </>
    );
};