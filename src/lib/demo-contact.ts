/** Server configuration only. Never read arbitrary client-supplied redirect targets. */
export function getDemoContactHref(): string | null {
  const address = process.env.DEMO_CONTACT_EMAIL?.trim();
  // Single mailbox only: disallow query/header injection and multiple recipients.
  if (
    !address ||
    !/^[A-Za-z0-9.!#$'*+/=_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,}$/.test(
      address,
    )
  )
    return null;
  return `mailto:${encodeURIComponent(address).replace("%40", "@")}?subject=${encodeURIComponent("Perbincangan demo TempahSekolah")}&body=${encodeURIComponent("Salam,\n\nSaya ingin membincangkan TempahSekolah untuk program sekolah kami.\n\nNama sekolah / organisasi:\nJenis program:\nKeperluan utama:\n\nTerima kasih.")}`;
}
