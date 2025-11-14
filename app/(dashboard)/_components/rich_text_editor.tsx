'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';
import {
  Bold, Italic, Underline, Link, Heading1, Heading2, Heading3,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, List ,ListOrdered
} from 'lucide-react';
import UnderlineExtension from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { useState, useEffect } from 'react';
import { Editor } from '@tiptap/react'

// --- A simple, custom toolbar ---
const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="border rounded-t-md p-2 flex flex-wrap gap-2 bg-white dark:bg-gray-800">
      {/* --- Heading Buttons --- */}
      <Button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'outline'} size="sm">
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'outline'} size="sm">
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'outline'} size="sm">
        <Heading3 className="h-4 w-4" />
      </Button>

      {/* --- Style Buttons --- */}
      <Button type="button" onClick={() => editor.chain().focus().toggleBold().run()} variant={editor.isActive('bold') ? 'secondary' : 'outline'} size="sm">
        <Bold className="h-4 w-4" />
      </Button>
      <Button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} variant={editor.isActive('italic') ? 'secondary' : 'outline'} size="sm">
        <Italic className="h-4 w-4" />
      </Button>
      <Button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} variant={editor.isActive('underline') ? 'secondary' : 'outline'} size="sm">
        <Underline className="h-4 w-4" />
      </Button>
      <Button type="button" onClick={setLink} variant={editor.isActive('link') ? 'secondary' : 'outline'} size="sm">
        <Link className="h-4 w-4" />
      </Button>

      {/* --- Align Buttons --- */}
      <Button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} variant={editor.isActive({ textAlign: 'left' }) ? 'secondary' : 'outline'} size="sm">
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} variant={editor.isActive({ textAlign: 'center' }) ? 'secondary' : 'outline'} size="sm">
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} variant={editor.isActive({ textAlign: 'right' }) ? 'secondary' : 'outline'} size="sm">
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} variant={editor.isActive({ textAlign: 'justify' }) ? 'secondary' : 'outline'} size="sm">
        <AlignJustify className="h-4 w-4" />
      </Button>

      <Button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} variant={editor.isActive('bulletList') ? 'default' : 'outline'} size="sm">
        <List className="h-4 w-4" />
      </Button>
      <Button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} variant={editor.isActive('orderedList') ? 'default' : 'outline'} size="sm">
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );
};

// --- The Main Editor Component ---
interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function RichTextEditor({ value, onChange, onBlur }: RichTextEditorProps) {
  const [, setForceUpdate] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable default heading sizes to use our own
        heading: {
          levels: [1, 2, 3],
        },
      }),
      UnderlineExtension,
      LinkExtension.configure({ openOnClick: false }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      setForceUpdate(Date.now());
    },
    onSelectionUpdate() {
      setForceUpdate(Date.now());
    },
    onBlur() {
      onBlur();
    },
    editorProps: {
      attributes: {
        // Updated class to match your CSS and shadcn styles
        class: 'prose dark:prose-invert min-h-[250px] w-full max-w-none rounded-b-md border border-input p-4 focus:outline-none bg-white dark:bg-gray-900',
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      const editorHtml = editor.getHTML();
      if (value !== editorHtml) {
        editor.commands.setContent(value, { emitUpdate: false });
      }
    }
  }, [value, editor]);

  return (
    <div className="flex flex-col flex-grow">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="flex-grow flex flex-col" />
    </div>
  );
}