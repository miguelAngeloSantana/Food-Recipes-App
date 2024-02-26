import { useState } from "react";
import AppContext from "./AppContext";

function Provider({ children }) {
    const [favoritos, setFavoritos] = useState([]);

    const value = {
        favoritos,
        setFavoritos
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default Provider;