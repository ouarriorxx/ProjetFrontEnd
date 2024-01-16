import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../../layout/admin/Header';
import SideNave from '../../../layout/admin/SideNave';

const Plantes = () => {
    const [plantes, setPlantes] = useState([]);
    const [typePlantes, setTypePlantes] = useState([]);
    const [showAddPlante, setShowAddPlante] = useState(false);
    const [showEditPlante, setShowEditPlante] = useState(false);
    const [showDeletePlante, setShowDeletePlante] = useState(false);
    const [selectedPlante, setSelectedPlante] = useState({});
    const [newPlante, setNewPlante] = useState({
        racine: '',
        libelle: '',
        image_plante: null,
        type_plante: null,
    });

    useEffect(() => {
        fetchPlantes();
        fetchTypePlantes();
    }, []);

    const fetchPlantes = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/plantes');
            setPlantes(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des plantes', error);
        }
    };

    const fetchTypePlantes = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/typeplantes');
            setTypePlantes(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des types de plantes', error);
        }
    };

    const handleAddPlante = async () => {
        try {
            await axios.post('http://localhost:8081/api/plantes', newPlante);
            fetchPlantes();
            setNewPlante({
                racine: '',
                libelle: '',
                image_plante: null,
                type_plante: null,
            });
            setShowAddPlante(false);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la plante', error);
        }
    };

    const handleUpdatePlante = async () => {
        try {
            await axios.put(`http://localhost:8081/api/plantes/${selectedPlante.id}`, newPlante);
            fetchPlantes();
            setShowEditPlante(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la plante', error);
        }
    };

    const handleDeletePlante = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/plantes/${selectedPlante.id}`);
            fetchPlantes();
            setShowDeletePlante(false);
        } catch (error) {
            console.error('Erreur lors de la suppression de la plante', error);
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
                            <h2>Liste des Plantes</h2>
                            <Table striped bordered hover>
                                {/* Table Header */}
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Racine</th>
                                        <th>Libellé</th>
                                        <th>Type de Plante</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody>
                                    {plantes.map((plante) => (
                                        <tr key={plante.id}>
                                            <td>{plante.id}</td>
                                            <td>{plante.racine}</td>
                                            <td>{plante.libelle}</td>
                                            <td>{plante.type_plante?.libelle}</td>
                                            <td>
                                                <Button
                                                    variant="info"
                                                    onClick={() => {
                                                        setSelectedPlante(plante);
                                                        setNewPlante({
                                                            racine: plante.racine,
                                                            libelle: plante.libelle,
                                                            image_plante: null,
                                                            type_plante: plante.type_plante,
                                                        });
                                                        setShowEditPlante(true);
                                                    }}
                                                >
                                                    Modifier
                                                </Button>{' '}
                                                <Button
                                                    variant="danger"
                                                    onClick={() => {
                                                        setSelectedPlante(plante);
                                                        setShowDeletePlante(true);
                                                    }}
                                                >
                                                    Supprimer
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Button variant="primary" onClick={() => setShowAddPlante(true)}>
                                Ajouter un Type de Plante
                            </Button>
                            <Modal show={showAddPlante} onHide={() => setShowAddPlante(false)} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Ajouter une Plante</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="formRacine">
                                            <Form.Label>Racine</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Entrez la racine"
                                                value={newPlante.racine}
                                                onChange={(e) => setNewPlante({ ...newPlante, racine: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formLibelle">
                                            <Form.Label>Libellé</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Entrez le libellé"
                                                value={newPlante.libelle}
                                                onChange={(e) => setNewPlante({ ...newPlante, libelle: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formTypePlante">
                                            <Form.Label>Type de Plante</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={newPlante.type_plante?.id || ''}
                                                onChange={(e) => setNewPlante({ ...newPlante, type_plante: { id: e.target.value } })}
                                            >
                                                <option value="" disabled>Sélectionnez le type de plante</option>
                                                {typePlantes.map((typePlante) => (
                                                    <option key={typePlante.id} value={typePlante.id}>{typePlante.libelle}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>

                                        <Button variant="primary" onClick={handleAddPlante}>
                                            Ajouter
                                        </Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>


                            <Modal show={showEditPlante} onHide={() => setShowEditPlante(false)} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modifier une Plante</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="formRacine">
                                            <Form.Label>Racine</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Entrez la racine"
                                                value={newPlante.racine}
                                                onChange={(e) => setNewPlante({ ...newPlante, racine: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formLibelle">
                                            <Form.Label>Libellé</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Entrez le libellé"
                                                value={newPlante.libelle}
                                                onChange={(e) => setNewPlante({ ...newPlante, libelle: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formTypePlante">
                                            <Form.Label>Type de Plante</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={newPlante.type_plante?.id || ''}
                                                onChange={(e) => setNewPlante({ ...newPlante, type_plante: { id: e.target.value } })}
                                            >
                                                <option value="" disabled>Sélectionnez le type de plante</option>
                                                {typePlantes.map((typePlante) => (
                                                    <option key={typePlante.id} value={typePlante.id}>{typePlante.libelle}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>

                                        <Button variant="primary" onClick={handleUpdatePlante}>
                                            Enregistrer les modifications
                                        </Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>


                            <Modal show={showDeletePlante} onHide={() => setShowDeletePlante(false)} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Supprimer une Plante</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Voulez-vous vraiment supprimer la plante {selectedPlante.libelle} ?</p>
                                    <Button variant="danger" onClick={handleDeletePlante}>
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

export default Plantes;
