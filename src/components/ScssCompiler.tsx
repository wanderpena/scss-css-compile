import { useState, useEffect } from 'react';
import { compile } from 'sass';
import { toast } from '@/components/ui/use-toast';
import CodeEditor from './CodeEditor';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ScssCompiler = () => {
  const [scssCode, setScssCode] = useState(`// Escribe tu código SCSS aquí
$primary-color: #8b5cf6;
$text-color: #f8f8f2;
$padding: 16px;

.container {
  padding: $padding;
  
  h1 {
    color: $primary-color;
    font-size: 24px;
  }
  
  p {
    color: $text-color;
    line-height: 1.5;
    
    &:hover {
      color: lighten($text-color, 20%);
    }
  }
}`);
  
  const [cssCode, setCssCode] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);

  const compileScss = async () => {
    if (!scssCode.trim()) {
      setCssCode('');
      return;
    }
    
    setIsCompiling(true);
    
    try {
      // Fix: using the correct API for sass.compile()
      const result = await compile(scssCode);
      
      setCssCode(result.css);
    } catch (error) {
      console.error('Error compilando SCSS:', error);
      toast({
        title: "Error de compilación",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive"
      });
      setCssCode('/* Error de compilación */');
    } finally {
      setIsCompiling(false);
    }
  };
  
  // Compilar automáticamente cuando cambia el código SCSS
  useEffect(() => {
    const timer = setTimeout(() => {
      compileScss();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [scssCode]);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-editor-accent to-editor-variable bg-clip-text text-transparent">
          SCSS a CSS en tiempo real
        </h1>
        <Button 
          onClick={compileScss}
          className="bg-editor-accent hover:bg-editor-accent/90"
          disabled={isCompiling}
        >
          {isCompiling ? "Compilando..." : "Compilar"}
        </Button>
      </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-200px)]">
        <div className="rounded-lg overflow-hidden border border-editor-line bg-editor-bg flex flex-col">
          <div className="bg-editor-line text-editor-text px-4 py-2 font-medium">
            SCSS
          </div>
          <div className="flex-1">
            <CodeEditor
              language="scss"
              value={scssCode}
              onChange={(value) => setScssCode(value || '')}
            />
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden border border-editor-line bg-editor-bg flex flex-col">
          <div className="bg-editor-line text-editor-text px-4 py-2 font-medium">
            CSS Compilado
          </div>
          <div className="flex-1">
            <CodeEditor
              language="css"
              value={cssCode}
              onChange={() => {}}
              readOnly={true}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <Tabs defaultValue="info">
          <TabsList className="bg-editor-line">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="p-4 bg-editor-bg/30 border border-editor-line rounded-md mt-2 animate-slide-in">
            <p className="text-sm">
              Esta herramienta compila tu código SCSS a CSS en tiempo real usando la biblioteca Sass.js.
              La compilación ocurre automáticamente mientras escribes o puedes hacer clic en el botón "Compilar".
            </p>
          </TabsContent>
          <TabsContent value="tips" className="p-4 bg-editor-bg/30 border border-editor-line rounded-md mt-2 animate-slide-in">
            <ul className="text-sm list-disc pl-5 space-y-2">
              <li>Usa <code className="bg-editor-line px-1 rounded">$variables</code> para definir valores reutilizables.</li>
              <li>Utiliza el anidamiento para estructurar mejor tu código.</li>
              <li>Explora funciones como <code className="bg-editor-line px-1 rounded">lighten()</code>, <code className="bg-editor-line px-1 rounded">darken()</code> y <code className="bg-editor-line px-1 rounded">mix()</code>.</li>
              <li>Puedes usar <code className="bg-editor-line px-1 rounded">@mixin</code> y <code className="bg-editor-line px-1 rounded">@include</code> para crear código reutilizable.</li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ScssCompiler;
