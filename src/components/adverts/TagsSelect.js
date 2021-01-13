import React, { useEffect } from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getTags, searchTags } from '../../store/ducks/app';

const { Option } = Select;

const TagsSelect = props => {
  const tags = useSelector(getTags);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tags) {
      dispatch(searchTags());
    }
  }, []);

  return (
    <Select
      allowClear
      disabled={!tags}
      mode="multiple"
      placeholder="Select tags"
      style={{ width: '100%' }}
      {...props}
    >
      {tags && tags.map(tag => <Option key={tag}>{tag}</Option>)}
    </Select>
  );
};

export default TagsSelect;
