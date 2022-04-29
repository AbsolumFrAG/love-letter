import { createContext, FC, useContext, useState } from "react";

interface AppbarContextValue {
    setAppbarText: (appbarText: string) => void;
    appBarText: string;
}

interface IState {
    children: JSX.Element;
}

const AppbarContext = createContext<AppbarContextValue | null>(null);

export const AppbarProvider: FC<IState> = ({ children }) => {
    const [appBarText, setAppbarText] = useState<string>("");

    return <AppbarContext.Provider value={{ appBarText, setAppbarText }}>{children}</AppbarContext.Provider>;
};

export const useAppbarContext = () => {
    const context = useContext(AppbarContext);
    if (!context) {
        throw new Error("Impossible d'utiliser le contexte de l'Appbar à l'extérieur de AppbarProvider.");
    } else {
        return context;
    }
};