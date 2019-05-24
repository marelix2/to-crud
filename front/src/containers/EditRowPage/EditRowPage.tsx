import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'antd';
import axios from '../../AxiosApi';
import API from '../../endpoints';
import ToInput from './ToInput/ToInput';

class EditRowPage extends Component<EditRowPageProps, EditRowPageState> {

    constructor(props: EditRowPageProps) {
        super(props);
        this.state = {
            values: []
        }
    }

    componentDidMount() {
    }

    onChange = (evt: React.FormEvent<HTMLInputElement>, index: number) => {
        const { row } = this.props;
        const sth = [...row]
        sth[index].name = evt.currentTarget.value;
        this.setState({ values: sth})
    }

    onSubmit = () => {
        axios.post(API.POST_TABLE_ROW, {
            headers: this.props.headers,
            id: this.props.rowIndex,
            values: this.state.values,
            tableName: this.props.tableName
        }
        ).then((res) => console.log('siemasz', res));

    }

    render() {

        const { headers, row } = this.props;
        const fields = row && row.map((field, index) => (
            <ToInput
                key={`${field[index]}-${index}`}
                placeholder={`podaj wartosc pola ${headers[index] && headers[index].name}`}
                header={headers[index] && headers[index].name}
                value={field && field.name}
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
    headers: Array<{ name: string | undefined, type: string }>
    tableName: string | undefined
    rowIndex: number

}