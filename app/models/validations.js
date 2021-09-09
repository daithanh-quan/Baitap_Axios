/**
 * B1: tạo class validations()
 * B2: phương thức checkEmpty(inputValue,spanID, message) // hàm kiểm tra trống
 * inputValue == '' ? false, spanID.innerHTML = message : true
 * B3: phương thức checkAccount(inputValue,spanID, message,array) // hàm kiểm tra trùng 
 * --tạo biến isAccount = false,isAccount = array.some(item => item.taiKhoan == inputValue)
 * -- isAccount == true ? spanID.innerHTMl = message , return isAccount
 * B4: phương thức checkName(inputValue,spanID, message)
 * --biến regex = new exp ("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$")
 * inputValue.match(regex) ? true : false, spanID.innerHTML = message
 * B5: checkPass(), tương tự như checkName() : regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/
 * B6: checkEmail() : regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
 * B7: checkKind(inputValue,spanID, message)
 * --tạo biến selectIn= document.getElementById(inputValue).selectedIndex
 * selectIn == "0" ? false, spanID.innerHTMl = message : true
 * B8 : checkDescription(inputValue,spanID, message)
 * inputValue.length>60 ? false, spanId.innerHTMl = message : true
 */

function validations() {
  this.checkEmpty = (inputValue, spanID, message) => {
    if (inputValue.trim() == "") {
      spanID.style.color = 'red'
      spanID.innerHTML = message
      return false
    } else {
      spanID.innerHTML = ''
      return true
    }
  }
  this.checkAccount = (inputValue, spanID, message, array) => {
    let isAccount = false
    isAccount = array.some(item => item.taiKhoan === inputValue)
    if (isAccount) {
      spanID.style.color = 'red'
      spanID.innerHTML = message
      return false
    } else {
      spanID.innerHTML = ''
      return true
    }

  }
  this.checkName = (inputValue, spanID, message) => {
    let regex = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$")
    if (inputValue.match(regex)) {
      spanID.innerHTML = ''
      return true
    } else {
      spanID.style.color = 'red'
      spanID.innerHTML = message
      return false
    }
  }
  this.checkPass = (inputValue, spanID, message) => {
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/
    if (inputValue.match(regex)) {
      spanID.innerHTML = ''
      return true
    } else {
      spanID.style.color = 'red'
      spanID.innerHTML = message
      return false
    }
  }
  this.checkEmail = (inputValue, spanID, message) => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (inputValue.match(regex)) {
      spanID.innerHTML = ''
      return true
    } else {
      spanID.style.color = 'red'
      spanID.innerHTML = message
      return false
    }
  }
  this.checkKind = (ELE, inputValue, spanID, message) => {
    let selectIn = document.getElementById(ELE).selectedIndex
    if (selectIn == '0' || inputValue == '') {
      spanID.style.color = 'red'
      spanID.innerHTML = message
      return false
    } else {
      spanID.innerHTML = ''
      return true
    }
  }
  this.checkDescription = (inputValue, spanID, message) => {
    if (inputValue.length > 60) {
      spanID.style.color = 'red'
      spanID.innerHTML = message
      return false
    } else {
      spanID.innerHTML = ''
      return true
    }
  }
}

