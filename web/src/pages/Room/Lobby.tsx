/* eslint-disable max-len */
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    FormControl,
    FormHelperText,
    Heading,
    IconButton,
    List,
    ListItem,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SocketIncoming } from "../../../../server/types/socket.types";
import { useGameState } from "../../contexts/GameStateContext";
import { useRouterContext } from "../../contexts/RouterContext";
import EditIcon from "../../icons/EditIcon";

interface LobbyProps {
    roomCode: string;
}

export const Lobby = ({ roomCode }: LobbyProps) => {
    const { setNewRoomCode } = useRouterContext();
    const { players, currentPlayerId, sendGameUpdate } = useGameState();

    const handleStartGame = () => {
        setNewRoomCode(null);
        sendGameUpdate({ type: SocketIncoming.StartGame });
    };

    return (
        <Box width="full" display="flex" flexDirection="column" gap="4">
            <Heading as="h2" textAlign="center">
                Joueurs
            </Heading>
            <Divider />
            <List>
                {Array.from(players, ([playerId, player]) => (
                    // eslint-disable-next-line max-len
                    <ListItem key={playerId} display="flex" justifyContent="space-between" alignItems="center" height="40px">
                        {playerId === currentPlayerId ? (
                            <>
                                <Text fontWeight="bold">{player.name}</Text>
                                <Tooltip label="Modifier le nom.">
                                    <IconButton
                                        aria-label="Modifier le nom."
                                        as={Link}
                                        to={`/name?roomCode=${roomCode}`}
                                        icon={<EditIcon width="20px" />}
                                        colorScheme="gray"
                                        inset="0"
                                        left="auto"
                                        variant="ghost"
                                        borderRadius="md"
                                        minWidth="auto"
                                        width="30px"
                                        height="30px"
                                    />
                                </Tooltip>
                            </>
                        ) : (
                            <Text>{player.name}</Text>
                        )}
                    </ListItem>
                ))}
            </List>
            <Divider />
            <FormControl display="flex" flexDirection="column">
                <ButtonGroup flexDirection="row" gap="2">
                    <Button to="/" as={Link} variant="outline" flex="1">
                        Quitter le lobby
                    </Button>
                    <Button disabled={players.size < 2 || players.size > 6} flex="1" onClick={() => handleStartGame()}>
                        Commencer la partie
                    </Button>
                </ButtonGroup>
                <Box textAlign="center">
                    {players.size < 2 && <FormHelperText>Il faut au moins 2 joueurs pour commencer la partie.</FormHelperText>}
                    {players.size > 6 && <FormHelperText>Peut seulement supporter un maximum de 6 joueurs.</FormHelperText>}
                </Box>
            </FormControl>
        </Box>
    );
};