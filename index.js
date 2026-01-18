//       ███             ███████   ████                                                                                           
//       ████            ███████   ████                                                                   ██                      
//      ██████           ████      ████                                                                  ███       ███
//    ████████ ███    ███████████  ████    ██████████    ██████████████████     ███████████             █████         
//   ████████ █████   ███████████  ████  ██████████████  ███████████████████   ██████████████          ███  ██        
//  ███████████████      ████      ████  ████      ████  ████    ████    ████  ████      ████          ██   ███     ██
// █████████████████     ████      ████   █████████████  ████    ████    ████  ██████████████         ██     ██     ██
// ███████ █████████     ████      ████  ██████████████  ████    ████    ████  █████████████         ███████████    ██
//  █████  ████████      ████      ████  ████      ████  ████    ████    ████  ████                  ██        ██   ██
//   ████   ██████       ████      ████  ██████████████  ████    ████    ████  ███████    ███       ██          ██  ██
//    ██     ████        ████      ████   ████████████   ████    ████    ████   █████████████       ██           ██  ██

// 하하, 이곳까지 오실 줄 알고 중요한 코드는 백엔드로 옮겨놨습니다.
// 혹시 오류 발생이나 실행이 안되시나요? [피드백 디스코드 서버 -> https://discord.gg/NTZj5Xuq3S]
// 사용법이나 참고는 README.md를 참고해주세요.
// ⓒ Flame. 2026. All rights reserved.


const axios = require("axios");

/**
 * FlameAI Module
 * baseURL: https://flameai.jeeks.me/api
 */
const baseURL = "https://flameai.jeeks.me/api";

/**
 * 새로운 채팅 세션을 생성합니다.
 * @param {Object} prompt { bot_role, user_role }
 * @returns {Promise<Object>} { chatId, prompt }
 */
async function createChat(prompt) {
    if (!prompt || !prompt.bot_role || !prompt.user_role) {
        throw new Error("prompt 객체에 bot_role과 user_role이 포함되어야 합니다.");
    }

    try {
        const response = await axios.post(`${baseURL}/create`, { prompt });

        if (response.data?.error) {
            throw new Error(`Flame 서버 오류: ${response.data.error}`);
        }

        return response.data.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`서버 응답 오류 (${error.response.status}): ${JSON.stringify(error.response.data)}`);
        }
        throw error.message || "오류가 발생하였습니다.";
    }
}

/**
 * 메시지를 전송합니다.
 * @param {string} chatId 세션 ID
 * @param {Object} data { message }
 * @returns {Promise<Object>} { chatId, question, response }
 */
async function sendMessage(chatId, data) {
    if (!chatId || !data || !data.message) {
        throw new Error("chatId와 message가 필요합니다.");
    }

    try {
        const response = await axios.post(`${baseURL}/chat`, {
            chatId,
            message: data.message
        });

        if (response.data?.error) {
            throw new Error(`Flame 서버 오류: ${response.data.error}`);
        }

        return {
            chatId: chatId,
            question: data.message,
            response: response.data.data
        };
    } catch (error) {
        if (error.response) {
            throw new Error(`서버 응답 오류 (${error.response.status}): ${JSON.stringify(error.response.data)}`);
        }
        throw error.message || "오류가 발생하였습니다.\n또는 유효하지 않는 chatId입니다.";
    }
}

module.exports = {
    createChat,
    sendMessage
};
