import React from "react";

import { Header, Main, Cards, Footer } from "@components";

const Home: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Main />
        </div>
    );
};

export default Home;
