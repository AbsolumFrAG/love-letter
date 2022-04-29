import { useEffect, useState } from "react";
import { Text, Box, PinInput, PinInputField, Collapse, Alert, AlertIcon, Button, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppbarText } from "../hooks/useAppbarText";
import { useRouterContext } from "../contexts/RouterContext";
import { get } from "../utils/get";
import { useDocTitle } from "../hooks/useDocTitle";

export const Home = () => {
    const navigate = useNavigate();
    useAppbarText("Love Letter");
    useDocTitle();
    const { setNewRoomCode } = useRouterContext();

    const [roomCode, setRoomCode] = useState<string>("");
    const [error, setError] = useState<"invalidRoom" | "networkError" | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleRoomCodeChange = (code: string) => {
        setError(null);
        setRoomCode(code.toUpperCase());
    };

    const handleNewRoomClick = () => {
        setLoading(true);
        get<string>("/api/newRoom")
            .then((newRoomCode) => {
                setNewRoomCode(newRoomCode);
                navigate(`/room/${newRoomCode}`);
            })
            .catch((errMsg: string) => {
                console.error(errMsg);
                setError("networkError");
                setLoading(false);
            });
    };

    useEffect(() => {
        if (roomCode.length === 4 && !error) {
            setLoading(true);
            get<boolean>(`/api/checkRoom?roomCode=${roomCode}`)
                .then((isValidRoom) => {
                    if (isValidRoom) {
                        navigate(`/room/${roomCode}`);
                    } else {
                        setError("invalidRoom");
                        setLoading(false);
                    }
                })
                .catch((errMsg: string) => {
                    console.error(errMsg);
                    setLoading(false);
                    setError("networkError");
                });
        }
    }, [roomCode]);

    return (
        <>
            <Text textAlign="left" width="full">
                Contenu
            </Text>
            <Divider />
            <Box display="flex" flexDirection="column" alignItems="center" gap="4">
                <Text>Vous avez déjà un code ? Écrivez-le/Collez le ici.</Text>
                <Box display="flex" gap="2">
                    <PinInput
                        autoFocus
                        onChange={handleRoomCodeChange}
                        value={roomCode}
                        isInvalid={Boolean(error)}
                        size="lg"
                        type="alphanumeric"
                    >
                        <PinInputField aria-label="Code de la salle, première lettre" />
                        <PinInputField aria-label="Code de la salle, seconde lettre" />
                        <PinInputField aria-label="Code de la salle, troisième lettre" />
                        <PinInputField aria-label="Code de la salle, quatrième lettre" />
                    </PinInput>
                </Box>
                <Collapse in={Boolean(error)} animateOpacity>
                    <Alert status={error === "networkError" ? "error" : "warning"} width="sm">
                        <AlertIcon />
                        {error === "networkError"
                            ? "Il y a un problème de communication avec le serveur."
                            // eslint-disable-next-line max-len
                            : "Il n'y a aucune salle avec ce code. Essayez un différent code ou créez une nouvelle salle."}
                    </Alert>
                </Collapse>
            </Box>
            <Box display="flex" width="full" alignItems="center" gap="3">
                <Divider />
                <Text>ou</Text>
                <Divider />
            </Box>
            <Button size="lg" isLoading={loading} onClick={handleNewRoomClick}>
                Créer une nouvelle salle
            </Button>
        </>
    );
};