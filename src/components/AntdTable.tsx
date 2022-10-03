import { Popconfirm, Table } from 'antd';
import React, {useState, useMemo } from 'react';
import 'antd/dist/antd.css';
import {Windows} from './Windows'

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

	console.log(modalObject);

	const handleAdd = useMemo(() => {
		const newData: IDataType = {
			key: count,
			firstName: modalObject.firstName,
			secondName: modalObject.secondName,
			lastName: modalObject.lastName,
		};
		if (newData.firstName.length < 1) {
			console.log('First start program, kostul yopt)')
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
			<Windows modObject={modObject}/>
		</div>
	);
};
	
	export default AntdTable;