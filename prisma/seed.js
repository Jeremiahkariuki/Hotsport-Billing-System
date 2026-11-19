const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding multi-tenant SaaS database for RadaLink...');

  // 1. Primary Tenant: RadaLink Networks (Jeremy Kariuki)
  const radaTenant = await prisma.tenant.upsert({
    where: { slug: 'radalink' },
    update: {
      ownerName: 'Jeremy Kariuki',
      name: 'RADALINK NETWORKS LTD',
      email: 'admin@radalink.co.ke',
      phone: '+254 712 345 678',
      activeTemplate: 'midnight',
    },
    create: {
      slug: 'radalink',
      name: 'RADALINK NETWORKS LTD',
      ownerName: 'Jeremy Kariuki',
      email: 'admin@radalink.co.ke',
      phone: '+254 712 345 678',
      password: 'password123',
      plan: 'ENTERPRISE',
      tagline: 'Fast, reliable internet access wherever you are',
      currency: 'KSh',
      supportEmail: 'billing@radalink.co.ke',
      supportPhone: '+254 712 345 678',
      activeTemplate: 'midnight',
      showTvAccess: true,
      mpesaShortcode: '174379',
      mpesaPasskey: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
      mpesaConsumerKey: 'sandbox_consumer_key',
      mpesaConsumerSecret: 'sandbox_consumer_secret',
      mpesaEnv: 'sandbox',
    },
  });

  // 2. Second Sample Tenant: SafariNet High-Speed WiFi (Brian Omondi)
  const safariTenant = await prisma.tenant.upsert({
    where: { slug: 'safarinet' },
    update: {},
    create: {
      slug: 'safarinet',
      name: 'SafariNet High-Speed WiFi',
      ownerName: 'Brian Omondi',
      email: 'brian@safarinet.co.ke',
      phone: '+254 722 000 111',
      password: 'password123',
      plan: 'PRO',
      tagline: 'Unlimited high-speed internet for estates and cafes',
      currency: 'KSh',
      supportEmail: 'support@safarinet.co.ke',
      supportPhone: '+254 722 000 111',
      activeTemplate: 'forest',
      showTvAccess: true,
      mpesaShortcode: '174379',
      mpesaPasskey: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
      mpesaConsumerKey: 'sandbox_consumer_key',
      mpesaConsumerSecret: 'sandbox_consumer_secret',
      mpesaEnv: 'sandbox',
    },
  });

  // 3. Global Settings Fallback
  await prisma.settings.upsert({
    where: { id: 'default' },
    update: {
      companyName: 'RADALINK NETWORKS LTD',
      supportEmail: 'billing@radalink.co.ke',
    },
    create: {
      id: 'default',
      companyName: 'RADALINK NETWORKS LTD',
      tagline: 'Fast, reliable internet access wherever you are',
      currency: 'KSh',
      supportPhone: '+254 712 345 678',
      supportEmail: 'billing@radalink.co.ke',
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

  // 4. RadaLink Packages
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
      tenantId: radaTenant.id,
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
      tenantId: radaTenant.id,
    },
    {
      name: 'SOLO 3 Hours',
      durationMinutes: 180,
      price: 10.0,
      downloadSpeedMbps: 2.0,
      uploadSpeedMbps: 2.0,
      simultaneousDevices: 1,
      deviceLockMode: 'STRICT',
      tenantId: radaTenant.id,
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
      tenantId: radaTenant.id,
    },
    {
      name: 'SOLO 6 HOURS',
      durationMinutes: 360,
      price: 20.0,
      downloadSpeedMbps: 3.0,
      uploadSpeedMbps: 3.0,
      simultaneousDevices: 1,
      deviceLockMode: 'STRICT',
      tenantId: radaTenant.id,
    },
    {
      name: 'SOLO 12Hours',
      durationMinutes: 720,
      price: 30.0,
      downloadSpeedMbps: 3.0,
      uploadSpeedMbps: 3.0,
      simultaneousDevices: 1,
      deviceLockMode: 'STRICT',
      tenantId: radaTenant.id,
    },
    {
      name: '2 DEVICE 12Hours',
      durationMinutes: 720,
      price: 50.0,
      downloadSpeedMbps: 4.0,
      uploadSpeedMbps: 4.0,
      simultaneousDevices: 2,
      deviceLockMode: 'FLEXIBLE',
      tenantId: radaTenant.id,
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
      tenantId: radaTenant.id,
    },
    {
      name: '2 DEVICE 1 Day',
      durationMinutes: 1440,
      price: 120.0,
      downloadSpeedMbps: 5.0,
      uploadSpeedMbps: 5.0,
      simultaneousDevices: 2,
      deviceLockMode: 'FLEXIBLE',
      tenantId: radaTenant.id,
    },
  ];

  for (const pkg of packagesData) {
    const existing = await prisma.package.findFirst({
      where: { name: pkg.name, tenantId: radaTenant.id },
    });
    if (!existing) {
      await prisma.package.create({ data: pkg });
    }
  }

  // 5. SafariNet Packages (Different pricing & branding!)
  const safariPackages = [
    {
      name: 'SAFARI EXPRESS 1 HOUR',
      durationMinutes: 60,
      price: 10.0,
      downloadSpeedMbps: 3.0,
      uploadSpeedMbps: 2.0,
      simultaneousDevices: 1,
      deviceLockMode: 'STRICT',
      tag: 'Express',
      tenantId: safariTenant.id,
    },
    {
      name: 'SAFARI DAY PASS (24 HRS)',
      durationMinutes: 1440,
      price: 50.0,
      downloadSpeedMbps: 5.0,
      uploadSpeedMbps: 5.0,
      simultaneousDevices: 1,
      deviceLockMode: 'STRICT',
      tag: 'Daily Unlimited',
      tenantId: safariTenant.id,
    },
    {
      name: 'SAFARI WEEKLY PASS (7 DAYS)',
      durationMinutes: 10080,
      price: 250.0,
      downloadSpeedMbps: 8.0,
      uploadSpeedMbps: 5.0,
      simultaneousDevices: 2,
      deviceLockMode: 'FLEXIBLE',
      tag: 'Best Value',
      tenantId: safariTenant.id,
    },
  ];

  for (const pkg of safariPackages) {
    const existing = await prisma.package.findFirst({
      where: { name: pkg.name, tenantId: safariTenant.id },
    });
    if (!existing) {
      await prisma.package.create({ data: pkg });
    }
  }

  // 6. Router for RadaLink
  const existingRouter = await prisma.routerConfig.findFirst({
    where: { tenantId: radaTenant.id },
  });
  if (!existingRouter) {
    await prisma.routerConfig.create({
      data: {
        tenantId: radaTenant.id,
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
        activeUsers: 2,
      },
    });
  }

  // 7. Vouchers
  const pkg1 = await prisma.package.findFirst({ where: { tenantId: radaTenant.id } });
  if (pkg1) {
    const count = await prisma.voucher.count({ where: { tenantId: radaTenant.id } });
    if (count === 0) {
      await prisma.voucher.createMany({
        data: [
          { code: 'RL-8472', packageId: pkg1.id, tenantId: radaTenant.id, status: 'UNUSED', batchId: 'BATCH-001' },
          { code: 'RL-1934', packageId: pkg1.id, tenantId: radaTenant.id, status: 'UNUSED', batchId: 'BATCH-001' },
          { code: 'RL-5621', packageId: pkg1.id, tenantId: radaTenant.id, status: 'UNUSED', batchId: 'BATCH-001' },
          { code: 'RL-9043', packageId: pkg1.id, tenantId: radaTenant.id, status: 'UNUSED', batchId: 'BATCH-001' },
        ],
      });
    }
  }

  console.log('Multi-tenant SaaS database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
