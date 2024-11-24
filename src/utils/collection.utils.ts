export function sortByName(
  collection: Array<{ nome: string }>,
): Array<{ nome: string }> {
  return collection.sort((a, b) => a.nome.localeCompare(b.nome));
}
