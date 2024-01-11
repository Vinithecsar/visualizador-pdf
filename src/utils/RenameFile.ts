export function RenameFile(originalFile: File, newName = "prescricao.jpg") {
  return new File([originalFile], newName, {
    type: originalFile.type,
  });
}
