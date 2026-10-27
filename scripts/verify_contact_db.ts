import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function checkSubmissions() {
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: 'contact-submissions',
    limit: 5,
    sort: '-createdAt',
  });
  console.log('Total submissions:', result.totalDocs);
  console.log('Latest submissions:', JSON.stringify(result.docs.map(d => ({
    id: d.id,
    name: d.name,
    email: d.email,
    company: d.company,
    inquiryPath: d.inquiryPath,
    message: d.message,
    createdAt: d.createdAt,
  })), null, 2));
}

checkSubmissions().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
