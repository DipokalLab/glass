import { Render } from "@/features/render";
import { useEffect, useState } from "react";

export default function RenderPage() {
  const [textId, setTextId] = useState("");
  const [text, setText] = useState("Glass");
  const [size] = useState(1024);
  const [options] = useState({});

  useEffect(() => {
    const split = window.location.pathname.split("/");
    const id = split[split.length - 1];
    const urlParams = new URLSearchParams(window.location.search);
    const textValue = urlParams.get("text");

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
