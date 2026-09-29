"use client";

import { useState } from "react";
import { useEditor, useEditorState, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { uploadMedia, errMsg } from "./lib";

// Older rows are loose text separated by blank lines, which HTML (and the editor) would
// collapse into one paragraph — wrap each such block in <p> before loading it.
const BLOCK_START = /^<(?!(a|strong|b|em|i|span|br)\b)[a-z]/i;
const normalize = (html: string) =>
    html.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean)
        .map((b) => (BLOCK_START.test(b) ? b : `<p>${b}</p>`)).join("\n");

const tools = (editor: Editor) => [
    { label: "Heading", active: editor.isActive("heading"), run: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: "B", title: "Bold", active: editor.isActive("bold"), run: () => editor.chain().focus().toggleBold().run() },
    { label: "I", title: "Italic", active: editor.isActive("italic"), run: () => editor.chain().focus().toggleItalic().run() },
    { label: "• List", active: editor.isActive("bulletList"), run: () => editor.chain().focus().toggleBulletList().run() },
    { label: "1. List", active: editor.isActive("orderedList"), run: () => editor.chain().focus().toggleOrderedList().run() },
    {
        label: "Link", active: editor.isActive("link"), run: () => {
            const url = prompt("Link URL (empty to remove)", editor.getAttributes("link").href ?? "https://");
            if (url === null) return;
            const chain = editor.chain().focus().extendMarkRange("link");
            (url.trim() ? chain.setLink({ href: url.trim() }) : chain.unsetLink()).run();
        },
    },
    { label: "↶", title: "Undo", active: false, run: () => editor.chain().focus().undo().run() },
    { label: "↷", title: "Redo", active: false, run: () => editor.chain().focus().redo().run() },
];

// WYSIWYG body editor: formatted like the public article body, with an HTML view for edge cases.
export function RichText({ label, value, onChange, folder }: {
    label: string; value: string; onChange: (html: string) => void; folder?: string;
}) {
    const [source, setSource] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: { openOnClick: false } }),
            Image,
        ],
        content: normalize(value),
        immediatelyRender: false,
        editorProps: { attributes: { class: "article-body rich-body" } },
        onUpdate: ({ editor }) => onChange(editor.isEmpty ? "" : editor.getHTML()),
    });
    // Re-render the toolbar when the cursor moves into or out of a format.
    useEditorState({ editor, selector: ({ editor }) => editor && tools(editor).map((t) => t.active).join() });

    const toggleSource = () => {
        if (source) editor?.commands.setContent(normalize(value), { emitUpdate: false });
        setSource(!source);
    };

    const insertImage = async (file: File | undefined) => {
        if (!file || !folder || !editor) return;
        setBusy(true);
        setError("");
        try { editor.chain().focus().setImage({ src: await uploadMedia(folder, file), alt: "" }).run(); }
        catch (e) { setError(errMsg(e)); }
        setBusy(false);
    };

    return (
        <div className="wide">
            <div className="admin-subhead">
                <span>{label}</span>
                <button onClick={toggleSource}>{source ? "Visual editor" : "HTML"}</button>
            </div>
            {source
                ? <textarea className="mono" rows={18} value={value} onChange={(e) => onChange(e.target.value)} />
                : (
                    <div className="rich">
                        <div className="rich-toolbar">
                            {editor && tools(editor).map((t) => (
                                <button key={t.label} type="button" title={t.title ?? t.label}
                                    className={t.active ? "on" : ""} onClick={t.run}>{t.label}</button>
                            ))}
                            {folder && (
                                <label className="rich-upload">
                                    {busy ? "Uploading…" : "Image"}
                                    <input type="file" accept="image/*" disabled={busy}
                                        onChange={(e) => { insertImage(e.target.files?.[0]); e.target.value = ""; }} />
                                </label>
                            )}
                        </div>
                        <EditorContent editor={editor} />
                    </div>
                )}
            {error && <small className="admin-error">{error}</small>}
        </div>
    );
}
