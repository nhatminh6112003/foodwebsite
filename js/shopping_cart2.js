function sweet_alert(){
    swal({
      title: "Thêm vào giỏ hàng thành công",
      text: "",
      icon: "success",
    });
  }
  let btn=document.querySelectorAll('.btn');
  btn.forEach(function(e){
   
    e.addEventListener('click',()=>{
      sweet_alert();
    })
  })
  
  //shopping_cart
  var tbody=document.querySelector('#tbody1')
  const emptyCartMessage = document.createElement('div');
  let icon_love=document.querySelectorAll('.icon_love');
  icon_love.forEach(function(e){
    e.addEventListener('click',(e2)=>{
    let nut_love=e2.target;
    e2.preventDefault();
    nut_love.classList.toggle('active')
    })
  })
  emptyCartMessage.innerHTML = `<img src="./images/empty-cart.jpg" alt="">`;
  
  // EMPTY CART ITEM DISPLAY MESSAGE
  tbody.appendChild(emptyCartMessage);


 btn.forEach(function(button){
   button.addEventListener('click',(e)=>{
    var btnItems = e.target
    var product =btnItems.parentElement;
    var img_food=product.querySelector('.img_food').src;
    var title_product = product.querySelector('.title_product').innerHTML;
 
    var price_product=product.querySelector('.price_product').innerText;
   
    addcart(product,img_food,title_product,price_product)
   
   })
  })


function addcart(product,img_food,title_product,price_product){
    var addtr = document.createElement('tr');
    var cartItem = document.querySelectorAll('tbody tr');
    var cartTable = document.querySelector('tbody');
    var tongtien=document.querySelector('.tongtien')
    var no_products=document.querySelector('.no_products')
    var count_product2=document.querySelector('.count_product');
    addtr.innerHTML = `   <tr>
    <td><img src="${img_food}"width="100px" alt=""></td>
    <td><h1 class="title">${title_product}</h1></td>
    <td><p><span class="price_in_cart">${price_product}</span><span>$</span></p></td>
    <td>       
    <div class="wrap_input_value">
    <form action=""onsubmit="return false">
    <input type="button"class="minus    " value="-" />
    <input type="text" name="quantity"class="quantity_product" value="1" maxlength="2"  size="1" id="number" />
    <input type="button" class="add" value="+" />
    </form>
     </div>
        </td>
    <td style="cursor:pointer;text-align: center;" class="delete">Xóa</td>
</tr>`


  
//check tên trùng nhau
              
for (var i = 0; i < cartItem.length; i++) {
var soLuongTrongGio = cartItem[i].querySelector('.quantity_product');
var soLuongTrongGioVeSo = parseInt(soLuongTrongGio.value);
var soLuongDat = 1
var productT = document.querySelectorAll('.title')

if (productT[i].innerHTML ===title_product) {
  soLuongDat += soLuongTrongGioVeSo;  
  soLuongTrongGio.value = soLuongDat           
  cartTotal();
   return
}
}

//thêm sản phẩm vào trong giỏ hàng
cartTable.append(addtr);

//xóa sản phẩm khỏi giỏ hàng
delete_cart();

//tỉnh tổng đơn hàng
cartTotal();

//check số lượng thay đổi
inputChange();
//Tăng giá trị
incrementValue();
//Giảm giá trị
decrementValue();
//Kiểm tra số 0 ở đầu hay không
validate()
//
count_product()

//Xóa ảnh giỏ hàng trống
emptyCartMessage.className = 'hide-empty-cart';

}

function delete_cart() {
    var addtr = document.createElement('tr');
    var cartItem = document.querySelectorAll('tbody tr');
    const currentCartItems = document.getElementsByClassName('quantity_product');
    var count_product=document.querySelector('.count_product');

    for (var i = 0; i < cartItem.length; i++) {
        var productT=document.querySelectorAll('.delete');
      
           productT[i].addEventListener('click',(e)=>{
               var cartDelete=e.target;
              var cartItem= cartDelete.parentElement;
              cartItem.remove();
              cartTotal()
              count_product.innerHTML=currentCartItems.length;
                //Kiểm tra trong giỏ hàng có bao nhiêu sản phẩm nếu =0 thì thông báo giỏ hàng trống
              if (currentCartItems.length <= 0) {
                emptyCartMessage.classList.remove('hide-empty-cart');              
              }
         

           })
         
         
        }
     
}


