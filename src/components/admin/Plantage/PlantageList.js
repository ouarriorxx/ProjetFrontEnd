import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../../layout/admin/Header';
import SideNave from '../../../layout/admin/SideNave';

const Plantages = () => {
  const [plantages, setPlantages] = useState([]);
  const [showAddPlantage, setShowAddPlantage] = useState(false);
  const [showEditPlantage, setShowEditPlantage] = useState(false);
  const [showDeletePlantage, setShowDeletePlantage] = useState(false);
  const [selectedPlantage, setSelectedPlantage] = useState({});
  const [newPlantage, setNewPlantage] = useState({ parcelle_id: '', plante_id: '' });

  useEffect(() => {
    fetchPlantages();
  }, []);

  const fetchPlantages = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/plantages');
      setPlantages(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des plantages', error);
    }
  };

  const handleAddPlantage = async () => {
    try {
      await axios.post('http://localhost:8081/api/plantages', newPlantage);
      fetchPlantages();
      setNewPlantage({ parcelle_id: '', plante_id: '' });
      setShowAddPlantage(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du plantage', error);
    }
  };

  const handleUpdatePlantage = async () => {
    try {
      await axios.put(`http://localhost:8081/api/plantages/${selectedPlantage.id}`, newPlantage);
      fetchPlantages();
      setShowEditPlantage(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du plantage', error);
    }
  };

  const handleDeletePlantage = async () => {
    try {
      await axios.delete(`http://localhost:8081/api/plantages/${selectedPlantage.id}`);
      fetchPlantages();
      setShowDeletePlantage(false);
    } catch (error) {
      console.error('Erreur lors de la suppression du plantage', error);
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
      <h2>Liste des Plantages</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Parcelle ID</th>
            <th>Plante ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plantages.map((plantage) => (
            <tr key={plantage.id}>
              <td>{plantage.id}</td>
              <td>{plantage.parcelle_id}</td>
              <td>{plantage.plante_id}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => {
                    setSelectedPlantage(plantage);
                    setNewPlantage({ parcelle_id: plantage.parcelle_id, plante_id: plantage.plante_id });
                    setShowEditPlantage(true);
                  }}
                >
                  Modifier
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => {
                    setSelectedPlantage(plantage);
                    setShowDeletePlantage(true);
                  }}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => setShowAddPlantage(true)}>
        Ajouter un Plantage
      </Button>

      {/* Add Plantage Modal */}
      <Modal show={showAddPlantage} onHide={() => setShowAddPlantage(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Plantage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formParcelleID">
              <Form.Label>Parcelle ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez l'ID de la parcelle"
                value={newPlantage.parcelle_id}
                onChange={(e) => setNewPlantage({ ...newPlantage, parcelle_id: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPlanteID">
              <Form.Label>Plante ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez l'ID de la plante"
                value={newPlantage.plante_id}
                onChange={(e) => setNewPlantage({ ...newPlantage, plante_id: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAddPlantage}>
              Ajouter
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Plantage Modal */}
      <Modal show={showEditPlantage} onHide={() => setShowEditPlantage(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un Plantage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formParcelleID">
              <Form.Label>Parcelle ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez l'ID de la parcelle"
                value={newPlantage.parcelle_id}
                onChange={(e) => setNewPlantage({ ...newPlantage, parcelle_id: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPlanteID">
              <Form.Label>Plante ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez l'ID de la plante"
                value={newPlantage.plante_id}
                onChange={(e) => setNewPlantage({ ...newPlantage, plante_id: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleUpdatePlantage}>
              Enregistrer les modifications
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Plantage Modal */}
      <Modal show={showDeletePlantage} onHide={() => setShowDeletePlantage(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer un Plantage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Voulez-vous vraiment supprimer le plantage avec l'ID {selectedPlantage.id} ?</p>
          <Button variant="danger" onClick={handleDeletePlantage}>
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

export default Plantages;
