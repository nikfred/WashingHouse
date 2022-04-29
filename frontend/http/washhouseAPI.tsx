import {$authHost, $host} from "./index";

export const fetchAllServices = async () => {
    const {data} = await $host.get('api/service/all')
    return data
}

export const createService = async (service) => {
    const {data} = await $authHost.post('/api/service', service)
    return data
}

export const removeService = async (id) => {
    const {data} = await $authHost.delete('/api/service/' + id)
    return data
}

export const updateService = async (id, {name, price}) => {
    const {data} = await $authHost.put('/api/service/' + id, {name, price})
    return data
}

export const createWashhouse = async (washhouse) => {
    const {data} = await $authHost.post('/api/washhouse', washhouse)
    return data
}

export const fetchAllWashhouses = async () => {
    const {data} = await $host.get('api/washhouse/all')
    return data
}

export const fetchOneWashhouse = async (id) => {
    const {data} = await $host.get('api/washhouse/' + id)
    return data
}

export const removeWashhouse = async (id) => {
    const {data} = await $authHost.delete('/api/washhouse/' + id)
    return data
}

export const updateWashhouse = async (id, washhouse) => {
    const {data} = await $authHost.put('/api/washhouse/' + id, washhouse)
    return data
}

export const updateWashhouseServices = async (id, {add, remove}) => {
    const {data} = await $authHost.put('/api/washhouse/services/' + id, {add, remove})
    return data
}


