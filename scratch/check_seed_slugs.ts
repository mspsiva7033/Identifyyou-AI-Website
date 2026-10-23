import fs from 'fs'

const content = fs.readFileSync('scripts/seed.ts', 'utf8')
const matches = content.match(/"([^"]+)":\s*\{\s*"title"/g) || []
const slugs = matches.map((m) => m.split('"')[1])

console.log('Total slugs in FULL_DOCX_MAP:', slugs.length)
console.log('Is precision-abm-snowflake-cortex in FULL_DOCX_MAP?', slugs.includes('precision-abm-snowflake-cortex'))

const abmRelated = slugs.filter((s) => s.includes('abm'))
console.log('ABM related slugs in FULL_DOCX_MAP:', abmRelated)
