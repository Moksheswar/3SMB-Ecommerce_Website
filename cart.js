var additemid = 0;
function addtocart(item) {
    additemid += 1;
    fun1();
    var selecteditem = document.createElement('div');
    selecteditem.classList.add('cartImg');
    selecteditem.setAttribute('id', additemid);
    var img = document.createElement('img');
    img.setAttribute('src', item.children[0].currentSrc);
    var title = document.createElement('div1');
    title.innerText = item.children[1].innerText;
    var label = document.createElement('div2');
    label.innerText = item.children[2].innerText;
    var cartItems=document.getElementById('title1');
    var delbtn = document.createElement('button');
    delbtn.innerText = 'Remove';
    delbtn.onclick = function(){
    selecteditem.remove();
    additemid-=1;
    fun1();
    };
    selecteditem.append(img);
    selecteditem.append(title);
    selecteditem.append(label);
    selecteditem.append(delbtn);
    cartItems.append(selecteditem);
    showtoast();
}

let toastBox = document.getElementById('toastBox');
function showtoast() {
    let toast = document.createElement('div');
    toast.classList.add('toast2');
    toast.innerHTML = '<i class="fa-solid fa-circle-check"></i>Item added to cart successfully';
    toastBox.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

function fun1(){
    if(additemid==0){
        document.getElementById('label1').innerHTML="Your Cart IS Empty";
    }
    else{
        document.getElementById('label1').innerHTML="";
    }
}
var additemid = 0;
function addtocart1(item) {
    additemid += 1;
    fun1();
    var selecteditem = document.createElement('div');
    selecteditem.classList.add('cartImg');
    selecteditem.setAttribute('id', additemid);
    var img = document.createElement('img');
    img.setAttribute('src', item.children[0].children[0].currentSrc);
    var title = document.createElement('div1');
    title.innerText = item.children[2].innerText;
    var label = document.createElement('div2');
    label.innerText = item.children[3].innerText;
    var cartItems=document.getElementById('title1');
    var delbtn = document.createElement('button');
    delbtn.innerText = 'Remove';
    delbtn.onclick = function(){
    selecteditem.remove();
    additemid-=1;
    fun1();
    };
    selecteditem.append(img);
    selecteditem.append(title);
    selecteditem.append(label);
    selecteditem.append(delbtn);
    cartItems.append(selecteditem);
    showtoast();
}
var visit=new Array();
function buy(){
    user_record=JSON.parse(localStorage.getItem("users"));
    var ur=document.getElementById('title2');
    var j=0;
    user_record.forEach(i => {
        for(j=0;j<visit.length;j++){
            if(visit[j]==i['name'])
                break;
        }
        if(j==visit.length){
        let div1=document.createElement('div');
        var text=i['name'];
        div1.innerHTML=text;
        var delbtn = document.createElement('button');
        delbtn.innerText = 'Cancel Order';
        delbtn.onclick = function(){
            div1.remove();
        };
        div1.appendChild(delbtn);
        ur.appendChild(div1);
        visit.push(i['name']);}
    });
}