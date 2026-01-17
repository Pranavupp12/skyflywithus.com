"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  ScanSearch 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogData {
  title: string;
  metaTitle: string;
  metaDesc: string;
  content: string;
  focusKeyword?: string | null;
}

interface SeoReportDialogProps {
  blog: BlogData;
}

type Status = "good" | "warning" | "bad";

interface CheckItem {
  label: string;
  value: string;
  status: Status;
  message: string;
}

export function SeoReportDialog({ blog }: SeoReportDialogProps) {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState(blog.focusKeyword || "");
  const [report, setReport] = useState<{
    keywordChecks: CheckItem[];
    lengthChecks: CheckItem[];
    score: number;
  } | null>(null);

  // Helper to remove extra spaces and lower case
  const normalize = (text: string) => text.toLowerCase().replace(/\s+/g, " ").trim();

  const analyze = () => {
    if (!keyword.trim()) return;

    const k = normalize(keyword);
    const title = normalize(blog.title || "");
    const metaTitle = normalize(blog.metaTitle || "");
    const metaDesc = normalize(blog.metaDesc || "");
    const contentText = normalize(blog.content.replace(/<[^>]*>?/gm, " ")); 
    const wordCount = contentText.split(/\s+/).filter((w) => w.length > 0).length;

    // --- 1. KEYWORD CHECKS ---
    const keywordChecks: CheckItem[] = [
      {
        label: "Blog Title",
        value: title.includes(k) ? "Found" : "Missing",
        status: title.includes(k) ? "good" : "bad",
        message: title.includes(k) ? "Keyword found in main title." : "Add focus keyword to the main title.",
      },
      {
        label: "Meta Title",
        value: metaTitle.includes(k) ? "Found" : "Missing",
        status: metaTitle.includes(k) ? "good" : "bad",
        message: metaTitle.includes(k) ? "Keyword found in meta title." : "Add focus keyword to the meta title.",
      },
      {
        label: "Meta Description",
        value: metaDesc.includes(k) ? "Found" : "Missing",
        status: metaDesc.includes(k) ? "good" : "bad",
        message: metaDesc.includes(k) ? "Keyword found in meta description." : "Add focus keyword to the meta description.",
      },
      {
        label: "Content Body",
        value: contentText.includes(k) ? "Found" : "Missing",
        status: contentText.includes(k) ? "good" : "bad",
        message: contentText.includes(k) ? "Keyword found in body content." : "Mention the keyword in the blog content.",
      },
    ];

    // --- 2. LENGTH CHECKS ---
    const mtLen = blog.metaTitle?.length || 0;
    let mtStatus: Status = "good";
    let mtMsg = "Perfect length.";
    if (mtLen === 0) { mtStatus = "bad"; mtMsg = "Missing title."; }
    else if (mtLen < 30) { mtStatus = "warning"; mtMsg = "Too short (aim for 30-60)."; }
    else if (mtLen > 60) { mtStatus = "warning"; mtMsg = "Too long (aim for 30-60)."; }

    const mdLen = blog.metaDesc?.length || 0;
    let mdStatus: Status = "good";
    let mdMsg = "Perfect length.";
    if (mdLen === 0) { mdStatus = "bad"; mtMsg = "Missing desc."; }
    else if (mdLen < 120) { mdStatus = "warning"; mtMsg = "Too short (aim for 120-160)."; }
    else if (mdLen > 160) { mdStatus = "warning"; mtMsg = "Too long (aim for 120-160)."; }

    let wcStatus: Status = "good";
    if (wordCount < 300) wcStatus = "bad";

    const lengthChecks: CheckItem[] = [
      {
        label: "Meta Title Length",
        value: `${mtLen} chars`,
        status: mtStatus,
        message: mtMsg,
      },
      {
        label: "Meta Desc Length",
        value: `${mdLen} chars`,
        status: mdStatus,
        message: mdMsg,
      },
      {
        label: "Word Count",
        value: `${wordCount} words`,
        status: wcStatus,
        message: wordCount < 300 ? "Content is too thin (aim for 300+)." : "Good content depth.",
      },
    ];

    // --- 3. SCORE ---
    const totalChecks = keywordChecks.length + lengthChecks.length;
    const passed = [...keywordChecks, ...lengthChecks].filter(c => c.status === "good").length;
    const score = Math.round((passed / totalChecks) * 100);

    setReport({ keywordChecks, lengthChecks, score });
  };

  const getIcon = (status: Status) => {
    if (status === "good") return <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />;
    if (status === "warning") return <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />;
    return <XCircle className="h-5 w-5 text-red-500 shrink-0" />;
  };

  const getScoreColor = (score: number) => {
      if (score >= 80) return "text-green-600";
      if (score >= 50) return "text-yellow-600";
      return "text-red-600";
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2">
          Check Seo
        </Button>
      </DialogTrigger>
      
      {/* 1. Modal Container */}
      <DialogContent className="sm:max-w-3xl h-[85vh] flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-8 py-5 border-b shrink-0">
          <DialogTitle className="text-xl">SEO Audit Report</DialogTitle>
        </DialogHeader>

        {/* 2. Fixed Search Bar Area */}
        <div className="p-8 pb-4 shrink-0 bg-white z-10">
            <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Focus Keyword</Label>
                <div className="flex gap-3">
                    <Input
                        id="keyword"
                        placeholder="e.g. flight refund"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && analyze()}
                        className="flex-1 h-11"
                    />
                    <Button onClick={analyze} disabled={!keyword.trim()} className="bg-black text-white hover:bg-gray-800 h-11 px-6">
                        {report ? "Re-Analyze" : "Analyze"}
                    </Button>
                </div>
            </div>
        </div>

        {/* 3. SCROLLABLE AREA (FIXED: Uses native div with min-h-0) */}
        <div className="flex-1 overflow-y-auto min-h-0 w-full">
          <div className="px-8 pb-10">
            {!report ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400 space-y-4">
                <ScanSearch className="h-16 w-16 opacity-10" />
                <p className="text-lg">Enter a focus keyword above to generate the report.</p>
              </div>
            ) : (
              <div className="space-y-10 pt-4">
                
                {/* Score Section */}
                <div className="flex items-center justify-between bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Overall Score</h3>
                    <p className="text-gray-500 mt-1">Based on keyword usage and content length.</p>
                  </div>
                  <div className={`text-5xl font-black ${getScoreColor(report.score)}`}>
                      {report.score}<span className="text-2xl text-gray-400 font-bold">/100</span>
                  </div>
                </div>

                {/* Keyword Consistency */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" /> Keyword Consistency
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {report.keywordChecks.map((check, i) => (
                      <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]">
                        <div className="mt-1 transform scale-125">{getIcon(check.status)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-gray-900 text-base">{check.label}</span>
                              <Badge variant="outline" className={`text-xs font-semibold px-2.5 py-0.5 border-0 ${
                                  check.status === 'good' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                              }`}>
                                  {check.value}
                              </Badge>
                          </div>
                          <p className="text-sm text-gray-500">{check.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Lengths */}
                <div className="pb-8">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" /> Technical Lengths
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {report.lengthChecks.map((check, i) => (
                      <div key={i} className="p-5 rounded-xl border border-gray-200 bg-white shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] flex flex-col h-32 relative">
                          <div className="absolute top-4 right-4 transform scale-110">
                              {getIcon(check.status)}
                          </div>
                          
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide pr-8">
                              {check.label.replace("Length", "")}
                          </span>
                          
                          <div className="mt-auto">
                              <div className="font-black text-2xl text-gray-900 leading-none mb-2">
                                  {check.value.split(" ")[0]} 
                                  <span className="text-sm font-bold text-gray-400 ml-1">
                                      {check.value.split(" ")[1]}
                                  </span>
                              </div>
                              <p className={`text-xs font-semibold leading-tight ${
                                  check.status === 'good' ? 'text-green-600' : 
                                  check.status === 'warning' ? 'text-yellow-600' : 'text-red-500'
                              }`}>
                                  {check.message}
                              </p>
                          </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}