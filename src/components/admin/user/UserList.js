import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../../layout/admin/Header';
import SideNave from '../../../layout/admin/SideNave';

const Userse = () => {
    const [users, setUsers] = useState([]);
    const [showAddUser, setShowAddUser] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);
    const [showDeleteUser, setShowDeleteUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [newUser, setNewUser] = useState({ nom: '', prenom: '', role: 0, email: '', password: '', image: null });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs', error);
        }
    };

    const handleAddUser = async () => {
        try {
            const formData = new FormData();
            formData.append('nom', newUser.nom);
            formData.append('prenom', newUser.prenom);
            formData.append('role', newUser.role);
            formData.append('email', newUser.email);
            formData.append('password', newUser.password);
            formData.append('image', newUser.image);

            await axios.post('http://localhost:8081/api/users/createUser', formData);
            fetchUsers();
            setNewUser({ nom: '', prenom: '', role: 0, email: '', password: '', image: null });
            setShowAddUser(false);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            await axios.put(`http://localhost:8081/api/users/${selectedUser.id}`, newUser);
            fetchUsers();
            setShowEditUser(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/users/${selectedUser.id}`);
            fetchUsers();
            setShowDeleteUser(false);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur', error);
        }
    };
    return (
        <div >

            <Header />
            <SideNave />
            <div>
                <div className="content-wrapper">

                    <section className="content">
                        <div className="container-fluid">
            <h2>Liste des Utilisateurs</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nom}</td>
                            <td>{user.prenom}</td>
                            <td>{user.role === 1 ? 'Admin' : 'User'}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button
                                    variant="info"
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setNewUser({ nom: user.nom, prenom: user.prenom, role: user.role, email: user.email, password: '' });
                                        setShowEditUser(true);
                                    }}
                                >
                                    Modifier
                                </Button>{' '}
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setShowDeleteUser(true);
                                    }}
                                >
                                    Supprimer
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Button variant="primary" onClick={() => setShowAddUser(true)}>
                Ajouter un Utilisateur
            </Button>

            {/* Add User Modal */}
            <Modal show={showAddUser} onHide={() => setShowAddUser(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un Utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entrez le nom"
                                value={newUser.nom}
                                onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrenom">
                            <Form.Label>Prenom</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entrez le prenom"
                                value={newUser.prenom}
                                onChange={(e) => setNewUser({ ...newUser, prenom: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Entrez le rôle"
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Entrez l'email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Entrez le mot de passe"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            />
                        </Form.Group>

 <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="file"
                    onChange={(e) => setNewUser({ ...newUser, image: e.target.files[0] })}
                />
            </Form.Group>
                        <Button variant="primary" onClick={handleAddUser}>
                            Ajouter
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Edit User Modal */}
            <Modal show={showEditUser} onHide={() => setShowEditUser(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier un Utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entrez le nom"
                                value={newUser.nom}
                                onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrenom">
                            <Form.Label>Prenom</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entrez le prenom"
                                value={newUser.prenom}
                                onChange={(e) => setNewUser({ ...newUser, prenom: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Entrez le rôle"
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Entrez l'email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Entrez le mot de passe"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="file"
                    onChange={(e) => setNewUser({ ...newUser, image: e.target.files[0] })}
                />
            </Form.Group>

                        <Button variant="primary" onClick={handleUpdateUser}>
                            Enregistrer les modifications
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Delete User Modal */}
            <Modal show={showDeleteUser} onHide={() => setShowDeleteUser(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Supprimer un Utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Voulez-vous vraiment supprimer l'utilisateur {selectedUser.nom} {selectedUser.prenom} ?</p>
                    <Button variant="danger" onClick={handleDeleteUser}>
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

export default Userse;
