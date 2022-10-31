export interface IPersonInformation {
	firstName: string;
	secondName: string;
	lastName: string;
};

export interface IDataType extends IPersonInformation {
	key: React.Key;
};

export interface IDataMocky {
	pagination: number;
	dataSource: IDataType[];
};

export interface IModalSwitch {
	modalSwitch: boolean;
}