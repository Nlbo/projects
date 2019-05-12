var x = document.getElementsByTagName('body')[0];
var y = document.createElement('div');
var z = document.createElement('img');
// z.src = 'https://i.redd.it/ounq1mw5kdxy.gif';
z.src = 'https://static.collectui.com/shots/2505716/loading-076-large';
y.appendChild(z);
y.style.width = window.innerWidth +  'px';
y.style.height = window.innerHeight + 'px';
z.style.position = 'absolute';
y.style.position = 'absolute';
z.style.backgroundRepeat = 'no-repeat';
z.style.zIndex = '999';
y.style.zIndex = '998';
y.style.backgroundColor = '#2A2A2A';
// y.style.backgroundColor = '#F0F0F0';
z.style.top = '50%';
z.style.left = '50%';
z.style.transform = 'translate(-50%,-50%)';
x.appendChild(y);



window.onload = ()=> {
y.style.display = 'none';
z.style.display = 'none';
};
