import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import EditUsers from '../Modal/EditUsers';
import { useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { setUsers } from '../../redux/adminUsersSlice';
import Pagination from '../pagination.tsx/Pagination';
const localUrl = import.meta.env.VITE_API_URL

const UsersList = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [editState, setEditState] = useState<string>("")
    const dispatch = useDispatch<AppDispatch>()
    const { usersList } = useSelector((state: RootState) => state.adminUsers)
    const [pages, setPages] = useState(0)
    //MODAL
    const openEditModal = () => setShowEditModal(true)
    const closeEditModal = () => setShowEditModal(false)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const PAGE_SIZE = 4

    const fetchUsers = useCallback(() => {
        axios
            .get(`${localUrl}/admin/fetch-data?page=${currentPage}&limit=${PAGE_SIZE}&search=${searchTerm}`, { withCredentials: true })
            .then((res) => {
                if (!res.data.success) {
                    toast.error(res.data.message)
                }
                dispatch(setUsers(res.data.users ?? []))
                setPages(res.data.totalUsers)
            })
            .catch((err) => {
                console.error('Fetch users error', err);
                toast.error('Failed to load users');
            });
    }, [currentPage, searchTerm]);

    useEffect(fetchUsers, [fetchUsers]);

    const handleDelete = (userId: string) => {
        if (!window.confirm('Delete this user?')) return;
        axios
            .delete(`${localUrl}/admin/delete/${userId}`, { withCredentials: true })
            .then(() => {
                toast.success('User deleted');
                fetchUsers();
            })
            .catch((err) => {
                console.error('Delete user error', err);
                toast.error('Could not delete user');
            });
    };

    const filteredUsers = usersList?.filter((u) =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (userId: string) => {
        openEditModal()
        setEditState(userId)
    }

    const totalUsers = pages
    const noOfPages = Math.ceil(totalUsers / PAGE_SIZE)
    const goToNextPage = () => {
        setCurrentPage(prev => prev + 1)
    }
    const goToPreviousPage = () => {
        if(pages <= 1) return
        setCurrentPage(prev => prev - 1)
    }

    return (
        <>
            <main className="flex justify-center items-start pt-28 px-4 py-5">
                <div className="w-full max-w-2xl bg-gray-800/80 rounded-xl shadow-xl p-6 backdrop-blur-md">

                    <input
                        type="text"
                        className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <h3 className="text-lg font-semibold mb-2">All Users</h3>
                    <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                        {filteredUsers.length ? (
                            filteredUsers.map((u) => (
                                <div
                                    key={u._id}
                                    className="flex items-center bg-gray-700/60 p-3 rounded-lg shadow-md"
                                >

                                    <div className="w-10 h-10 rounded-full border border-purple-400 overflow-hidden mr-3">
                                        {u.profile ? (
                                            <img
                                                src={u.profile}
                                                alt={`${u.username} avatar`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center w-full h-full bg-gray-600">
                                                <FaUser className="text-xl text-gray-400" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 truncate">
                                        <p className="text-sm font-medium truncate">{u.username}</p>
                                        <p className="text-xs text-gray-300 truncate">{u.email}</p>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(u._id)}
                                        className="bg-red-600 opacity-40 hover:opacity-90 text-white text-xs px-3 py-1 rounded ml-2"
                                    >
                                        Delete
                                    </button>

                                    <button
                                        onClick={() => handleEdit(u._id)}
                                        className="bg-gray-500 opacity-40 hover:bg-violet-600 opacity-90 text-white text-xs px-3 py-1 rounded ml-2"
                                    >
                                        Edit
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm">No users found.</p>
                        )}
                    </div>

                    {/* pagination */}
                    {filteredUsers.length &&
                        <Pagination
                            noOfPages={noOfPages}
                            goToNextPage={goToNextPage}
                            goToPreviousPage={goToPreviousPage}
                            currentPage={currentPage}
                        />}
                </div>
            </main>

            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <EditUsers show={showEditModal} onClose={closeEditModal} userId={editState} />
                </div>
            )}
        </>
    )
}

export default UsersList