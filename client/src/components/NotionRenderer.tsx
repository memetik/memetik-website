// Simplified types for Notion blocks (JSON from cache)
interface RichTextItem {
  plain_text: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
  };
  type: string;
  text?: {
    link?: { url: string } | null;
  };
}

export interface NotionBlock {
  id: string;
  type: string;
  paragraph?: { rich_text: RichTextItem[] };
  heading_1?: { rich_text: RichTextItem[] };
  heading_2?: { rich_text: RichTextItem[] };
  heading_3?: { rich_text: RichTextItem[] };
  bulleted_list_item?: { rich_text: RichTextItem[] };
  numbered_list_item?: { rich_text: RichTextItem[] };
  quote?: { rich_text: RichTextItem[] };
  callout?: { rich_text: RichTextItem[]; icon?: { type: string; emoji?: string } };
  code?: { rich_text: RichTextItem[]; language: string };
  toggle?: { rich_text: RichTextItem[] };
  image?: { 
    type: string; 
    external?: { url: string }; 
    file?: { url: string };
    caption: RichTextItem[];
  };
  video?: {
    type: string;
    external?: { url: string };
    file?: { url: string };
  };
  bookmark?: { url: string };
  embed?: { url: string };
  divider?: Record<string, never>;
  table?: Record<string, unknown>;
}

interface NotionRendererProps {
  blocks: NotionBlock[];
}

