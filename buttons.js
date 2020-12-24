// Собираем объект из всех секций
const anglesNode = document.querySelectorAll('.angle');         // NodeList всех элементов с классом .Англе
let disabledItems = document.querySelectorAll('.disabled');     // NodeList недоступных на странице элементов. Его надо будет наверное достать из JSON
let selectedItems = document.querySelectorAll('.angle-active'); // NodeList выделенных элементов. Откуда он берется?

const anglesArray = Array.prototype.slice.call(anglesNode);             //конвертируем нодлист в массив
const disabledArray = Array.prototype.slice.call(disabledItems);        //и заблокированные элементы тоже
const angles = anglesArray.filter(el => !disabledArray.includes(el));   //фильтруем элементы, которые повторяются

// Это - функции поведения клика и ховера
const selectItem  = (event) => { 
    const angle = event.target.closest('.angle');
    const circle = angle.querySelector('.circle');    
    const pDefault = angle.querySelector('.p-default');
    const pActive = angle.querySelector('.p-active');
    pDefault.classList.toggle('hidden');                         //
    pActive.classList.toggle('visible');                         //
    circle.classList.toggle('circle-active');                    //
    if (angle) return angle.classList.toggle('angle-active');    // включение классов
    event.target.classList.toggle('angle-active');               //
}

const hoverItem  = (event) => { 
    const parent = event.target.closest('.angle');
    if (parent.classList.contains('angle-active') === false){
        hoverBlue(event);
        return;
    }
    const circle = parent.querySelector('.circle');
    const hDefault = parent.querySelector('.item-h4');
    const hCatDontLike = parent.querySelector('.cat-dont-like');
    hDefault.classList.toggle('hidden');                                //
    hCatDontLike.classList.toggle('visible');                           //
    circle.classList.toggle('circle-active-hover')                      //
    if (parent) return parent.classList.toggle('angle-active-hover');   // включение классов
    event.target.classList.toggle('angle-active-hover');                //
}

const hoverBlue = (event) => {                                          
    const parent = event.target.closest('.angle');
    const circle = parent.querySelector('.circle');
    circle.classList.toggle('circle-active-blue')                       //
    if (parent) return parent.classList.toggle('angle-active-blue');    // включение классов
    event.target.classList.toggle('angle-active-blue');                 //
}

// Функция, красящая в серый неактивный элемент...
const disableItem  = (elem) => { 
    const parent = elem.closest('.angle');
    const circle = parent.querySelector('.circle');
    const background = parent.querySelector('.inner-container');
    const pDefault = parent.querySelector('.p-default');
    const pOutOfStock = parent.querySelector('.p-out-of-stock');
    pDefault.classList.add('hidden');                               //
    pOutOfStock.classList.add('visible');                           //
    circle.classList.add('circle-disabled');                        //
    background.classList.add('inner-container-disabled');           //
    if (parent) return parent.classList.add('angle-disabled');      // включение классов
    elem.classList.add('angle-disabled');                           //
}

// Тут итерируется каждый элемент массива angles
for (let angle of angles) {
    angle.addEventListener('click', selectItem);  
    angle.addEventListener('mouseover', hoverItem)
    angle.addEventListener('mouseout', hoverItem);
}

// Итератор массива неактивных элементов
for (const item of disabledArray) {
    disableItem(item);
}
