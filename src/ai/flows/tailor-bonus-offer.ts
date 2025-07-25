'use server';

/**
 * @fileOverview A flow for tailoring bonus offers to entice users to purchase follower packages.
 *
 * - tailorBonusOffer - A function that tailors bonus offers based on user interests.
 * - TailorBonusOfferInput - The input type for the tailorBonusOffer function.
 * - TailorBonusOfferOutput - The return type for the tailorBonusOffer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailorBonusOfferInputSchema = z.object({
  userProfile: z
    .string()
    .describe("A description of the user's interests and online activities."),
  packageDescription: z
    .string()
    .describe('A description of the follower package being considered.'),
});
export type TailorBonusOfferInput = z.infer<typeof TailorBonusOfferInputSchema>;

const TailorBonusOfferOutputSchema = z.object({
  bonusOffer: z
    .string()
    .describe('A tailored bonus offer to entice the user to purchase.'),
});
export type TailorBonusOfferOutput = z.infer<typeof TailorBonusOfferOutputSchema>;

export async function tailorBonusOffer(input: TailorBonusOfferInput): Promise<TailorBonusOfferOutput> {
  return tailorBonusOfferFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tailorBonusOfferPrompt',
  input: {schema: TailorBonusOfferInputSchema},
  output: {schema: TailorBonusOfferOutputSchema},
  prompt: `You are a marketing expert specializing in creating enticing bonus offers.

You will tailor a bonus offer to a user based on their interests and the package they are considering.

User Profile: {{{userProfile}}}
Package Description: {{{packageDescription}}}

Create a bonus offer that is relevant and appealing to the user, making them more likely to purchase the package.
`, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const tailorBonusOfferFlow = ai.defineFlow(
  {
    name: 'tailorBonusOfferFlow',
    inputSchema: TailorBonusOfferInputSchema,
    outputSchema: TailorBonusOfferOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
