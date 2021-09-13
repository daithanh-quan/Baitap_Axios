/**
 * B1: tạo class user(id, account, name, password, email, kind, language, description, img)
 * B2: tạo class userServices, lấy dữ liệu từ json
 * B3: method getListUser() in userServices -> tạo hàm renderTable() --> render ra UI
 * B4: method addUser() in userServices -> tạo hàm handleAddUser(), các property của user được gán bằng input value -> renderTable()--> render ra UI
 * B5: method seeUser() in userServices -> tạo hàm handleSeeUser(), hiện các giá trị user lên modal
 * B6: method updateUser() in userServices -> tạo hàm handleUpdateUser(), cập nhập lại giá trị và render lại ra UI
 * B7: method deleteUser() in userServices -> tạo hàm handleDelete(), xóa phần tử, render lại UI
 * B8: tạo biến newArrayListUsers = [], push các giá trị từ response.data vào ->  tạo hàm handleSearch -> tìm kiếm tài khoản --> in ra ui
 */

var infoUsers = new UserServices()
var isValid = new Validations()
var newArrayListUsers = []
//hàm lấy element
function getELE(value) {
  return document.querySelector(value)
}
//hàm danh sách user
function listUser() {
  infoUsers.getListUser()
    .then((response) => {
      newArrayListUsers = response.data
      renderTable(newArrayListUsers)
    })
    .catch((error) => {
      console.log(error);
    })
}
listUser()
// hàm render ra UI
function renderTable(listItem) {
  let html = listItem.map((item) => {
    return `
      <tr>
          <td>${item.id}</td>
          <td>${item.taiKhoan}</td>
          <td>${item.matKhau}</td>
          <td>${item.hoTen}</td>
          <td>${item.email}</td>
          <td>${item.ngonNgu}</td>
          <td>${item.loaiND}</td>
          <td>
            <button class = "btn btn-danger" onclick="handleDelete(${item.id})">Xóa</button>
            <button class = "btn btn-info btn-see" onclick="handleSeeUser(${item.id})" data-target="#myModal" data-toggle="modal">Xem</button>
          </td>
      </tr>
    `
  })
  getELE('#tblDanhSachNguoiDung').innerHTML = html.join('')
}
//hàm validation 
function handleCheckValidation() {

  let name = getELE('#HoTen').value
  let pass = getELE('#MatKhau').value
  let email = getELE('#Email').value
  let img = getELE('#HinhAnh').value
  let kind = getELE('#loaiNguoiDung').value
  let language = getELE('#loaiNgonNgu').value
  let description = getELE('#MoTa').value
  let isValue = true


  isValue &= isValid.checkEmpty(name, getELE('#txtHT'), "Trường này không được để trống!!") && isValid.checkName(name, getELE('#txtHT'), "Trường này không đúng định dạng!!")
  isValue &= isValid.checkEmpty(pass, getELE('#txtMK'), "Trường này không được để trống!!") && isValid.checkPass(pass, getELE('#txtMK'), "Trường này có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6 - 8 kí tự")
  isValue &= isValid.checkEmpty(email, getELE('#txtEmail'), "Trường này không được để trống!!") && isValid.checkEmail(email, getELE('#txtEmail'), "Trường này không đúng định dạng email!!")
  isValue &= isValid.checkEmpty(img, getELE('#txtHA'), "Trường này không được để trống!!")
  isValue &= isValid.checkKind('loaiNguoiDung', kind, getELE('#txtND'), "Phải chọn loại người dùng!!")
  isValue &= isValid.checkKind('loaiNgonNgu', language, getELE('#txtNN'), "Phải chọn loại ngôn ngữ !!")
  isValue &= isValid.checkEmpty(description, getELE('#txtMT'), "Trường này không được để trống!!") && isValid.checkDescription(description, getELE('#txtMT'), "Không vượt quá 60 kí tự!!")
  return isValue
}
//hàm kiểm tra validation account
function checkValidAccount() {
  let isAccount = true
  let account = getELE('#TaiKhoan').value
  isAccount = isValid.checkEmpty(account, getELE('#txtTK'), 'Trường này không được để trống!!') && isValid.checkAccount(account, getELE('#txtTK'), 'Tài Khoản này bị trùng!!', newArrayListUsers)
  return isAccount
}
checkValidAccount()


// hàm thêm user
function handleAddUser() {
  //tạo biến và lấy các giá trị từ modal khi click
  let account = getELE('#TaiKhoan').value
  let name = getELE('#HoTen').value
  let pass = getELE('#MatKhau').value
  let email = getELE('#Email').value
  let img = getELE('#HinhAnh').value
  let kind = getELE('#loaiNguoiDung').value
  let language = getELE('#loaiNgonNgu').value
  let description = getELE('#MoTa').value

  let isValidForm = handleCheckValidation()
  let isValidAccount = checkValidAccount()
  if (isValidForm && isValidAccount) {
    let newUsers = new User(account, name, pass, email, kind, language, description, img)
    infoUsers.addUser(newUsers)
      .then((response) => {
        ResetForm()
        getELE('.modal-header .close').click()
        listUser()
        setTimeout(() => {
          alert('Thêm người dùng thành công')
        }, 500)
      })
      .catch((error) => {
        console.log(error);
      })
  }

}
getELE('#btnThemNguoiDung').addEventListener('click', () => {
  getELE('.modal-footer').innerHTML = `
    <button class="btn btn-success" onclick="handleAddUser()" >Thêm Người Dùng</button>
  `
})

