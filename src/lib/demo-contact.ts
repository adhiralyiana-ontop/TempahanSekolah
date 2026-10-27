/** Build a draft for a single configured mailbox, never an arbitrary redirect. */
export function buildDemoContactHref(value: string | undefined): string | null {
  const address = value?.trim();
  if (!address || address.length > 254) return null;
  const parts = address.split("@");
  if (parts.length !== 2) return null;
  const [local, domain] = parts;
  // Deliberately support common ASCII dot-atom mailboxes only, not quoted addresses.
  if (
    local.length > 64 ||
    !/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/.test(
      local,
    )
  )
    return null;
  const labels = domain.split(".");
  if (labels.length < 2 || !/^[A-Za-z]{2,}$/.test(labels.at(-1)!)) return null;
  if (
    labels.some(
      (label) => !/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/.test(label),
    )
  )
    return null;
  return `mailto:${encodeURIComponent(address).replace("%40", "@")}?subject=${encodeURIComponent("Perbincangan demo TempahSekolah")}&body=${encodeURIComponent("Salam,\n\nSaya ingin membincangkan TempahSekolah untuk program sekolah kami.\n\nNama sekolah / organisasi:\nJenis program:\nKeperluan utama:\n\nTerima kasih.")}`;
}

/** Read optional server configuration without exposing environment contents. */
export function getDemoContactHref(): string | null {
  return buildDemoContactHref(process.env.DEMO_CONTACT_EMAIL);
}
