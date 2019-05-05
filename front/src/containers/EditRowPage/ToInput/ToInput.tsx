import React from 'react';
import { Input, Icon, Tooltip } from 'antd';

const ToInput = (props: ToInputProps) => {
    const { inputKey, changed, index, value, header, placeholder } = props

    return (
       
            <Input
                addonBefore = {header}
                key={inputKey}
                placeholder={placeholder}
                suffix={
                    <Tooltip title={`podaj wartosc pola ${header}`}>
                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>}
                value={value}
                style={{marginBottom: '1em'}}
                onChange={(event) => changed(event, index)}
            />
    );

};



interface ToInputProps {
    inputKey: string;
    header: string;
    value: string;
    changed: any;
    index: number;
    placeholder: string;
}

export default ToInput;