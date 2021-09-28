import { Student } from '../student'
import type { Resource } from './resource'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class ApiEndpoint<T extends Resource> {
    public nextId: number

    constructor(public path: string) { }

    async getOne(id: number): Promise<T> {
        console.log(`Get to ${this.path}/${id}`)
        return null
    }

    async getMany(): Promise<T[]> {
        console.log(`Get to ${this.path}`)
        const response = await fetch(this.path)
        console.log(response)
        const raw = await response.json()
        console.log(raw)
        return raw.map(data => new Student(data))
    }

    async add(value: T): Promise<T> {
        console.log('[API] Adding: ', value)
        const response = await fetch(this.path, {
            method: 'POST',
            body: JSON.stringify(value)
        })
        return response.json()
    }

    async update(value: T): Promise<T> {
        console.log(`Put to ${this.path}/${value.id} with:`)
        console.dir(value)
        return value
    }
}