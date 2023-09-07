import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const AddEmployee = () => {
	const baseUrl = 'http://localhost:5000/employee';
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [role, setRole] = useState('');

	const handleNameChange = (e) => setName(e.target.value);

	const handleRoleChange = (e) => setRole(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post(baseUrl, { name, role })
			.then((res) => {
				alert('Successfully added');
				navigate('/read');
			})
			.catch((err) => alert('Error : ' + err));
	};

	const handleCancelChange = () => {
		setName('');
		setRole('');
		navigate('/read');
	};

	return (
		<Alert variant="primary">
			<Container>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="form.Name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							value={name}
							onChange={handleNameChange}
							placeholder="Enter Employee Name"
						/>
					</Form.Group>
					<Form.Group controlId="form.Role">
						<Form.Label>Role</Form.Label>
						<Form.Control
							type="text"
							value={role}
							onChange={handleRoleChange}
							placeholder="Enter Employee Role"
						/>
					</Form.Group>
					<br />
					<Button type="submit">Add Employee</Button>
					&nbsp;&nbsp;&nbsp;
					<Button type="submit" onClick={() => handleCancelChange()}>
						Cancel
					</Button>
				</Form>
			</Container>
		</Alert>
	);
};
export default AddEmployee;
