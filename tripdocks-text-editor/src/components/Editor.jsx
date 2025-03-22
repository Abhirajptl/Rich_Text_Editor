import React, { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { VariableExtension } from "../extensions/VariableExtension";
import "../styles/Editor.css";

const VARIABLES = [
  { id: "user_name", label: "User Name", value: "{{user_name}}" },
  { id: "company", label: "Company", value: "{{company}}" },
  { id: "email", label: "Email Address", value: "{{email}}" },
  { id: "date", label: "Current Date", value: "{{date}}" },
  { id: "subscription_plan", label: "Subscription Plan", value: "{{subscription_plan}}" },
  { id: "account_balance", label: "Account Balance", value: "{{account_balance}}" },
  { id: "support_phone", label: "Support Phone", value: "{{support_phone}}" },
  { id: "website_url", label: "Website URL", value: "{{website_url}}" },
];

const Editor = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [filteredVariables, setFilteredVariables] = useState(VARIABLES);
  const editorRef = useRef(null);

  const editor = useEditor({
    extensions: [StarterKit, VariableExtension],
    content: "",
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      if (text.endsWith("{{")) {
        setShowPopover(true);

        const { from } = editor.state.selection;
        const pos = editor.view.coordsAtPos(from);
        setPopoverPosition({ top: pos.top + 30, left: pos.left });

        // Show all variables
        setFilteredVariables(VARIABLES);
      } else {
        setShowPopover(false);
      }
    },
  });

  const insertVariable = (variable) => {
    if (!editor) return;
    editor.commands.insertContent(variable.value + " ");
    setShowPopover(false);
  };

  return (
    <div className="editor-container">
      <h2>Rich Text Editor</h2>
      <div className="editor-wrapper">
        <EditorContent editor={editor} ref={editorRef} />
      </div>

      {showPopover && (
        <div className="popover" style={{ top: popoverPosition.top, left: popoverPosition.left }}>
          {filteredVariables.map((variable) => (
            <div key={variable.id} className="popover-item" onClick={() => insertVariable(variable)}>
              {variable.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Editor;
