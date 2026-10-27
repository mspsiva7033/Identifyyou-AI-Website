async function updateDatabaseContent() {
  const { getPayloadClient } = await import('../lib/payload.ts');
  const p = await getPayloadClient();
  if (!p) {
    console.log('No payload client');
    process.exit(1);
  }

  // 1. towards-zero-inventory-variance-automation
  const res1 = await p.find({
    collection: 'case-studies',
    where: { slug: { equals: 'towards-zero-inventory-variance-automation' } },
    limit: 1,
  });
  if (res1.docs.length > 0) {
    await p.update({
      collection: 'case-studies',
      id: res1.docs[0].id,
      data: {
        title: 'Zero Inventory Variance via MES & RFID Automation',
        overview: 'Automated material movement tracking using MES-linked digital interlocks, RFID readers, and edge controllers to verify material identity and eliminate routing errors.',
      },
    });
    console.log('Updated towards-zero-inventory-variance-automation title & overview');
  }

  // 2. towards-zero-inventory-variance-ai
  const res2 = await p.find({
    collection: 'case-studies',
    where: { slug: { equals: 'towards-zero-inventory-variance-ai' } },
    limit: 1,
  });
  if (res2.docs.length > 0) {
    await p.update({
      collection: 'case-studies',
      id: res2.docs[0].id,
      data: {
        title: 'Towards Zero Inventory Variance via AI Decisioning',
        overview: 'AI-powered inventory decision layer predicting stock variances, optimizing replenishment curves, and synchronizing physical warehouse stock with ERP records.',
      },
    });
    console.log('Updated towards-zero-inventory-variance-ai title & overview');
  }

  // 3. procurement-operations-intelligence
  const res3 = await p.find({
    collection: 'case-studies',
    where: { slug: { equals: 'procurement-operations-intelligence' } },
    limit: 1,
  });
  if (res3.docs.length > 0) {
    await p.update({
      collection: 'case-studies',
      id: res3.docs[0].id,
      data: {
        title: 'Transforming Routine Procurement to Intelligent Automation',
      },
    });
    console.log('Updated procurement-operations-intelligence title');
  }

  // 4. Update the 5 blog titles in database to <= 70 chars
  const blogUpdates = [
    {
      slug: 'ai-in-manufacturing-quality-inspection-2026',
      title: 'AI-Powered Vision Inspection in High-Precision Manufacturing',
    },
    {
      slug: 'snowflake-cortex-ai-manufacturing-data-platform',
      title: 'Snowflake Cortex AI for Procurement & Supply Chain Analytics',
    },
    {
      slug: 'no-code-ai-platforms-for-enterprise-workflows',
      title: 'No-Code Enterprise Applications in Industrial Operations',
    },
    {
      slug: 'predictive-maintenance-iiot-sensor-fusion',
      title: 'Predictive Maintenance at Scale with IIoT Sensor Fusion',
    },
    {
      slug: 'future-of-industrial-vision-ai',
      title: 'The Future of Industrial Vision AI: From Detection to Autonomy',
    },
  ];

  for (const b of blogUpdates) {
    const bRes = await p.find({
      collection: 'blogs-and-news',
      where: { slug: { equals: b.slug } },
      limit: 1,
    });
    if (bRes.docs.length > 0) {
      await p.update({
        collection: 'blogs-and-news',
        id: bRes.docs[0].id,
        data: { title: b.title },
      });
      console.log(`Updated blog ${b.slug} title to: "${b.title}"`);
    }
  }

  console.log('Database updates complete!');
  process.exit(0);
}

updateDatabaseContent().catch(console.error);
