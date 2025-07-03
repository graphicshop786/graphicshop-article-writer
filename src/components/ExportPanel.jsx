import React from 'react';
import html2pdf from 'html2pdf.js';
import { Document, Paragraph, Packer, HeadingLevel, TextRun, AlignmentType, ImageRun } from 'docx';

// Export Panel Component
function ExportPanel({ article, imageUrl }) {
  const exportToPDF = () => {
    if (!article.trim()) {
      alert('No article content to export.');
      return;
    }
    const element = document.createElement('div');
    element.innerText = article;
    html2pdf().from(element).save('article.pdf');
  };

  const exportToDocx = async () => {
    if (!article.trim()) {
      alert('No article content to export.');
      return;
    }
    // Remove markdown bold (**) and trim whitespace
    let cleanArticle = article.replace(/\*\*(.*?)\*\*/g, '$1').trim();

    // Split into paragraphs by double newlines
    const paragraphs = cleanArticle
      .split(/\n{2,}/g)
      .map(p => p.trim())
      .filter(Boolean);

    let children = [];
    // If imageUrl is present, fetch and embed image at the top
    if (imageUrl) {
      try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const arrayBuffer = await blob.arrayBuffer();
        children.push(
          new Paragraph({
            children: [
              new ImageRun({
                data: arrayBuffer,
                transformation: { width: 500, height: 250 },
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          })
        );
      } catch (e) {
        // ignore image error, continue
      }
    }
    // Detect title: first paragraph, short, not ending with a period
    if (paragraphs.length > 0) {
      if (paragraphs[0].length < 80 && !paragraphs[0].endsWith('.')) {
        children.push(
          new Paragraph({
            text: paragraphs[0],
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            thematicBreak: true
          })
        );
        paragraphs.shift();
      }
    }
    // Add the rest as styled paragraphs
    children = children.concat(
      paragraphs.map(p =>
        new Paragraph({
          children: p.split(/\n/).map((line, idx) => [
            new TextRun({
              text: line,
              font: 'Calibri',
              size: 24,
              break: idx > 0,
              color: '222222',
            })
          ]).flat(),
          spacing: { after: 240 },
          alignment: AlignmentType.JUSTIFIED,
        })
      )
    );

    const doc = new Document({
      sections: [{ children }]
    });
    Packer.toBlob(doc).then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'article.docx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="md:w-1/3 bg-gray-900/70 backdrop-blur-lg shadow-xl p-6 rounded-2xl border border-gray-800 flex flex-col">
      <h2 className="text-2xl font-bold text-brand-gold mb-6 tracking-tight drop-shadow">Export Options</h2>
      <div className="space-y-4">
        <button
          onClick={exportToPDF}
          className="w-full bg-brand-gold text-black font-bold p-3 rounded-lg shadow hover:bg-yellow-400 transition text-lg"
        >
          Export to PDF
        </button>
        <button
          onClick={exportToDocx}
          className="w-full bg-brand-gold text-black font-bold p-3 rounded-lg shadow hover:bg-yellow-400 transition text-lg"
        >
          Export to Word
        </button>
      </div>
    </div>
  );
}

export default ExportPanel;