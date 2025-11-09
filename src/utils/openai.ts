import { openaiConfig } from '../config/app.config';

/**
 * Generate compliments using OpenAI API
 * @param prompt - The AI prompt describing the tone, context, and recipient
 * @param count - Number of compliments to generate
 * @returns Array of generated compliment texts
 */
export async function generateCompliments(
  prompt: string,
  count: number
): Promise<string[]> {
  // TODO: Implement actual OpenAI API call
  // For now, return a placeholder that simulates the API call

  if (
    !openaiConfig.apiKey ||
    openaiConfig.apiKey.includes('your_openai_api_key_here')
  ) {
    console.warn(
      'OpenAI API key not configured. Returning placeholder compliments.'
    );
    // Return placeholder compliments for development
    return Array.from(
      { length: count },
      (_, i) =>
        `Generated compliment ${i + 1} based on prompt: "${prompt.substring(0, 50)}..."`
    );
  }

  try {
    // TODO: Replace with actual OpenAI API call
    // Example structure:
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${openaiConfig.apiKey}`,
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-4',
    //     messages: [
    //       {
    //         role: 'system',
    //         content: 'You are a kind and thoughtful compliment generator. Generate warm, genuine, and personalized compliments.',
    //       },
    //       {
    //         role: 'user',
    //         content: `Generate ${count} compliments based on this prompt: ${prompt}. Return them as a JSON array of strings.`,
    //       },
    //     ],
    //   }),
    // });
    // const data = await response.json();
    // return JSON.parse(data.choices[0].message.content);

    // Placeholder for now
    return Array.from(
      { length: count },
      (_, i) =>
        `Generated compliment ${i + 1} based on prompt: "${prompt.substring(0, 50)}..."`
    );
  } catch (error) {
    console.error('Error generating compliments:', error);
    throw new Error('Failed to generate compliments. Please try again.');
  }
}
