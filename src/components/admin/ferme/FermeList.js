import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios'; // Assurez-vous d'installer cette dépendance avec npm install axios
import Header from '../../../layout/admin/Header';
import SideNave from '../../../layout/admin/SideNave';

const Farms = () => {
  const [farms, setFarms] = useState([]);
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [showEditFarm, setShowEditFarm] = useState(false);
  const [showDeleteFarm, setShowDeleteFarm] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState({});
  const [newFarm, setNewFarm] = useState({ libelle: '' });

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/fermes'); // Remplacez l'URL par votre endpoint API
      setFarms(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des fermes', error);
    }
  };

  const handleAddFarm = async () => {
    try {
      await axios.post('http://localhost:8081/api/fermes', newFarm); // Remplacez l'URL par votre endpoint API
      fetchFarms();
      setNewFarm({ libelle: '' });
      setShowAddFarm(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'une ferme', error);
    }
  };

  const handleUpdateFarm = async () => {
    try {
      await axios.put(`http://localhost:8081/api/fermes/${selectedFarm.id}`, newFarm); // Remplacez l'URL par votre endpoint API
      fetchFarms();
      setShowEditFarm(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la ferme', error);
    }
  };

  const handleDeleteFarm = async () => {
    try {
      await axios.delete(`http://localhost:8081/api/fermes/${selectedFarm.id}`); // Remplacez l'URL par votre endpoint API
      fetchFarms();
      setShowDeleteFarm(false);
    } catch (error) {
      console.error('Erreur lors de la suppression de la ferme', error);
    }
  };

  return (
    <div >

            <Header />
            <SideNave />
            <div>
                <div className="content-wrapper">

                    <section className="content">
      <h2>Liste des Fermes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Libelle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {farms.map((farm) => (
            <tr key={farm.id}>
              <td>{farm.id}</td>
              <td>{farm.libelle}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => {
                    setSelectedFarm(farm);
                    setNewFarm({ libelle: farm.libelle });
                    setShowEditFarm(true);
                  }}
                >
                  Modifier
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => {
                    setSelectedFarm(farm);
                    setShowDeleteFarm(true);
                  }}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => setShowAddFarm(true)}>
        Ajouter une Ferme
      </Button>

      {/* Add Farm Modal */}
      <Modal show={showAddFarm} onHide={() => setShowAddFarm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Ferme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLibelle">
              <Form.Label>Libelle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le libelle"
                value={newFarm.libelle}
                onChange={(e) => setNewFarm({ ...newFarm, libelle: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddFarm(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddFarm}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Farm Modal */}
      <Modal show={showEditFarm} onHide={() => setShowEditFarm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la Ferme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLibelle">
              <Form.Label>Libelle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le libelle"
                value={newFarm.libelle}
                onChange={(e) => setNewFarm({ ...newFarm, libelle: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditFarm(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleUpdateFarm}>
            Enregistrer les modifications
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Farm Modal */}
      <Modal show={showDeleteFarm} onHide={() => setShowDeleteFarm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer la Ferme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cette ferme ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteFarm(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDeleteFarm}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
          </section>

    </div>
   </div>
    </div>
    
  );
};

export default Farms;
