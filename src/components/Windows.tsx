import { Button, Modal } from 'antd';
import { useState, useMemo, forwardRef, useImperativeHandle, useCallback, PropsWithoutRef, Ref } from 'react';
import { IDataType } from '../constant/interface';
import { ModalDirection, ModalType } from '../constant/enum';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_STATE, EDIT_STATE } from '../redux/features/dataSlice';
import { AnyAction } from '@reduxjs/toolkit';
import { switchModal } from '../redux/features/modalSlice';

function Windows(props: PropsWithoutRef<any>, ref: Ref<any>) {
	const [modal, setModal] = useState<ModalDirection>(ModalDirection.DEFAULT);
	const [modalFirstName, setModalFirstName] = useState<string>('');
	const [modalSecondName, setModalSecondName] = useState<string>('');
	const [modalLastName, setModalLastName] = useState<string>('');
	const isModalOpen: boolean = useSelector((store: AnyAction) => store.modal);
	const dispatch = useDispatch();

	const personInformationAdd: IDataType = {
		key: (modal === ModalDirection.ADD ? uuid() : props.editObject.key),
		firstName: modalFirstName,
		secondName: modalSecondName,
		lastName: modalLastName,
	};
	console.log(modal);

	const showModal = () => {
		dispatch(switchModal(ModalType.OPEN_MODAL));
	};

	const handleOk = () => {
		showFunctions(modal, personInformationAdd)
		dispatch(switchModal(ModalType.CLOSED_MODAL));
		nullValue();
		setModal(ModalDirection.DEFAULT);
	};

	const handleCancel = () => {
		dispatch(switchModal(ModalType.CLOSED_MODAL));
		nullValue();
		setModal(ModalDirection.DEFAULT);
	};

	const onSubmit = useCallback(() => {
		showModal();
		local();
		setModal(ModalDirection.EDIT);
	}, []);

	useImperativeHandle(ref, () => ({
		onSubmit: () => {
			onSubmit();
		},
	}), [onSubmit]);

	const addModal = () => {
		setModal(ModalDirection.ADD);
		showModal();
	};

	function local() {
		if (modal === ModalDirection.EDIT) {
			setModalFirstName(props.editObject.firstName);
			setModalSecondName(props.editObject.secondName);
			setModalLastName(props.editObject.lastName);
		}
	};

	useMemo(() => {
		local();
	}, [isModalOpen]);

	function nullValue() {
		setModalFirstName('');
		setModalSecondName('');
		setModalLastName('');
	};

	function showFunctions(modal: ModalDirection, personInformationAdd: IDataType) {
		switch (modal) {
			case ModalDirection.ADD:
				return dispatch(ADD_STATE(personInformationAdd));
			case ModalDirection.EDIT:
				return dispatch(EDIT_STATE(personInformationAdd));
		}
	};

	function inputTemplate(inputNameP: string, InputSetName: React.Dispatch<React.SetStateAction<string>>, valueInputName: string) {
		return (
			<div style={{ marginBottom: 16 }}>
				<p>{inputNameP}</p>
				<input
					onChange={(e) => InputSetName(e.target.value)}
					value={valueInputName}
				/>
			</div>
		)
	};

	return (
		<div>
			<Button type="primary" onClick={addModal}>
				Add people
			</Button>
			<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				{inputTemplate('First name', setModalFirstName, modalFirstName)}
				{inputTemplate('Second name', setModalSecondName, modalSecondName)}
				{inputTemplate('Last name', setModalLastName, modalLastName)}
			</Modal>
		</div>
	);
};

export default forwardRef(Windows);