import React from 'react';
import { Divider } from 'antd';
import './ToDivider.scss';

interface dividerProps {
  title: string;
  otherProps?: any;
}

const ToDivider = (props: dividerProps) => {
  const { title, otherProps } = props
  return (
    <div className="divider">
      <Divider {...otherProps}>{title || ""}</Divider>
    </div>
  );
};

export default ToDivider;