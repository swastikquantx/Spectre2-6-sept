import fs from 'fs';
import path from 'path';
import { hashPassword } from './auth';

export const initializeUsers = async () => {
  const DB_PATH = path.join(process.cwd(), 'src/backend/db/data.json');
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ projects: [], memories: [], users: [] }));
  }
  
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  if (!db.users || db.users.length === 0) {
    db.users = [
      {
        id: 'usr_admin',
        email: 'admin@spectre.com',
        passwordHash: await hashPassword('admin123'),
        name: 'Platform Admin',
        role: 'PLATFORM_ADMIN',
        organizationId: 'org_spectre'
      },
      {
        id: 'usr_orgadmin',
        email: 'orgadmin@acme.com',
        passwordHash: await hashPassword('password123'),
        name: 'Acme Admin',
        role: 'ORG_ADMIN',
        organizationId: 'org_acme'
      },
      {
        id: 'usr_member',
        email: 'member@acme.com',
        passwordHash: await hashPassword('password123'),
        name: 'Acme Member',
        role: 'MEMBER',
        organizationId: 'org_acme'
      }
    ];
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    console.log('Users seeded.');
  }
};
