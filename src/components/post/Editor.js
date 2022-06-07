import palette from "lib/palette";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const EditorBlock = styled.div`
  padding-top: 5rem;
  padding-bottom: 2rem;
`;

const TitleInput = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid ${palette.gray[7]};
  width: 100%;
  margin-bottom: 2rem;
  font-size: 2rem;
  padding-bottom: 0.5rem;

  &::placeholder {
    color: ${palette.gray[3]};
  }
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor .ql-blank::before {
    left: 0px;
    color: ${palette.gray[3]};
  }
`;

function Editor({ title, body, onChange }) {
  //Quill Container
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "bubble", // Specify theme in configuration
      placeholder: "何していますか？",
      toolbar: [
        [{ header: 1 }, { header: 2 }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block", "link", "image"],
      ],
    });
    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        onChange({ key: "body", value: quill.root.innerHTML });
      }
    });
  }, [onChange]);

  const onChangeTitle = (e) => {
    onChange({ key: "title", value: e.target.value });
  };

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [body]);

  return (
    <EditorBlock>
      {/* title */}
      <TitleInput placeholder="TITLE" onChange={onChangeTitle} value={title} />
      {/* body */}
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
}

export default Editor;
