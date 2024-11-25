export class Employee {
    constructor(
        public id: number,
        public name: string,
        public dateOfBirth: Date,
        public alias?: string,
        public jobCategory?: string, 
    ) {

    }
}
