export interface UserInterface {
    id: Number;            // 사용자 아이디
    email: string;         // 메일주소
    firstname: string;     // 이름
    lastname: string;      // 성명
    dob: Date;             // dob
    gender: string;        // 성별
    photo: File;         // 사진정보
    phone: string;         // 전화번호
    groupmember: string;   // 그룹멤버 여부
    availablepoints: number;         // 이용가능한 포인터
    userspace: string;     // 할당공간
    createdate: Date;      // 생성일자
    phototype: string;     // 사진타입
    average: number;       // 평균타수
    handicap: number;      // 핸디캡
    distance: number;      // 거리
}
