//DOM
const check = document.querySelector('#btn-check')
const content = document.querySelector('#bmi-content')
const list = document.querySelector('#bmi-list')

//data
const data = JSON.parse(localStorage.getItem('data')) || [];


//event
check.addEventListener('click', getData, false)

//function
function getData(e) {
  //DOM
  let height = document.querySelector('#height').value;
  let weight = document.querySelector('#weight').value;

  if ((height != '') && (weight != '')) {
    let bmi = 0;
    let borderCSS = ''
    let textCSS = '';
    let bgCSS = '';
    let BMItext = '';
    let BMItype = '';
    let contentStr = ''

    //計算BMI  BMI = 體重(公斤) / 身高*身高(公尺)
    let num = weight / ((height * height) / 10000);
    bmi = num.toFixed(2)
    // 過輕 <18.5
    // 理想 18.5-25
    // 過重 25-30
    // 輕度肥胖 30-35
    // 中度肥胖 35-40
    // 重度肥胖 >40

    //判斷
    if (bmi <= 18.5) {
      borderCSS = 'border-tLight'
      textCSS = 'text-tLight';
      bgCSS = 'bg-tLight';
      BMItext = '過輕';
      BMItype = 'bmi-text-type1';

    } else if (bmi <= 25) {
      borderCSS = 'border-great'
      textCSS = 'text-great';
      bgCSS = 'bg-great';
      BMItext = '理想';
      BMItype = 'bmi-text-type1';

    } else if (bmi <= 30) {
      borderCSS = 'border-weight'
      textCSS = 'text-weight';
      bgCSS = 'bg-weight';
      BMItext = '過重';
      BMItype = 'bmi-text-type1';

    } else if (bmi <= 35) {
      borderCSS = 'border-heavy'
      textCSS = 'text-heavy';
      bgCSS = 'bg-heavy';
      BMItext = '輕度肥胖';
      BMItype = 'bmi-text-type2';

    } else if (bmi <= 40) {
      borderCSS = 'border-mFat'
      textCSS = 'text-mFat';
      bgCSS = 'bg-mFat';
      BMItext = '中度肥胖';
      BMItype = 'bmi-text-type2';

    } else {
      borderCSS = 'border-dFat'
      textCSS = 'text-dFat';
      bgCSS = 'bg-dFat';
      BMItext = '重度肥胖';
      BMItype = 'bmi-text-type2';

    }

    //組字串
    contentStr =
      `<div class="border rounded-circle m-auto bmi-result ${borderCSS} ${textCSS}">
        <p class="mb-0 h2">${bmi}</p>
        <span>BMI</span>
        <div class="border rounded-circle border-dark bmi-circle ${bgCSS}"></div>
        <h4 class="h2 ${BMItype}">${BMItext}</h4>
      </div>`

    //輸出字串
    content.innerHTML = contentStr

    //讀取時間
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let date = new Date().getDate();

    if (month < 10 ) {
      month = '0' + (month + 1)
    }

    //紀錄字串
    let object = (
      {
        'weight': weight,
        'height': height,
        'text': BMItext,
        'bmi': bmi,
        'border': borderCSS,
        'date': date,
        'month': month,
        'year': year
      }
    )
    data.push(object);
    console.log(data);

    //存進localstorage
    localStorage.setItem('data', JSON.stringify(data))

    //更新list的內容
    updataList()

  }
}

function updataList() {

  let listStr = ''

  //組字串
  for (let i = 0; i < data.length; i++) {
    listStr += `
      <div class="row bg-white mt-4">
        <div class="col border-left ${data[i].border}">
          <h5 class="h2 m-0 py-4">${data[i].text}</h5>
        </div>

        <div class="col align-self-center">
          <div class="row">
            <span class="col-12 col-md-3 h5 m-0 align-self-center">
              BMI
            </span>
            <h5 class="col-12 col-md-9 h2 m-0">
              ${data[i].bmi}
            </h5>
          </div>
        </div>

        <div class="col align-self-center">
          <div class="row">
            <span class="col-12 col-md-4 h5 m-0 align-self-center">
              weight
            </span>
            <h5 class="col-12 col-md-8 h2 m-0">
              ${data[i].weight}
            </h5>
          </div>
        </div>

        <div class="col align-self-center">
          <div class="row">
            <span class="col-12 col-md-4 h5 m-0 align-self-center">
              height
            </span>
            <h5 class="col-12 col-md-8 h2 m-0">
              ${data[i].height}
            </h5>
          </div>
        </div>

        <div class="col align-self-center text-right">
          ${data[i].month + '-' + data[i].date + '-' + data[i].year}
        </div>
      </div>
      `
  }

  //輸出字串
  list.innerHTML = listStr
}

function init() {
  updataList()
  if (data.length === 0) {
    list.innerHTML = `
      <p class="text-center">尚未有紀錄</p>
    `
  }
}

window.onload = init()
