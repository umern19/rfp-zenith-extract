
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RotateCcw, Globe, Sparkles } from 'lucide-react';
import { useDocument } from '@/contexts/DocumentContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const TranslationViewer = () => {
  const navigate = useNavigate();
  const { uploadedFile, translatedContent, setTranslatedContent } = useDocument();
  const [isTranslating, setIsTranslating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!uploadedFile) {
      navigate('/');
      return;
    }

    // Auto-start translation
    handleTranslation();
  }, [uploadedFile]);

  const handleTranslation = async () => {
    setIsTranslating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setTranslatedContent("Translated content would appear here...");
    setIsTranslating(false);
    
    toast({
      title: "Translation Complete",
      description: "Your document has been successfully translated.",
    });
  };

  const handleProceedToFeatures = () => {
    navigate('/features');
  };

  if (!uploadedFile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Re-Upload
              </Button>
              <div className="h-6 border-l border-slate-600"></div>
              <h1 className="text-xl font-semibold text-white">Translation Viewer</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleTranslation}
                disabled={isTranslating}
                className="border-slate-600 hover:border-cyan-400"
              >
                <Globe className="h-4 w-4 mr-2" />
                Translate Again
              </Button>
              
              <Button
                onClick={handleProceedToFeatures}
                disabled={isTranslating || !translatedContent}
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Proceed to Feature Extraction
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* Original PDF Panel */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 animate-slide-in-right">
            <div className="space-y-4 h-full">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Original Document</h2>
                <div className="text-sm text-slate-400">
                  {uploadedFile.name}
                </div>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-8 h-full flex items-center justify-center border border-slate-700">
                <div className="text-center space-y-4">
                  <div className="w-16 h-20 bg-slate-700 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-slate-400 font-bold text-sm">PDF</span>
                  </div>
                  <p className="text-slate-400">PDF viewer would be integrated here</p>
                  <p className="text-xs text-slate-500">Using react-pdf or PDF.js</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Translated Panel */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 animate-slide-in-left">
            <div className="space-y-4 h-full">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Translated Document</h2>
                {isTranslating && (
                  <div className="flex items-center gap-2 text-cyan-400">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-cyan-400 border-t-transparent"></div>
                    <span className="text-sm">Translating...</span>
                  </div>
                )}
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-8 h-full border border-slate-700">
                {isTranslating ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-6">
                      <div className="relative">
                        <Sparkles className="h-12 w-12 text-cyan-400 mx-auto animate-pulse" />
                        <div className="absolute -inset-3 bg-cyan-400/20 rounded-full blur-lg animate-pulse"></div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-cyan-400 font-medium">AI Translation in Progress</p>
                        <p className="text-slate-400 text-sm">Analyzing and translating your document...</p>
                      </div>
                      <div className="w-48 bg-slate-700 rounded-full h-2 mx-auto overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full rounded-full animate-pulse w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ) : translatedContent ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-emerald-400 mb-4">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-sm font-medium">Translation Complete</span>
                    </div>
                    <div className="text-white">
                      <p className="leading-relaxed">{translatedContent}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <p>Translated content will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TranslationViewer;
