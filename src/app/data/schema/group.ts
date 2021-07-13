
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
    grouplist: GroupContextInterface[];
    groupadminlist: GroupAdminInterface[];
}

export interface GroupAdminInterface {
    id: string;
    region: string;
    groupname: string;
    grouptype: string;
    email: string;
    firstname: string;
    lastname: string;
    address: string;
    phone: string;
    quota: Number;
    membercount: Number;
    storagespace: Number;
    status: string;
    startdate: Date;
    enddate: Date;
    groupadminid: Number;
    groupadminname: string;
    registerdate: Date;
    del_yn: string;
}

export interface GroupAdminListInterface {
    groupadminlist: GroupAdminInterface[];
}
