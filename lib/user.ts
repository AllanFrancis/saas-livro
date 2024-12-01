import { User } from "@prisma/client";
import { compareSync } from "bcrypt-ts";
import db from "./db";

export async function findUserByCredentials(
  email: string,
  password: string
): Promise<User | null> {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  //verifico se o usuario existe
  if (!user) return null;

  //verifico se o usuario tem senha
  if (!user.password) return null;

  //verifico se a senha é valida
  const matches = compareSync(password, user.password);

  if (matches) return user;

  return null;
}
