import React, { useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import 'antd/dist/antd.css';
import { Popconfirm, Table, Button } from 'antd';
import Windows from './Windows'
import { IDataType, IDataMocky } from '../constant/interface';
import { DELETE_STATE, ADD_MAS_STATE } from '../redux/features/dataSlice';

const AntdTable = () => {
	const dataSource: IDataType[] = useSelector((store: AnyAction) => store.data);
	const dispatch = useDispatch();
	const [pageSize, setPageSize] = useState<number>(0);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const url = "https://run.mocky.io/v3/9d43b694-be6f-44d2-a585-004e9616ef0a";
	const childComp = useRef<any>(null);

	const getApiData = async () => {
		const response = await fetch(url)
			.then((response: any) => response.json())
			.then((responseData: IDataMocky) => {
				setIsLoaded(true);
				dispatch(ADD_MAS_STATE(responseData.dataSource));
				setPageSize(responseData.pagination);
			})
			.catch((error) => {
				setIsLoaded(true);
				setError(error);
			});
	};

	useMemo(() => {
		getApiData();
	}, []);

	const [editObject, setEitObject] = useState<IDataType>(
		{
			key: 0,
			firstName: 'q',
			secondName: 'q',
			lastName: 'q',
		}
	);
	console.log(editObject);
	const handleEdit = (key: React.Key) => {
		const newDataEdit = dataSource.filter(item => item.key === key);
		setEitObject(newDataEdit[0]);
		childComp.current?.onSubmit(editObject);
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
						<Button>
							<Popconfirm title="Sure to delete?" onConfirm={() => dispatch(DELETE_STATE(record.key))}>
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

	function fetchPost() {
		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataSource),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Success:', data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	if (error) {
		return <div>Error: {error}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
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
					<Windows
						editObject={editObject}
						ref={childComp}
					/>
					<Button onClick={(e) => (fetchPost())}>To send</Button>
				</div>
			</div>
		);
	}
};

export default AntdTable;