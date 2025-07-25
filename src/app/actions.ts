"use server";

import { tailorBonusOffer } from "@/ai/flows/tailor-bonus-offer";
import { z } from "zod";

const formSchema = z.object({
  userProfile: z.string().min(10, "Por favor, descreva seu perfil com mais detalhes.").max(200, "A descrição deve ter no máximo 200 caracteres."),
  packageDescription: z.string(),
});

type State = {
    message?: string | null;
    bonus?: string | null;
    errors?: {
        userProfile?: string[];
        packageDescription?: string[];
    } | null;
}

export async function generateBonusAction(prevState: State | null, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    userProfile: formData.get("userProfile"),
    packageDescription: formData.get("packageDescription"),
  });

  if (!validatedFields.success) {
    return {
      message: "Falha na validação.",
      errors: validatedFields.error.flatten().fieldErrors,
      bonus: null
    };
  }

  try {
    const result = await tailorBonusOffer(validatedFields.data);
    return { message: "Success", bonus: result.bonusOffer, errors: null };
  } catch (error) {
    console.error("Error generating bonus:", error);
    return { message: "Ocorreu um erro no servidor ao gerar o bônus. Por favor, tente novamente.", errors: null, bonus: null };
  }
}
