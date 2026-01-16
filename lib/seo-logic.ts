// src/lib/seo-logic.ts

export interface SeoAnalysisResult {
    identifier: string;
    score: number; // 0 to 10
    text: string;
    status: 'good' | 'ok' | 'bad';
}

export function analyzeSeo(content: string, keyword: string, title: string, metaTitle: string, metaDesc: string) {
    const results: SeoAnalysisResult[] = [];
    
    // Helper to count words (stripping HTML from Tiptap)
    const plainText = content.replace(/<[^>]*>/g, ' '); 
    const wordCount = plainText.trim().split(/\s+/).filter(w => w.length > 0).length;
    
    // Normalize focus keyword (case insensitive)
    const focusKeyword = keyword.split(',')[0].trim().toLowerCase();
    const contentLower = plainText.toLowerCase();

    // --- 1. Article Word Count (Existing Logic) ---
    let wordScore = 0;
    if (wordCount > 600) wordScore = 10;       
    else if (wordCount > 300) wordScore = 6;
    else wordScore = 3;

    results.push({
        identifier: 'wordCount',
        score: wordScore,
        text: `Word count: ${wordCount} (Recommended: 600+).`,
        status: wordScore > 7 ? 'good' : wordScore > 4 ? 'ok' : 'bad'
    });

    // --- 2. Focus Keyword Checks (New Comprehensive Logic) ---
    if (focusKeyword) {
        
        // A. Check Blog Title (The H1)
        const titleHasKw = title.toLowerCase().includes(focusKeyword);
        results.push({
            identifier: 'keywordInTitle',
            score: titleHasKw ? 10 : 0,
            text: titleHasKw ? "Focus keyword found in Blog Title." : "Focus keyword missing from Blog Title.",
            status: titleHasKw ? 'good' : 'bad'
        });

        // B. Check Meta Title (The SEO Title)
        const metaTitleHasKw = metaTitle.toLowerCase().includes(focusKeyword);
        results.push({
            identifier: 'keywordInMetaTitle',
            score: metaTitleHasKw ? 10 : 0,
            text: metaTitleHasKw ? "Focus keyword found in Meta Title." : "Focus keyword missing from Meta Title.",
            status: metaTitleHasKw ? 'good' : 'bad'
        });

        // C. Check Meta Description
        const metaDescHasKw = metaDesc.toLowerCase().includes(focusKeyword);
        results.push({
            identifier: 'keywordInMetaDesc',
            score: metaDescHasKw ? 10 : 0,
            text: metaDescHasKw ? "Focus keyword found in Meta Description." : "Focus keyword missing from Meta Description.",
            status: metaDescHasKw ? 'good' : 'bad'
        });

        // D. Check Main Content Body
        const contentHasKw = contentLower.includes(focusKeyword);
        results.push({
            identifier: 'keywordInContent',
            score: contentHasKw ? 10 : 0,
            text: contentHasKw ? "Focus keyword found in content body." : "Focus keyword missing from content.",
            status: contentHasKw ? 'good' : 'bad'
        });
    }

    // --- 3. Meta Title Length (Existing Logic) ---
    if (!metaTitle) {
        results.push({
            identifier: 'metaTitleLength',
            score: 5,
            text: "No custom Meta Title set.",
            status: 'ok'
        });
    } else {
        const mtLen = metaTitle.length;
        let mtStatus: 'good' | 'ok' | 'bad' = 'good';
        let mtMsg = "Meta title length is good.";

        if (mtLen > 60) {
            mtStatus = 'bad';
            mtMsg = `Meta title is too long (${mtLen}/60 chars).`;
        } else if (mtLen < 10) {
            mtStatus = 'bad';
            mtMsg = "Meta title is too short.";
        }

        results.push({
            identifier: 'metaTitleLength',
            score: mtStatus === 'good' ? 10 : 0,
            text: mtMsg,
            status: mtStatus
        });
    }

    // --- 4. Meta Description Length (Existing Logic) ---
    const mdLen = metaDesc.length;
    let mdScore = 10;
    let mdMsg = "Meta description length is good.";

    if (mdLen === 0) {
        mdScore = 0; 
        mdMsg = "No meta description provided."; 
    } else if (mdLen > 160) {
        mdScore = 0; 
        mdMsg = `Meta description is too long (${mdLen}/160 chars).`;
    } else if (mdLen < 50) {
        mdScore = 5; 
        mdMsg = "Meta description is a bit short (under 50 chars).";
    }

    results.push({
        identifier: 'metaDescriptionLength',
        score: mdScore,
        text: mdMsg,
        status: mdScore > 7 ? 'good' : mdScore > 4 ? 'ok' : 'bad'
    });

    // Calculate Average
    const totalScore = results.reduce((acc, curr) => acc + curr.score, 0);
    const average = results.length > 0 ? totalScore / results.length : 0;

    return { results, average };
}