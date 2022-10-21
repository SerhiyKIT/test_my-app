import { Modal } from 'antd';
import { useState, useMemo, useEffect } from 'react';

interface IPersonInformationEdit {
	key: number;
	firstName: string;
	secondName: string;
	lastName: string;
};

export const WindowsEdit = (props:any) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [modalFirstName, setModalFirstName] = useState<string>('');
	const [modalSecondName, setModalSecondName] = useState<string>('');
	const [modalLastName, setModalLastName] = useState<string>('');
	const [editTriggerOpen, setEditTriggerOpen] = useState<boolean>(false);
	const [personInformationInput, setPersonInformationInput] = useState<IPersonInformationEdit>({
		key: 0,
		firstName: '',
		secondName: '',
		lastName: '',
	});

	const personInformation: IPersonInformationEdit = {
		key: personInformationInput.key,
		firstName: modalFirstName,
		secondName: modalSecondName,
		lastName: modalLastName,
	};
	
	const showModal = () => {
		setIsModalOpen(true);
		setPersonInformationInput(props.editElement);
	};
	
	const handleEdit = useMemo(() => {
		setModalFirstName(personInformationInput.firstName);
		setModalSecondName(personInformationInput.secondName);
		setModalLastName(personInformationInput.lastName);
	},[personInformationInput])

	const handleOk = () => {
		setIsModalOpen(false);
		props.modObjectEditAdd(personInformation);
		setEditTriggerOpen(false);
		editTriggerOpenReturn();
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setEditTriggerOpen(false);
		editTriggerOpenReturn();
	};

	const editOpen = useEffect(() => {
	if (props.editTrigger === true) {
			showModal();
			editTriggerOpenReturn();
		}
		setEditTriggerOpen(true);
		console.log("Stan:");
		console.log(props.editModalTriggerOpen);
	}, [props.editTrigger])
	
	const editTriggerOpenReturn = () => {
		props.editModalTriggerOpen(editTriggerOpen);
	};

	return (
		<div>
			<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<div style={{ marginBottom: 16 }}>
					<p>First name</p>
					<input
						onChange={e => setModalFirstName(e.target.value)}
						value = {modalFirstName}
					/>
				</div>
				<div style={{ marginBottom: 16 }}>
					<p>Second name</p>
					<input
						onChange={e => setModalSecondName(e.target.value)}
						value = {modalSecondName}
					/>
				</div>
				<div style={{ marginBottom: 16 }}>
					<p>Last name</p>
					<input
						onChange={e => setModalLastName(e.target.value)}
						value = {modalLastName}
					/>
				</div>
			</Modal>
		</div>
	);
};