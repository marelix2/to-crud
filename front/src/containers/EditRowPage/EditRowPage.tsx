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
            values: []
        }
    }

    componentDidMount() {
        const { updating, row } = this.props.location.state;
        const values = updating ? row : row.map( (row : {name: any, type: string}) => ({name: "", type: row.type}) )
        this.setState({values})
    }

    onChange = (evt: React.FormEvent<HTMLInputElement>, index: number) => {
        const sth = [...this.state.values]
        sth[index].name = evt.currentTarget.value;
        this.setState({ values: sth})
    }

    onPostUpdates = (updatedData : UpdateData ) => {
        axios.post(API.POST_TABLE_ROW, {
            headers: updatedData.headers,
            id: updatedData.id,
            values: updatedData.values,
            tableName: updatedData.tableName
        })
    }

    onPostNewValues = (newData : UpdateData ) => {
        axios.post(API.POST_INSERT_TABLE_ROW, {
            headers: newData.headers,
            id: newData.id,
            values: newData.values,
            tableName: newData.tableName
        })
    }

    onSubmit = () => {
        const {values} = this.state
        const {headers, rowIndex, tableName, updating } = this.props.location.state
        if(!!values ){
            if(updating) {
                this.onPostUpdates({
                     headers: headers.filter((field:any) => field.type !== 'actions'),
                     id: rowIndex,
                     values: this.state.values.filter(field => field.type !== 'actions'),
                     tableName: tableName
                 })
             } else {
                this.onPostNewValues({
                    headers: headers.filter((field:any) => field.type !== 'actions'),
                    id: 0,
                    values: this.state.values.filter(field => field.type !== 'actions'),
                    tableName: tableName
                })
             }
        }
        this.handleBack();
    }
    
    handleBack = () => {
        this.props.history.push(`/${this.props.location.state.tableName}`)
    }

    render() {

        const { headers } = this.props.location.state;
        
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

interface UpdateData {
    headers: { name: string | undefined, type: string },
    id: number,
    values: Array<any>,
    tableName: string | undefined
}