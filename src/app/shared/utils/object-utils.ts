export default class ObjectUtils {
    /**
     * object 내 key 값은 존재하나 value 값이 null 인 경우 비여 있음
     * @param obj 임의 object
     */
    static isEmpty(obj): boolean {
        if (obj === '' || obj === null || obj === undefined) { return true; }
        return Object.values(obj).every(x => (x === null || x === ''));
    }
    /**
     * object 내 key 값은 존재하나 value 값이 null 인 경우 비여 있지 않음
     * @param obj 임의 object
     */
    static isNotEmpty(obj): boolean {
        return !this.isEmpty(obj);
    }
}
