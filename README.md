# FlameAI Module

## 🚀 시작하기

### 설치

```bash
npm install flame-ai
```

## 🛠️ 사용법

### 1. 모듈 불러오기

```javascript
const flameAI = require("flame-ai");
```

### 2. 채팅 세션 생성 (`createChat`)

새로운 AI 대화 세션을 생성합니다. AI의 역할과 유저의 페르소나를 설정할 수 있습니다.

```javascript
const prompt = {
    bot_role: "너는 친절한 고양이 코딩 도우미야. 말 끝마다 '냥'을 붙여줘.",
    user_role: "학생"
};

try {
    const chatInfo = await flameAI.createChat(prompt);
    console.log("생성된 세션 ID:", chatInfo.chatId);
} catch (error) {
    console.error("세션 생성 실패:", error.message);
}
```

### 3. 메시지 전송 (`sendMessage`)

생성된 `chatId`를 사용하여 AI와 대화를 주고받습니다.

```javascript
const chatId = "생성받은_chatID"; // createChat에서 반환된 chatId
const data = {
    message: "안녕! 오늘 개발하기 좋은 날씨네."
};

try {
    const result = await flameAI.sendMessage(chatId, data);
    console.log("AI 응답:", result.response);
} catch (error) {
    console.error("메시지 전송 실패:", error.message);
}
```

## 📋 API 명세

### `createChat(prompt)`
- **인자**: `prompt` (Object)
    - `bot_role`: AI의 역할 설정 (필수)
    - `user_role`: 유저의 역할 설정 (필수)
- **반환**: `Promise<Object>`
    ```javascript
    {
      chatId: "string", // 세션 고유 ID
      prompt: { bot_role, user_role }
    }
    ```

### `sendMessage(chatId, data)`
- **인자**: 
    - `chatId`: `createChat`에서 생성된 ID (String)
    - `data`: `{ message: "내용" }` (Object)
- **반환**: `Promise<Object>`
    ```javascript
    {
      chatId: "string",
      question: "유저가 보낸 질문",
      response: "AI의 답변"
    }
    ```
---
ⓒ Flame. 2026. All rights reserved.
