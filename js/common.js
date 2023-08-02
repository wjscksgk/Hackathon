const container = document.querySelector('.container');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrag = false;
let bottom = document.querySelector('.bottom');
let i = 0;

const obj = {
  육 : {
    육군 : 'soldier',
    탱크 : 'tank', 
  },
  해 : {
    잠수함 : ''
  },
  공 : {
    제트기 : ''
  }
}

document.querySelector('.ground').addEventListener('click', () => addBottom(obj.육) );
document.querySelector('.sea').addEventListener('click', () => addBottom(obj.해) );
document.querySelector('.sky').addEventListener('click', () => addBottom(obj.공) );

function addBottom(e) {
  bottom.textContent = '';
  Object.values(e).forEach(el => {
    const createDiv = document.createElement('div');
    const createImg = document.createElement('img');
    createImg.classList.add('img');
    createImg.classList.add('cantRemove');
    createImg.setAttribute('id', `${el}`);
    createImg.setAttribute('src', `./images/${el}.png`)
    createImg.setAttribute('draggable', 'true');
    createImg.setAttribute('ondragstart', 'drag(event)');
    createDiv.classList.add('box');
    createDiv.setAttribute("ondragover", "dragEnter(event)");
    createDiv.append(createImg);
    bottom.append(createDiv);
  });
}

document.querySelector('.remove').addEventListener('click', e => { 
  let img = document.querySelectorAll('.img');
  img.forEach(el => {
    el.addEventListener('click', (ee) => removeObject(ee))
  });
});

document.querySelector('.removeAll').addEventListener('click', () => {
  Array.from(container.children).forEach(element => {
    if(element.classList.contains('img')) {
      element.remove();
      i = 0;
    }
  });
});
  
function dragEnter(ev) {
  ev.preventDefault();  
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const img = document.getElementById(data).cloneNode(true);
  img.style.position = 'absolute';
  img.style.top = (ev.clientY - 50) + 'px';
  img.style.left = (ev.clientX - 50) + 'px';
  img.classList.remove('cantRemove');
  ev.target.parentElement.appendChild(img);
}

function removeObject(ee) {
  if(!ee.target.classList.contains('cantRemove')) {
    ee.target.remove();
    i-=1;
    if(i <= 0) i = 0;
  }
}





canvas.width=1200;
canvas.height=500;

ctx.beginPath();
ctx.stroke();

document.querySelector(".draw").addEventListener("click", () => {
  canvas.classList.toggle("draww");
  if(canvas.classList.contains("draww")) {
    canvas.addEventListener('mouseover', (e) => {
      e.target.style.cursor = "crosshair";
    });
    canvas.addEventListener('mousedown', draw);
    canvas.addEventListener('mousemove', e => {
      if(!isDrag) return;
      ctx.lineTo(e.offsetX,e.offsetY);
      ctx.stroke();
    });
    canvas.addEventListener('mouseup', () => {
      isDrag = false;
    });
    canvas.addEventListener('mouseenter', () => {
      ctx.beginPath();
    });
  }
  else {
    canvas.removeEventListener('mousedown', draw);
    canvas.addEventListener('mouseover', (e) => {
      e.target.style.cursor = "default";
    });
  }
});

function draw(e) {
  isDrag = true;
  ctx.moveTo(e.offsetX,e.offsetY);
}