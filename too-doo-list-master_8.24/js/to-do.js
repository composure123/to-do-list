'use strict()';

//

var oDate = document.getElementById('checkDate');  //获取选择的日期值
var list      = document.getElementById('todo-items');//添加to do list列表id号，
var itemInput = document.getElementById('todo-add-new');//文本输入方框id号，getElementById() 方法可返回对拥有指定 ID 的第一个对象的引用
var toDoObjects = [];



var inputNum=0;

var addToDo = function() {
	  var todo = {
		text: itemInput.value,//text为选项框输入值
		text1:oDate.value,//text1为日期值
		status: 'incomplete',
		id: generateId()
	  };

	  addToDoToDom(todo);//调用函数，参数为todo
	  addToDoToStorage(todo);//保存数据到本地
};

// var 变量 = function(参数1,参数2),这种为匿名函数,实际与传统函数一样
//增加表单函数
var addToDoToDom = function(todo) {
	let lis=document.getElementsByTagName("li");	//新增<li>标签的id
	// document.createElement()是在对象中创建一个对象,要与appendChild() 或 insertBefore()方法联合使用
	// appendChild() 方法在节点的子节点列表末添加新的子节点。insertBefore() 方法在节点的子节点列表任意位置插入新的节点
  var item  = document.createElement('li');
  var listLength  = list.children.length;//children.length只计算list（即id='‘'todo-items')的节点数量
  //********************此部分控制表单增加、删除等等***********************************************************
  // '<label class="todo__text"><input type="checkbox" id="too-doo-check_' + todo.id + '"'调试时建立表单的信息
  //input type="checkbox" ，为调试时，表单上的单选项方框
  var itemText    = '<label class="todo__text"><input type="checkbox"  name="item1" id="too-doo-check_' + todo.id + '"';
  if (todo.status === 'complete') {
    itemText += 'checked=checked';
  }
  //**********************************todo.text1为选中的日期************************************
  itemText += '/><span class="px1">' +'时间：' + todo.text1 + '  事项：'+ todo.text + '</span></label>';
  
  //调试时，表单上显示“x”形状的删除代码
  var itemAction  = '<span class="todo__remove"><button type="button" class="btn btn--icon" id="button-' + todo.id + '"><i class="icon icon--remove"></i></button></span>';

  item.innerHTML = itemText + itemAction;//将新建表单显示出来
  item.id = 'too-doo_' + (listLength + 1);
  item.classList.add('todo__item');
		// 加一个指定名称和治的新属性，或者把一个现有属性设定为指定的值
		// elementNode.setAttribute(name,value)
		// 说明：1.name：要设置的属性名	2.value:要设置的属性值  
  item.setAttribute('data-status', todo.status);
  item.setAttribute('data-id', todo.id);
  list.insertBefore(item,lis[0]);//从列表上端插入表单
  // list.appendChild(item);
  itemInput.value = '';
};





var addToDoToStorage = function(todo) {
  toDoObjects.push(todo);
  
  //将toDoObjects值存储到本地
  localStorage.setItem('toDoObjects', JSON.stringify(toDoObjects));
};

var loadToDosFromStorage = function() {
  var str = localStorage.getItem('toDoObjects');
  if (str) {
    toDoObjects = JSON.parse(str);
  }

  // construct dom html from toDoObjects
  for (var i=0; i<toDoObjects.length; i++) {
    addToDoToDom(toDoObjects[i]);
  }
};

alert

var completeToDo = function(event) {
	// arget 事件属性可返回事件的目标节点（触发该事件的节点
  var check = event.target;//触发事件，触发到<li>标签内的选项框，则删除划线
  var toDo = check.closest('li');//
  
  // getAttribute() 方法返回指定属性名的属性值
  var toDoStatus = toDo.getAttribute('data-status');
  var toDoId = toDo.getAttribute('data-id');
   
	  if (toDoStatus === 'incomplete') {
		toDoStatus = 'complete';
	  } else {
		toDoStatus = 'incomplete';
	  }
		// 加一个指定名称和治的新属性，或者把一个现有属性设定为指定的值
		// elementNode.setAttribute(name,value)  说明：1.name：要设置的属性名	2.value:要设置的属性值	
  toDo.setAttribute('data-status', toDoStatus);

  for (var i = 0; i < toDoObjects.length; i++) {
    if (toDoObjects[i].id === toDoId) {
      toDoObjects[i].status = toDoStatus;
    }
  }
// 用localStorage.setItem()正确存储JSON对象方法是：
// 存储前先用JSON.stringify()方法将json对象转换成字符串形式
// JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串

  localStorage.setItem('toDoObjects', JSON.stringify(toDoObjects));//存储到本地
};


