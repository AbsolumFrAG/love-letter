import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader } from "@chakra-ui/react";
import { useGameState } from "../contexts/GameStateContext";
import { CharacterCard } from "./CharacterCard";
import { Label } from "./Label";

interface DiscardDrawerProps {
    open: boolean;
    onClose: () => void;
}

export const DiscardDrawer = ({ open, onClose }: DiscardDrawerProps) => {
    const { discard } = useGameState();

    return (
        <Drawer isOpen={open} onClose={onClose} placement="right" closeOnOverlayClick={false}>
            <DrawerContent backgroundColor="main.lightPurple">
                <DrawerCloseButton right="auto" left="3" />
                <DrawerHeader paddingBottom="3">
                    <Label>Pile de défausse</Label>
                    <Label>Haut</Label>
                </DrawerHeader>
                { }
                { }
                <DrawerBody display="flex" flexDirection="column" gap="3" alignItems="center">
                    {discard.map((character, index) => (
                        <CharacterCard key={index} character={character} />
                    ))}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};