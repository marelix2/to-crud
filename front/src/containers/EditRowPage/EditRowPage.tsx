import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'antd';
import axios from '../../AxiosApi';
import API from '../../endpoints';
import ToInput from './ToInput/ToInput';

class EditRowPage extends Component<EditRowPageProps, EditRowPageState> {

    constructor(props: EditRowPageProps) {
        super(props);
        this.state = {
            values: props.row
        }
    }

    onChange = (evt: React.FormEvent<HTMLInputElement>, index: number) => {
        const { values } = this.state;
        const sth = [...values]
        sth[index].name = evt.currentTarget.value;
        this.setState({ values: sth })
    }

    onSubmit = () => {
        axios.post(API.POST_TABLE_ROW, {
            headers: this.props.headers,
            values: this.state.values,
            tableName: this.props.tableName
        }
        ).then((res) => console.log('siemasz', res));

    }

    render() {

        const { headers, row } = this.props;

        const fields = row.map((field, index) => (
            <ToInput
                inputKey={`${field[index]}-${index}`}
                placeholder={`podaj wartosc pola ${headers[index].name}`}
                header={headers[index].name}
                value={field.name}
                changed={this.onChange}
                index={index}
            />
        ))

        return (
            <>
                <Row gutter={16} type="flex" justify="center">
                    <Col span={8}>
                        <Card title="Edycja Pola">

                            {fields}

                            <Button type='primary' onClick={this.onSubmit}>Zapisz</Button>
                        </Card>

                    </Col>

                </Row>
            </>
        )
    }
}
export default EditRowPage;



interface EditRowPageState {
    values: Array<any>;
}


interface EditRowPageProps {
    row: Array<any>
    headers: Array<{ name: string, type: string }>
    tableName: string | undefined

}