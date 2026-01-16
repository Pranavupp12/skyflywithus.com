"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { analyzeSeo, SeoAnalysisResult } from "@/lib/seo-logic"; // Ensure path is correct
import { Badge } from "@/components/ui/badge";

interface SEOAnalyzerProps {
  content: string;
  keyword: string;
  title: string;
  metaTitle: string; 
  metaDesc: string;
}

export function SEOAnalyzer({ content, keyword, title, metaTitle, metaDesc }: SEOAnalyzerProps) {
  const [results, setResults] = useState<SeoAnalysisResult[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    // If keyword contains commas, just take the first one for analysis logic
    const primaryKeyword = keyword.split(',')[0];
    const { results, average } = analyzeSeo(content, primaryKeyword, title, metaTitle, metaDesc);
    setResults(results);
    setOverallScore(average);
  }, [content, keyword, title, metaTitle, metaDesc]);

  const getIcon = (status: string) => {
    if (status === 'good') return <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />;
    if (status === 'ok') return <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />;
    return <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 5) return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="w-full h-full">
        <Card className="h-full flex flex-col border-dashed border-2 shadow-sm">
          <CardHeader className="py-4 pb-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-500" />
                    <CardTitle className="text-base font-semibold">SEO Scorecard</CardTitle>
                </div>
                <Badge variant="outline" className={`px-3 py-1 font-bold ${getScoreColor(overallScore)}`}>
                    {overallScore.toFixed(1)} / 10
                </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-4 pt-2">
              <ScrollArea className="h-[280px] pr-3">
                {(!keyword) && (
                    <div className="flex flex-col items-center justify-center h-full py-8 text-center space-y-2 opacity-60">
                      <Sparkles className="h-8 w-8 text-gray-400" />
                      <p className="text-sm text-muted-foreground">
                        Enter a "Focus Keyword" to start scoring.
                      </p>
                    </div>
                )}
                {keyword && (
                    <div className="space-y-3">
                        {results.map((res, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg bg-card text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                {getIcon(res.status)}
                                <div className="flex-1">
                                    <p className="font-medium text-foreground leading-tight">{res.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
              </ScrollArea>
          </CardContent>
        </Card>
    </div>
  );
}