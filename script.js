let phoneInner = document.querySelector('.phone-inner')
let phoneSearchInp = document.getElementById('phone-search-inp')
let phoneSearchBtn = document.getElementById('phone-search-btn')

phoneSearchBtn.addEventListener('click', ()=>{
    let url = `https://openapi.programming-hero.com/api/phones?search=${phoneSearchInp.value}`
    fetch(url)
    .then(res => res.json())
    .then(data => phoneFunc(data.data.slice(0,10)))
})
let errMsg = null
function phoneFunc(data){
    phoneInner.innerHTML = ''
    if(data.length===0){
        errMsg = document.createElement('div')
        errMsg.className = 'text-center font-bold text-3xl bg-slate-100'
        errMsg.innerHTML = `
            <h2> Data not found!</h2>
        `
     phoneInner.parentNode.appendChild(errMsg)
    } else{
        for(d of data){
            if(errMsg!=null){
                errMsg.remove()
                errMsg = null
            }
            let phoneDiv = document.createElement('div')
            phoneDiv.className = 'card bg-base-100 shadow-xl text-center'
            phoneDiv.innerHTML = `
            <figure"><img src="${d.image}" class='mx-auto' alt=""/></figure>
            <div class="card-body">
                <h2 class="card-title justify-center">${d.phone_name}</h2>
                <p>${d.slug}</p>
                <div class="card-actions justify-center">
                    <a href="#phoneModal" onclick="phoneDetailsModalFetch('${d.slug}')" class="btn btn-primary">Details</a>
                </div>
            </div>
            `
            phoneInner.appendChild(phoneDiv)
        }
    }
}

function phoneDetailsModalFetch(id){
    let url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => phoneDetailsModal(data))
}
function phoneDetailsModal(data){ 
    let modalTitle = document.querySelector('#modal-title')
    let modalPhoneName = document.querySelector('.phone-name')
    let modalPhoneBrand = document.querySelector('.phone-brand')
    let modalPhoneReleaseDate = document.querySelector('.phone-release-date')

    modalTitle.innerText = data.data.name
    modalPhoneName.innerText = data.data.name
    modalPhoneBrand.innerText = data.data.brand
    modalPhoneReleaseDate.innerText = data.data.releaseDate
}