/**
 * Sends the contact form to the site's own serverless function (api/contact.ts on Vercel),
 * which emails it to Dennis.
 *
 * During local development (`npm run dev`) there is no function to receive it, so nothing is sent
 * and `sent: false` is returned — the UI can say so instead of pretending. (`vercel dev` runs the
 * function locally if you want to test real sending.)
 */
export async function sendMessage(fields: Record<string, string>): Promise<{ sent: boolean }> {
  if (import.meta.env.DEV && !import.meta.env.VITE_USE_API) {
    console.info('[dev] Contact message not sent:', fields);
    return { sent: false };
  }

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  });
  if (!response.ok) throw new Error(`Message failed (${response.status})`);
  return { sent: true };
}
