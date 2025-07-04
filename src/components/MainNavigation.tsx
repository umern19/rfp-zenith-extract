
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  FileText, 
  Globe, 
  Sparkles, 
  Target, 
  History,
  ChevronDown,
  Calendar
} from 'lucide-react';
import { useDocument } from '@/contexts/DocumentContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MainNavigation = () => {
  const location = useLocation();
  const { documentHistory, selectDocument, currentDocumentId } = useDocument();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const navigationItems = [
    { path: '/', label: 'Upload', icon: FileText },
    { path: '/translate', label: 'Translation', icon: Globe },
    { path: '/features', label: 'Features', icon: Sparkles },
    { path: '/scope', label: 'Scope', icon: Target },
  ];

  const isActive = (path: string) => location.pathname === path;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold text-white">RFP Assistant</span>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Document History Dropdown */}
          <div className="flex items-center space-x-4">
            {documentHistory.length > 0 && (
              <DropdownMenu open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:text-white hover:border-cyan-400"
                  >
                    <History className="h-4 w-4 mr-2" />
                    Document History
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-80 bg-slate-800 border-slate-700 max-h-96 overflow-y-auto"
                  align="end"
                >
                  <DropdownMenuLabel className="text-slate-300">
                    Recent Documents ({documentHistory.length})
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  
                  {documentHistory.map((doc) => (
                    <DropdownMenuItem
                      key={doc.id}
                      className={`cursor-pointer p-3 focus:bg-slate-700 ${
                        currentDocumentId === doc.id ? 'bg-slate-700/50' : ''
                      }`}
                      onClick={() => {
                        selectDocument(doc.id);
                        setIsHistoryOpen(false);
                      }}
                    >
                      <div className="flex items-start space-x-3 w-full">
                        <FileText className="h-4 w-4 text-cyan-400 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">
                            {doc.name}
                          </p>
                          <div className="flex items-center text-xs text-slate-400 mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(doc.uploadedAt)}
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            {doc.translatedContent && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                                <Globe className="h-3 w-3 mr-1" />
                                Translated
                              </span>
                            )}
                            {doc.extractedFeatures && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                                <Sparkles className="h-3 w-3 mr-1" />
                                Features
                              </span>
                            )}
                            {doc.scopeOfWork && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400">
                                <Target className="h-3 w-3 mr-1" />
                                Scope
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5 text-slate-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700" align="end">
                  {navigationItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-2 w-full ${
                          isActive(item.path) ? 'text-cyan-400' : 'text-slate-300'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
