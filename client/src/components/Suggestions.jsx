export default function Suggestions({ text }) {
  console.log('Rendering Suggestions:', text);
  return (
    <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-black">
      <h3 className="font-bold mb-2">AI Suggestions</h3>
      <pre className="whitespace-pre-wrap">{text || 'No suggestions yet'}</pre>
    </div>
  );
}

