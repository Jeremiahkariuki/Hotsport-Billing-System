const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with default VunaFlow/Zeugen Tech data...');

  // 1. Settings
  await prisma.settings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      companyName: 'ZEUGEN TECH SOLUTION LTD',
      tagline: 'Fast, reliable internet access wherever you are',
      currency: 'KSh',
      supportPhone: '+254 712 345 678',
      supportEmail: 'billing@zeugentech.co.ke',
      logoUrl: '/logo.png',
      activeTemplate: 'midnight',
      showTvAccess: true,
      mpesaShortcode: '174379',
      mpesaPasskey: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
      mpesaConsumerKey: 'sandbox_consumer_key',
      mpesaConsumerSecret: 'sandbox_consumer_secret',
      mpesaEnv: 'sandbox',
    },
  });

  // 2. Router
  const existingRouter = await prisma.routerConfig.findFirst();
  if (!existingRouter) {
    await prisma.routerConfig.create({
      data: {
        name: 'Main MikroTik Router (Hotspot)',
        ipOrHost: '192.168.88.1',
        apiPort: 8728,
        username: 'admin',
        password: '',
        status: 'CONNECTED',
        model: 'RB750Gr3 (hEX)',
        routerOsVer: 'v7.16.1',
        cpuLoad: 12,
        freeMemoryMb: 198,
        uptime: '14d 06:22:15',
        activeUsers: 1,
      },
    });
  }

  // 3. Packages matching the exact screenshots
  const packagesData = [
    {
      name: 'VIEW ONCE 15 MINUTES',
      durationMinutes: 15,
      price: 3.0,
      downloadSpeedMbps: 1.0,
      uploadSpeedMbps: 1.0,
      simultaneousDevices: 1,
      deviceLockMode: 'STRICT',
      tag: 'Quick Pass',
    },
    {
      name: 'VIEW ONCE 1 HOUR',
      durationMinutes: 60,
      price: 5.0,
      downloadSpeedMbps: 1.0,
      uploadSpeedMbps: 1.0,
      simultaneousDevices: 1,
      deviceLockMode: 'STRICT',
      tag: 'Popular',
    },
    {
      name: 'SOLO 3 Hours',
      durationMinutes: 180,
      price: 10.0,
      downloadSpeedMbps: 2.0,
      uploadSpeedMbps: 2.0,
      simultaneousDevices: 1,
      deviceLockMode: 'STRICT',
    },
    {
      name: '2 DEVICE 3 Hours',
      durationMinutes: 180,
      price: 15.0,
      downloadSpeedMbps: 3.0,
      uploadSpeedMbps: 3.0,
      simultaneousDevices: 2,
      deviceLockMode: 'FLEXIBLE',
      tag: 'Duo',
    },
    {
      name: 'SOLO 6 HOURS',
      durationMinutes: 360,
      price: 20.0,
      downloadSpeedMbps: 3.0,
      uploadSpeedMbps: 3.0,
      simultaneousDevices: 1,
      deviceLockMode: 'STRICT',
    },
    {
      name: 'SOLO 12Hours',
      durationMinutes: 720,
      price: 30.0,
      downloadSpeedMbps: 3.0,
      uploadSpeedMbps: 3.0,
      simultaneousDevices: 1,
      deviceLockMode: 'STRICT',
    },
    {
      name: '2 DEVICE 12Hours',
      durationMinutes: 720,
      price: 50.0,
      downloadSpeedMbps: 4.0,
      uploadSpeedMbps: 4.0,
      simultaneousDevices: 2,
      deviceLockMode: 'FLEXIBLE',
    },
    {
      name: 'SOLO 24 HOUR',
      durationMinutes: 1440,
      price: 60.0,
      downloadSpeedMbps: 5.0,
      uploadSpeedMbps: 5.0,
      simultaneousDevices: 1,
      deviceLockMode: 'STRICT',
      tag: 'Best Value',
    },
    {
      name: '2 DEVICE 1 Day',
      durationMinutes: 1440,
      price: 120.0,
      downloadSpeedMbps: 5.0,
      uploadSpeedMbps: 5.0,
      simultaneousDevices: 2,
      deviceLockMode: 'FLEXIBLE',
    },
  ];

  for (const pkg of packagesData) {
    const existing = await prisma.package.findFirst({ where: { name: pkg.name } });
    if (!existing) {
      await prisma.package.create({ data: pkg });
    }
  }

  // 4. Sample active session
  const existingSession = await prisma.activeSession.findFirst();
  if (!existingSession) {
    const p1 = await prisma.package.findFirst({ where: { name: 'VIEW ONCE 1 HOUR' } });
    await prisma.activeSession.create({
      data: {
        username: '0712345678',
        ipAddress: '192.168.88.245',
        macAddress: 'DC:A6:32:89:FE:12',
        uptimeSeconds: 1420,
        bytesIn: BigInt(45200000),
        bytesOut: BigInt(189000000),
        signal: '-58 dBm',
        packageName: p1 ? p1.name : 'VIEW ONCE 1 HOUR',
        deviceType: 'Phone',
      },
    });
  }

  // 5. Initial vouchers
  const pkg1 = await prisma.package.findFirst();
  if (pkg1) {
    const count = await prisma.voucher.count();
    if (count === 0) {
      await prisma.voucher.createMany({
        data: [
          { code: 'ZG-8472', packageId: pkg1.id, status: 'UNUSED', batchId: 'BATCH-001' },
          { code: 'ZG-1934', packageId: pkg1.id, status: 'UNUSED', batchId: 'BATCH-001' },
          { code: 'ZG-5621', packageId: pkg1.id, status: 'UNUSED', batchId: 'BATCH-001' },
          { code: 'ZG-9043', packageId: pkg1.id, status: 'UNUSED', batchId: 'BATCH-001' },
        ],
      });
    }
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
