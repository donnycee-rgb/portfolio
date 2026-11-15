import nodemailer from 'nodemailer';

/**
 * POST /api/contact — the contact form (a Vercel serverless function).
 * Checks the message, ignores bots (the hidden "bot-field"), and emails it to Dennis with the
 * sender as Reply-To, so answering is one click.
 *
 * Settings (Vercel → Project → Settings → Environment Variables):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS   any SMTP account — for Gmail: smtp.gmail.com, 465,
 *                                                your address, and an App Password
 *   CONTACT_TO     where messages go (defaults to SMTP_USER)
 *   CONTACT_FROM   the sender shown, e.g. "Portfolio <you@gmail.com>" (defaults to SMTP_USER)
 */

const FIELDS = [
  ['name', 'Name', 120],
  ['email', 'Email', 200],
  ['type', 'Needs', 120],
  ['location', 'For', 160],
  ['date', 'By', 120],
  ['budget', 'Budget', 120],
  ['idea', 'The idea', 2000],
] as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const reply = (status: number, body: object) => Response.json(body, { status });

export async function POST(request: Request) {
  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return reply(400, { error: 'Send the form as JSON' });
  }

  // A bot filled in the hidden field: pretend it worked, send nothing
  if (typeof input['bot-field'] === 'string' && input['bot-field'].trim()) return reply(200, { ok: true });

  // Keep only the known fields, as trimmed text within their length limits
  const message: Record<string, string> = {};
  for (const [key, , max] of FIELDS) {
    const value = typeof input[key] === 'string' ? input[key].trim() : '';
    if (value.length > max) return reply(400, { error: `${key} is too long` });
    if (value) message[key] = value;
  }
  if (!message.name) return reply(400, { error: 'Please add your name' });
  if (!message.email || !EMAIL.test(message.email)) return reply(400, { error: 'That email doesn’t look right' });

  const { SMTP_HOST, SMTP_PORT = '465', SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('Contact form: SMTP settings are missing');
    return reply(500, { error: 'Email isn’t set up yet' });
  }

  const rows = FIELDS.filter(([key]) => message[key]).map(([key, label]) => [label, message[key]] as const);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transport.sendMail({
      from: CONTACT_FROM || `Portfolio <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: message.email,
      subject: `New message from ${message.name}${message.type ? ` — ${message.type}` : ''}`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
      html: `<div style="font-family:Arial,Helvetica,sans-serif;color:#0a0a0b">
<p style="font-size:13px;letter-spacing:2px;color:#5d636b;margin:0 0 16px">NEW MESSAGE FROM YOUR PORTFOLIO</p>
<table cellpadding="0" cellspacing="0" style="font-size:15px">${rows
        .map(([label, value]) => `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;vertical-align:top">${label}</td><td style="padding:6px 0">${escape(value)}</td></tr>`)
        .join('')}</table>
<p style="font-size:13px;color:#6b7280;margin:20px 0 0">Reply to this email to answer ${escape(message.name)} directly.</p></div>`,
    });
  } catch (err) {
    console.error('Contact form: sending failed', err);
    return reply(502, { error: 'That didn’t send — please email me directly' });
  }

  return reply(200, { ok: true });
}
