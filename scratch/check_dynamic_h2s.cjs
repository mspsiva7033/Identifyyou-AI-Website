async function checkH2s() {
  const { getPayloadClient } = await import('../lib/payload.ts');
  const p = await getPayloadClient();
  const csRes = await p.find({ collection: 'case-studies', limit: 100 });
  
  const dupH2Cases = [];
  for (const doc of csRes.docs) {
    const h2s = [];
    if (doc.detail?.sections) {
      for (const s of doc.detail.sections) {
        if (s.title) h2s.push(s.title);
      }
    }
    if (doc.docItems) {
      for (const item of doc.docItems) {
        if (item.type === 'h2' && item.text) h2s.push(item.text);
      }
    }
    const dups = h2s.filter((item, idx) => h2s.indexOf(item) !== idx);
    if (dups.length > 0) dupH2Cases.push({ slug: doc.slug, duplicates: dups });
  }

  console.log('Case studies with duplicate H2s:', dupH2Cases);

  const blogRes = await p.find({ collection: 'blogs-and-news', limit: 100 });
  const dupH2Blogs = [];
  for (const doc of blogRes.docs) {
    const h2s = [];
    if (doc.sections) {
      for (const s of doc.sections) {
        if (s.title) h2s.push(s.title);
      }
    }
    const dups = h2s.filter((item, idx) => h2s.indexOf(item) !== idx);
    if (dups.length > 0) dupH2Blogs.push({ slug: doc.slug, duplicates: dups });
  }
  console.log('Blogs with duplicate H2s:', dupH2Blogs);

  process.exit(0);
}

checkH2s();
