const convert=document.querySelector('button');
const fromCountry=document.getElementById('from');
const toCountry=document.getElementById('to');
const amount=document.getElementById('amount');
const error=document.getElementById('errorMsg');
const converted=document.getElementById('convertedAmount');

const apiReq = async () => {
    const response = await fetch(
        'https://api.restcountries.com/countries/v5?limit=100',
        {
            headers: {
                'Authorization': 'Bearer API_KEY'
            }
        }
    );
    const data = await response.json();

    const currencies = new Set();
    console.log(data.data.objects);

    for(let i=0;i<data.data.objects.length;i++){

        for(let j=0;j<data.data.objects[i].currencies.length;j++){
            const currency=data.data.objects[i].currencies[j];

            currencies.add(currency.code+'-'+currency.name);

        }
    }
    const currenciesArray=Array.from(currencies);
    const currency=document.querySelectorAll('select');
    for(let i=0;i<currenciesArray.length;i++){

        const option1 = document.createElement('option');
        option1.textContent = currenciesArray[i];

        const option2 = document.createElement('option');
        option2.textContent = currenciesArray[i];

        currency[0].appendChild(option1);
        currency[1].appendChild(option2);

    }
};

async function converter(){

    error.style.visibility = 'hidden';

    let val=amount.value.trim();

    if(val==""){
        return;
    }

    let fromValue=fromCountry.value.split('-')[0].toUpperCase();

    console.log(fromValue)

    let toValue=toCountry.value.split('-')[0].toUpperCase();

    if(fromValue == "INT"){
        fromValue="INR";
    }
     if(toValue == "INT"){
        toValue="INR";
    }

    console.log(toValue);

    const response=await fetch(` https://v6.exchangerate-api.com/v6/API_KEY/latest/${fromValue}`);

    const data=await response.json();

   console.log(data);

    const toConverterValue=data.conversion_rates[toValue];

     console.log(toConverterValue);

    if(isNaN(val)){
        amount.value="";
        error.style.visibility = 'visible';
        return;
    }

    converted.textContent=`${val} ${fromValue} = ${val*toConverterValue} ${toValue}`;
    amount.value="";
} 

convert.addEventListener('click',converter);

apiReq();
