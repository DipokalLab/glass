import { Render } from "@/features/render";
import { useEffect, useState } from "react";

type ParsedOptions = Record<string, string | number | undefined>;

function parseOptions(str: string): ParsedOptions {
  if (!str) {
    return {};
  }

  const options: string[] = str.split(":");
  const result: ParsedOptions = {};

  for (const option of options) {
    const [key, value] = option.split("=");
    if (key) {
      const trimmedKey = key.trim();
      if (value === undefined) {
        result[trimmedKey] = undefined;
      } else {
        const trimmedValue = value.trim();
        result[trimmedKey] =
          !isNaN(Number(trimmedValue)) && trimmedValue !== ""
            ? Number(trimmedValue)
            : trimmedValue;
      }
    }
  }

  return result;
}

export default function RenderPage() {
  const [textId, setTextId] = useState("");
  const [text, setText] = useState("Glass");
  const [size] = useState(1024);
  const [options, setOptions] = useState({});

  useEffect(() => {
    const split = window.location.pathname.split("/");
    const id = split[split.length - 1];
    const urlParams = new URLSearchParams(window.location.search);
    const textValue = urlParams.get("text");
    const optionValue = urlParams.get("option");

    setOptions(parseOptions(optionValue as string));
    setTextId(id);
    setText(textValue as string);
  }, []);

  return (
    <>
      <Render
        textId={textId}
        text={text}
        size={size}
        options={options}
        isRender={true}
      />
    </>
  );
}
