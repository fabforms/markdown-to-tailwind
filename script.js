// Initialize Markdown-it parser
const md = window.markdownit();

// Get references to the elements
const markdownInput = document.getElementById('markdown-input');
const htmlOutput = document.getElementById('html-output');
const convertButton = document.getElementById('convert-btn');
const copyButton = document.getElementById('copy-btn');

// Tailwind classes for different HTML tags
const tailwindClasses = {
  h1: 'text-4xl font-bold mb-4',
  h2: 'text-3xl font-semibold mb-3',
  h3: 'text-2xl font-semibold mb-2',
  p: 'text-base mb-4',
  ul: 'list-disc pl-6 mb-4',
  li: 'mb-2',
  blockquote: 'border-l-4 border-blue-500 pl-4 italic mb-4',
  code: 'bg-gray-800 text-white p-2 rounded-md',
  pre: 'bg-gray-100 p-4 rounded-md overflow-x-auto',
  strong: 'font-bold',
  em: 'italic',
  a: 'text-blue-500 hover:underline',
  img: 'rounded-lg shadow-md',
  table: 'table-auto w-full border-collapse mb-4',
  th: 'border px-4 py-2 text-left bg-gray-200',
  td: 'border px-4 py-2',
  del: 'line-through'
};

// Function to convert Markdown to HTML with Tailwind classes
function convertMarkdownToTailwind(markdown) {
  // Parse the Markdown to HTML using Markdown-it
  let html = md.render(markdown);

  // Apply Tailwind classes to the HTML elements
  html = html.replace(/<h1>/g, `<h1 class="${tailwindClasses.h1}">`)
             .replace(/<\/h1>/g, `</h1>`)
             .replace(/<h2>/g, `<h2 class="${tailwindClasses.h2}">`)
             .replace(/<\/h2>/g, `</h2>`)
             .replace(/<h3>/g, `<h3 class="${tailwindClasses.h3}">`)
             .replace(/<\/h3>/g, `</h3>`)
             .replace(/<p>/g, `<p class="${tailwindClasses.p}">`)
             .replace(/<\/p>/g, `</p>`)
             .replace(/<ul>/g, `<ul class="${tailwindClasses.ul}">`)
             .replace(/<\/ul>/g, `</ul>`)
             .replace(/<li>/g, `<li class="${tailwindClasses.li}">`)
             .replace(/<\/li>/g, `</li>`)
             .replace(/<blockquote>/g, `<blockquote class="${tailwindClasses.blockquote}">`)
             .replace(/<\/blockquote>/g, `</blockquote>`)
             .replace(/<code>/g, `<code class="${tailwindClasses.code}">`)
             .replace(/<\/code>/g, `</code>`)
             .replace(/<pre>/g, `<pre class="${tailwindClasses.pre}">`)
             .replace(/<\/pre>/g, `</pre>`)
             .replace(/<strong>/g, `<strong class="${tailwindClasses.strong}">`)
             .replace(/<\/strong>/g, `</strong>`)
             .replace(/<em>/g, `<em class="${tailwindClasses.em}">`)
             .replace(/<\/em>/g, `</em>`)
             .replace(/<a href="([^"]+)"/g, `<a href="$1" class="${tailwindClasses.a}"`)
             .replace(/<\/a>/g, `</a>`)
             .replace(/<img src="([^"]+)" alt="([^"]*)"/g, `<img src="$1" alt="$2" class="${tailwindClasses.img}">`)
             .replace(/<table>/g, `<table class="${tailwindClasses.table}">`)
             .replace(/<\/table>/g, `</table>`)
             .replace(/<th>/g, `<th class="${tailwindClasses.th}">`)
             .replace(/<\/th>/g, `</th>`)
             .replace(/<td>/g, `<td class="${tailwindClasses.td}">`)
             .replace(/<\/td>/g, `</td>`)
             .replace(/<del>/g, `<del class="${tailwindClasses.del}">`)
             .replace(/<\/del>/g, `</del>`);

  return html;
}

// Function to generate the full HTML page with Tailwind CDN
function generateFullHTML(content) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Styled Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 text-gray-800">
  <div class="container mx-auto p-6 max-w-4xl">
    ${content}
  </div>
</body>
</html>
  `;
}

// Event listener for the "Convert" button
convertButton.addEventListener('click', () => {
  const markdownText = markdownInput.value;
  const tailwindStyledHTML = convertMarkdownToTailwind(markdownText);
  htmlOutput.innerHTML = tailwindStyledHTML;

  // Show the "Copy to Clipboard" button after conversion
  copyButton.classList.remove('hidden');
});

// Event listener for the "Copy to Clipboard" button
copyButton.addEventListener('click', () => {
  const markdownText = markdownInput.value;
  const tailwindStyledHTML = convertMarkdownToTailwind(markdownText);
  const fullHTML = generateFullHTML(tailwindStyledHTML);

  // Copy the full HTML to the clipboard
  navigator.clipboard.writeText(fullHTML).then(() => {
    alert('HTML code copied to clipboard!');
  }).catch((err) => {
    console.error('Error copying text: ', err);
    alert('Failed to copy to clipboard.');
  });
});

