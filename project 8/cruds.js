var addTitle = document.getElementById('title');
var addPrice = document.getElementById('price');
var addTaxes = document.getElementById('taxes');
var addAds = document.getElementById('ads');
var addDisc = document.getElementById('discount');
var addTotal = document.getElementById('total');
var addCount = document.getElementById('count');
var addCategory = document.getElementById('category');
var addSubmit = document.getElementById('submit');
var tableBody = document.getElementById('tableBody')
var deleteBtn = document.getElementById('deleteAll')
var mood = 'create';

var edit;

function getTotal() {
    if (addPrice.value != null) {
        var result = (+addPrice.value + +addTaxes.value + +addAds.value) - +addDisc.value;
        addTotal.innerHTML = result;
        addTotal.style.background= "#12e462";
    }
    else {
        addTotal.innerHTML = "";
        addTotal.style.background = "#004085";

    }
}

var dataProducts;

if(localStorage.getItem('myProducts') != null)
{
    dataProducts = JSON.parse(localStorage.getItem('myProducts'));
}
else
{
    dataProducts = [];
}

submit.onclick = function () {
    var addProduct = {
        title: addTitle.value,
        price: addPrice.value,
        taxes: addTaxes.value,
        ads: addAds.value,
        discount: addDisc.value,
        total: addTotal.innerHTML,
        count: addCount.value,
        category: addCategory.value,
    }
    if (addTitle.value != "" && addPrice.value != "" && addCategory.value != "" && addProduct.count < 100) {
        if (mood === 'create') {
        if(addProduct.count >= 1) {
        for(var i = 0; i < addProduct.count; i++) {
                dataProducts.push(addProduct)

        }
        }
        else {
            dataProducts.push(addProduct)

        } 
        }
    else {
        dataProducts[edit] = addProduct;
        mood = 'create';
        addSubmit.innerHTML = 'create';
        count.style.display = 'block';

        }
        clearForm();

    }



    localStorage.setItem('myProducts', JSON.stringify(dataProducts))
    displayProducts(dataProducts);
}

function clearForm() {
    addTitle.value = "";
    addPrice.value = "";
    addTaxes.value = "";
    addAds.value = "";
    addDisc.value = "";
    addTotal.innerHTML = "";
    addCount.value = "";
    addCategory.value = "";

}

function displayProducts() {
    var tBody = ``;

    for (var i = 0; i < dataProducts.length; i++) {

        tBody +=`<tr>
        <td>${i+1}</td>
        <td>${dataProducts[i].title}</td>
        <td>${dataProducts[i].price}</td>
        <td>${dataProducts[i].taxes}</td>
        <td>${dataProducts[i].ads}</td>
        <td>${dataProducts[i].discount}</td>
        <td>${dataProducts[i].total}</td>
        <td>${dataProducts[i].category}</td>
        <td><button onclick="updateData(${i})" class="btn btn-sm btn-outline-info rounded-pill" id="upDate">Update </button></td>
        <td><button onclick="deletedData(${i})" class="btn btn-sm btn-outline-primary rounded-pill" id="delete">Delete</button></td>

        </tr>`
    }
    tableBody.innerHTML = tBody;

    if (dataProducts.length > 0) {
        deleteBtn.innerHTML = `<button onclick="deleteAll()" class="btn btn-sm btn-outline-primary w-75 rounded-pill mt-4">Delete All (${dataProducts.length})</button>` 
    }
    else {
        deleteBtn.innerHTML = '';
    }
}
displayProducts();


var searchMood = 'title';

function searchProducts(id)
{ 
    var search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
    }
    else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By '+ searchMood;

    search.focus();
    search.value = "";
    displayProducts();
}

function searchData(value) {
    var tBody = "";
    for (var i = 0; i < dataProducts.length; i++) {

        if (searchMood == 'title') {
            if (dataProducts[i].title.toLowerCase().includes(value.toLowerCase()) == true) {
                tBody += `<tr>
                <td>${i}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxes}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td>
                <td>${dataProducts[i].category}</td>
                <td><button onclick="updateData(${i})" class="btn btn-sm btn-outline-info rounded-pill" id="upDate">Update </button></td>
                <td><button onclick="deletedData(${i})" class="btn btn-sm btn-outline-primary rounded-pill" id="delete">Delete</button></td>

                </tr>`;
            }
    
        

        }
        else {
            if (dataProducts[i].category.toLowerCase().includes(value.toLowerCase()) == true) {
                tBody += `<tr>
                <td>${i}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxes}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td>
                <td>${dataProducts[i].category}</td>
                <td><button onclick="updateData(${i})" class="btn btn-sm btn-outline-info rounded-pill" id="upDate">Update </button></td>
                <td><button onclick="deletedData(${i})" class="btn btn-sm btn-outline-primary rounded-pill" id="delete">Delete</button></td>

                </tr>`;
            }
    
        
        }
    }
    tableBody.innerHTML = tBody;

}




function deleteAll() {
    localStorage.clear();
    dataProducts.splice(0);
    displayProducts();
}


function deletedData(i) {
    dataProducts.splice(i, 1);

    localStorage.setItem('myProducts', JSON.stringify(dataProducts));

    displayProducts();
}

function updateData(i) {
    addTitle.value = dataProducts[i].title;
    addPrice.value = dataProducts[i].price;
    addTaxes.value = dataProducts[i].taxes;
    addAds.value = dataProducts[i].ads;
    addDisc.value = dataProducts[i].discount;
    addTotal.innerHTML = dataProducts[i].total;
    addCount.style.display = 'none';
    addCategory.value = dataProducts[i].category;
    
    addSubmit.innerHTML = 'upDate';
    mood = 'upDate';
    edit = i;
    scroll({
        top: 0, behavior:'smooth',
    })
}

