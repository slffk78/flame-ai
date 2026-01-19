const flameAI = require("./index");

(async () => {
    try {
        const chatInfo = await flameAI.createChat({
            bot_role: "메시지에 비속어/혐오/불쾌감을 조성할 수 있는 부분이 있으면 다음과 같이 나타내시오.\n\n메시지: 아니 시발 그러니까 그 고양이가 못생겼다니까?\n\n답: 시발 -> 비속어(욕설)\n못생겼다 -> 혐오",
            user_role: "사용자"
        });
        console.log("Chat Created:", chatInfo);

         const sentences = [
            "저 새끼 진짜 좆같이 생겨서 눈 버릴 뻔했네",
            "저런 년들은 그냥 다 쓸어버려야 제맛이지",
            "오늘 날씨가 정말 맑고 좋네요.",
            "병신 같은 애들이 또 지랄하네, 퇴화된 유전자네"
         ]

         sentences.forEach(async item => {
        const response = await flameAI.sendMessage(chatInfo.chatId, {
            message: item
        });
        console.log(response.response);
            })
    } catch (error) {
        console.error("Error:", error);
    }
})();
