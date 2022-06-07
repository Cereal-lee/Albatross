import palette from "lib/palette";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import TagList from "./TagList";

const TagBoxBlock = styled.div`
  width: 100%;
  h4 {
    color: ${palette.gray[8]};
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const TagForm = styled.form`
  border: 1px solid ${palette.gray[5]};
  border-radius: 4px;
  display: flex;
  width: 100%;
  overflow: hidden;
  input {
    outline: none;
    border: none;
    font-size: 1rem;
    padding: 0.5rem;
    min-width: 0;
    width: 100%;
    &::placeholder {
      color: ${palette.gray[4]};
    }
  }
`;

function TagBox({ onChangeTag, tags }) {
  const [tagInput, setTagInput] = useState("");
  const [localTag, setLocalTag] = useState([]);

  const removeTag = useCallback(
    (tag) => {
      const nextTag = localTag.filter((t) => t !== tag);
      setLocalTag(nextTag);
      onChangeTag({ key: "tags", value: nextTag });
    },
    [localTag, onChangeTag]
  );

  const onChange = useCallback((e) => {
    setTagInput(e.target.value);
  }, []);

  const addTag = useCallback(
    (text) => {
      if (!text) return;
      if (localTag.includes(text)) return;
      if (text.includes("#")) {
        const texts = text.split("#");
        texts.forEach((element) => {
          if (element) {
            const nextTag = [...localTag, element];
            setLocalTag(nextTag);
            onChangeTag({ key: "tags", value: nextTag });
          }
        });
      } else {
        const nextTag = [...localTag, text];
        setLocalTag(nextTag);
        onChangeTag({ key: "tags", value: nextTag });
      }
    },
    [localTag, onChangeTag]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      addTag(tagInput.trim());
      setTagInput("");
    },
    [tagInput, addTag]
  );

  useEffect(() => {
    setLocalTag(tags);
  }, [tags]);

  return (
    <TagBoxBlock>
      <TagList tags={localTag} onRemove={removeTag} />
      <h4>Tags</h4>
      <TagForm onSubmit={onSubmit}>
        <input
          placeholder="タグをかけてください。（＃で区分）"
          onChange={onChange}
          value={tagInput}
        />
      </TagForm>
    </TagBoxBlock>
  );
}

export default TagBox;
