async function check() {
  const { getPayloadClient } = await import('../lib/payload.ts');
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: 'blogs-and-news',
    limit: 20
  });

  for (const doc of res.docs) {
    console.log(`\n=== SLUG: ${doc.slug} ===`);
    console.log(`Title: ${doc.title}`);
    console.log(`Overview: ${doc.overview || doc.excerpt}`);
    console.log(`Sections count: ${doc.sections ? doc.sections.length : 0}`);
    if (doc.sections) {
      doc.sections.forEach((s, idx) => {
        console.log(`  Section ${idx+1}: ${s.title}`);
        console.log(`  Content (${s.content ? s.content.length : 0} chars): ${s.content ? s.content.substring(0, 100) : ''}...`);
      });
    }
  }
  process.exit(0);
}

check().catch(console.error);
