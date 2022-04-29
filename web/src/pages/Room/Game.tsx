import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useGameState } from "../../contexts/GameStateContext";
import { CharacterCard } from "../../components/CharacterCard";
import { Label } from "../../components/Label";
import { Deck } from "../../components/Deck";
import { DiscardDrawer } from "../../components/DiscardDrawer";

export const Game = () => {
    const { deckCount, currentPlayerId, gameState, players, discard } = useGameState();
    const [showDiscardDrawer, setShowDiscardDrawer] = useState<boolean>(false);

    if (!gameState) throw new Error("No game state on the game screen.");

    return (
        <>
            <Heading as="h2" textAlign="center">
                {gameState.playerTurnId === currentPlayerId
                    ? "C'est votre tour !"
                    : `C'est le tour de ${players.get(currentPlayerId)?.name}.`}
            </Heading>
            <Box display="flex" gap="3">
                <Box display="flex" flexDirection="column" gap="1">
                    <Label>Deck</Label>
                    <Deck deckCount={deckCount} />
                </Box>
                <Box display="flex" flexDirection="column" gap="1">
                    <Label>Défausser</Label>
                    <CharacterCard
                        button
                        title="Voir la pile défaussée."
                        character={discard[0]}
                        onClick={() => setShowDiscardDrawer(true)}
                    />
                </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap="1">
                <Label>Vos cartes</Label>
                <Box display="flex" gap="3">
                    {players.get(currentPlayerId)?.cards.map((card, index) => (
                        <CharacterCard key={index} character={card} />
                    ))}
                </Box>
            </Box>
            <DiscardDrawer open={showDiscardDrawer} onClose={() => setShowDiscardDrawer(false)} />
        </>
    );
};