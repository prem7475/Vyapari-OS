import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma/client.js';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

function usage() {
  // eslint-disable-next-line no-console
  console.log(
    'Usage: npm --workspace server run admin:create -- <email> <password> <name> <role>\n' +
      'role: ADMIN | SUPER_ADMIN | OPERATIONS_STAFF',
  );
}

async function main() {
  const [, , emailArg, password, name, roleArg] = process.argv;
  if (!emailArg || !password || !name || !roleArg) {
    usage();
    process.exit(1);
  }

  const email = emailArg.toLowerCase().trim();
  const role = roleArg.toUpperCase().trim();
  if (!['ADMIN', 'SUPER_ADMIN', 'OPERATIONS_STAFF'].includes(role)) {
    usage();
    process.exit(1);
  }

  if (password.length < 8) {
    // eslint-disable-next-line no-console
    console.error('Password must be at least 8 characters.');
    process.exit(1);
  }

  const existing = await prisma.adminUser.findFirst({ where: { email } });
  if (existing) {
    // eslint-disable-next-line no-console
    console.error('Admin with this email already exists.');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
      name,
      role,
    },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  logger.info({ adminId: admin.id, email: admin.email, role: admin.role, app: env.appName }, 'admin_created');
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(admin, null, 2));
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

