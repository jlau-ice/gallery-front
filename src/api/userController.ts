// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** addUser POST /api/user/add */
export async function addUserUsingPost(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** deleteUser POST /api/user/delete */
export async function deleteUserUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/user/delete', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** getUserById GET /api/user/getUserById */
export async function getUserByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUser_>('/api/user/getUserById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** getUserLogin GET /api/user/getUserLogin */
export async function getUserLoginUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserLoginVO_>('/api/user/getUserLogin', {
    method: 'GET',
    ...(options || {}),
  })
}

/** getUserVoById GET /api/user/getUserVoById */
export async function getUserVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserVoByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVO_>('/api/user/getUserVoById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** getUserList POST /api/user/list */
export async function getUserListUsingPost(
  body: API.UserQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUserVO_>('/api/user/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserLoginVO_>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  })
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** updateUser POST /api/user/update */
export async function updateUserUsingPost(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseString_>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
