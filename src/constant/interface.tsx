export interface IPersonInformation {
	firstName: string;
	secondName: string;
	lastName: string;
};

export interface IDataType extends IPersonInformation, IDataCar {
	key: React.Key;
};

export interface IDataCar {
	cars?: IBrand[];
};

export interface IBrand {
	brand?: string;
};


export interface IDataMocky {
	pagination: number;
	dataSource: IDataType[];
};

export interface IModalSwitch {
	modalSwitch: boolean;
}