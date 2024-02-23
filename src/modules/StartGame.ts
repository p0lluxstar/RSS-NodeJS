import { Websocket } from "../types/interfaces";

const startGame = {
    type: "start_game",
    data:
        {
            ships:
                [
                    {
                        position: {
                            x: 5,
                            y: 7,
                        },
                        direction: true,
                        length: 5,
                        type: "small",
                    }
                ],
            currentPlayerIndex: 5,
        },
    id: 0,
}

const StartGame = (ws: Websocket) => {
    ws.send(JSON.stringify(startGame));
};

export default StartGame;