//删除操作
var removeToDo = function(event) {
  var button = event.target.closest('button');
  if(!button) {
    return false;
  }
  var toDo = button.closest('li');
  var toDoId = toDo.getAttribute('data-id');

  // 1. remove the li from the dom  从dom中删除li
  list.removeChild(toDo);
  // 2. remove the todo object with matching id from toDoObjects    2. 从toDoObjects中删除具有匹配id的todo对象
  for (var i = 0; i < toDoObjects.length; i++) {
    if (toDoObjects[i].id === toDoId) {
      toDoObjects.splice(i, 1);
    }
  }
  // 3. set toDoObjects into localStorage as JSON    将toDoObjects设置为JSON进入本地存储
  
  localStorage.setItem('toDoObjects', JSON.stringify(toDoObjects));
};



var validateToDo = function(event) {
  event.preventDefault();
  if(!itemInput.value) {
    document.getElementById('error').innerHTML = 'Please enter a value!';
  } else {
    addToDo();//调用函数
  }
};

var clearToDos = function(event) {
 // event.preventDefault();//preventDefault() 方法阻止元素发生默认的行为，这个 event 参数来自事件绑定函数）。
  window.localStorage.clear();//清除本地保存的所有变量和值
  location.reload();//刷新当前文档
  return false;
};
//获取id
var generateId = function() {
  var charSet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charSetSize = charSet.length;
  var charCount = 8;
  var id = '';
    for (var i = 1; i <= charCount; i++) {
        var randPos = Math.floor(Math.random() * charSetSize);
        id += charSet[randPos];
    }
    return id;
}

// document.getElementById('clear-todos').addEventListener('click', clearToDos, false);//全部清除

document.getElementById('btn-submit').addEventListener('click', validateToDo, false);//增加变量

itemInput.onkeydown = function(event) {
  if(event.keyCode == 13) {
    validateToDo(event);
    return false;
  }
};

var toDoHandlers = function() {
/////element.addEventListener(event, function, useCapture)解析。
//event字符串，指定事件名；function指定要事件触发时执行的函数。 useCapture 布尔值，指定事件是否在捕获或冒泡阶段执行
  list.addEventListener('change', completeToDo, false);
  list.addEventListener('click', removeToDo, false);
};

window.onload = function(){//onload 通常用于 <body> 元素，在页面完全载入后(包括图片、css文件等等。)执行括号内脚本代码
  toDoHandlers();
};

loadToDosFromStorage();






	//全选
	function checkAll(c){

		var status = c.checked;//复选框选中状态检查
		var oItems = document.getElementsByName('item1');
		// var oItems = document.getElementsByClassName("todo__item");
		for(var i=0;i<oItems.length;i++){
			oItems[i].checked=status;

		}

		//*************************************************************************************
		// var check = document.getElementsByTagName("li");//event.target 属性返回哪个 DOM 元素触发了事件
		 var check = event.target;//event.target 属性返回哪个 DOM 元素触发了事件
		var toDo = check.closest('ol');
		  
		   // var toDo = document.getElementsByTagName("li");
		  // getAttribute() 方法返回指定属性名的属性值
		  var toDoStatus = toDo.getAttribute('data-status');
	
		  var toDoId = toDo.getAttribute('data-id');
		   
			if (toDoStatus == 'complete') {
					toDoStatus = 'incomplete';
			} else {
					toDoStatus = 'complete';
			}
		
				// 加一个指定名称和治的新属性，或者把一个现有属性设定为指定的值
				// elementNode.setAttribute(name,value)  说明：1.name：要设置的属性名	2.value:要设置的属性值	
		  toDo.setAttribute('data-status', toDoStatus);
		//匹配id号
		  for (var i = 0; i < toDoObjects.length; i++) {
		    if (toDoObjects[i].id === toDoId) {
		      toDoObjects[i].status = toDoStatus;
			  
		    }
		  }
		// 用localStorage.setItem()正确存储JSON对象方法是：
		// 存储前先用JSON.stringify()方法将json对象转换成字符串形式
		// JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串
		
		  localStorage.setItem('toDoObjects', JSON.stringify(toDoObjects));//存储到本地
		  //////////////////////////////////////////////////////

	}
	
	
	//delAll功能
	function delAll(){
		// var toDo = document.getElementsByTagName("ol");

		var check = event.target;//event.target 属性返回哪个 DOM 元素触发了事件
		var toDo = check.closest('ol');
		
		var toDoStatus = toDo.getAttribute('data-status');
		

		 
		if (toDoStatus == 'complete') {	
			if(inputNum == 0){
					alert("                请再按一次【删除】键                      ");
					inputNum +=1;
					}
					else if(inputNum == 1){
						alert("              已删除！          ");
						inputNum=0;
					}
					
			
		document.getElementById('clear-todos').addEventListener('click', clearToDos, true);//删除操作

		
		}
		else{
			alert("Error！请您全选后，再执行删除操作！")
			}

	
	
	}
	
	
