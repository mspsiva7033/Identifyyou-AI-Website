async function checkBlogs() {
  const { getPayloadClient } = await import('../lib/payload.ts');
  const p = await getPayloadClient();
  const res = await p.find({ collection: 'blogs-and-news', limit: 100 });
  const titles = new Map();
  const descs = new Map();
  const dupTitles = [];
  const dupDescs = [];

  for (const doc of res.docs) {
    if (titles.has(doc.title)) {
      dupTitles.push({ title: doc.title, slugs: [titles.get(doc.title), doc.slug] });
    } else {
      titles.set(doc.title, doc.slug);
    }
    const d = doc.overview || doc.excerpt || '';
    if (d && descs.has(d)) {
      dupDescs.push({ desc: d, slugs: [descs.get(d), doc.slug] });
    } else if (d) {
      descs.set(d, doc.slug);
    }
  }

  console.log('Duplicate titles in blogs:', dupTitles);
  console.log('Duplicate descriptions in blogs:', dupDescs);
  process.exit(0);
}

checkBlogs();
