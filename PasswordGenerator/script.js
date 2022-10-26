// bring all the elements
const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const  numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbol')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')


// create function variable for each function and gives to key 
const randomFunc ={
    lower:getRamdomLower,
    upper:getRamdomUpper,
    number:getRamdomNumber,
    symbol:getRamdomSymbol
} 

// create eventlistener for generate password
generateEl.addEventListener('click',() =>{
    const length = +lengthEl.value
    const haslower = lowercaseEl.checked
    const hasupper = uppercaseEl.checked
    const hassymbol = symbolsEl.checked
    const hasnumber = numbersEl.checked

    resultEl.innerText = generatePassword(haslower,hasupper,hasnumber,hassymbol,length)
})

// create function for password generate

function generatePassword(lower,upper,number,symbol,length)
{
    let generatedPassword = ' '
    // check how many checkbox selected
    const typesCount = lower + upper + number + symbol
    const typesArr = [{lower},{upper},{number},{symbol}].filter(item => Object.values(item)[0])
    
    if(typesCount === 0)
    {return ' '}
    for(let i=0 ; i < length ; i+=typesCount)
    {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }
    const finalPassword = generatedPassword.slice(0,length)

    return finalPassword
}

// add event listener on clipboard element
clipboardEl.addEventListener('click',() =>{
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText
    if(!password){return}

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to Clipboard!')

})

// create random function for getlowercase letter ,here 26 means total alphabets and 97 means lowercase letter start with position
function getRamdomLower()
{
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

// create random function for getuppercase letter ,here 26 means total alphabets and 65 means Uppercase letter start with position
function getRamdomUpper()
{
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

// same as another two create randomNumber function
function getRamdomNumber()
{
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

// for symbol generate
function getRamdomSymbol()
{
    const symbol ='!@#$%^&*(){}[]=<>/,.'
    return symbol[Math.floor(Math.random() * symbol.length)]
}

