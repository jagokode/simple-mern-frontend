import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiEdit } from 'react-icons/ci';
import { BsTrash } from 'react-icons/bs';
import '../App.css';

const EmployeeRecordTable = () => {
	const navigate = useNavigate();
	const baseUrl = 'http://localhost:5000';
	const [employees, setEmployees] = useState([]);

	const fetchEmployeeRecord = () => {
		axios
			.get(`${baseUrl}/employee`)
			.then((res) => setEmployees(res.data.data))
			.catch((err) => console.log(err))
			.finally('No records found');
	};

	useEffect(() => fetchEmployeeRecord(), []);

	const deleteEmployee = (id) => {
		axios
			.delete(`${baseUrl}/employee/${id}`)
			.then((res) => {
				alert(`Employee with ID ${id} has been deleted`);
				fetchEmployeeRecord();
				navigate('/read');
			})
			.catch((err) =>
				alert('Something wrong while deleting employee record: ' + err)
			);
	};

	const deleteAllEmployee = () => {
		axios
			.delete(`${baseUrl}/employee`)
			.then((res) => {
				alert('All employees deleted successfully');
				fetchEmployeeRecord();
				navigate('/read');
			})
			.catch((err) => alert('Can not delete all employee records'));
	};

	return (
		<div className="card-body">
			<br />
			<nav>
				<button
					className="btn btn-primary nav-item active"
					onClick={() => navigate('/create')}
				>
					Add New Employee
				</button>
			</nav>
			<br />
			<div className="col-md-6">
				<h4>Employees List</h4>
				{employees.length === 0 && <p>No records found.</p>}
				<div className="container">
					<div className="col-12">
						<table className="table table-bordered table-striped">
							<thead>
								<tr>
									<th>Id</th>
									<th>Name</th>
									<th>Role</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{employees &&
									employees.map((emp, i) => (
										<tr key={i}>
											<th scope="row">{emp.id}</th>
											<td>{emp.name}</td>
											<td>{emp.role}</td>
											<td className="">
												<div className="d-flex justify-content-evenly align-items-center">
													<Link
														to={`/edit/${emp.id}`}
														title="Edit"
													>
														<CiEdit />
													</Link>
													<BsTrash
														onClick={() =>
															deleteEmployee(
																emp.id
															)
														}
														title="Delete"
														style={{
															cursor: 'pointer',
														}}
													/>
												</div>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<button
				className="btn btn-sm btn-danger"
				onClick={() => deleteAllEmployee()}
			>
				Delete All
			</button>
		</div>
	);
};
export default EmployeeRecordTable;
