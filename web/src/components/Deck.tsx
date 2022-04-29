import { Box, Text } from "@chakra-ui/react";

interface DeckProps {
    deckCount: number;
}

export const Deck = ({ deckCount }: DeckProps) => {
    return (
        // eslint-disable-next-line max-len
        <Box width="157px" height="220px" borderRadius="4px" background="gray.500" position="relative" overflow="hidden">
            <Box
                clipPath="polygon(0 0, 0 25%, 33% 0)"
                width="100%"
                height="100%"
                backgroundColor="main.primaryOrange"
                borderRadius="4px"
                position="absolute"
                top="-1px"
                left="-1px"
                padding="6px 0 0 6px"
            >
                <Text as="span" color="main.darkPurple">
                    {deckCount}
                </Text>
            </Box>
        </Box>
    );
};