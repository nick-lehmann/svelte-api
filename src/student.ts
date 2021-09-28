import { ApiEndpoint, Resource, ApiStore } from './api';

export class Student extends Resource {
    id: number
    name: string
    age: number

    constructor(init: Student) { super(); Object.assign(this, init) }
}

const studentEndpoint = new ApiEndpoint<Student>('localhost:3000/students')

export const studentManager = new ApiStore<Student>(true, studentEndpoint)
