
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
  readOnly?: boolean;
}

const CodeEditor = ({ language, value, onChange, readOnly = false }: CodeEditorProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        renderLineHighlight: 'all',
        readOnly: readOnly,
        automaticLayout: true,
        theme: 'vs-dark'
      }}
      className="rounded-md overflow-hidden border border-editor-line"
    />
  );
};

export default CodeEditor;
