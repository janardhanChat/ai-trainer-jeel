import { TAVUS_API_KEY } from '@/config';

export const endConversation = async (conversationId , apiKey) => {
  console.log("🚀 ~ endConversation ~ apiKey:", apiKey)
  try {
    const response = await fetch(
      `https://tavusapi.com/v2/conversations/${conversationId}/end`,
      {
        method: 'POST',
        headers: {
          'x-api-key': apiKey ?? TAVUS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to end conversation');
    }

    return null;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
