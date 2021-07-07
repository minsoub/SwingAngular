
export interface GroupContextInterface {
    id: string;
    region: string;
    groupname: string;
    grouptype: string;
    address: string;
    phone: string;
    quota: Number;
    storagespace: Number;
    status: string;
    startdate: Date;
    enddate: Date;
    groupadminid: Number;
    registerdate: Date;
    del_yn: string;
}

export interface GroupListInterface {
    list: GroupContextInterface[];
}