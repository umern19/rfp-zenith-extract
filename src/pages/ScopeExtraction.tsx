
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Copy, CheckCircle, FileText, Sparkles } from 'lucide-react';
import { useDocument } from '@/contexts/DocumentContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const ScopeExtraction = () => {
  const navigate = useNavigate();
  const { uploadedFile, extractedFeatures, scopeOfWork, setScopeOfWork } = useDocument();
  const [isExtracting, setIsExtracting] = useState(false);
  const [showScope, setShowScope] = useState(false);

  useEffect(() => {
    if (!uploadedFile || !extractedFeatures) {
      navigate('/');
      return;
    }
  }, [uploadedFile, extractedFeatures]);

  const handleScopeExtraction = async () => {
    setIsExtracting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockScope = `# Scope of Work

## Project Overview
Development of a comprehensive enterprise software solution that meets all specified requirements and integrates seamlessly with existing business processes.

## Core Deliverables

### 1. System Architecture & Design
- **Cloud-native architecture** implementation
- **Scalable infrastructure** design and deployment
- **Security framework** establishment with multi-factor authentication
- **API gateway** setup for RESTful integration capabilities

### 2. Core Platform Development
- **User management system** with advanced role-based access control
- **Real-time data synchronization** across all modules
- **Cross-platform compatibility** ensuring seamless operation
- **Integration interfaces** for existing ERP systems

### 3. Data Management & Analytics
- **Custom reporting engine** with advanced analytics capabilities
- **Automated backup and recovery** system implementation
- **Data encryption** and security compliance measures
- **Performance monitoring** and optimization tools

### 4. Support & Maintenance
- **24/7 technical support** infrastructure setup
- **Documentation** and training materials development
- **Quality assurance** testing and validation procedures
- **Deployment** and go-live support

## Technical Requirements
- Implementation of all ${extractedFeatures?.length || 0} identified features
- Compliance with industry security standards
- Performance benchmarks and SLA agreements
- Comprehensive testing and validation protocols

## Timeline & Milestones
- **Phase 1:** Architecture & Planning (Weeks 1-4)
- **Phase 2:** Core Development (Weeks 5-16)
- **Phase 3:** Integration & Testing (Weeks 17-20)
- **Phase 4:** Deployment & Support (Weeks 21-24)

## Success Criteria
- All functional requirements met
- Performance benchmarks achieved
- Security compliance verified
- User acceptance testing completed successfully`;
    
    setScopeOfWork(mockScope);
    setIsExtracting(false);
    setShowScope(true);
    
    toast({
      title: "Scope of Work Extracted",
      description: "Successfully generated structured scope of work document.",
    });
  };

  const handleCopyScope = () => {
    if (scopeOfWork) {
      navigator.clipboard.writeText(scopeOfWork);
      toast({
        title: "Copied to Clipboard",
        description: "Scope of work has been copied to your clipboard.",
      });
    }
  };

  const handleExportScope = () => {
    if (scopeOfWork) {
      const blob = new Blob([scopeOfWork], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'scope-of-work.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Complete",
        description: "Scope of work has been exported as Markdown file.",
      });
    }
  };

  if (!uploadedFile || !extractedFeatures) {
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
                onClick={() => navigate('/features')}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Features
              </Button>
              <div className="h-6 border-l border-slate-600"></div>
              <h1 className="text-xl font-semibold text-white">Scope of Work</h1>
            </div>
            
            <div className="flex items-center gap-3">
              {scopeOfWork && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyScope}
                    className="border-slate-600 hover:border-cyan-400"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportScope}
                    className="border-slate-600 hover:border-cyan-400"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export (.md)
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Analysis Summary</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-400 text-sm">Features Identified</span>
                      <span className="text-cyan-400 font-semibold">{extractedFeatures.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-400 text-sm">Document Status</span>
                      <span className="text-emerald-400 font-semibold">Analyzed</span>
                    </div>
                  </div>
                </div>

                {!scopeOfWork && !isExtracting && (
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Ready to Extract</h4>
                    <p className="text-slate-400 text-sm">
                      Generate a comprehensive scope of work document based on the extracted features.
                    </p>
                    <Button
                      onClick={handleScopeExtraction}
                      className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Extract Scope of Work
                    </Button>
                  </div>
                )}

                {scopeOfWork && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Scope Generated</span>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Your scope of work document is ready for review and export.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Scope Document */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 h-[calc(100vh-160px)]">
              <div className="space-y-4 h-full">
                <h2 className="text-lg font-semibold text-white">Scope of Work Document</h2>
                
                <div className="bg-slate-900/50 rounded-lg border border-slate-700 h-full overflow-hidden">
                  {isExtracting ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center space-y-6">
                        <div className="relative">
                          <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent mx-auto"></div>
                          <Sparkles className="h-8 w-8 text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-cyan-400">Generating Scope of Work</h3>
                          <p className="text-slate-400">AI is structuring your project scope...</p>
                        </div>
                        <div className="w-64 bg-slate-700 rounded-full h-2 mx-auto overflow-hidden">
                          <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full rounded-full animate-pulse w-4/5"></div>
                        </div>
                      </div>
                    </div>
                  ) : scopeOfWork ? (
                    <div className={`p-6 h-full overflow-y-auto prose prose-invert max-w-none ${showScope ? 'animate-fade-in' : ''}`}>
                      <div className="space-y-6 text-slate-200">
                        {scopeOfWork.split('\n').map((line, index) => {
                          if (line.startsWith('# ')) {
                            return <h1 key={index} className="text-2xl font-bold text-white mb-4">{line.replace('# ', '')}</h1>;
                          } else if (line.startsWith('## ')) {
                            return <h2 key={index} className="text-xl font-semibold text-cyan-400 mt-6 mb-3">{line.replace('## ', '')}</h2>;
                          } else if (line.startsWith('### ')) {
                            return <h3 key={index} className="text-lg font-medium text-emerald-400 mt-4 mb-2">{line.replace('### ', '')}</h3>;
                          } else if (line.startsWith('- **')) {
                            const match = line.match(/- \*\*(.*?)\*\*(.*)/);
                            if (match) {
                              return (
                                <div key={index} className="flex items-start gap-3 ml-4 mb-2">
                                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <p><span className="font-semibold text-cyan-300">{match[1]}</span>{match[2]}</p>
                                </div>
                              );
                            }
                            return <p key={index} className="ml-4">{line}</p>;
                          } else if (line.startsWith('- ')) {
                            return (
                              <div key={index} className="flex items-start gap-3 ml-4 mb-1">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5 flex-shrink-0"></div>
                                <p>{line.replace('- ', '')}</p>
                              </div>
                            );
                          } else if (line.trim() === '') {
                            return <div key={index} className="h-4"></div>;
                          } else {
                            return <p key={index} className="leading-relaxed">{line}</p>;
                          }
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                      <div className="text-center space-y-4">
                        <FileText className="h-16 w-16 mx-auto opacity-50" />
                        <p>Scope of work document will appear here</p>
                      </div>
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

export default ScopeExtraction;
