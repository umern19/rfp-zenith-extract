
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, Copy, CheckCircle, Sparkles } from 'lucide-react';
import { useDocument } from '@/contexts/DocumentContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const FeatureExtraction = () => {
  const navigate = useNavigate();
  const { uploadedFile, translatedContent, extractedFeatures, setExtractedFeatures } = useDocument();
  const [isExtracting, setIsExtracting] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    if (!uploadedFile || !translatedContent) {
      navigate('/');
      return;
    }
  }, [uploadedFile, translatedContent]);

  const handleFeatureExtraction = async () => {
    setIsExtracting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockFeatures = [
      "Multi-factor authentication support",
      "Cloud-native architecture deployment",
      "RESTful API integration capabilities",
      "Real-time data synchronization",
      "Advanced user role management",
      "Automated backup and recovery",
      "Cross-platform compatibility",
      "Integration with existing ERP systems",
      "Custom reporting and analytics",
      "24/7 technical support and maintenance",
      "Scalable infrastructure design",
      "Data encryption and security compliance"
    ];
    
    setExtractedFeatures(mockFeatures);
    setIsExtracting(false);
    setShowFeatures(true);
    
    toast({
      title: "Features Extracted",
      description: `Successfully identified ${mockFeatures.length} key features.`,
    });
  };

  const handleCopyFeatures = () => {
    if (extractedFeatures) {
      const text = extractedFeatures.map((feature, index) => `${index + 1}. ${feature}`).join('\n');
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard",
        description: "Feature list has been copied to your clipboard.",
      });
    }
  };

  const handleExportFeatures = () => {
    if (extractedFeatures) {
      const text = extractedFeatures.map((feature, index) => `${index + 1}. ${feature}`).join('\n');
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'extracted-features.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Complete",
        description: "Features have been exported to a text file.",
      });
    }
  };

  const handleProceedToScope = () => {
    navigate('/scope');
  };

  if (!uploadedFile || !translatedContent) {
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
                onClick={() => navigate('/translate')}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Translation
              </Button>
              <div className="h-6 border-l border-slate-600"></div>
              <h1 className="text-xl font-semibold text-white">Feature Extraction</h1>
            </div>
            
            <div className="flex items-center gap-3">
              {extractedFeatures && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyFeatures}
                    className="border-slate-600 hover:border-cyan-400"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportFeatures}
                    className="border-slate-600 hover:border-cyan-400"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </>
              )}
              
              <Button
                onClick={handleProceedToScope}
                disabled={!extractedFeatures}
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Extract Scope of Work
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Document Preview */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white">Document Analysis</h2>
                
                <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-700 h-[calc(100vh-240px)] flex items-center justify-center">
                  <div className="text-center space-y-6 max-w-md">
                    {!extractedFeatures && !isExtracting && (
                      <>
                        <Sparkles className="h-16 w-16 text-cyan-400 mx-auto" />
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white">Ready for Feature Extraction</h3>
                          <p className="text-slate-400">
                            Click the button below to analyze your document and extract key features using AI.
                          </p>
                          <Button
                            onClick={handleFeatureExtraction}
                            className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 px-8 py-3"
                          >
                            <Sparkles className="h-5 w-5 mr-2" />
                            Extract Features
                          </Button>
                        </div>
                      </>
                    )}
                    
                    {isExtracting && (
                      <>
                        <div className="relative">
                          <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent mx-auto"></div>
                          <Sparkles className="h-8 w-8 text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-cyan-400">Analyzing Document</h3>
                          <p className="text-slate-400">AI is extracting key features and requirements...</p>
                        </div>
                        <div className="w-64 bg-slate-700 rounded-full h-2 mx-auto overflow-hidden">
                          <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full rounded-full animate-pulse w-3/4"></div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Features Panel */}
          <div className={`transition-all duration-500 ${showFeatures ? 'animate-slide-in-left' : ''}`}>
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Extracted Features</h2>
                  {extractedFeatures && (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">{extractedFeatures.length} features</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-slate-900/50 rounded-lg border border-slate-700 h-[calc(100vh-240px)] overflow-hidden">
                  {extractedFeatures ? (
                    <div className="p-6 h-full overflow-y-auto">
                      <div className="space-y-3">
                        {extractedFeatures.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-slate-200 text-sm leading-relaxed">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                      <p>Extracted features will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureExtraction;
