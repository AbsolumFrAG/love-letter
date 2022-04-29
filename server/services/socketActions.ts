import { Rooms } from "../repositories/Rooms.ts";
import { OutgoingGameStateUpdate, SocketOutgoing } from "../types/socket.types.ts";
import { Card, GameData, Player, PlayerId, RoomData, StandardDeck } from "../types/types.ts";
import { shuffle } from "../utils.ts";
import { SocketData } from "./socket.ts";

interface JoinResult {
    type: SocketOutgoing.PlayerUpdate;
    data: [PlayerId, Player][];
}

export function join(socketData: SocketData, room: RoomData, playerName: string): JoinResult {
    const newPlayer: Player = {
        cards: [],
        gameScore: 0,
        handmaidProtected: false,
        name: playerName,
        outOfRound: false,
    };
    room.players.set(socketData.playerId, newPlayer);

    return {
        data: Array.from(room.players),
        type: SocketOutgoing.PlayerUpdate,
    };
}

interface StartGameResult {
    type: SocketOutgoing.GameUpdate;
    data: OutgoingGameStateUpdate;
}

export function startGame(roomCode: string, room: RoomData): StartGameResult {
    const updatedGameState: GameData = {
        cardPlayed: null,
        details: null,
        playerTurnId: room.players.keys().next().value,
        started: true,
        winningSpyPlayerId: null,
    };

    const deck = shuffle(StandardDeck.slice());
    const discard: Array<Card> = [];

    switch (room.players.size) {
        case 2:
            discard.push(deck.pop()!);
            discard.push(deck.pop()!);
            break;
        default:
            discard.push(deck.pop()!);
    }

    const updatedPlayers = new Map(room.players);
    updatedPlayers.forEach((player: Player, id: PlayerId) => {
        const playerHand: Array<Card> = [];

        playerHand.push(deck.pop()!);

        if (updatedGameState.playerTurnId === id) {
            playerHand.push(deck.pop()!);
        }

        updatedPlayers.set(id, {
            ...player,
            cards: playerHand,
        });
    });

    const updatedRoomData: RoomData = {
        deck,
        discard,
        game: updatedGameState,
        players: updatedPlayers,
    };
    Rooms.set(roomCode, updatedRoomData);

    const gameData: OutgoingGameStateUpdate = {
        deckCount: deck.length,
        discard,
        game: updatedGameState,
        players: Array.from(updatedPlayers),
    };

    return { data: gameData, type: SocketOutgoing.GameUpdate };
}