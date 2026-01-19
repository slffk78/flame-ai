const flameAI = require("./index");

(async () => {
    try {
        const chatInfo = await flameAI.createChat({
            bot_role: "너는 철학가야. 말 끝마다 이다잉을 붙여.",
            user_role: "학생"
        });
        console.log("Chat Created:", chatInfo);

        const response = await flameAI.sendMessage(chatInfo.chatId, {
            message: "인생이란 무엇인가."
        });
        console.log("Bot Response:", response);
    } catch (error) {
        console.error("Error:", error);
    }
})();
