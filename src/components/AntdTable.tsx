import { Popconfirm, Table } from 'antd';
import React, {useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import {Windows} from './Windows'

interface IDataType {
	key: React.Key;
	firstName: string;
	secondName: string;
	lastName: string;
}
 
interface IPersonInformation {
	firstName: string;
	secondName: string;
	lastName: string;
 }

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
		  secondName:' King',
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
			render: (_:any , record: { key: React.Key }) =>
			  dataSource.length >= 1 ? (
				 <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
					<a>Delete</a>
				 </Popconfirm>
			  ) : null,
		 },
	];
	
	const debug = () => {
		console.log("Works");
	};

	const [count, setCount] = useState(2);

	const [modalObject, setModalObject] = useState({
		firstName: "modalFirstName",
		secondName: "modalSecondName",
		lastName: "modalLastName",
	});

	const modObject = (data:IPersonInformation) => {
		setModalObject(data);
	};

	const handleAdd = (props:any) => {
		const newData: IDataType = {
			key: count,
			firstName: modalObject.firstName,
			secondName:modalObject.secondName,
			lastName: modalObject.lastName,
		 };
		 setDataSource([...dataSource, newData]);
		 setCount(count + 1);
	};

		return (
				<div>
					<Table
   	     		rowClassName={() => 'editable-row'}
   	     		dataSource={dataSource}
					columns={columns}
				/>
				<Windows debug={debug} handleAdd={handleAdd} modObject={modObject} />
			</div>
		);
	}
	
	export default AntdTable;