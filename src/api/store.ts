import { writable, Writable } from 'svelte/store';
import type { Resource } from './resource'
import type { ApiEndpoint } from './endpoint'
import type { Subscriber, Updater, Invalidator, Unsubscriber } from './svelte'


export class ApiStore<T extends Resource> implements Writable<Record<number, Writable<T>>> {
    constructor(init: T[], public endpoint: ApiEndpoint<T>) {
        const { update, subscribe, set } = writable<Record<number, Writable<T>>>(null)
        this.update = update
        this.subscribe = subscribe
        this.set = set
    }

    async init() {
        const response = await this.endpoint.getMany()
        console.log('response: ',response)
        const responseMap = Object.fromEntries(response.map(entry => [
            entry.id,
            writable(entry)
        ]))
        this.endpoint.nextId = response.length + 1

        this.trackEntities(responseMap)
    }

    subscribe(run: Subscriber<Record<number, Writable<T>>>, invalidate?: Invalidator<Record<number, Writable<T>>>): Unsubscriber { return null }
    set(value: Record<number, Writable<T>>): void { }
    update(updater: Updater<Record<number, Writable<T>>>): void { }

    add(value: T): void {
        console.log('[Store] Start adding')
        const response = this.endpoint.add(value)

        const store = writable(response)
        const foo = {}
        foo[response.id] = store

        console.log('Change: ', response)

        this.trackEntities(foo)
        this.update(all =>
            Object.assign({}, all, foo)
        )
    }

    remove(id: number) {
        this.update(all => {
            delete all[id]
            return all
        })
    }

    trackEntities(entities: Record<number, Writable<T>>): void {
        for (const [id, entry] of Object.entries(entities))
            entry.subscribe(value => this.endpoint.update(value))
    }
}