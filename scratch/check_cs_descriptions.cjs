async function checkCsDescriptions() {
  const { getPayloadClient } = await import('../lib/payload.ts');
  const p = await getPayloadClient();
  const res = await p.find({ collection: 'case-studies', limit: 100 });
  const descs = new Map();
  const dupDescs = [];

  for (const doc of res.docs) {
    const d = doc.overview || doc.summary?.challenge || '';
    if (d && descs.has(d)) {
      dupDescs.push({ desc: d.substring(0, 50) + '...', slugs: [descs.get(d), doc.slug] });
    } else if (d) {
      descs.set(d, doc.slug);
    }
  }

  console.log('Duplicate descriptions in case studies:', dupDescs);
  process.exit(0);
}

checkCsDescriptions();
