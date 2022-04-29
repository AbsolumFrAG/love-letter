import { useEffect } from "react";
import { useAppbarContext } from "../contexts/AppbarContext";

export const useAppbarText = (appbarText: string) => {
    const { setAppbarText } = useAppbarContext();

    useEffect(() => {
        setAppbarText(appbarText);
    }, [appbarText]);
};