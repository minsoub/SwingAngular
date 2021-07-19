
export interface ProInterface {
    id: number;
    userid: number;
    region: string;
    lessonprice: number;
    rating: string;
    prolevel: number;
    description: string;
    profile: string;
    profile_img: string;
    email: string;
    firstname: string;
    lastname: string;
    use_yn: string;
}

export interface ProListInterface {
    t: string;
    list: ProInterface[]
}