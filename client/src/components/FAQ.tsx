import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How is this different from traditional SEO?",
    answer: "Traditional SEO optimizes for Google's ranking algorithm. AEO (Answer Engine Optimization) optimizes for how LLMs like ChatGPT, Claude, and Perplexity understand and recommend brands. These are fundamentally different systems—ranking factors vs. training data ingestion. We focus on making your brand the answer AI gives, not just a link in search results."
  },
  {
    question: "How long until I see results?",
    answer: "Most clients see measurable improvements in AI visibility within 60-90 days. However, the timeline depends on your current state—brands with existing authority move faster. We provide a detailed timeline during your free audit, including realistic expectations for your specific situation."
  },
  {
    question: "What's the investment?",
    answer: "Our engagements start at $15,000/month for a minimum 6-month partnership. This isn't for everyone—we work with established brands doing $1M+ in annual revenue who understand the strategic value of AI visibility. During your audit, we'll discuss whether this makes sense for your business."
  },
  {
    question: "Do you work with competitors in the same space?",
    answer: "No. We maintain strict category exclusivity. Once we partner with a brand in a vertical, we won't work with their direct competitors. This ensures our full focus and prevents conflicts of interest. It's first-come, first-served."
  },
  {
    question: "What if it doesn't work?",
    answer: "We offer a performance guarantee: if we don't measurably improve your AI visibility within 90 days, we'll refund your first month's investment. We've never had to pay out—but the guarantee exists because we stand behind our methodology."
  },
  {
    question: "Can't I just do this myself?",
    answer: "Technically, yes—the same way you could technically build your own CRM. But AEO requires deep expertise in how LLMs process information, proprietary tools for tracking AI citations, and relationships with high-authority platforms for distribution. Most in-house teams lack this specialized infrastructure."
  },
  {
    question: "How do you measure AI visibility?",
    answer: "We use proprietary tools that run thousands of prompts across major AI models (ChatGPT, Claude, Gemini, Perplexity) and track citation rates, recommendation frequency, and sentiment. You'll get a live dashboard showing your 'Answer Share' compared to competitors."
  },
  {
    question: "What industries do you work with?",
    answer: "We specialize in B2B SaaS, E-commerce (7-figures+), and professional services. These verticals have the highest ROI from AI visibility because purchase decisions increasingly involve AI research. We don't work with highly regulated industries (healthcare, finance) due to compliance complexity."
  }
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0], isOpen: boolean, onToggle: () => void }) {
  return (
    <div className="border-b border-foreground/20 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-mono text-sm md:text-base font-bold uppercase tracking-wider pr-8">
          {faq.question}
        </span>
        <span className="flex-shrink-0 w-8 h-8 border border-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="font-mono text-sm text-foreground/70 leading-relaxed max-w-3xl">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-background text-foreground border-b-2 border-foreground">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black tracking-tight uppercase mb-4">
            Questions & Answers
          </h2>
          <p className="font-mono text-sm text-foreground/60">
            Everything you need to know before we talk.
          </p>
        </div>

        {/* FAQ List */}
        <div className="border-t border-foreground/20">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="font-mono text-sm text-foreground/60 mb-4">
            Still have questions?
          </p>
          <a 
            href="https://cal.com/memetik/letstalk"
            className="inline-flex items-center gap-3 border-2 border-foreground px-6 py-3 font-mono font-bold text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
          >
            Book a Call — We'll Answer Everything
          </a>
        </div>

      </div>
    </section>
  );
}
