		
		//获取模型
		var modal = document.getElementById('id01');
		
		
		//鼠标点击模型外区关闭登录框
		//event.target触发事件
		//target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口
		window.onclick = function(event){
			if (event.target = modal){
				modal.style.display = "none";
			}
		}
	
	
	 var modal2 = document.getElementById('id02');
	 
	function myFunction(){
			var node=document.createElement("LI");
			var textnode=document.createTextNode("Water");
			node.appendChild(textnode);
			document.getElementById("myList").appendChild(node);
			
			alert("你好1111111111111");
		}