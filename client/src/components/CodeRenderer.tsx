import { FC } from "react";

import { IFullCode } from "../types/compilerTypes";

interface Props {
  fullCode: IFullCode;
}

const CodeRenderer: FC<Props> = ({ fullCode }) => {
  const combinedCode = `
  <html>
    <style>
        ${fullCode.css}
    </style>
    <body>
        ${fullCode.html}
    </body>
    <script>
        ${fullCode.javascript}
    </script>
  </html>
  `;

  const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
    combinedCode
  )}`;

  return (
    <div className="bg-white border-2 border-slate-500 h-[calc(100dvh-60px)]">
      <iframe className="w-full h-full" src={iframeCode} />
    </div>
  );
};
export default CodeRenderer;
