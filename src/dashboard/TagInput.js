import React, { useState } from 'react';
import TagsInput from 'react-tagsinput';

import 'react-tagsinput/react-tagsinput.css'; // If using WebPack and style-loader.

const TagInput = ({ onChange }) => {
  const [tags, setTags] = useState([]);

  const tagProps = {
    placeholder: 'Nuevo tag',
  };

  const handleChange = tags => {
    setTags(tags);
    onChange(tags);
  };

  return (
    <TagsInput value={tags} onChange={handleChange} inputProps={tagProps} />
  );
};

export default TagInput;
