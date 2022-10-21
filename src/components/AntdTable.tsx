import { Popconfirm, Table } from 'antd';
import React, { useState, useMemo, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Windows } from './Windows'
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

interface IDataMocky {
	pagination: number;
	dataSource: [IPersonInformation];
};

const AntdTable: any = () => {
		
	const [dataSource, setDataSource] = useState<IDataType[]>([
		{
			key: '0',
			firstName: 'Edward',
			secondName: 'King',
			lastName: 'Source',
		},
		{
			key: '1',
			firstName: 'Ray',
			secondName: ' King',
			lastName: 'Source',
		},
		{
			key: '2',
			firstName: 'Nitoshi',
			secondName: ' King',
			lastName: 'Source',
		}
	]);

	const [count, setCount] = useState(10);

	const handleDelete = (key: React.Key) => {
		const newData = dataSource.filter(item => item.key !== key);
		setDataSource(newData);
	};

	const [fetchPost, setFetchPost] = useState(false);
	const [pageSize, setPageSize] = useState<number>(0);
	const [dataMocky, setDataMocky] = useState<IDataMocky>(
		{
			pagination: 0,
			dataSource: [
				{
				firstName: '',
				secondName: '',
				lastName: '',
				},
			]
		}
	);

	const url = "https://run.mocky.io/v3/197c2bbe-a184-4110-be3f-ae4a39da495e";

	useMemo(() => {
		fetch(url)
			.then((response: any) => response.json())
			.then((responseData: IDataMocky) => {
				setDataMocky(responseData)
			})
	}, []);

	function mockyCombain(data: IDataMocky) {
		let dataSourceNew:any = dataSource;
		let counter = count;
		dataMocky.dataSource.forEach((item) => {
			let newData: IDataType = {
				key: counter,
				firstName: item.firstName,
				secondName: item.secondName,
				lastName: item.lastName,
			};
			if (newData.firstName.length < 1 ||
				newData.secondName.length < 1 ||
				newData.lastName.length < 1) { }
			else {
					dataSourceNew = ([...dataSourceNew, newData]);
					counter++;
			}
		});
		setDataSource(dataSourceNew);
		setCount(counter);
		setFetchPost(true);
	};

	useMemo(() => {
		setPageSize(dataMocky.pagination);
		mockyCombain(dataMocky);
	}, [dataMocky]);


	const [handleEditObject, setHandleEditObject] = useState<IDataType>({
		key: 0,
		firstName: '',
		secondName: '',
		lastName: '',
	});

	const [modalEditOpen, setModalEditOpen] = useState<boolean>(false);
	console.log("modalEditOpen: " + modalEditOpen);
	const [editTrigger, setEditTrigger] = useState<boolean>(false);
	console.log("editTrigger: " + editTrigger);

	const EditTriggerOff = () => {
		setEditTrigger(false);
	};

	const editModalTriggerOff = useMemo(() => {
		if (modalEditOpen === true) {
			EditTriggerOff();
		}
	}, [modalEditOpen])
	
	const editModalTriggerOpen = (data: boolean) => {
		setModalEditOpen(data);
	};

	const handleEdit = (key: React.Key) => {
		const newDataEdit = dataSource.filter(item => item.key === key);
		setHandleEditObject(newDataEdit[0]);
		console.log(newDataEdit);
		console.log('Натиснув');
		setEditTrigger(true);
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

	const handleAddEdit = useMemo(() => {
		const newDataEdit: IDataType = {
			key: modalObjectEditAdd.key,
			firstName: modalObjectEditAdd.firstName,
			secondName: modalObjectEditAdd.secondName,
			lastName: modalObjectEditAdd.lastName,
		};
		const editKey = dataSource.findIndex(({ key }) => key === modalObjectEditAdd.key);
		console.log("key: " + editKey);

		if (newDataEdit.firstName.length < 1) {
			console.log('First start program, edit)')
		}
		
		else {
			const copyItems: IDataType[] = [];
			console.log(copyItems);

			for (let i = 0; i < dataSource.length; i++) {
				if (dataSource[i] === dataSource[editKey]) {
					copyItems.push(newDataEdit)
				}
				else {
					copyItems.push(dataSource[i])
				}
			}
			setDataSource(copyItems);
		}
	}, [modalObjectEditAdd]);
	
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
						<Button>
							<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
							<a>Delete</a>
							</Popconfirm>
						</Button>
						<Button onClick={() => handleEdit(record.key)}>
							Edit
						</Button>
					</div>
				) : null,
		},
	];

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
		if (newData.firstName.length < 1 ||
			newData.secondName.length < 1 ||
			newData.lastName.length < 1) {
			
		}
		else {
			setDataSource([...dataSource, newData]);
			setCount(count + 1);
		}
	}, [modalObject])
	
	function mainAppTable() {
		if (pageSize === 0) {
			return null
		}
		else {
		return (
			<div>
				<Table
					rowClassName={() => 'editable-row'}
					dataSource={dataSource}
					columns={columns}
					pagination={
						{
							pageSize: pageSize
						}
					}
				/>
				<div style={{ display: 'flex' }}>
					<Windows modObject={modObject} />
					<WindowsEdit editElement={handleEditObject} modObjectEditAdd={modObjectEditAdd} editTrigger={editTrigger} editModalTriggerOpen={editModalTriggerOpen} />
				</div>
			<div></div>
			</div>
			);
		}
	};
	
	return (
		mainAppTable()
	);
	
};
	export default AntdTable;