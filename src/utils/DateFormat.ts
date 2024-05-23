/**
 * Mengubah format tanggal dari ISO string menjadi format dd/mm/yyyy.
 * @param isoString - Tanggal dalam format ISO (contoh: 2024-05-19T07:43:41+00:00).
 * @returns Tanggal dalam format dd/mm/yyyy (contoh: 19/05/2024).
 */
export const DateFormat = (isoString: string): string => {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan ditambahkan 1 karena getMonth() mengembalikan nilai 0-11
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
