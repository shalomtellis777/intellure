import dynamic from "next/dynamic";

export const toolComponents: Record<string, React.ComponentType> = {
  "word-counter": dynamic(() => import("./word-counter")),
  "character-counter": dynamic(() => import("./character-counter")),
  "case-converter": dynamic(() => import("./case-converter")),
  "lorem-ipsum-generator": dynamic(() => import("./lorem-ipsum-generator")),
  "json-formatter": dynamic(() => import("./json-formatter")),
  "base64-encoder-decoder": dynamic(() => import("./base64-encoder-decoder")),
  "color-picker": dynamic(() => import("./color-picker")),
  "regex-tester": dynamic(() => import("./regex-tester")),
  "percentage-calculator": dynamic(() => import("./percentage-calculator")),
  "age-calculator": dynamic(() => import("./age-calculator")),
  "bmi-calculator": dynamic(() => import("./bmi-calculator")),
  "sip-calculator": dynamic(() => import("./sip-calculator")),
  "emi-calculator": dynamic(() => import("./emi-calculator")),
  "password-generator": dynamic(() => import("./password-generator")),
  "qr-code-generator": dynamic(() => import("./qr-code-generator")),
  "markdown-to-html": dynamic(() => import("./markdown-to-html")),
  "text-to-slug": dynamic(() => import("./text-to-slug")),
  "url-encoder-decoder": dynamic(() => import("./url-encoder-decoder")),
  "image-resizer": dynamic(() => import("./image-resizer")),
  "meta-tag-generator": dynamic(() => import("./meta-tag-generator")),
};
