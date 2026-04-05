// components/RichTextEditor.jsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { useState, useEffect } from 'react';

// React Icons - শুধু সঠিক আইকন ইম্পোর্ট
import {
    CgUndo,
    CgRedo,
    CgFormatBold,
    CgFormatItalic,
    CgFormatUnderline,
    CgFormatStrike,
    CgCode,
    CgLink,
    CgImage,
    CgErase
} from 'react-icons/cg';

import {
    MdFormatAlignLeft,
    MdFormatAlignCenter,
    MdFormatAlignRight,
    MdFormatAlignJustify,
    MdFormatColorText,
    MdFormatPaint,
    MdOutlineFormatClear,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdFormatQuote
} from 'react-icons/md';

export default function RichTextEditor({ value, onChange, placeholder = "Describe the product..." }) {
    const [mounted, setMounted] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showBgColorPicker, setShowBgColorPicker] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4],
                },
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full',
                },
            }),
            TextStyle,
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            Placeholder.configure({
                placeholder: placeholder,
                emptyEditorClass: 'is-editor-empty',
            }),
        ],
        content: value || '',
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html);
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[250px] p-4',
                style: 'direction: ltr; text-align: left;',
            },
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '');
        }
    }, [value, editor]);

    if (!mounted || !editor) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="animate-pulse">
                    <div className="h-12 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"></div>
                    <div className="p-4 space-y-2">
                        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    const colors = [
        '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
        '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#FFFFFF',
        '#2E86C1', '#28B463', '#E74C3C', '#F39C12', '#9B59B6', '#1ABC9C',
        '#E67E22', '#3498DB', '#2ECC71', '#E91E63', '#9C27B0', '#00BCD4'
    ];

    const ToolbarButton = ({ onClick, isActive, children, title, disabled = false }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`p-2 rounded-lg transition-all duration-200 ${isActive
                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={title}
        >
            {children}
        </button>
    );

    const Divider = () => (
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
    );

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
            {/* Toolbar */}
            <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/90 backdrop-blur-sm">

                {/* History Controls */}
                <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo (Ctrl+Z)">
                    <CgUndo className="text-lg" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo (Ctrl+Y)">
                    <CgRedo className="text-lg" />
                </ToolbarButton>

                <Divider />

                {/* Text Formatting */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    title="Bold (Ctrl+B)"
                >
                    <CgFormatBold className="text-lg" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    title="Italic (Ctrl+I)"
                >
                    <CgFormatItalic className="text-lg" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive('underline')}
                    title="Underline (Ctrl+U)"
                >
                    <CgFormatUnderline className="text-lg" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive('strike')}
                    title="Strikethrough"
                >
                    <CgFormatStrike className="text-lg" />
                </ToolbarButton>

                <Divider />

                {/* Headings */}
                <div className="relative">
                    <select
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === 'paragraph') {
                                editor.chain().focus().setParagraph().run();
                            } else {
                                editor.chain().focus().toggleHeading({ level: parseInt(value) }).run();
                            }
                        }}
                        value={editor.isActive('heading') ? editor.getAttributes('heading').level : 'paragraph'}
                        className="px-2 py-1.5 text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    >
                        <option value="paragraph">Normal</option>
                        <option value="1">Heading 1</option>
                        <option value="2">Heading 2</option>
                        <option value="3">Heading 3</option>
                        <option value="4">Heading 4</option>
                    </select>
                </div>

                <Divider />

                {/* Text Alignment */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    isActive={editor.isActive({ textAlign: 'left' })}
                    title="Align Left"
                >
                    <MdFormatAlignLeft className="text-lg" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    isActive={editor.isActive({ textAlign: 'center' })}
                    title="Align Center"
                >
                    <MdFormatAlignCenter className="text-lg" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    isActive={editor.isActive({ textAlign: 'right' })}
                    title="Align Right"
                >
                    <MdFormatAlignRight className="text-lg" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    isActive={editor.isActive({ textAlign: 'justify' })}
                    title="Justify"
                >
                    <MdFormatAlignJustify className="text-lg" />
                </ToolbarButton>

                <Divider />

                {/* Lists */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    title="Bullet List"
                >
                    <MdFormatListBulleted className="text-lg" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    title="Numbered List"
                >
                    <MdFormatListNumbered className="text-lg" />
                </ToolbarButton>

                <Divider />

                {/* Colors */}
                <div className="relative">
                    <ToolbarButton
                        onClick={() => {
                            setShowColorPicker(!showColorPicker);
                            setShowBgColorPicker(false);
                        }}
                        title="Text Color"
                    >
                        <MdFormatColorText className="text-lg" />
                    </ToolbarButton>
                    {showColorPicker && (
                        <div className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 p-2 w-64">
                            <div className="grid grid-cols-6 gap-1">
                                {colors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => {
                                            editor.chain().focus().setColor(color).run();
                                            setShowColorPicker(false);
                                        }}
                                        className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => {
                                    editor.chain().focus().unsetColor().run();
                                    setShowColorPicker(false);
                                }}
                                className="mt-2 w-full text-xs text-center py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                Remove Color
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <ToolbarButton
                        onClick={() => {
                            setShowBgColorPicker(!showBgColorPicker);
                            setShowColorPicker(false);
                        }}
                        title="Background Color"
                    >
                        <MdFormatPaint className="text-lg" />
                    </ToolbarButton>
                    {showBgColorPicker && (
                        <div className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 p-2 w-64">
                            <div className="grid grid-cols-6 gap-1">
                                {colors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => {
                                            editor.chain().focus().toggleHighlight({ color }).run();
                                            setShowBgColorPicker(false);
                                        }}
                                        className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => {
                                    editor.chain().focus().unsetHighlight().run();
                                    setShowBgColorPicker(false);
                                }}
                                className="mt-2 w-full text-xs text-center py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                Remove Background
                            </button>
                        </div>
                    )}
                </div>

                <ToolbarButton
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                    title="Clear Formatting"
                >
                    <MdOutlineFormatClear className="text-lg" />
                </ToolbarButton>

                <Divider />

                {/* Block Types */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    title="Quote"
                >
                    <MdFormatQuote className="text-lg" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    isActive={editor.isActive('codeBlock')}
                    title="Code Block"
                >
                    <CgCode className="text-lg" />
                </ToolbarButton>

                <Divider />

                {/* Links & Media */}
                <ToolbarButton
                    onClick={() => {
                        const url = window.prompt('Enter URL:');
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run();
                        }
                    }}
                    isActive={editor.isActive('link')}
                    title="Insert Link"
                >
                    <CgLink className="text-lg" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => {
                        const url = window.prompt('Enter image URL:');
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run();
                        }
                    }}
                    title="Insert Image"
                >
                    <CgImage className="text-lg" />
                </ToolbarButton>

                <Divider />

                {/* Clear Format */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().clearNodes().run()}
                    title="Clear All Formatting"
                >
                    <CgErase className="text-lg" />
                </ToolbarButton>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} className="rich-text-editor" />

            {/* Info Bar */}
            <div className="flex items-center justify-between p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <p className="text-[10px] text-gray-400 dark:text-gray-500">
                    💡 Tip: Use Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline
                </p>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500">
                    <span>📝 Rich Text Editor</span>
                    <span>•</span>
                    <span>🎨 Full Formatting</span>
                </div>
            </div>

            <style jsx global>{`
        .rich-text-editor .ProseMirror {
          min-height: 250px;
          padding: 1rem;
          outline: none;
          direction: ltr;
          text-align: left;
        }
        
        .rich-text-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        
        .rich-text-editor .ProseMirror:focus {
          outline: none;
        }
        
        .rich-text-editor .ProseMirror ul,
        .rich-text-editor .ProseMirror ol {
          padding-left: 1.5rem;
        }
        
        .rich-text-editor .ProseMirror h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 1rem 0;
        }
        
        .rich-text-editor .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0.75rem 0;
        }
        
        .rich-text-editor .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0.5rem 0;
        }
        
        .rich-text-editor .ProseMirror h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0.5rem 0;
        }
        
        .rich-text-editor .ProseMirror blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .rich-text-editor .ProseMirror code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.875em;
        }
        
        .rich-text-editor .ProseMirror pre {
          background-color: #1f2937;
          color: #e5e7eb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          font-family: monospace;
        }
        
        .rich-text-editor .ProseMirror pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }
        
        .rich-text-editor .ProseMirror a {
          color: #ea580c;
          text-decoration: underline;
          cursor: pointer;
        }
        
        .rich-text-editor .ProseMirror a:hover {
          color: #c2410c;
        }
        
        .rich-text-editor .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 0.5rem 0;
        }
        
        .rich-text-editor .ProseMirror mark {
          background-color: #fef08a;
          color: #000;
        }
        
        /* Dark Mode Styles */
        .dark .rich-text-editor .ProseMirror {
          color: #e5e7eb;
        }
        
        .dark .rich-text-editor .ProseMirror blockquote {
          border-left-color: #4b5563;
          color: #9ca3af;
        }
        
        .dark .rich-text-editor .ProseMirror code {
          background-color: #374151;
          color: #e5e7eb;
        }
        
        .dark .rich-text-editor .ProseMirror pre {
          background-color: #111827;
        }
        
        .dark .rich-text-editor .ProseMirror mark {
          background-color: #854d0e;
          color: #fef08a;
        }
      `}</style>
        </div>
    );
}