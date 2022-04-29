import { createContext, FC, useContext, useState } from "react";

interface RouterContextValue {
    newRoomCode: string | null;
    setNewRoomCode: (newRoomCode: string | null) => void;
}

interface IState {
    children: JSX.Element;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export const RouterProvider: FC<IState> = ({ children }) => {
    const [newRoomCode, setNewRoomCode] = useState<string | null>(null);

    return <RouterContext.Provider value={{ newRoomCode, setNewRoomCode }}>{children}</RouterContext.Provider>;
};

export const useRouterContext = (): RouterContextValue => {
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error("Impossible d'utiliser le contexte du Router à l'extérieur du RouterContextProvider.");
    } else {
        return context;
    }
};