import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import EmployeeRecordTable from './components/EmployeeRecordTable';

function App() {
	return (
		<div className="container card mb-4 box-shadow">
			<div className="card-header">
				<h4 className="my-0 font-weight-normal">
					Jago Kode - React CRUD
				</h4>
			</div>
			<Routes>
				<Route path="/" element={<Navigate to="/read" />} />
				<Route path="/create" element={<AddEmployee />} />
				<Route path="/read" element={<EmployeeRecordTable />} />
				<Route path="/edit/:id" element={<EditEmployee />} />
			</Routes>
		</div>
	);
}

export default App;
