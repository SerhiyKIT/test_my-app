import { Button, Modal } from 'antd';
import React, { useState } from 'react';

interface IPersonInformation {
	firstName: string;
	secondName: string;
	lastName: string;
};

export const Windows = (props:any) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [modalFirstName, setModalFirstName] = useState<string>('');
	const [modalSecondName, setModalSecondName] = useState<string>('');
	const [modalLastName, setModalLastName] = useState<string>('');

	const personInformation:IPersonInformation = {
		firstName: modalFirstName,
		secondName: modalSecondName,
		lastName: modalLastName,
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		props.modObject(personInformation);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<Button type="primary" onClick={showModal}>
				Add people
			</Button>
				<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
					<div style={{ marginBottom: 16 }}>
						<p>First name</p>
						<input
							onChange={e => setModalFirstName(e.target.value)}
						/>
					</div>
					<div style={{ marginBottom: 16 }}>
						<p>Second name</p>
						<input
							onChange={e => setModalSecondName(e.target.value)}
						/>
					</div>
					<div style={{ marginBottom: 16 }}>
						<p>Last name</p>
						<input
							onChange={e => setModalLastName(e.target.value)}
						/>
					</div>
				</Modal>
		</div>
	);
};