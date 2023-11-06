import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

export default function Playground() {
  const content = "[Retool](https://retool.com)";
  return (
    <div className="prose">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
