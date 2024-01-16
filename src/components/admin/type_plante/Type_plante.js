import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../../layout/admin/Header';
import SideNave from '../../../layout/admin/SideNave';

const TypePlantes = () => {
    const [typePlantes, setTypePlantes] = useState([]);
    const [showAddTypePlante, setShowAddTypePlante] = useState(false);
    const [showEditTypePlante, setShowEditTypePlante] = useState(false);
    const [showDeleteTypePlante, setShowDeleteTypePlante] = useState(false);
    const [selectedTypePlante, setSelectedTypePlante] = useState({});
    const [newTypePlante, setNewTypePlante] = useState({ name: '', temperature: '', humidite_max: 0, humidite_min: 0 });

    useEffect(() => {
        fetchTypePlantes();
    }, []);

    const fetchTypePlantes = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/typeplantes');
            setTypePlantes(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des types de plantes', error);
        }
    };

    const handleAddTypePlante = async () => {
        try {
            await axios.post('http://localhost:8081/api/typeplantes', newTypePlante);
            fetchTypePlantes();
            setNewTypePlante({ name: '', temperature: '', humidite_max: 0, humidite_min: 0 });
            setShowAddTypePlante(false);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du type de plante', error);
        }
    };

    const handleUpdateTypePlante = async () => {
        try {
            await axios.put(`http://localhost:8081/api/typeplantes/${selectedTypePlante.id}`, newTypePlante);
            fetchTypePlantes();
            setShowEditTypePlante(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du type de plante', error);
        }
    };

    const handleDeleteTypePlante = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/typeplantes/${selectedTypePlante.id}`);
            fetchTypePlantes();
            setShowDeleteTypePlante(false);
        } catch (error) {
            console.error('Erreur lors de la suppression du type de plante', error);
        }
    };

    return (
        <div >

            <Header />
            <SideNave />
            <div>
                <div className="content-wrapper">

                    <section className="content">
                        <div>
                            <h2>Liste des Types de Plantes</h2>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nom</th>
                                        <th>Température</th>
                                        <th>Humidité Maximale</th>
                                        <th>Humidité Minimale</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {typePlantes.map((typePlante) => (
                                        <tr key={typePlante.id}>
                                            <td>{typePlante.id}</td>
                                            <td>{typePlante.name}</td>
                                            <td>{typePlante.temperature}</td>
                                            <td>{typePlante.humidite_max}</td>
                                            <td>{typePlante.humidite_min}</td>
                                            <td>
                                                <Button
                                                    variant="info"
                                                    onClick={() => {
                                                        setSelectedTypePlante(typePlante);
                                                        setNewTypePlante({
                                                            name: typePlante.name,
                                                            temperature: typePlante.temperature,
                                                            humidite_max: typePlante.humidite_max,
                                                            humidite_min: typePlante.humidite_min,
                                                        });
                                                        setShowEditTypePlante(true);
                                                    }}
                                                >
                                                    Modifier
                                                </Button>{' '}
                                                <Button
                                                    variant="danger"
                                                    onClick={() => {
                                                        setSelectedTypePlante(typePlante);
                                                        setShowDeleteTypePlante(true);
                                                    }}
                                                >
                                                    Supprimer
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <Button variant="primary" onClick={() => setShowAddTypePlante(true)}>
                                Ajouter un Type de Plante
                            </Button>

                            {/* Add Type Plante Modal */}
                            <Modal show={showAddTypePlante} onHide={() => setShowAddTypePlante(false)} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Ajouter un Type de Plante</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="formName">
                                            <Form.Label>Nom</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Entrez le nom"
                                                value={newTypePlante.name}
                                                onChange={(e) => setNewTypePlante({ ...newTypePlante, name: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formTemperature">
                                            <Form.Label>Température</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Entrez la température"
                                                value={newTypePlante.temperature}
                                                onChange={(e) => setNewTypePlante({ ...newTypePlante, temperature: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formHumiditeMax">
                                            <Form.Label>Humidité Maximale</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Entrez l'humidité maximale"
                                                value={newTypePlante.humidite_max}
                                                onChange={(e) => setNewTypePlante({ ...newTypePlante, humidite_max: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formHumiditeMin">
                                            <Form.Label>Humidité Minimale</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Entrez l'humidité minimale"
                                                value={newTypePlante.humidite_min}
                                                onChange={(e) => setNewTypePlante({ ...newTypePlante, humidite_min: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Button variant="primary" onClick={handleAddTypePlante}>
                                            Ajouter
                                        </Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>

                            {/* Edit Type Plante Modal */}
                            <Modal show={showEditTypePlante} onHide={() => setShowEditTypePlante(false)} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modifier un Type de Plante</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="formName">
                                            <Form.Label>Nom</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Entrez le nom"
                                                value={newTypePlante.name}
                                                onChange={(e) => setNewTypePlante({ ...newTypePlante, name: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formTemperature">
                                            <Form.Label>Température</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Entrez la température"
                                                value={newTypePlante.temperature}
                                                onChange={(e) => setNewTypePlante({ ...newTypePlante, temperature: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formHumiditeMax">
                                            <Form.Label>Humidité Maximale</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Entrez l'humidité maximale"
                                                value={newTypePlante.humidite_max}
                                                onChange={(e) => setNewTypePlante({ ...newTypePlante, humidite_max: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formHumiditeMin">
                                            <Form.Label>Humidité Minimale</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Entrez l'humidité minimale"
                                                value={newTypePlante.humidite_min}
                                                onChange={(e) => setNewTypePlante({ ...newTypePlante, humidite_min: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Button variant="primary" onClick={handleUpdateTypePlante}>
                                            Enregistrer les modifications
                                        </Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>

                            {/* Delete Type Plante Modal */}
                            <Modal show={showDeleteTypePlante} onHide={() => setShowDeleteTypePlante(false)} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Supprimer un Type de Plante</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Voulez-vous vraiment supprimer le type de plante {selectedTypePlante.name} ?</p>
                                    <Button variant="danger" onClick={handleDeleteTypePlante}>
                                        Supprimer
                                    </Button>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TypePlantes;