function cartTotal() {

    var cartItem = document.querySelectorAll('tbody tr')

    var totalB = 0
    var kt = 0
    var tongtien=document.querySelector('.tongtien')
    for (var i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector('.quantity_product').value 
        var gia = cartItem[i].querySelector(".price_in_cart").innerHTML
        total = (Number(inputValue) * gia);   
        totalB += total
        tongtien.innerHTML = 'Total:' + totalB.toLocaleString('de-DE') + '$'
        kt++
    }
    if(kt==0){
      tongtien.innerHTML = ''
    }
    

}
// function inputChange() {



//   var cartItem = document.querySelectorAll('tbody tr')
//   for (var i = 0; i < cartItem.length; i++) {
//       var inputValue = cartItem[i].querySelector(".quantity_product")
//       console.log(inputValue);
//     const currentCartItems = document.getElementsByClassName('quantity_product');



//       inputValue.addEventListener("input", function (e) {
//           var change_value = Number(e.target.value);
//         console.log(change_value);
//           var xoa=e.target.parentElement.parentElement.parentElement.parentElement;
//           if(change_value===0){
       
//             var chon = confirm('Do you want to delete this product?');      
//             if(chon){       
//              xoa.remove()
//             cartTotal();
//             if (currentCartItems.length <= 0) {
//               emptyCartMessage.classList.remove('hide-empty-cart');              
//             }
//             }
//             else{
//               e.target.value=1;
//               e.preventDefault();
//             }
//           }
//           cartTotal()
//       })
//   }
// }





    function inputChange(){
let input = document.querySelectorAll('.quantity_product')
    const currentCartItems = document.getElementsByClassName('quantity_product');

      for(var i = 0; i < input.length; i++){
        input[i].addEventListener("input",(e)=>{
          
          var change_value = Number(e.target.value); 
          cartTotal()
      })
      }

    
    }

    //Tăng giá trị
function incrementValue()
{

 

let addButtonArr = document.getElementsByClassName('add');



for(let addButton of addButtonArr){

    addButton.onclick = () => { 
        let currentInputBox = addButton.previousElementSibling;
        currentInputBox.value =  parseInt(currentInputBox.value) + 1;
        console.log(currentInputBox.value );
        if(currentInputBox.value.includes(NaN)){
          currentInputBox.value=1
        }
        cartTotal()
    }
}

  
   
}
//Giảm giá trị
function decrementValue()
{
    let deductBtnArr = document.querySelectorAll('.minus');
    const currentCartItems = document.getElementsByClassName('quantity_product');
    let gia=document.querySelectorAll('.price_in_cart');
    var tongtien=document.querySelector('.tongtien')
    

    deductBtnArr.forEach(function(btn) {
      btn.onclick=(e) => {
        var xoa=e.target.parentElement.parentElement.parentElement.parentElement;
        let currentInputBox=btn.nextElementSibling;
         currentInputBox.value =  parseInt(currentInputBox.value) - 1;    
          cartTotal()
            if(currentInputBox.value <=0){
              var chon = confirm('Do you want to delete this product?');      
              if(chon){       
               xoa.remove()
              cartTotal();  
              if (currentCartItems.length <= 0) {
                emptyCartMessage.classList.remove('hide-empty-cart');   
           
              }
              }
              else{
                currentInputBox.value=1;
              cartTotal();  

              }                   
            }
            }
           
    })
    // for(let deductBtn of deductBtnArr ){
       
    //     deductBtn.onclick = () => {
    //         let currentInputBox = deductBtn.nextElementSibling;
    //         currentInputBox.value =  parseInt(currentInputBox.value) - 1;
    //     }
    // }
    
}
//kiem tra co so khong o dau hay khong và ngăn chặn nhập chữ
function validate(){
  var  validate_so_khong=  document.getElementsByClassName("quantity_product")

    for (var i = 0; i < validate_so_khong.length; i++){
      validate_so_khong[i].onkeypress=function(event){
        if (this.value.length == 0 &&   event.which == 48 )
       {
            event.preventDefault();
       }
    
        if ( !(  event.charCode >=48 &&   event.charCode<=57)) {
          event.preventDefault();
         }
       
     
       }
    }
}
function count_product(){
  var count_product=document.querySelector('.count_product');
  var cartItem = document.querySelectorAll('tbody tr');

  for(var i = 0; i <cartItem.length; i++) {
    count_product.innerHTML=cartItem.length
  }
}