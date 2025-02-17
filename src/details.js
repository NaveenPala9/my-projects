import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Pagination, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faDownload, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const StudentsTable = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isInsert, setIsInsert] = useState(false); // For modal type (Add or Update)
    const [currentStudent, setCurrentStudent] = useState({ name: '', date: '', address: '', pdf: null, pdfName: '' });

    const limit = 5; // Number of students per page

      // Fetch students from the backend with pagination

     const fetchStudents = async (page=1 , query='' ) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/students`, {
                params: { page, limit, search: query },
            });
            setStudents(response.data.students);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
            setError(null);
        } catch (err) {
            console.error('Error fetching students:', err);
            setError('Failed to load students. Please try again later.');
        }
    };

    useEffect(() => {
        fetchStudents(currentPage, searchQuery);
    }, [currentPage, searchQuery]); 

    
      

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

      // Open modal for inserting a new student
    const handleInsert = () => {
        setIsInsert(true);
        setCurrentStudent({ name: '', date: '', address: '', pdf: null, pdfName: '' });
        setShowModal(true);
    };
     
     // open modal for updating a student
    const handleUpdate = (student) => {
        setIsInsert(false);
        setCurrentStudent({
            ...student,
            pdfName: student.pdf ? student.pdf.split('/').pop() : '',
        });
        setShowModal(true);
    };
      // Handle modal close
    const handleClose = () => {
        setShowModal(false);
    };
    //insert  a student
    const insertStudent = async () => {
        const formData = new FormData();
        formData.append('name', currentStudent.name);
        formData.append('date', currentStudent.date);
        formData.append('address', currentStudent.address);
        if (currentStudent.pdf) formData.append('pdf', currentStudent.pdf);

        try {
            await axios.post(`http://localhost:3000/api/students`, formData);
            fetchStudents(currentPage, searchQuery);
            handleClose();
        } catch (err) {
            console.error('Error adding student:', err);
            setError('Failed to add student. Please try again later.');
        }
    };
     // update student
    const updateStudent = async () => {
        const formData = new FormData();
        formData.append('name', currentStudent.name);
        formData.append('date', currentStudent.date);
        formData.append('address', currentStudent.address);
        if (currentStudent.pdf) formData.append('pdf', currentStudent.pdf);

        try {
            await axios.put(`http://localhost:3000/api/students/${currentStudent.id}`, formData);
            fetchStudents(currentPage, searchQuery);
            handleClose();
        } catch (err) {
            console.error('Error updating student:', err);
            setError('Failed to update student. Please try again later.');
        }
    };
    //delete student
    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/students/${id}`);
            fetchStudents(currentPage, searchQuery);
        } catch (err) {
            console.error('Error deleting student:', err);
            setError('Failed to delete student. Please try again later.');
        }
    };

    return (
        <div className="container mt-4">
            <h2 style={{textAlign:'center'}}>Students List</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            {/*<Button className="mb-3 " variant="primary" onClick={handleInsert}>
                Add Student
            </Button>*/}  

                <div className="text-center mb-3">
                    <Button variant="primary" onClick={handleInsert}>
                        Add Student
                    </Button>
                </div>


            {/* Search Bar */}
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search by name"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </InputGroup>

             


<Table hover bordered style={{ border: '1px solid black' }}>
    <thead>
        <tr>
            <th
                style={{
                    textAlign: 'center',
                    backgroundColor: '#dddd',
                    width: '10%', // Adjust as per your needs
                }}
            >
                Sl. No
            </th>
            <th
                style={{
                    textAlign: 'center',
                    backgroundColor: '#dddd',
                    width: '20%',
                }}
            >
                Name
            </th>
            <th
                style={{
                    textAlign: 'center',
                    backgroundColor: '#dddd',
                    width: '15%',
                }}
            >
                Date
            </th>
            <th
                style={{
                    textAlign: 'center',
                    backgroundColor: '#dddd',
                    width: '30%',
                }}
            >
                Address
            </th>
            <th
                style={{
                    textAlign: 'center',
                    backgroundColor: '#dddd',
                    width: '15%',
                }}
            >
                PDF
            </th>
            <th
                style={{
                    textAlign: 'center',
                    backgroundColor: '#dddd',
                    width: '10%',
                }}
            >
                Actions
            </th>
        </tr>
    </thead>
    <tbody>
        {students.length > 0 ? (
            students.map((student, index) => (
                <tr key={student.id} /*style={{ height: '50px' }}*/>
                    <td style={{ textAlign: 'center' }}>
                        {(currentPage - 1) * limit + index + 1}
                    </td>
                    <td style={{ textAlign: 'center' }}>{student.name}</td>
                    <td style={{ textAlign: 'center' }}>{student.date}</td>
                    <td
                        style={{
                            textAlign: 'center',
                            maxWidth: '100px',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {student.address}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        {student.pdf ? (
                            <>
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className="me-3"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        window.open(
                                            `http://localhost:3000/uploads/${student.pdf}`
                                    
                                        )
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faDownload}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        (window.location.href = `http://localhost:3000/api/students/${student.id}/download`)
                                    }
                                />  
                            </>
                        ) : (
                            'No PDF'
                        )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="me-3"
                            style={{ cursor: 'pointer' }}
                            onClick={() => deleteStudent(student.id)}
                        />
                        <FontAwesomeIcon
                            icon={faPen}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleUpdate(student)}
                        />
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="6" style={{ textAlign: 'center', height: '50px' }}>
                    No students found.
                </td>
            </tr>
        )}
    </tbody>
</Table>


                 {/* Pagination */}

                <Pagination className="d-flex justify-content-end align-items-center">
                    {/* First and Previous Buttons */}
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

                    {/* Current Page and Total Pages */}
                    <span className="mx-2">
                        {currentPage} / {totalPages}
                    </span>

                    
                    {/* Next and Last Buttons */}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>


            {/* Modal for Insert/Update */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isInsert ? 'Add Student' : 'Update Student'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={currentStudent.name}
                                onChange={(e) =>
                                    setCurrentStudent({ ...currentStudent, name: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formDate" className="mt-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Date"
                                value={currentStudent.date}
                                onChange={(e) =>
                                    setCurrentStudent({ ...currentStudent, date: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress" className="mt-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                value={currentStudent.address}
                                onChange={(e) =>
                                    setCurrentStudent({
                                        ...currentStudent,
                                        address: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formPDF" className="mt-3">
                            <Form.Label>PDF</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".pdf"
                                onChange={(e) =>
                                    setCurrentStudent({ ...currentStudent, pdf: e.target.files[0] })
                                }
                            />
                            {currentStudent.pdfName && (
                                <p className="mt-2">Last file: {currentStudent.pdfName}</p>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={isInsert ? insertStudent : updateStudent}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default StudentsTable;
