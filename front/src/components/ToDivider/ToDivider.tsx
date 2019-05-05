import React from 'react';
import { Divider } from 'antd';
import './ToDivider.scss';

const ToDivider = (props: IDividerProps) => {
  const { title, otherProps } = props
  return (
    <div className="divider">
      <Divider {...otherProps}>{title || ""}</Divider>
    </div>
  );
};

interface IDividerProps {
  title: string;
  otherProps?: any;
}

export default ToDivider;