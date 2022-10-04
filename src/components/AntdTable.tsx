import { Popconfirm, Table } from 'antd';
import React, {useState, useMemo, useEffect } from 'react';
import 'antd/dist/antd.css';
import {Windows} from './Windows'
import { WindowsEdit } from './WindowsEdit';
import { Button } from 'antd';

interface IDataType {
	key: React.Key;
	firstName: string;
	secondName: string;
	lastName: string;
};

interface IPersonInformation {
	firstName: string;
	secondName: string;
	lastName: string;
};

const AntdTable: React.FC = () => {
		
	const [dataSource, setDataSource] = useState<IDataType[]>([
		{
			key: '0',
			firstName: 'Edward',
			secondName: 'King',
			lastName: 'Danst1',
		},
		{
			key: '1',
			firstName: 'Edward',
			secondName: ' King',
			lastName: 'Danst2',
		},
	]);

	const handleDelete = (key: React.Key) => {
		const newData = dataSource.filter(item => item.key !== key);
		setDataSource(newData);
	};

	const [handleEditObject, setHandleEditObject] = useState<IDataType>({
		key: 0,
		firstName: '',
		secondName: '',
		lastName: '',
	});
	
	const handleEdit = (key: React.Key) => {
		const newDataEdit = dataSource.filter(item => item.key === key);
		setHandleEditObject(newDataEdit[0]);
		console.log(newDataEdit);
		console.log('Натиснув');
	};

	const [modalObjectEditAdd, setModalObjectEditAdd] = useState<IDataType>({
		key: 0,
		firstName: '',
		secondName: '',
		lastName: '',
	});

	const modObjectEditAdd = (data: IDataType) => {
		setModalObjectEditAdd(data);
	};

	const [modalObjectEdit, setModalObjectEdit] = useState();

	const modObjectEdit = (data: any) => {
		setModalObjectEdit(data);
	};

	// XXXXX  XXXXX  XXXXXX
	
	const handleAddEdit = useMemo(() => {
		const newDataEdit: IDataType = {
			key: modalObjectEditAdd.key,
			firstName: modalObjectEditAdd.firstName,
			secondName: modalObjectEditAdd.secondName,
			lastName: modalObjectEditAdd.lastName,
		};
		if (newDataEdit.firstName.length < 1) {
			console.log('First start program, edit)')
		}
		else {
			console.log(newDataEdit);
		}
	},[modalObjectEditAdd])
	
	const columns = [
		{
			title: 'Fist name',
			dataIndex: 'firstName',
			width: '30%',
		},
		{
			title: 'Second name',
			dataIndex: 'secondName',
		},
		{
			title: 'Last name',
			dataIndex: 'lastName',
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (_: any, record: { key: React.Key }) =>
				dataSource.length >= 1 ? (
					<div className='operation'>
						<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
							<a>Delete</a>
						</Popconfirm>
						<Button onClick={() => handleEdit(record.key)}>
							Edit
						</Button>
					</div>
				) : null,
		},
	];

	const [count, setCount] = useState(2);

	const [modalObject, setModalObject] = useState<IPersonInformation>({
		firstName: "",
		secondName: "",
		lastName: "",
	});

	const modObject = (data: IPersonInformation) => {
		setModalObject(data);
	};

	console.log("ModalInput: " + modalObject);

	const handleAdd = useMemo(() => {
		const newData: IDataType = {
			key: count,
			firstName: modalObject.firstName,
			secondName: modalObject.secondName,
			lastName: modalObject.lastName,
		};
		if (newData.firstName.length < 1) {
			console.log('First start program, add)')
		}
		else {
			setDataSource([...dataSource, newData]);
			setCount(count + 1);
		}
	},[modalObject])

	return (
		<div>
			<Table
				rowClassName={() => 'editable-row'}
				dataSource={dataSource}
				columns={columns}
			/>
			<div style={{ display:'flex'}}>
				<Windows modObject={modObject} />
				<WindowsEdit editElement={handleEditObject} modObjectEditAdd={modObjectEditAdd} />
			</div>
		</div>
	);
};
	
	export default AntdTable;