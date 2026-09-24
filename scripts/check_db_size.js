import pg from 'pg';
const { Client } = pg;

const connectionString = 'postgresql://postgres:Sivamsp5820%23@db.stlnxavuccvpnitwkohn.supabase.co:5432/postgres';

async function checkSize() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    const res = await client.query(`
      SELECT 
        pg_database_size(current_database()) as size_bytes,
        pg_size_pretty(pg_database_size(current_database())) as pretty_size;
    `);
    
    const tablesRes = await client.query(`
      SELECT 
        table_name,
        pg_size_pretty(pg_total_relation_size(quote_ident(table_name))) as total_size,
        pg_total_relation_size(quote_ident(table_name)) as total_bytes
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY total_bytes DESC;
    `);

    console.log('--- DATABASE SIZE RESULTS ---');
    console.log('Database Total Size:', res.rows[0].pretty_size, '(' + (res.rows[0].size_bytes / (1024 * 1024)).toFixed(2) + ' MB / ' + (res.rows[0].size_bytes / (1024 * 1024 * 1024)).toFixed(4) + ' GB)');
    console.log('\n--- TOP TABLES ---');
    tablesRes.rows.forEach(r => {
      console.log(`${r.table_name}: ${r.total_size}`);
    });
    
    await client.end();
  } catch (err) {
    console.error('Database query error:', err.message);
  }
}

checkSize();
