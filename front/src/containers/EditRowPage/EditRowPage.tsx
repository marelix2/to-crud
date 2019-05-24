import React, { Component } from 'react';
import { Row, Col, Card, Button,Icon } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import axios from '../../AxiosApi';
import API from '../../endpoints';
import ToInput from './ToInput/ToInput';

class EditRowPage extends Component<EditRowPageProps, EditRowPageState> {

    constructor(props: EditRowPageProps) {
        super(props);
        this.state = {
            values: props.location.state.row
        }
    }

    onChange = (evt: React.FormEvent<HTMLInputElement>, index: number) => {
        const { row } = this.props.location.state;
        const sth = [...row]
        sth[index].name = evt.currentTarget.value;
        this.setState({ values: sth})
    }

    onSubmit = () => {
        const {values} = this.state
        const {headers, rowIndex, tableName} = this.props.location.state
        console.log(rowIndex)
        if(values) {
            axios.post(API.POST_TABLE_ROW, {
                headers: headers.filter((field:any) => field.type !== 'actions'),
                id: rowIndex,
                values: this.state.values.filter(field => field.type !== 'actions'),
                tableName: tableName
            })
        }

        this.handleBack();
    }
    
    handleBack = () => {
        this.props.history.push(`/${this.props.location.state.tableName}`)
    }

    render() {

        const { headers, row } = this.props.location.state;
        const {values} = this.state
        const fields = values && values.filter(field => field.type !== 'actions').map((field, index) => (
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
              <Button
          type='primary'
          onClick={this.handleBack}
          className='back-btn'>
          <Icon type="left" />
          Powrót
        </Button>
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


interface EditRowPageProps extends RouteComponentProps<any>{
    row: Array<any>
    headers: Array<{ name: string | undefined, type: string }>
    tableName: string | undefined
    rowIndex: number
}