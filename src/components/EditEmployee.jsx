import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EditEmployee = () => {
	const editUrl = 'http://localhost:5000/employee/';
	const navigate = useNavigate();
	const param = useParams();
	const [empId, setEmpId] = useState('');
	const [empName, setEmpName] = useState('');
	const [empRole, setEmpRole] = useState('');

	useEffect(() => {
		axios
			.get(editUrl + param.id)
			.then((res) => {
				const empRecord = res.data.data;
				setEmpId(empRecord._id);
				setEmpName(empRecord.name);
				setEmpRole(empRecord.role);
			})
			.catch((err) => alert('Error: ' + err));
	}, [param]);

	const handleNameChange = (e) => setEmpName(e.target.value);
	const handleRoleChange = (e) => setEmpRole(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.put(editUrl + param.id, {
				id: empId,
				name: empName,
				role: empRole,
			})
			.then((res) => {
				alert('Employee record updated successfully');
				navigate('/read');
			})
			.catch((err) => alert('Error: ' + err));
	};

	return (
		<Alert variant="primary">
			<Container>
				<Form onSubmit={handleSubmit} id="data">
					<Form.Group controlId="form.id">
						<Form.Label>Employer Id</Form.Label>
						<Form.Control value={empId ? empId : ''} readOnly />
					</Form.Group>
					<Form.Group controlId="form.Name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							value={empName}
							onChange={handleNameChange}
							placeholder="Enter Employee Name"
						/>
					</Form.Group>
					<Form.Group controlId="form.Role">
						<Form.Label>Role</Form.Label>
						<Form.Control
							type="text"
							value={empRole}
							onChange={handleRoleChange}
							placeholder="Enter Employee Role"
						/>
					</Form.Group>
					<br />
					<Button type="submit">Update Data</Button>
					&nbsp;&nbsp;&nbsp;
					<Button type="submit" onClick={() => navigate('/read')}>
						Cancel
					</Button>
				</Form>
			</Container>
		</Alert>
	);
};
export default EditEmployee;
