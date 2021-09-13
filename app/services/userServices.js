/**
 * B1: class userServices()
 * B2: tạo phương thức getListUser: url,method:'GET' // lấy danh sách user
 * B3: tạo phương thức addUser(item): url, method:'POST', data:item //thêm user vào danh sách
 * B4: tạo phương thức getUser(id): url, method:'GET', data:id // lấy từng user 
 * B5: tạo phương thức updateUser(item,id): url, method:'PUT', data:id // cập nhập lại info user
 * B6: tạo phương thức deleteUser(id): url, method:'DELETE', data:id //   xóa user
 */

function UserServices() {
  this.getListUser = () => {
    return axios({
      method: 'GET',
      url: 'https://613091748066ca0017fda94e.mockapi.io/listPeople'
    })
  }
  this.addUser = (item) => {
    return axios({
      method: 'POST',
      url: 'https://613091748066ca0017fda94e.mockapi.io/listPeople',
      data: item
    })
  }
  this.seeUser = (id) => {
    return axios({
      method: 'GET',
      url: `https://613091748066ca0017fda94e.mockapi.io/listPeople/${id}`,
      data: id
    })
  }
  this.updateUser = (item, id) => {
    return axios({
      method: 'PUT',
      url: `https://613091748066ca0017fda94e.mockapi.io/listPeople/${id}`,
      data: item
    })
  }
  this.deleteUser = (id) => {
    return axios({
      method: 'DELETE',
      url: `https://613091748066ca0017fda94e.mockapi.io/listPeople/${id}`,
    })
  }
}