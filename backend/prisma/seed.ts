import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const flours = await prisma.category.upsert({
    where: { slug: 'flours' },
    update: {},
    create: { name: 'Atta & Flours', slug: 'flours' },
  });

  const riceGrains = await prisma.category.upsert({
    where: { slug: 'rice-grains' },
    update: {},
    create: { name: 'Rice & Grains', slug: 'rice-grains' },
  });

  const dalsPulses = await prisma.category.upsert({
    where: { slug: 'dals-pulses' },
    update: {},
    create: { name: 'Dals & Pulses', slug: 'dals-pulses' },
  });

  const spicesMasalas = await prisma.category.upsert({
    where: { slug: 'spices-masalas' },
    update: {},
    create: { name: 'Spices & Masalas', slug: 'spices-masalas' },
  });

  const dairyGhee = await prisma.category.upsert({
    where: { slug: 'dairy-ghee' },
    update: {},
    create: { name: 'Dairy & Ghee', slug: 'dairy-ghee' },
  });

  const snacksNamkeen = await prisma.category.upsert({
    where: { slug: 'snacks-namkeen' },
    update: {},
    create: { name: 'Snacks & Namkeen', slug: 'snacks-namkeen' },
  });

  await prisma.product.upsert({
    where: { slug: 'aashirvaad-sharbati-atta-10kg' },
    update: {},
    create: {
      name: 'Aashirvaad Superior MP Sharbati Atta (10kg)',
      slug: 'aashirvaad-sharbati-atta-10kg',
      description: '100% pure whole wheat stone-ground chakki fresh flour with natural dietary fiber.',
      price: 18.99,
      stock: 120,
      categoryId: flours.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'india-gate-basmati-classic-5kg' },
    update: {},
    create: {
      name: 'India Gate Basmati Rice Classic (5kg)',
      slug: 'india-gate-basmati-classic-5kg',
      description: 'Aged extra long slender grain aromatic basmati rice for royal biryanis and pulao.',
      price: 16.99,
      stock: 75,
      categoryId: riceGrains.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'tata-sampann-toor-dal-2kg' },
    update: {},
    create: {
      name: 'Tata Sampann Unpolished Toor / Arhar Dal (2kg)',
      slug: 'tata-sampann-toor-dal-2kg',
      description: 'Rich in dietary fiber and protein, naturally sun-dried without artificial polish.',
      price: 7.99,
      stock: 140,
      categoryId: dalsPulses.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'mdh-garam-masala-100g' },
    update: {},
    create: {
      name: 'MDH Garam Masala (100g)',
      slug: 'mdh-garam-masala-100g',
      description: 'Authentic blend of cardamom, cinnamon, cloves, and mace for rich aromatic curries.',
      price: 2.79,
      stock: 150,
      categoryId: spicesMasalas.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'amul-pure-ghee-1l' },
    update: {},
    create: {
      name: 'Amul Pure Ghee Tin (1L)',
      slug: 'amul-pure-ghee-1l',
      description: 'Classic aromatic golden clarified butter made from fresh milk cream.',
      price: 15.99,
      stock: 70,
      categoryId: dairyGhee.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'haldirams-aloo-bhujia-400g' },
    update: {},
    create: {
      name: 'Haldirams Nagpur Aloo Bhujia (400g)',
      slug: 'haldirams-aloo-bhujia-400g',
      description: 'Crispy spicy potato and gram flour sev flavored with mint and Indian spices.',
      price: 3.99,
      stock: 120,
      categoryId: snacksNamkeen.id,
    },
  });

  const passwordHash = await bcrypt.hash('Password123!', 10);
  await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      passwordHash,
      cart: { create: {} },
    },
  });

  console.log('Seed data created.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