//hàm xem user

function handleSeeUser(id) {
  infoUsers.seeUser(id)
    .then((response) => {
      let { id, taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh } = response.data
      getELE('#TaiKhoan').value = taiKhoan
      getELE('#TaiKhoan').disabled = true
      let txtMessage = document.querySelectorAll('.form-group span')
      txtMessage.forEach(item => {
        item.innerHTML = ''
      })
      getELE('#HoTen').value = hoTen
      getELE('#MatKhau').value = matKhau
      getELE('#Email').value = email
      getELE('#HinhAnh').value = hinhAnh
      getELE('#loaiNguoiDung').value = loaiND
      getELE('#loaiNgonNgu').value = ngonNgu
      getELE('#MoTa').value = moTa
      getELE('.modal-footer').innerHTML = `
    <button class="btn btn-success" onclick="handleUpdateUser('${id}')" >Cập Nhập</button>
  `
    })
    .catch((error) => {
      console.log(error);
    })

}

//hàm cập nhâp

function handleUpdateUser(id) {
  let account = getELE('#TaiKhoan').value
  let name = getELE('#HoTen').value
  let pass = getELE('#MatKhau').value
  let email = getELE('#Email').value
  let img = getELE('#HinhAnh').value
  let kind = getELE('#loaiNguoiDung').value
  let language = getELE('#loaiNgonNgu').value
  let description = getELE('#MoTa').value
  let isValidForm = handleCheckValidation()
  if (isValidForm) {
    let newUsers = new User(account, name, pass, email, kind, language, description, img)
    infoUsers.updateUser(newUsers, id)
      .then((response) => {
        listUser()
        getELE('.modal-header .close').click()
        setTimeout(() => {
          alert('Cập nhập thành công')
        }, 500)
        setTimeout(() => {
          success(id)
        }, 700)
      })
      .catch((error) => {
        console.log(error);
      })
  }

}
// hàm xóa người dùng

function handleDelete(id) {
  infoUsers.deleteUser(id)
    .then((response) => {
      listUser()
      getELE('.modal-header .close').click()
    })
    .catch((error) => {
      console.log(error);
    })
}
// hàm reset form 
function ResetForm() {
  getELE('#TaiKhoan').disabled = false
  let forms = document.querySelectorAll('.form-group .form-control')
  forms.forEach(item => {
    item.value = ''
  })
  let txtMessage = document.querySelectorAll('.form-group span')
  txtMessage.forEach(item => {
    item.innerHTML = ''
  })
}

getELE('#btnThemNguoiDung').addEventListener('click', ResetForm)
// hàm tìm kiếm người dùng
function handleSearch() {
  let key = getELE('input[placeholder="Nhập từ khóa"]').value.trim().toLowerCase()
  let newListUser = []
  newArrayListUsers.map((item) => {
    let lowerAccount = item.taiKhoan.trim().toLowerCase()
    let result = lowerAccount.indexOf(key)
    if (result < 0) return
    newListUser.push(item)
  })
  renderTable(newListUser)
}
getELE('#basic-addon2').addEventListener('click', handleSearch)


// hàm xử lý oninput
function handleOninput(txtMessage, input) {
  let txtMessages = getELE(txtMessage)
  let inputForm = getELE(input)
  inputForm.oninput = () => {
    if (txtMessages.innerHTML !== '') {
      txtMessages.innerHTML = ''
    }
  }
}

handleOninput('#txtTK', '#TaiKhoan')
handleOninput('#txtHT', '#HoTen')
handleOninput('#txtMK', '#MatKhau')
handleOninput('#txtEmail', '#Email')
handleOninput('#txtHA', '#HinhAnh')
handleOninput('#txtND', '#loaiNguoiDung')
handleOninput('#txtNN', '#loaiNgonNgu')
handleOninput('#txtMT', '#MoTa')
// hàm tìm vị trí
function findIndex(id) {
  let i = -1
  newArrayListUsers.map((item, index) => item.id === id ? i = index : i)
  return i
}


// hàm xác định số thứ tự dc cập nhập thành công

function success(id) {
  let index = findIndex(id)
  let tdELE = document.querySelectorAll('tr')
  tdELE[index + 1].style.backgroundColor = '#a0efb199'
  setTimeout(() => {
    tdELE[index + 1].style.backgroundColor = 'transparent'
  }, 5000)
}