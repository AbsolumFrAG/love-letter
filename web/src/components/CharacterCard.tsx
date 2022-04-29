import { Box, BoxProps, Text } from "@chakra-ui/react";
import { Card } from "../../../server/types/types";

interface CharacterCardProps extends BoxProps {
    character?: Card | "Hidden";
    button?: boolean;
}

const Characters = [
    "Espion",
    "Garde",
    "Prêtre",
    "Baron",
    "Soubrette",
    "Prince",
    "Chancellier",
    "Roi",
    "Comtesse",
    "Princesse",
];

export const CharacterCard = ({ character = "Hidden", button, ...rest }: CharacterCardProps) => {
    return (
        <Box
            as={button ? "button" : undefined}
            width="157px"
            height="220px"
            borderRadius="4px"
            background="gray.500"
            display="grid"
            placeItems="center"
            {...rest}
        >
            {character !== "Hidden" ? (
                <Text fontWeight="bold" color="black">
                    {Characters[character]} - {character}
                </Text>
            ) : null}
        </Box>
    );
};