async function checkAllCaseStudies() {
  const { getPayloadClient } = await import('../lib/payload.ts');
  const p = await getPayloadClient();
  if (!p) {
    console.log('No payload client');
    process.exit(1);
  }

  const res = await p.find({ collection: 'case-studies', limit: 100 });
  console.log('Total case studies:', res.docs.length);

  const longH1s = [];
  for (const doc of res.docs) {
    const title = doc.title || '';
    if (title.length > 70) {
      longH1s.push({ slug: doc.slug, title, len: title.length });
    }
  }

  console.log('\nCase studies with title/H1 > 70 chars (' + longH1s.length + '):');
  for (const item of longH1s) {
    console.log(`[${item.len}c] ${item.slug} => "${item.title}"`);
  }

  // Also check blogs
  const blogsRes = await p.find({ collection: 'blogs-and-news', limit: 100 });
  console.log('\nTotal blogs:', blogsRes.docs.length);
  const longBlogH1s = [];
  for (const doc of blogsRes.docs) {
    const title = doc.title || '';
    if (title.length > 70) {
      longBlogH1s.push({ slug: doc.slug, title, len: title.length });
    }
  }
  console.log('\nBlogs with title/H1 > 70 chars (' + longBlogH1s.length + '):');
  for (const item of longBlogH1s) {
    console.log(`[${item.len}c] ${item.slug} => "${item.title}"`);
  }

  process.exit(0);
}

checkAllCaseStudies();
