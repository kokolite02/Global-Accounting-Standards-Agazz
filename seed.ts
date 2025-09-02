import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', password, role: 'ADMIN', name: 'Admin' }
  });

  const org = await prisma.organization.create({ data: { name: 'Example Corp' } });
  await prisma.membership.create({ data: { orgId: org.id, userId: admin.id, role: 'OWNER' } });

  const s1 = await prisma.standard.create({
    data: {
      code: 'IAS 1',
      title: 'Presentation of Financial Statements',
      summary: 'Basis for presentation of financial statements.',
      content: 'Full text placeholder for IAS 1...',
      versions: { create: [{ version: '2024-01', content: 'Version 2024-01 content' }] }
    }
  });

  await prisma.question.create({
    data: {
      title: 'How to classify a liability under IAS 1?',
      body: 'Question details...',
      userId: admin.id,
      answers: { create: [{ body: 'Refer to IAS 1 paragraphs 69-76.', userId: admin.id }] }
    }
  });

  console.log('Seed complete.');
}

main().finally(() => prisma.$disconnect());
