import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../../layout/admin/Header';
import SideNave from '../../../layout/admin/SideNave';

const Parcelles = () => {
  const [parcelles, setParcelles] = useState([]);
  const [showAddParcelle, setShowAddParcelle] = useState(false);
  const [showEditParcelle, setShowEditParcelle] = useState(false);
  const [showDeleteParcelle, setShowDeleteParcelle] = useState(false);
  const [selectedParcelle, setSelectedParcelle] = useState({});
  const [newParcelle, setNewParcelle] = useState({ libelle: '', image_parcelle: null });

  useEffect(() => {
    fetchParcelles();
  }, []);

  const fetchParcelles = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/parcelles');
      setParcelles(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des parcelles', error);
    }
  };

  const handleAddParcelle = async () => {
    try {
      await axios.post('http://localhost:8081/api/parcelles', newParcelle);
      fetchParcelles();
      setNewParcelle({ libelle: '', image_parcelle: null });
      setShowAddParcelle(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la parcelle', error);
    }
  };

  const handleUpdateParcelle = async () => {
    try {
      await axios.put(`http://localhost:8081/api/parcelles/${selectedParcelle.id}`, newParcelle);
      fetchParcelles();
      setShowEditParcelle(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la parcelle', error);
    }
  };

  const handleDeleteParcelle = async () => {
    try {
      await axios.delete(`http://localhost:8081/api/parcelles/${selectedParcelle.id}`);
      fetchParcelles();
      setShowDeleteParcelle(false);
    } catch (error) {
      console.error('Erreur lors de la suppression de la parcelle', error);
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
      <h2>Liste des Parcelles</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Libelle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcelles.map((parcelle) => (
            <tr key={parcelle.id}>
              <td>{parcelle.id}</td>
              <td>{parcelle.libelle}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => {
                    setSelectedParcelle(parcelle);
                    setNewParcelle({ libelle: parcelle.libelle, image_parcelle: null });
                    setShowEditParcelle(true);
                  }}
                >
                  Modifier
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => {
                    setSelectedParcelle(parcelle);
                    setShowDeleteParcelle(true);
                  }}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => setShowAddParcelle(true)}>
        Ajouter une Parcelle
      </Button>

      {/* Add Parcelle Modal */}
      <Modal show={showAddParcelle} onHide={() => setShowAddParcelle(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Parcelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLibelle">
              <Form.Label>Libelle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le libelle"
                value={newParcelle.libelle}
                onChange={(e) => setNewParcelle({ ...newParcelle, libelle: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAddParcelle}>
              Ajouter
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Parcelle Modal */}
      <Modal show={showEditParcelle} onHide={() => setShowEditParcelle(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifier une Parcelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Ajoutez des champs pour les autres attributs de la parcelle si nécessaire */}
            <Form.Group controlId="formLibelle">
              <Form.Label>Libelle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le libelle"
                value={newParcelle.libelle}
                onChange={(e) => setNewParcelle({ ...newParcelle, libelle: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdateParcelle}>
              Enregistrer les modifications
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Parcelle Modal */}
      <Modal show={showDeleteParcelle} onHide={() => setShowDeleteParcelle(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer une Parcelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Voulez-vous vraiment supprimer la parcelle avec l'ID {selectedParcelle.id} ?</p>
          <Button variant="danger" onClick={handleDeleteParcelle}>
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

export default Parcelles;
