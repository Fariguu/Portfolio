import { marked } from "marked";

interface MarkdownContentProps {
  readonly content: string;
  readonly className?: string;
}

export function MarkdownContent({ content, className = "" }: Readonly<MarkdownContentProps>) {
  if (!content || !content.trim()) return null;

  // marked.parse restituisce HTML sicuro per il testo markdown
  const html = marked.parse(content, {
    gfm: true,
    breaks: true,
  }) as string;

  return (
    <div
      className={`prose prose-invert max-w-none 
        text-foreground/90 
        space-y-6 
        leading-relaxed
        [&_h1]:text-3xl [&_h1]:sm:text-4xl [&_h1]:font-black [&_h1]:tracking-tight [&_h1]:text-foreground [&_h1]:mt-8 [&_h1]:mb-4
        [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-border/40 [&_h2]:pb-2
        [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3
        [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground/90 [&_h4]:mt-4 [&_h4]:mb-2
        [&_p]:text-muted-foreground [&_p]:text-base [&_p]:sm:text-lg [&_p]:leading-relaxed [&_p]:mb-4
        [&_strong]:text-foreground [&_strong]:font-bold
        [&_em]:text-foreground/80 [&_em]:italic
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4 [&_ul]:text-muted-foreground
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4 [&_ol]:text-muted-foreground
        [&_li]:leading-relaxed
        [&_blockquote]:border-l-4 [&_blockquote]:border-brand-accent [&_blockquote]:bg-secondary/30 [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:rounded-r-lg [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-foreground/85
        [&_hr]:border-border/60 [&_hr]:my-10
        [&_code]:bg-secondary/70 [&_code]:text-brand-accent [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:font-mono [&_code]:text-sm
        [&_pre]:bg-zinc-950 [&_pre]:border [&_pre]:border-border/60 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-6
        [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-zinc-100 [&_pre_code]:text-xs [&_pre_code]:sm:text-sm
        [&_table]:w-full [&_table]:border-collapse [&_table]:my-6
        [&_th]:border-b [&_th]:border-border [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground
        [&_td]:border-b [&_td]:border-border/40 [&_td]:p-3 [&_td]:text-muted-foreground
        [&_a]:text-brand-accent [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-brand-accent/80
        ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
