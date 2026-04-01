// components/RichTextEditor.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { CgFormatBold } from 'react-icons/cg';
import { PiTextItalicFill, PiTextUnderlineFill } from 'react-icons/pi';
import { LiaStrikethroughSolid } from 'react-icons/lia';
import { MdFormatAlignCenter, MdFormatAlignJustify, MdFormatAlignLeft, MdFormatAlignRight, MdFormatColorText, MdFormatListBulleted, MdFormatListNumbered } from 'react-icons/md';
import { IoLink } from 'react-icons/io5';
import { FaFileImage } from 'react-icons/fa';

export default function RichTextEditor({ value, onChange, placeholder = "Describe the product..." }) {
    const editorRef = useRef(null);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [isFocused, setIsFocused] = useState(false);

    const colors = [
        '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
        '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#FFFFFF'
    ];

    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        updateContent();
        editorRef.current?.focus();
    };

    const updateContent = () => {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            onChange(html);
        }
    };

    const handleLink = () => {
        const url = prompt('Enter URL:', 'https://');
        if (url) {
            execCommand('createLink', url);
        }
    };

    const handleColor = (color) => {
        setSelectedColor(color);
        execCommand('foreColor', color);
        setShowColorPicker(false);
    };

    const handleAlign = (align) => {
        execCommand(`justify${align.charAt(0).toUpperCase() + align.slice(1)}`);
    };

    const handleInsertList = (type) => {
        execCommand(`insert${type === 'ul' ? 'Unordered' : 'Ordered'}List`);
    };

    const handleInsertImage = () => {
        const url = prompt('Enter image URL:', 'https://');
        if (url) {
            execCommand('insertImage', url);
        }
    };

    const handleKeyDown = (e) => {
        // Prevent RTL shortcuts and ensure LTR direction
        if (e.ctrlKey && e.shiftKey && (e.key === 'X' || e.key === 'x')) {
            e.preventDefault();
        }
        // Ensure text direction stays LTR
        setTimeout(() => {
            if (editorRef.current) {
                editorRef.current.style.direction = 'ltr';
                editorRef.current.dir = 'ltr';
            }
        }, 0);
    };

    const handleInput = () => {
        updateContent();
        // Force LTR direction on input
        if (editorRef.current) {
            editorRef.current.style.direction = 'ltr';
            editorRef.current.dir = 'ltr';
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        if (editorRef.current) {
            editorRef.current.style.direction = 'ltr';
            editorRef.current.dir = 'ltr';
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
        updateContent();
    };

    // Set initial content
    useEffect(() => {
        if (editorRef.current && !value) {
            editorRef.current.innerHTML = `<p style="margin:0; direction: ltr; text-align: left;">${placeholder}</p>`;
        }
    }, []);

    return (
        <div className="bg-surface-container-highest rounded-xl overflow-hidden border border-transparent focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-neutral-200/50 bg-neutral-100/50">
                {/* Text Formatting */}
                <div className="flex items-center gap-0.5 border-r border-neutral-300 pr-2 mr-1">
                    <button
                        type="button"
                        onClick={() => execCommand('bold')}
                        className="p-1.5 hover:bg-neutral-200 rounded transition-colors"
                        title="Bold (Ctrl+B)"
                    >
                        <CgFormatBold className="text-lg" />
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('italic')}
                        className="p-1.5 hover:bg-neutral-200 rounded transition-colors"
                        title="Italic (Ctrl+I)"
                    >
                        <PiTextItalicFill className="text-lg" />
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('underline')}
                        className="p-1.5 hover:bg-neutral-200 rounded transition-colors"
                        title="Underline (Ctrl+U)"
                    >
                        <PiTextUnderlineFill className="text-lg" />
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('strikeThrough')}
                        className="p-1.5 hover:bg-neutral-200 rounded transition-colors"
                        title="Strikethrough"
                    >
                        <LiaStrikethroughSolid className="text-lg" />
                    </button>
                </div>

                {/* Text Color */}
                <div className="relative border-r border-neutral-300 pr-2 mr-1">
                    <button
                        type="button"
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        className="p-1.5 hover:bg-neutral-200 rounded transition-colors flex items-center gap-1"
                        title="Text Color"
                    >
                        <MdFormatColorText className="text-lg" />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedColor }}></div>
                    </button>
                    {showColorPicker && (
                        <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-lg shadow-xl border p-2 w-48">
                            <div className="grid grid-cols-6 gap-1">
                                {colors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => handleColor(color)}
                                        className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Alignment */}
                <div className="flex items-center gap-0.5 border-r border-neutral-300 pr-2 mr-1">
                    <button
                        type="button"
                        onClick={() => handleAlign('left')}
                        className="p-1.5 hover:bg-neutral-200 rounded transition-colors"
                        title="Align Left"
                    >
                        <MdFormatAlignLeft className="text-lg" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleAlign('center')}
                        className="p-1.5 hover:bg-neutral-200 rounded transition-colors"
                        title="Align Center"
                    >
                        <MdFormatAlignCenter className="text-lg" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleAlign('right')}
                        className="p-1.5 hover:bg-neutral-200 rounded transition-colors"
                        title="Align Right"
                    >
                        <MdFormatAlignRight className="text-lg" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleAlign('justify')}
                        className="p-1.5 hover:bg-neutral-200 rounded transition-colors"
                        title="Justify"
                    >
                        <MdFormatAlignJustify className="text-lg" />
                    </button>
                </div>

                {/* Lists */}
                <div className="flex items-center gap-0.5 border-r border-neutral-300 pr-2 mr-1">
                    <button
                        type="button"
                        onClick={() => handleInsertList('ul')}
                        className="p-1.5 hover:bg-neutral-200 rounded transition-colors"
                        title="Bullet List"
                    >
                        <MdFormatListBulleted className="text-lg" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleInsertList('ol')}
                        className="p-1.5 hover:bg-neutral-200 rounded transition-colors"
                        title="Numbered List"
                    >
                        <MdFormatListNumbered className="text-lg" />
                    </button>
                </div>

                {/* Links & Media */}
                <div className="flex items-center gap-0.5">
                    <button
                        type="button"
                        onClick={handleLink}
                        className="p-1.5 hover:bg-neutral-200 rounded transition-colors"
                        title="Insert Link"
                    >
                        <IoLink className="text-lg" />
                    </button>
                    <button
                        type="button"
                        onClick={handleInsertImage}
                        className="p-1.5 hover:bg-neutral-200 rounded transition-colors"
                        title="Insert Image"
                    >
                        <FaFileImage className="text-lg" />
                    </button>
                </div>
            </div>

            {/* Editable Content Area - Fixed LTR */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="w-full p-4 text-sm focus:outline-none min-h-[200px] max-w-none bg-white"
                style={{
                    direction: 'ltr',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word'
                }}
                dir="ltr"
                lang="en"
                suppressContentEditableWarning={true}
            />
            {!isFocused && (!value || value === '<p><br></p>' || value === '') && (
                <div
                    className="absolute text-gray-400 text-sm pointer-events-none p-4 mt-[-200px]"
                    style={{ userSelect: 'none' }}
                >
                    {placeholder}
                </div>
            )}
            <p className="text-[10px] text-neutral-400 p-2 border-t border-neutral-200/50">
                Tip: Use Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline
            </p>
        </div>
    );
}