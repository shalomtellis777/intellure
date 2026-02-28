export interface Tool {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  icon: string;
  keywords: string[];
}

export const categories = [
  { name: "Text Tools", icon: "📝", slug: "text" },
  { name: "Developer Tools", icon: "💻", slug: "developer" },
  { name: "Calculators", icon: "🔢", slug: "calculators" },
  { name: "Image Tools", icon: "🖼️", slug: "image" },
  { name: "SEO Tools", icon: "🔍", slug: "seo" },
  { name: "Generators", icon: "⚡", slug: "generators" },
];

export const tools: Tool[] = [
  {
    slug: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs in your text instantly.",
    longDescription: "Free online word counter tool. Count words, characters (with and without spaces), sentences, paragraphs, and estimate reading time. Perfect for essays, blog posts, and social media.",
    category: "text",
    icon: "📝",
    keywords: ["word counter", "character counter", "word count online", "count words"],
  },
  {
    slug: "character-counter",
    name: "Character Counter",
    description: "Count characters with and without spaces. Perfect for Twitter, SMS, and meta descriptions.",
    longDescription: "Free character counter for Twitter (280), Instagram (2200), SMS (160), meta descriptions (160), and more. See real-time character counts with limit indicators.",
    category: "text",
    icon: "🔤",
    keywords: ["character counter", "letter counter", "twitter character count"],
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more.",
    longDescription: "Free online case converter. Transform text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case, PascalCase, and more.",
    category: "text",
    icon: "🔠",
    keywords: ["case converter", "uppercase converter", "lowercase converter", "title case"],
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs and layouts.",
    longDescription: "Generate Lorem Ipsum placeholder text by paragraphs, sentences, or words. Perfect for web design mockups, print layouts, and development.",
    category: "text",
    icon: "📄",
    keywords: ["lorem ipsum generator", "placeholder text", "dummy text generator"],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and beautify your JSON data with syntax highlighting.",
    longDescription: "Free JSON formatter and validator. Beautify minified JSON, validate syntax, minify JSON, and view with syntax highlighting. Supports large JSON files.",
    category: "developer",
    icon: "{ }",
    keywords: ["json formatter", "json beautifier", "json validator", "json prettifier"],
  },
  {
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode text to Base64 or decode Base64 strings instantly.",
    longDescription: "Free Base64 encoder and decoder. Convert text to Base64 encoding or decode Base64 strings back to plain text. Supports UTF-8 and binary data.",
    category: "developer",
    icon: "🔐",
    keywords: ["base64 encoder", "base64 decoder", "base64 encode online", "base64 decode online"],
  },
  {
    slug: "color-picker",
    name: "Color Picker & Converter",
    description: "Pick colors and convert between HEX, RGB, HSL, and more formats.",
    longDescription: "Free color picker and converter tool. Pick any color and get its value in HEX, RGB, HSL, and CMYK formats. Generate color palettes and gradients.",
    category: "developer",
    icon: "🎨",
    keywords: ["color picker", "hex to rgb", "color converter", "rgb to hex"],
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions with real-time matching and highlighting.",
    longDescription: "Free online regex tester. Write and test regular expressions with real-time pattern matching, match highlighting, group capture display, and common regex patterns.",
    category: "developer",
    icon: ".*",
    keywords: ["regex tester", "regular expression tester", "regex online", "regex checker"],
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages, percentage change, and percentage of a number.",
    longDescription: "Free percentage calculator. Calculate what percent of a number is, percentage increase/decrease, find the percentage between two numbers, and more.",
    category: "calculators",
    icon: "%",
    keywords: ["percentage calculator", "percent calculator", "calculate percentage"],
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, days, hours, and minutes.",
    longDescription: "Free age calculator. Enter your date of birth and get your exact age in years, months, weeks, days, hours, and minutes. Also shows your next birthday countdown.",
    category: "calculators",
    icon: "🎂",
    keywords: ["age calculator", "calculate age", "how old am i", "date of birth calculator"],
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and understand your weight category.",
    longDescription: "Free BMI calculator. Calculate your Body Mass Index using your height and weight. Supports both metric and imperial units. See your BMI category and healthy weight range.",
    category: "calculators",
    icon: "⚖️",
    keywords: ["bmi calculator", "body mass index", "calculate bmi", "bmi checker"],
  },
  {
    slug: "sip-calculator",
    name: "SIP Calculator",
    description: "Calculate returns on your Systematic Investment Plan with detailed projections.",
    longDescription: "Free SIP calculator. Calculate your SIP returns, total investment, and wealth gained over time. See year-by-year growth projections with adjustable parameters.",
    category: "calculators",
    icon: "📈",
    keywords: ["sip calculator", "mutual fund calculator", "sip returns calculator"],
  },
  {
    slug: "emi-calculator",
    name: "EMI Calculator",
    description: "Calculate your monthly loan EMI, total interest, and payment schedule.",
    longDescription: "Free EMI calculator for home loans, car loans, and personal loans. Calculate monthly EMI, total interest payable, and view amortization schedule.",
    category: "calculators",
    icon: "🏦",
    keywords: ["emi calculator", "loan emi calculator", "home loan calculator", "car loan emi"],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure random passwords with customizable options.",
    longDescription: "Free secure password generator. Create strong random passwords with customizable length, uppercase, lowercase, numbers, and special characters. Check password strength.",
    category: "generators",
    icon: "🔑",
    keywords: ["password generator", "random password", "strong password generator", "secure password"],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes for URLs, text, Wi-Fi, and more. Download as PNG.",
    longDescription: "Free QR code generator. Create QR codes for URLs, plain text, Wi-Fi credentials, email, phone numbers, and more. Download as high-quality PNG.",
    category: "generators",
    icon: "📱",
    keywords: ["qr code generator", "create qr code", "qr code maker", "free qr code"],
  },
  {
    slug: "markdown-to-html",
    name: "Markdown to HTML",
    description: "Convert Markdown text to clean HTML code with live preview.",
    longDescription: "Free Markdown to HTML converter. Write Markdown and see the HTML output in real-time with live preview. Copy the generated HTML or rendered output.",
    category: "developer",
    icon: "📋",
    keywords: ["markdown to html", "md to html", "markdown converter", "markdown preview"],
  },
  {
    slug: "text-to-slug",
    name: "Text to Slug Converter",
    description: "Convert any text into URL-friendly slugs for your website.",
    longDescription: "Free text to slug converter. Transform any text into clean, URL-friendly slugs. Handles special characters, accents, and multiple languages.",
    category: "text",
    icon: "🔗",
    keywords: ["text to slug", "slug generator", "url slug converter", "slugify"],
  },
  {
    slug: "url-encoder-decoder",
    name: "URL Encoder/Decoder",
    description: "Encode or decode URLs and query parameters.",
    longDescription: "Free URL encoder and decoder. Encode special characters in URLs or decode percent-encoded URL strings. Essential for web development and debugging.",
    category: "developer",
    icon: "🌐",
    keywords: ["url encoder", "url decoder", "url encode online", "percent encoding"],
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to any dimension. Maintain aspect ratio. No upload needed.",
    longDescription: "Free online image resizer. Resize images to custom dimensions or preset sizes for social media. All processing happens in your browser — no uploads needed.",
    category: "image",
    icon: "🖼️",
    keywords: ["image resizer", "resize image online", "photo resizer", "image resize"],
  },
  {
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    description: "Generate SEO-optimized meta tags for your website with live preview.",
    longDescription: "Free meta tag generator for SEO. Generate title tags, meta descriptions, Open Graph tags, Twitter Cards, and more. Preview how your page appears in Google search results.",
    category: "seo",
    icon: "🔍",
    keywords: ["meta tag generator", "seo meta tags", "og tag generator", "meta description generator"],
  },
];

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(slug: string, limit = 4): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  const sameCategory = tools.filter(
    (t) => t.category === tool.category && t.slug !== slug
  );
  const other = tools.filter(
    (t) => t.category !== tool.category && t.slug !== slug
  );
  return [...sameCategory, ...other].slice(0, limit);
}
