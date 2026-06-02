const base = 'http://localhost:3000';

async function run() {
  try {
    const registerRes = await fetch(`${base}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'TMP', email: 'tmp@local.test', phone: '+34123456789', password: 'pass1234' })
    });
    const reg = await registerRes.json();
    console.log('REGISTER:', reg);

    const loginRes = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'tmp@local.test', password: 'pass1234' })
    });
    const login = await loginRes.json();
    console.log('LOGIN:', login);

    const token = login.token;
    const notesRes = await fetch(`${base}/api/notes`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const notes = await notesRes.json();
    console.log('NOTES:', notes);
  } catch (err) {
    console.error('ERROR:', err);
  }
}

run();
