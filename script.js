//Brynn Jacobi
//Fall 2021
//Web233 Javascript
//Date: 10-31-21
//Assignment #12

var MyItems = {
  name:"",
  price:""
};

var shoppinglist = [];
var addtocart = [];

function savecookie(){
  delete_cookie('jacobilist');
    var date = new Date();
    date.setTime(date.getTime() + Number(365) * 3600 * 1000);
    document.cookie = 'jacobilist' + "=" + escape(shoppinglist.join(',')) + "; path=/;expires = " + date.toGMTString();
}

function readCookie(name){
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++){
    var c = ca[i];
    while (c.charAt(0) == '') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function delete_cookie(name){
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function savecookie(){
  delete_cookie('jacobilist');
  var date = new Date();
  date.setTime(date.getTime() + Number(365) * 3600 * 1000);
  document.cookie = 'jacobilist' + '=' + escape(shoppinglist.join(';')) + "; path=/;expires = " + date.toGMTString();
}

window.onload = function(){
  populateshoppinglistonload();
    displayShoppinglists();
}

function populateshoppinglistonload(){
  shoppinglist = [];
  addtocart = [];
  var y = readCookie('jacobilist');
  y = remove_unwanted(y);
  y = y.split('%2C');
  if (y) {
    shoppinglist = y;
  }
}

function remove_unwanted(str) {
  if ((str===null) || (str===""))
    return false;
  else 
    str = str.toString();
    str = str.replace(/%20/g,"");
    str = str.replace(/%24/g, "$");
    str = str.replace(/%7C/g, " | ");
    return str.replace(/[^\x20-\x7E]/g, "");
}

function addShoppinglist(item, cost){
  var groc = "";
  var count = 0;
  MyItems.name = item;
  MyItems.price = cost;
  for (var x in MyItems){
    if (count === 1){
      groc += "$";
    }
    groc += MyItems[x];
    if (count === 0){
      groc += " | ";
    }
    count++;
  }
  shoppinglist.push(groc);
  displayShoppinglists();
  clearFocus();
}
function clearFocus(){
  document.getElementById("item").value = "";
  document.getElementById("cost").value = "";
  document.getElementById("item").focus();
}
function displayShoppinglists(){
  var TheList = "";
  var arrayLength = shoppinglist.length;
  for (var i = 0; i < arrayLength; i++){   
    var btndelete = ' <input class="button" name="delete" type="button" value="Remove Item" onclick="deleteShoppinglists(' + i + ')" />';
    var btnupdate = ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppinglists(' + i + ')" />';
    var arrays = shoppinglist[i];
    arrays = "'"+arrays+"'";
    var btnaddcart = ' <input class="button" name="add" type="button" value="Add to Shopping Cart" onclick="addtoshopcart('+arrays+',' + i + ')" />';
    TheList = TheList + shoppinglist[i] + btndelete + btnupdate + btnaddcart + '<br>';
  }
  document.getElementById("MyList").innerHTML = 'Shopping List' + '<br>' + TheList;
}

function displayShoppingCart(){
  var TheList = "";
  var TheRow = "";
  var arrayLength = addtocart.length;
  for (var i = 0; i < arrayLength; i++){
    var btndelete = ' <input class="button" name="delete" type="button" value="Remove Item" onclick="deleteShoppingCart(' + i + ')" />';
  //  var btnupdate = ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppingCart(' + i + ')" />';
    var arrays = addtocart[i];
    arrays = "'"+arrays+"'";
    var btnaddlist = '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping List" onclick="addbacktoshoppinglist('+arrays+',' + i + ')" checked="checked"/>Add</label>';
    TheRow =  "<li>" + addtocart[i] + btndelete + ' ' +  ' ' + btnaddlist + '<br></li>';
    TheList += TheRow;
  }
  if (arrayLength > 0){
    document.getElementById("MyCart").innerHTML = 'Shopping Cart ' + '<br><ul>' + TheList + '</ul>';
  }else{
    document.getElementById("MyCart").innerHTML = '';
    }
  }


function deleteShoppinglists(position){
  shoppinglist.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
}

function deleteShoppingCart(position){
  addtocart.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
}

function changeShoppinglists(position) {
  //ducument.getElementById("MyList").innerHTML = shoppinglist[position];
  var arrays = shoppinglist[position];
  arrays = arrays.split(",");
    var e1 = arrays[0];
    var e2 = arrays[1];
  var ReplacedAmount = e2.replace(/\$/g,'');
    var eitem = prompt("Please enter a new item", e1);
    var ecost = prompt("Please enter your name", ReplacedAmount);
    shoppinglist[position] = eitem + "," + '$' + ecost;
    displayShoppinglists();
    displayShoppingCart();
    savecookie();
}

function changeShoppingCart(position) {
  document.getElementById("MyCart").innerHTML = shoppinglist[position];
  var arrays = addtocart[position];
  arrays = arrays.split(",");
    var e1 = arrays[0];
    var e2 = arrays[1];
  var ReplacedAmount = e2.replace(/\$/g,'');
    var eitem = prompt("Please enter new item", e1);
    var ecost = prompt("Please enter your name", ReplacedAmount);
    addtocart[position] = eitem + "," + '$' + ecost;
    displayShoppinglists();
    displayShoppingCart();
    savecookie();
}

function addbacktoshoppinglist(item, num) {
  deleteShoppingCart(num);
  shoppinglist.push(item);
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
  clearFocus();
}

function addtoshopcart(item, num){
  deleteShoppinglists(num);
  addtocart.push(item);
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
  clearFocus();
}











//function changeShoppinglist(position, newValue){
//  shoppinglist[position] = newValue;
//  displayShoppinglists();
//}

//displayShoppinglists();

//function addShoppinglistitem(){
//  shoppinglist.push('add new item 4');
//}

//addShoppinglistitem();
//displayShoppinglists();
//addShoppinglist('add new item 5');

//changeShoppinglist(0, 'changed item 1');

//addShoppinglist('add new item 6');
//changeShoppinglist(5, 'changed item 6');
//deleteShoppinglists(5);