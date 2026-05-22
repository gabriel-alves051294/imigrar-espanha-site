// ────────────────────────────────────────────────────────────────────
// RichTextEditor — wrapper TipTap leve para o blog.
//
// Saída: HTML serializado (string), salvo em blog_posts.content.
// O HTML é renderizado em BlogPostPage via dangerouslySetInnerHTML,
// dentro de container Tailwind `prose` (sanitização confiável pois
// vem do próprio usuário autenticado + moderação Perspective).
//
// Extensions habilitadas:
//   - StarterKit (heading, bold, italic, lists, blockquote, code, etc.)
//   - Link (com proteção rel="noopener noreferrer")
//   - Image (URL externa apenas — upload usa ImageUploader separado)
//   - Placeholder
// ────────────────────────────────────────────────────────────────────
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import {
  Bold, Italic, Strikethrough, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Undo, Redo,
  Link as LinkIcon, Image as ImageIcon,
} from 'lucide-react';

const ToolbarButton = ({ onClick, active, disabled, title, children }) => (
  <Button
    type="button"
    variant={active ? 'default' : 'ghost'}
    size="sm"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className="h-8 w-8 p-0"
  >
    {children}
  </Button>
);

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const promptLink = () => {
    const previous = editor.getAttributes('link').href || '';
    const url = window.prompt('URL do link (deixe vazio para remover):', previous);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const promptImage = () => {
    const url = window.prompt('URL da imagem:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-muted/30 rounded-t-md">
      <ToolbarButton title="Negrito" active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Itálico" active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Tachado" active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>
      <div className="w-px bg-border mx-1" />
      <ToolbarButton title="Título H2" active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Título H3" active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>
      <div className="w-px bg-border mx-1" />
      <ToolbarButton title="Lista" active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Lista numerada" active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Citação" active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Código" active={editor.isActive('codeBlock')}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <Code className="h-4 w-4" />
      </ToolbarButton>
      <div className="w-px bg-border mx-1" />
      <ToolbarButton title="Link" active={editor.isActive('link')} onClick={promptLink}>
        <LinkIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Imagem por URL" onClick={promptImage}>
        <ImageIcon className="h-4 w-4" />
      </ToolbarButton>
      <div className="w-px bg-border mx-1" />
      <ToolbarButton title="Desfazer" onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}>
        <Undo className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Refazer" onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}>
        <Redo className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
};

const RichTextEditor = ({ value, onChange, placeholder = 'Escreva seu conteúdo aqui...' }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Image.configure({ inline: false, HTMLAttributes: { class: 'rounded-lg max-w-full h-auto' } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[400px] p-4 ' +
          'prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg',
      },
    },
  });

  return (
    <div className="border border-input rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
