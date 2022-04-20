import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, firstname, lastname) => {
    const {data} = await $host.post('api/user/registration', {email, password, firstname, lastname})
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    return jwt_decode(data.accessToken)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    console.log(data)
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    return jwt_decode(data.accessToken)
}

export const check = async () => {
    const refreshToken = localStorage.getItem('refreshToken')?.toString() || ""
    const {data} = await $host.post('api/user/refresh', {refreshToken})
    console.log(data)
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    return jwt_decode(data.accessToken)
}

export const fetchUser = async () => {
    const {data} = await $authHost.get('api/user')
    console.log(data)
    return data
}

export const logout = async () => {
    localStorage.removeItem('refreshToken')
    const refreshToken = localStorage.getItem('refreshToken')?.toString() || ""
    const response = await $authHost.post('api/user/logout', {refreshToken})
    localStorage.removeItem('accessToken')
    console.log(response)
    return response
}

export const updateUser = async (user) => {
    const {data} = await $authHost.put('api/user', user)
    return data
}

export const createOrder = async ({washhouse_id, services}) => {
    const {data} = await $authHost.post('api/order/',{washhouse_id, services})
    return data
}

export const fetchOrder = async (id) => {
    const {data} = await $authHost.get('/api/order/' + id)
    return data
}

export const fetchAllOrders = async () => {
    const {data} = await $authHost.get('/api/order/all')
    return data
}

export const fetchOrderAdmin = async (id) => {
    const {data} = await $authHost.get('/api/order/admin/' + id)
    return data
}

export const fetchAllOrdersAdmin = async () => {
    const {data} = await $authHost.get('/api/order/admin/all')
    return data
}

export const completeOrder = async (id) => {
    const {data} = await $authHost.put('/api/order/complete/' + id)
    return data
}

export const readyOrderAdmin = async (id) => {
    const {data} = await $authHost.put('/api/order/admin/ready/' + id)
    return data
}

export const completeOrderAdmin = async (id) => {
    const {data} = await $authHost.put('/api/order/admin/complete/' + id)
    return data
}

export const cancelOrderAdmin = async (id, reason) => {
    const {data} = await $authHost.put('/api/order/admin/cancel/' + id, {reason})
    return data
}

export const removeServiceInOrderAdmin = async (id, services) => {
    const {data} = await $authHost.put('/api/order/admin/services/' + id, {services})
    return data
}

export const updateOrderInfo = async (id, total, date) => {
    const {data} = await $authHost.put('/api/order/admin/info/' + id, {total, date})
    return data
}





