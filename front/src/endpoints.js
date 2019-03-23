const BASE_PUBLIC = "/public";

const GET_USERS = BASE_PUBLIC + '/users'
const GET_USER = (id) => BASE_PUBLIC + `/user/${id}`


export default {
  GET_USERS,
  GET_USER
}