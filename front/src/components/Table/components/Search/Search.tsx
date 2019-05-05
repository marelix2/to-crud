import React,{FunctionComponent} from 'react';
import { Input, Row, Col } from 'antd';

const SearchTable = Input.Search;

const Search : FunctionComponent<SearchProps> = (props) => {
  return (
    <>
      <Row style={{ marginBottom: '0.5em' }}>
        <Col span={8}>
          <SearchTable
            placeholder={props.placeholder}
            enterButton={true}
            onChange={(event) => props.changed(event)}
          />
        </Col>
      </Row>

    </>
  );
};

interface SearchProps{
  placeholder: string;
  changed: (...args: [React.ChangeEvent<HTMLInputElement>]) => void;
}


export default Search;
