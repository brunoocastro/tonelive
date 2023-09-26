import { jsonResult } from "../infra/fs_binary_search";

export default function Page() {

  interface FolderStructure {
    [key: string]: string | FolderStructure;
  }

  function folderHasChildren(data: FolderStructure): boolean {
    return Object.keys(data).some((key) => typeof data[key] === 'object');
  }

  function renderFolderStructure(data: FolderStructure): any {
    return Object.keys(data).map((key) => {
      const folder = data[key];
      if (typeof folder === 'object') {
        return (
          <div className="inline-flex">
            <h1>{key}: </h1>
            {folderHasChildren(folder) && renderFolderStructure(folder)}
          </div>
        );
      } else {
        return (
          <div key={key} className="inline-flex">
            <h1>{key}</h1>
            <p>{folder}</p>
          </div>
        );
      }
    });
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-center text-purple-800 shadow-lg font-sans font-bold">
        FileSystem
      </h1>
      {renderFolderStructure(jsonResult)}
      <div className="grid columns-5 row-auto flex-col gap-2">
        {/* {Object.entries(jsonResult).map(([key, value]) => (
        ))} */}
      </div>
    </div>
  )
}
