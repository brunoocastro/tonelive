import * as fs from 'fs';
import * as path from 'path';

const startFolder: string = './data'; // Pasta inicial
let result: Record<string, unknown> = {};

function traverseFolder(folderPath: string): Record<string, unknown> {
  const files: string[] = fs.readdirSync(folderPath);
  const folderObject: Record<string, unknown> = {};

  for (const file of files) {
    const filePath: string = path.join(folderPath, file);
    const stats: fs.Stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // É uma pasta, recursivamente percorra
      folderObject[file] = traverseFolder(filePath);
    }
  }

  return folderObject;
}

result = traverseFolder(startFolder);

// Agora, 'result' contém as informações que você precisa
export const jsonResult = JSON.parse(JSON.stringify(result, null, 2));

console.log({ jsonResult });

// Salve o resultado em um arquivo JSON
// fs.writeFileSync('folder_structure.json', jsonResult);

console.log('Estrutura de pastas armazenada em folder_structure.json');