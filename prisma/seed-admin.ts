/**
 * One-time bootstrap for the first NATIONAL_ADMINISTRATOR account. Run
 * manually (`npm run db:seed-admin`) with SEED_ADMIN_NAME/EMAIL/PASSWORD set
 * in the environment — never on every deploy, and never automatically.
 */
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const name = process.env.SEED_ADMIN_NAME;
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error(
      "Set SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, and SEED_ADMIN_PASSWORD before running this script.",
    );
  }
  if (password.length < 6) {
    throw new Error("SEED_ADMIN_PASSWORD must be at least 6 characters.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { name, passwordHash, role: "NATIONAL_ADMINISTRATOR", active: true },
    create: { name, email, passwordHash, role: "NATIONAL_ADMINISTRATOR" },
  });

  console.log(`Admin account ready: ${user.email} (${user.role})`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
