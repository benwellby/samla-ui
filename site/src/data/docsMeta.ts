// Small helpers for turning raw markdown into page metadata, replacing
// what build-docs.mjs used to do with regex. Kept deliberately simple.

export function extractTitle(body: string): string {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : 'Samla';
}

export function extractDescription(body: string): string {
  const withoutTitle = body.replace(/^#\s+.+$/m, '');
  const paragraphs = withoutTitle
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith('#') && !p.startsWith('```') && !p.startsWith('|'));
  const first = paragraphs[0] ?? '';
  const plain = first.replace(/[`*_>]/g, '').replace(/\s+/g, ' ').trim();
  return plain.length > 155 ? `${plain.slice(0, 154)}…` : plain;
}
