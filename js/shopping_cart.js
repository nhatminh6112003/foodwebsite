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
    addtr.innerHTML = `   <tr>
    <td><img src="${img_food}"width="100px" alt=""></td>
    <td><h1 class="title">${title_product}</h1></td>
    <td><p><span class="price_in_cart">${price_product}</span><span>$</span></p></td>
    <td>       
    <div class="wrap_input_value">
    <form action=""onsubmit="return false">
     <input onkeypress="return event.charCode >=48 && event.charCode<=57 "value="1"min="0" type="number"class="quantity_product">
    </form>
     </div>
        </td>
    <td style="cursor:pointer;text-align: center;" class="delete">Xóa</td>
</tr>`

//Xóa ảnh giỏ hàng trống
emptyCartMessage.className = 'hide-empty-cart';
  
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



}

function delete_cart() {
    var addtr = document.createElement('tr');
    var cartItem = document.querySelectorAll('tbody tr');
    const currentCartItems = document.getElementsByClassName('quantity_product');
    for (var i = 0; i < cartItem.length; i++) {
        var productT=document.querySelectorAll('.delete');
        

           productT[i].addEventListener('click',(e)=>{
               var cartDelete=e.target;
              var cartItem= cartDelete.parentElement;
          
              cartItem.remove();
              cartTotal()
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
        var inputValue = document.querySelector('.quantity_product').value
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
function inputChange() {
  var cartItem = document.querySelectorAll('tbody tr')
  for (var i = 0; i < cartItem.length; i++) {
      var inputValue = cartItem[i].querySelector("input")
    const currentCartItems = document.getElementsByClassName('quantity_product');
  
      
      inputValue.addEventListener("input", function (e) {
          var change_value = Number(e.target.value);
      
          var xoa=e.target.parentElement.parentElement.parentElement.parentElement;
          if(change_value===0){
            
            var chon = confirm('Do you want to delete this product?');      
            if(chon){       
             xoa.remove()
            cartTotal();
            if (currentCartItems.length <= 0) {
              emptyCartMessage.classList.remove('hide-empty-cart');              
            }
            }
            else{
              e.target.value=1;
              e.preventDefault();
            }
          }
          cartTotal()
      })
  }
}
