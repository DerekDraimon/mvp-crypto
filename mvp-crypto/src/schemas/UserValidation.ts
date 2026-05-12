import { z } from "zod";

export const UserSchema = z.object({
  username: z.string().min(3, "Mínimo 3 letras").max(20),
  email: z.string().email("Correo no válido"),
  points: z.number().positive().int(),
  birthDate: z.date().optional()
});

export const ProfileSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  xpRank: z.coerce.number().int("Debe ser un número entero").min(0, "El XP Rank no puede ser negativo").optional(),
});

export type User = z.infer<typeof UserSchema>;
export type ProfileForm = z.infer<typeof ProfileSchema>;
