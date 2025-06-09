import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { Pencil } from 'lucide-react';
import { FaTrash } from 'react-icons/fa';
import { updateUser, deleteUser, createUser } from '../api/userApi';
import '../style/UserList.css';

export const UserList: React.FC = () => {
    const [page, setPage] = useState(0);
    const [pageSize] = useState(5);

    const { data: usersPage, isLoading, error, refetch } = useUsers(page, pageSize);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [editingUser, setEditingUser] = useState<any | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', age: '', phone: '', password: '', role: '' });
    const [deletingUser, setDeletingUser] = useState<any | null>(null);
    const [creatingUser, setCreatingUser] = useState(false);
    const [createFormData, setCreateFormData] = useState({ name: '', email: '', age: '', phone: '', password: '', role: '' });

    const roleOptions = ['USER', 'ADMIN', 'MODERATOR'];

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            age: user.age,
            phone: user.phone,
            password: user.password,
            role: user.role || '',
        });
    };

    const confirmDelete = (user: any) => {
        setDeletingUser(user);
    };

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
        if (!formData.role) {
            setErrorMessage('Role is required.');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }
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

    const handleCreateUser = async () => {
        if (!createFormData.name || !createFormData.email || !createFormData.role) {
            setErrorMessage('Name, email, and role are required.');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }
        try {
            await createUser(createFormData);
            setSuccessMessage('User created successfully!');
            setErrorMessage('');
            setCreatingUser(false);
            setCreateFormData({ name: '', email: '', age: '', phone: '', password: '', role: '' });
            refetch();
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('Failed to create user', err);
            setErrorMessage('Failed to create user.');
            setSuccessMessage('');
            setTimeout(() => setErrorMessage(''), 3000);
        }
    };

    if (isLoading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="user-list">
            <h2 className="title">Users</h2>

            <button className="create-user-btn" onClick={() => setCreatingUser(true)}>Create User</button>

            {successMessage && <div className="success-alert">{successMessage}</div>}
            {errorMessage && <div className="error-alert">{errorMessage}</div>}

            <div className="user-list-header">
                <span>Name</span>
                <span>Email</span>
                <span>Age</span>
                <span>Phone</span>
                <span>Action</span>
            </div>
            {usersPage?.content?.map(user => (
                <div className="user-list-row" key={user.id}>
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                    <span>{user.age}</span>
                    <span>{user.phone}</span>
                    <span className="action-icons">
                        <Pencil size={18} className="edit-icon" onClick={() => handleEdit(user)} />
                        <FaTrash className="delete-icon" onClick={() => confirmDelete(user)} />
                    </span>
                </div>
            ))}

            {/* Edit User Modal */}
            {editingUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit User</h3>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" />
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" />
                        <input type="text" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} placeholder="Age" />
                        <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone" />
                        <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                            <option value="" disabled>Select Role</option>
                            {roleOptions.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                        <button className="confirm-btn" onClick={handleUpdate}>Save</button>
                        <button className="cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deletingUser && (
                <div className="modal">
                    <div className="modal-content delete-confirm">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete user <strong>{deletingUser.name}</strong>?</p>
                        <div className="buttons">
                            <button className="confirm-btn" onClick={handleDelete}>Confirm</button>
                            <button className="cancel-btn" onClick={() => setDeletingUser(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create User Modal */}
            {creatingUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Create User</h3>
                        <input type="text" value={createFormData.name} onChange={(e) => setCreateFormData({ ...createFormData, name: e.target.value })} placeholder="Name" />
                        <input type="email" value={createFormData.email} onChange={(e) => setCreateFormData({ ...createFormData, email: e.target.value })} placeholder="Email" />
                        <input type="text" value={createFormData.age} onChange={(e) => setCreateFormData({ ...createFormData, age: e.target.value })} placeholder="Age" />
                        <input type="text" value={createFormData.phone} onChange={(e) => setCreateFormData({ ...createFormData, phone: e.target.value })} placeholder="Phone" />
                        <select value={createFormData.role} onChange={(e) => setCreateFormData({ ...createFormData, role: e.target.value })}>
                            <option value="" disabled>Select Role</option>
                            {roleOptions.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                        <button className="confirm-btn" onClick={handleCreateUser}>Create</button>
                        <button className="cancel-btn" onClick={() => setCreatingUser(false)}>Cancel</button>
                    </div>
                </div>
            )}
            <div className="pagination-controls">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                >
                    Previous
                </button>
                <span>Page {page + 1} of {usersPage?.totalPages}</span>
                <button
                    onClick={() => setPage(prev => (usersPage && prev + 1 < usersPage.totalPages ? prev + 1 : prev))}
                    disabled={usersPage && page + 1 >= usersPage.totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
