const api = "http://api.exchangeratesapi.io/v1/latest?access_key=bafc43e152c609c050cbb9fba73222b3";


//elements

const el_currency_one = document.getElementById('currency_one');
const el_currency_two = document.getElementById('currency_two');
const el_amount = document.getElementById('amount');
const el_btn_calculate = document.getElementById('btn_calculate');
const el_result = document.getElementById('result');

//load symbols

fetch('./currencies.json')
.then(res => res.json())
.then(data => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    
    let options;
    let only_option;

    for (let i = 0; i < keys.length; i++) {
        if(keys[i]==='EUR'){
            only_option += `<option value=${keys[i]}>${values[i]}</option>`;
        }
        options+=`<option value=${keys[i]}>${values[i]}</option>`;
    }

    el_currency_one.innerHTML += only_option;
    el_currency_two.innerHTML +=options;
});

el_btn_calculate.addEventListener('click', ()=>{
    const base_currency = el_currency_one.value;
    const second_currency = el_currency_two.value;
    const amount = el_amount.value;

    fetch(`${api}`)
    .then(res => res.json())
    .then(data => {
        const rate = data.rates[second_currency];
        el_result.innerHTML = `${amount} ${base_currency} = ${amount * rate} ${second_currency}`;
    })
})