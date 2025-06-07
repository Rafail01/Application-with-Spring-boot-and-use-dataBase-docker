import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { Pencil } from 'lucide-react';
import { FaTrash } from 'react-icons/fa';
import { updateUser, deleteUser } from '../api/userApi';
import '../style/UserList.css';

export const UserList: React.FC = () => {
    const { data: users, isLoading, error, refetch } = useUsers();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [editingUser, setEditingUser] = useState<any | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [deletingUser, setDeletingUser] = useState<any | null>(null);  // Για το delete popup

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email });
    };

    // Ανοίγει το popup confirm για διαγραφή
    const confirmDelete = (user: any) => {
        setDeletingUser(user);
    };

    // Όταν πατάμε το Confirm στο popup διαγραφής
    const handleDelete = async () => {
        if (!deletingUser) return;
        try {
            await deleteUser(deletingUser.id);
            setSuccessMessage('User deleted successfully!');
            setErrorMessage('');
            setDeletingUser(null);
            refetch();
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('Failed to delete user', err);
            setErrorMessage('Failed to delete user.');
            setSuccessMessage('');
            setTimeout(() => setErrorMessage(''), 3000);
        }
    };

    const handleUpdate = async () => {
        if (!editingUser) return;
        try {
            await updateUser(editingUser.id, formData);
            setSuccessMessage('User updated successfully!');
            setErrorMessage('');
            setEditingUser(null);
            refetch();
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('Failed to update user', err);
            setErrorMessage('Failed to update user.');
            setSuccessMessage('');
            setTimeout(() => setErrorMessage(''), 3000);
        }
    };

    if (isLoading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="user-list">
            <h2 className="title">Users</h2>
            {successMessage && (
                <div className="success-alert">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="error-alert">
                    {errorMessage}
                </div>
            )}
            <div className="user-list-header">
                <span>Name</span>
                <span>Email</span>
                <span>Action</span>
            </div>
            {users?.map(user => (
                <div className="user-list-row" key={user.id}>
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                    <span className="action-icons">
                        <Pencil size={18} className="edit-icon" onClick={() => handleEdit(user)} />
                        <FaTrash className="delete-icon" onClick={() => confirmDelete(user)} />
                    </span>
                </div>
            ))}

            {editingUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit User</h3>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Email"
                        />
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={() => setEditingUser(null)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Popup */}
            {deletingUser && (
                <div className="modal">
                    <div className="modal-content delete-confirm">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure want to delete user <strong>{deletingUser.name}</strong>?</p>
                        <div className="buttons">
                            <button className="confirm-btn" onClick={handleDelete}>Confirm</button>
                            <button className="cancel-btn" onClick={() => setDeletingUser(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
