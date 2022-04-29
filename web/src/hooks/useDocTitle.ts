import { useEffect } from "react";

export const useDocTitle = (docTitle?: string): void => {
    useEffect(() => {
        document.title = docTitle ? `${docTitle} | Love Letter` : "Love Letter";
    }, []);
};