
import ScssCompiler from '@/components/ScssCompiler';

const Index = () => {
  return (
    <div className="min-h-screen bg-editor-bg text-editor-text">
      <div className="container mx-auto py-8 px-4">
        <ScssCompiler />
      </div>
    </div>
  );
};

export default Index;
