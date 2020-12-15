import React, { useDebugValue, useEffect, useState } from 'react';
import { Container, Card, Button, Form, Table } from 'react-bootstrap';
import { db } from '../../utils/firebaseConfig'

const EventosPage = () => {
    const [eventos, setEventos] = useState([]);
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const _dbEventos = db.collection('eventos');

    useEffect(() => {
        listarEventos();
    }, [])

    const listarEventos = (event) => {
        //obter dados da coleção de eventos
        try {
            _dbEventos
            .get()
            .then( result => {
                console.log('Collection Eventos', result.docs)
                const data = result.docs.map(doc => {
                    return{
                        id : doc.id,
                        nome : doc.data().nome,
                        descricao : doc.data().descricao
                    }
                });
                setEventos(data);
            })
            .catch(error => console.error(error))

        } catch (error) {
            console.error(error);
        }
    }
    const editar = (event) => {
        event.preventDefault();

        try {
            _dbEventos
                .doc(event.target.value)
                .get()
                .then(result =>{
                    setId(result.id);
                    setNome(result.data().nome);
                    setDescricao(result.data().descricao);
                })

        } catch (error) {

        }

    }
    const remover = (event) => {
        event.preventDefault();

        try {
            _dbEventos
                .doc(event.target.value)
                .delete()
                .then(() => {
                    alert('Evento Removido');
                    listarEventos();
                    limparCampos();
                })
                .catch(error => {
                    console.log(error)
                })

        } catch (error) {
            console.log(error)
        }

    }
    const salvar = (event) => {
        event.preventDefault();

        try {
            const evento = {
                nome : nome,
                descricao : descricao
            }
            if(id === 0){
                // Add evento 
                _dbEventos
                    .add(evento)
                    .then(() => {
                        alert('Evento Cadastrado');
                        listarEventos();
                        limparCampos();
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }else {
                _dbEventos
                    .doc(id)
                    .set(evento)
                    .then(() =>{
                        alert('Evento Alterado');
                        listarEventos();
                        limparCampos();
                    })
            }
        } catch (error) {
            console.log(error)
        }

    }
    const limparCampos = () => {
        setId(0);
        setNome('');
        setDescricao('');
    }
    


    return(
        <Container>
                <h1>Eventos</h1>
                <p>Gerencie seus eventos</p>
                <Card>
                        <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group controlId="formNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} />
                            </Form.Group>
                            
                            <Form.Group controlId="formDescricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3} value={descricao} onChange={event => setDescricao(event.target.value)} />
                            </Form.Group>

                            <Button type="submit" >Salvar</Button>
                        </Form>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    eventos.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.nome}</td>
                                            <td>{item.descricao}</td>
                                            <td>
                                                <Button type="button" variant="warning" value={item.id} onClick={ event => editar(event)}>Editar</Button>
                                                <Button type="button" variant="danger" value={item.id} style={{ marginLeft : '30px'}} onClick={ event => remover(event)}>Remover</Button>
                                            </td>
                                        </tr>
                                    )
                                    })
                                }
                            </tbody>
                        </Table>
                        </Card.Body>
                    </Card>
            </Container>
    )

}

export default EventosPage;