// Render rich text with formatting
function RichText({ richText }: { richText: RichTextItem[] }) {
  return (
    <>
      {richText.map((text, i) => {
        let content: React.ReactNode = text.plain_text;

        if (text.annotations.bold) {
          content = <strong key={i}>{content}</strong>;
        }
        if (text.annotations.italic) {
          content = <em key={i}>{content}</em>;
        }
        if (text.annotations.strikethrough) {
          content = <s key={i}>{content}</s>;
        }
        if (text.annotations.underline) {
          content = <u key={i}>{content}</u>;
        }
        if (text.annotations.code) {
          content = (
            <code key={i} className="bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">
              {content}
            </code>
          );
        }

        if (text.type === "text" && text.text?.link) {
          const linkUrl = text.text.link.url;
          content = (
            <a
              key={i}
              href={linkUrl}
              className="underline underline-offset-2 hover:text-foreground/70 transition-colors"
              target={linkUrl.startsWith("http") ? "_blank" : undefined}
              rel={linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {content}
            </a>
          );
        }

        return <span key={i}>{content}</span>;
      })}
    </>
  );
}

// Render a single block
function Block({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case "paragraph": {
      const richText = block.paragraph?.rich_text || [];
      if (richText.length === 0) {
        return <div className="h-4" />;
      }
      return (
        <p className="font-mono text-sm leading-relaxed text-foreground/80 mb-4">
          <RichText richText={richText} />
        </p>
      );
    }

    case "heading_1": {
      const richText = block.heading_1?.rich_text || [];
      return (
        <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-foreground mt-12 mb-6">
          <RichText richText={richText} />
        </h1>
      );
    }

    case "heading_2": {
      const richText = block.heading_2?.rich_text || [];
      return (
        <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-foreground mt-10 mb-4">
          <RichText richText={richText} />
        </h2>
      );
    }

    case "heading_3": {
      const richText = block.heading_3?.rich_text || [];
      return (
        <h3 className="text-xl md:text-2xl font-display font-semibold tracking-tight text-foreground mt-8 mb-3">
          <RichText richText={richText} />
        </h3>
      );
    }

    case "bulleted_list_item": {
      const richText = block.bulleted_list_item?.rich_text || [];
      return (
        <li className="font-mono text-sm leading-relaxed text-foreground/80 ml-4 mb-2 list-disc">
          <RichText richText={richText} />
        </li>
      );
    }

    case "numbered_list_item": {
      const richText = block.numbered_list_item?.rich_text || [];
      return (
        <li className="font-mono text-sm leading-relaxed text-foreground/80 ml-4 mb-2 list-decimal">
          <RichText richText={richText} />
        </li>
      );
    }

    case "quote": {
      const richText = block.quote?.rich_text || [];
      return (
        <blockquote className="border-l-4 border-foreground pl-6 my-6">
          <p className="font-serif text-lg italic text-foreground/80">
            <RichText richText={richText} />
          </p>
        </blockquote>
      );
    }

    case "callout": {
      const callout = block.callout;
      if (!callout) return null;
      return (
        <div className="border-2 border-foreground p-6 my-6 bg-foreground/5">
          <div className="flex items-start gap-4">
            {callout.icon?.type === "emoji" && (
              <span className="text-2xl">{callout.icon.emoji}</span>
            )}
            <div className="font-mono text-sm leading-relaxed text-foreground/80">
              <RichText richText={callout.rich_text} />
            </div>
          </div>
        </div>
      );
    }

    case "code": {
      const code = block.code;
      if (!code) return null;
      return (
        <div className="my-6">
          <div className="bg-foreground text-background p-1 font-mono text-xs uppercase tracking-wider inline-block">
            {code.language}
          </div>
          <pre className="bg-foreground/5 border-2 border-foreground p-4 overflow-x-auto">
            <code className="font-mono text-sm text-foreground">
              <RichText richText={code.rich_text} />
            </code>
          </pre>
        </div>
      );
    }

    case "divider":
      return <hr className="my-8 border-t-2 border-foreground" />;

    case "image": {
      const image = block.image;
      if (!image) return null;
      const imageUrl = image.type === "external" 
        ? image.external?.url 
        : image.file?.url;
      if (!imageUrl) return null;
      const caption = image.caption?.length > 0
        ? image.caption.map((c) => c.plain_text).join("")
        : "";
      return (
        <figure className="my-8">
          <img
            src={imageUrl}
            alt={caption || "Article image"}
            className="w-full border-2 border-foreground"
            loading="lazy"
          />
          {caption && (
            <figcaption className="font-mono text-xs text-foreground/60 mt-2 uppercase tracking-wider">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "video": {
      const video = block.video;
      if (!video) return null;
      const videoUrl = video.type === "external" 
        ? video.external?.url 
        : video.file?.url;
      if (!videoUrl) return null;
      
      // Handle YouTube embeds
      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        const videoId = videoUrl.includes("youtu.be")
          ? videoUrl.split("/").pop()
          : new URL(videoUrl).searchParams.get("v");
        return (
          <div className="my-8 aspect-video border-2 border-foreground">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
      return (
        <video src={videoUrl} controls className="w-full my-8 border-2 border-foreground" />
      );
    }

    case "toggle": {
      const toggle = block.toggle;
      if (!toggle) return null;
      return (
        <details className="my-4 border-2 border-foreground">
          <summary className="font-mono text-sm font-bold p-4 cursor-pointer hover:bg-foreground/5">
            <RichText richText={toggle.rich_text} />
          </summary>
          <div className="p-4 border-t-2 border-foreground">
            {/* Toggle children would need recursive rendering */}
          </div>
        </details>
      );
    }

    case "table":
      return (
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-2 border-foreground">
            <tbody>
              <tr>
                <td className="p-4 font-mono text-sm border border-foreground/20">
                  Table content
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case "bookmark": {
      const bookmark = block.bookmark;
      if (!bookmark) return null;
      return (
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block my-6 border-2 border-foreground p-4 hover:bg-foreground/5 transition-colors"
        >
          <span className="font-mono text-sm text-foreground/60 uppercase tracking-wider">
            Bookmark
          </span>
          <p className="font-mono text-sm mt-1 underline">{bookmark.url}</p>
        </a>
      );
    }

    case "embed": {
      const embed = block.embed;
      if (!embed) return null;
      return (
        <div className="my-8 aspect-video border-2 border-foreground">
          <iframe
            src={embed.url}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      );
    }

    default:
      return null;
  }
}

// Group list items together
function groupBlocks(blocks: NotionBlock[]): (NotionBlock | NotionBlock[])[] {
  const grouped: (NotionBlock | NotionBlock[])[] = [];
  let currentList: NotionBlock[] = [];
  let currentListType: string | null = null;

  for (const block of blocks) {
    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      if (currentListType === block.type) {
        currentList.push(block);
      } else {
        if (currentList.length > 0) {
          grouped.push(currentList);
        }
        currentList = [block];
        currentListType = block.type;
      }
    } else {
      if (currentList.length > 0) {
        grouped.push(currentList);
        currentList = [];
        currentListType = null;
      }
      grouped.push(block);
    }
  }

  if (currentList.length > 0) {
    grouped.push(currentList);
  }

  return grouped;
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  const grouped = groupBlocks(blocks);

  return (
    <div className="notion-content">
      {grouped.map((item, i) => {
        if (Array.isArray(item)) {
          const listType = item[0].type;
          const ListTag = listType === "numbered_list_item" ? "ol" : "ul";
          return (
            <ListTag key={i} className="my-4">
              {item.map((block) => (
                <Block key={block.id} block={block} />
              ))}
            </ListTag>
          );
        }
        return <Block key={item.id} block={item} />;
      })}
    </div>
  );
}
