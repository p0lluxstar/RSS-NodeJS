import { exitMessege } from "../utils/answerInConsole.js";

const exitCommand = () => {
    exitMessege()
    process.exit(0);
}

export default exitCommand;