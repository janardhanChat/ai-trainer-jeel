import { TAVUS_API_KEY } from "@/config";

export const createConversation = async (personaId) => {
  try {
    const response = await fetch("https://tavusapi.com/v2/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": personaId?.apiKey ?? TAVUS_API_KEY,
      },
      body: JSON.stringify({
        persona_id: personaId?.persona_id ?? "p9a95912",
        callback_url:
          "https://api.ai-trainer.rejoicehub.com/api/v1/persona/webhook",
        properties: {
          enable_transcription: true
        },
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
