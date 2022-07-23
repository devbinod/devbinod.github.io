let id="no";
var flag=0;
displayData();
function addTask(){
	let name=document.getElementById('task').value;
	if(name==''){
		alert("Please enter to do list");
	}else{
		
		if(id=='no'){
			let arr=getListData();
			if(arr==null){
				let data=[name];
				setListData(data);
			}else{
				arr.push(name);
				setListData(arr);
			}
			
		}else{
			let arr=getListData();
			arr[id]=name;
			setListData(arr);	
		}
        flag=1;
        displayData();
		document.getElementById('task').value='';
		
	}
}

function displayData(){
	let arr=getListData();
    let list = document.getElementById("todos");
    var i =0; 
    var arrlength =arr.length;
    if(flag==0){
        for(i =0;i< arrlength;i++){
            let li = document.createElement("li");
            li.innerText= arr[i];
            list.appendChild(li);
        }
      
    }  
    else if(flag==1){
            let li = document.createElement("li");
        li.innerText = document.getElementById('task').value;
        list.appendChild(li);
        }
  		
	
}
function getListData(){
	let arr=JSON.parse(localStorage.getItem('taskList'));
	return arr;
}

function setListData(arr){
	localStorage.setItem('taskList',JSON.stringify(arr));
}

function deleteTask(){
    document.getElementById("todos").innerHTML="";
    localStorage.removeItem('taskList');
}
