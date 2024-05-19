import { useEffect, useState } from "react";

const useFetchSVG = (url: string) => {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    fetch(url)
      .then(response => response.text())
      .then(data => setSvgContent(data));
  }, [url]);

  return svgContent;
};

export default useFetchSVG;
