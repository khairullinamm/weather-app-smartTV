/*assign class values to const and variables*/
const wrapper = document.querySelector(".wrapper");
var input_part = document.querySelector(".input-part");
var weather_part = wrapper.querySelector(".weather_part");
var icon = weather_part.querySelector('img[name="icon"]');
var icon_ls = weather_part.querySelector('img[name="icon"]');
var icon_newcity1 = weather_part.querySelector('img[name="new_city1_icon"]');
var icon_newcity2 = weather_part.querySelector('img[name="new_city2_icon"]');
var loc = weather_part.querySelector(".location");
var input_field = input_part.querySelector("input");
var head = wrapper.querySelector("header");
var information = weather_part.querySelector("information");
let count = 0; //положение карточек
var flag_card = 0; //какую карточку добавили
let flag_lan = 0;
let x = 0; let hash  = window.location.hash;
localStorage.setItem('x',JSON.stringify('0'));
var number_card = 0;
console. log("количество карточек на экране = ",number_card);
/*-----------------------------------------CHANGE LANGUAGE---------------------------------------------------*/
const select = document.querySelector('select'); 
const allLang = ['en', 'ru']; 
select.addEventListener('change', changeURLLanguage); 

// перенаправить на url с указанием языка
function changeURLLanguage() 
{
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang; //добавление в ссылку #en или #ru
    location.reload(); //перезагрузка страницы
}

function changeLanguage() 
{
    
    hash = window.location.hash;
    hash = hash.substr(1); //убираем значок решетки 
    console.log("language_now = ",hash); //вывод в консоль языка
    if (!allLang.includes(hash)) //проверка наличия выбранного языка в массиве языков
    {
        location.href = window.location.pathname + '#en'; //если не нашли язык, то англ язык по умолч
        location.reload(); //перезагрузка
    }
    select.value = hash; //селекту даем значение хэш
    
    for (let key in langArr) /*переименовываем элементы*/
    {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            elem.textContent = langArr[key][hash];
        }

    }
}

changeLanguage();
 var lang_old = JSON.parse(localStorage.getItem('lang'));
 console.log("language_old = ",lang_old);
document.body.style.overflow = 'hidden';

/*-------------------------------------------LIST OF CITIES---------------------------------------*/
var token = "d38ab891c1359a2df1075ca7b168bd1358d53eca";

var defaultFormatResult = $.Suggestions.prototype.formatResult;

function formatResult(value, currentValue, suggestion, options) 
{
  var newValue = suggestion.data.city;
  suggestion.value = newValue;
  return defaultFormatResult.call(this, newValue, currentValue, suggestion, options);
}

function formatSelected(suggestion) 
{
  return suggestion.data.city; /*name of city from JSON*/
}

$("#city").suggestions({
  token: token,
  type: "ADDRESS", /*addresses of Russian post offices*/
  hint: false, /*Explanatory text that is shown in the drop-down list above the suggestions.*/
  bounds: "city",
  count: 3, /*number of cities at list*/
  constraints: {
    locations: { city_type_full: "город" }
  },
  language: `${hash}`,
  formatResult: formatResult,
  formatSelected: formatSelected, /*Returns a string to insert into the input field when a hint is selected*/
  onSelect: function(suggestion) { /*Called when a hint is selected*/
    console.log(suggestion); /*JSON*/
  }
});

/*-----------------------------------processing of pressing enter------------------------------------------------*/
let lang = select.value;
input_field.addEventListener("keydown", function (event) {
  if (event.code == "Enter" && input_field.value != "") {
    let LangBlock = document.querySelector('.change-lang');
    LangBlock.style.display = 'none';
    let CityBlock = document.querySelector('.addcity_part');
    CityBlock.style.display = 'none';
    let WeatherBlock = document.querySelector('.weather_part');
    WeatherBlock.style.display = 'flex';
    requestApi(input_field.value, lang);
  }
});
document.getElementById('delete_card1').style.display = 'none';
document.getElementById('delete_card2').style.display = 'none';

function doBack() {
  document.getElementById('delete_card1').style.display = 'none';
  document.getElementById('delete_card2').style.display = 'none';
  var x = new Boolean(true)
  let CityBlock = document.querySelector('.addcity_part');
  CityBlock.style.display = 'flex';
  let WeatherBlock = document.querySelector('.weather_part');
  WeatherBlock.style.display = 'none';
  if (x == true)
    webOS.platformBack();
}

function doOk() {
  document.getElementById('delete_card1').style.display = 'none';
  document.getElementById('delete_card2').style.display = 'none';
  let LangBlock = document.querySelector('.change-lang');
  LangBlock.style.display = 'none';
  let CityBlock = document.querySelector('.addcity_part');
  CityBlock.style.display = 'none';
  let WeatherBlock = document.querySelector('.weather_part');
  WeatherBlock.style.display = 'flex';
  requestApi(input_field.value, lang);


}

var counter_card = 0;
var counter_card1 = 0;
var krest = 0;
var focuspokus = 0;
function doDown() {
  document.getElementById('delete_card1').style.display = 'none';
  document.getElementById('delete_card2').style.display = 'none';
  
  console.log("number_card = ",number_card);
  if (focuspokus != 0)
  {
      if (number_card == 1 && focuspokus == 1) //1 город и удаляем первый +
      {
        let CityBlock = document.getElementById('city1');
       CityBlock.style.display = 'none';
        focuspokus = 0;
        number_card = 0;
      }
      if (number_card == 1 && focuspokus == 2) //1 город и удаляем 2-ой 
      {
        let CityBlock = document.getElementById('city2');
        CityBlock.style.display = 'none';
        focuspokus = 0;
        number_card = 0;
      }
        if (number_card == 2 && focuspokus == 2) //2 города и удаляем второй +
      {
        console.log("удаляем 2/2");
        let CityBlock = document.getElementById('city2');
        CityBlock.style.display = 'none';
        let AddBlock = document.getElementById('add');
        AddBlock.style.display = 'flex';
        let NewCity_1 = document.getElementById('city1');
        NewCity_1.style.marginLeft = '0px';
        focuspokus = 0;
        number_card = 1;
      }

      if (number_card == 2 && focuspokus == 1) //2 города и удаляем первый
      {
        console.log("удаляем 1/2");
        let CityBlock = document.getElementById('city1');
        CityBlock.style.display = 'none';
        let AddBlock = document.getElementById('add');
        AddBlock.style.display = 'flex';
        let NewCity_1 = document.getElementById('city1');
        NewCity_1.style.marginLeft = '0px';
        focuspokus = 0;
        number_card = 1;
        karta_del = 1;
      }
  }
  else
  {
    if (number_card == 2) 
    {
      document.getElementById('delete_card1').style.display = 'flex';
      document.querySelector('[tabindex = "2"]').focus();
      focuspokus = 1;
      counter_card++;
      krest++;
    }
    else {
      console.log("низ на плюс");
      document.querySelector('[tabindex = "1"]').focus();
      counter_card++;
      focuspokus = 0;
    }
}
}

function doRight() {
  console.log("# = ",number_card);
  document.getElementById('delete_card1').style.display = 'none';
  document.getElementById('delete_card2').style.display = 'none';
  
  if (number_card == 1) 
  {
    console.log(counter_card);
    if ((counter_card == 1) && (karta_del == 0)) //1 картта и это первая
    {
      document.querySelector('[tabindex = "2"]').focus(); //карточка с 1-ым городом
      document.getElementById('delete_card1').style.display = 'flex';
      focuspokus = 1;
      //document.querySelector('[tabindex = "4"]').focus();
      counter_card++;
    }
    else if ((counter_card == 1) && (karta_del == 1)) //1 карта и это вторая
    {
        document.querySelector('[tabindex = "3"]').focus(); //карточка с 1-ым городом
        document.getElementById('delete_card2').style.display = 'flex';
        focuspokus = 2;
        //document.querySelector('[tabindex = "4"]').focus();
        counter_card++;
    }
    else //стоит на карточке с плюсом
    {
      document.querySelector('[tabindex = "1"]').focus();
      counter_card = 1; //переход на 1-ый город
      focuspokus = 0;
      
    }
  }
  else if (number_card == 0)
  {
     document.querySelector('[tabindex = "1"]').focus();
     counter_card = 1; //на 1-ый город
  }

  else if (number_card == 2)
  {
    if (counter_card == 1) {
      document.querySelector('[tabindex = "2"]').focus();
      document.getElementById('delete_card1').style.display = 'flex';
      //document.querySelector('[tabindex = "4"]').focus();
      counter_card++; //на второй город
      focuspokus = 1;
    }
    else {
      document.querySelector('[tabindex = "3"]').focus();
      document.getElementById('delete_card2').style.display = 'flex';
      focuspokus = 2;
      //document.querySelector('[tabindex = "5"]').focus();
      counter_card = 1; //снова на 1-ый город
    }
  }
}

function doUp() {
  focuspokus = 0;
  document.getElementById('delete_card1').style.display = 'none';
  document.getElementById('delete_card2').style.display = 'none';
  add.blur();
  city1.blur();
  city2.blur();
}

function doLeft() {
  /*document.getElementById('delete_card1').style.display = 'none';
  document.getElementById('delete_card2').style.display = 'none';
  if (number_card == 1) {

    if (counter_card == 1) {
      document.querySelector('[tabindex = "2"]').focus();
      document.getElementById('delete_card1').style.display = 'flex';
      //document.querySelector('[tabindex = "4"]').focus();
      counter_card++;
    }
    else {
      document.querySelector('[tabindex = "1"]').focus();
      counter_card = 1;
    }
  }

  else {
    if (counter_card == 1) {
      document.querySelector('[tabindex = "2"]').focus();
      document.getElementById('delete_card1').style.display = 'flex';
      //document.querySelector('[tabindex = "4"]').focus();
      counter_card++;
    }
    else {
      document.querySelector('[tabindex = "3"]').focus();
      document.getElementById('delete_card2').style.display = 'flex';
     // document.querySelector('[tabindex = "5"]').focus();
      counter_card = 1;
    }
  }*/

  console.log("# = ",number_card);
  document.getElementById('delete_card1').style.display = 'none';
  document.getElementById('delete_card2').style.display = 'none';
  
  if (number_card == 1) 
  {
    console.log(counter_card);
    if ((counter_card == 1) && (karta_del == 0)) //1 картта и это первая
    {
      document.querySelector('[tabindex = "2"]').focus(); //карточка с 1-ым городом
      document.getElementById('delete_card1').style.display = 'flex';
      focuspokus = 1;
      //document.querySelector('[tabindex = "4"]').focus();
      counter_card++;
    }
    else if ((counter_card == 1) && (karta_del == 1)) //1 карта и это вторая
    {
        document.querySelector('[tabindex = "3"]').focus(); //карточка с 1-ым городом
        document.getElementById('delete_card2').style.display = 'flex';
        focuspokus = 2;
        //document.querySelector('[tabindex = "4"]').focus();
        counter_card++;
    }
    else //стоит на карточке с плюсом
    {
      document.querySelector('[tabindex = "1"]').focus();
      counter_card = 1; //переход на 1-ый город
      focuspokus = 0;
      
    }
  }
  else if (number_card == 0)
  {
     document.querySelector('[tabindex = "1"]').focus();
     counter_card = 1; //на 1-ый город
  }

  else if (number_card == 2)
  {
    if (counter_card == 1) {
      document.querySelector('[tabindex = "2"]').focus();
      document.getElementById('delete_card1').style.display = 'flex';
      //document.querySelector('[tabindex = "4"]').focus();
      counter_card++; //на второй город
      focuspokus = 1;
    }
    else {
      document.querySelector('[tabindex = "3"]').focus();
      document.getElementById('delete_card2').style.display = 'flex';
      focuspokus = 2;
      //document.querySelector('[tabindex = "5"]').focus();
      counter_card = 1; //снова на 1-ый город
    }
  }
}




window.addEventListener("keydown", function (inEvent) {
  if (window.event) {
    keycode = inEvent.keyCode;
  }
  else if (e.which) {
    keycode = inEvent.which;
  }
  switch (keycode) {
    case 13: doOk(); break;
    case 37: doLeft(); break;
    case 38: doUp(); break;
    case 39: doRight(); break;
    case 40: doDown(); break;
    case 461: doBack(); break;
  }
});


/*-------------------------------------api request--------------------------------------------------------*/
function requestApi(city, language) 
{
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a4a5c58f16dfe78091938d8989abd6f8&lang=ru`)
  .then (function(resp) {return resp.json()}) /*getting result of fetch request and convert json*/
  .then(function(data_lang) {
    //console.log(data_lang);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a4a5c58f16dfe78091938d8989abd6f8&lang=en`)
    .then (function(resp) {return resp.json()}) 
     .then(function(data) {
    //console.log(data);
    /*reduce the text size of it's in two words and in rus */
    if (lang == 'ru')
      {
          let temp = data;
          data =  data_lang; //ru
          data_lang = temp;  //en
          let Weather_NameBlock = document.querySelector('.weather_name');
          for (let i=0, length = data.weather[0]['description'].length; i < length; i++)
          {
            if (data.weather[0]['description'][i] == ' ') 
            {
              Weather_NameBlock.setAttribute('style', 'font-size: 35px;');
              break;
            }
          }
          localStorage.setItem('lang',JSON.stringify('ru'));
      }
      else
      {
        localStorage.setItem('lang',JSON.stringify('en'));
        let Weather_NameBlock = document.querySelector('.weather_name');
          for (let i=0, length = data.weather[0]['description'].length; i < length; i++)
          {
            if (data.weather[0]['description'][i] == ' ') 
            {
              Weather_NameBlock.setAttribute('style', 'font-size: 35px;');
              break;
            }
          }
          localStorage.setItem('lang',JSON.stringify('ru'));

      }
          console.log("-----");
          console.log(data);
    var k = JSON.parse(localStorage.getItem('x'));
 
    let NewCity_1 = document.getElementById('city1');
    let NewCity_2 = document.getElementById('city2');
    let AddCity = document.getElementById('add');
    let ValueDisplay_1 = NewCity_1.style.display;
    let ValueDisplay_2 = NewCity_2.style.display;
    let ValueAdd = AddCity.style.display;
    localStorage.setItem('city2', JSON.stringify(ValueDisplay_2));
    localStorage.setItem('city1', JSON.stringify(ValueDisplay_1));
    localStorage.setItem('add', JSON.stringify(ValueAdd));
      /*converting getted data from api weathermap to text*/
    //Замена значений главного экрана
    if (flag_card == 0)
    {
      localStorage.setItem('count', JSON.stringify(0));
      weather_part.querySelector(".location").textContent = data.name;
      weather_part.querySelector(".temp .numb").textContent = Math.ceil(data.main.temp);
      weather_part.querySelector(".weather_name").textContent = data.weather[0]['description'];
      weather_part.querySelector(".high_C .niz").textContent = Math.ceil(data.main.temp_max);
      weather_part.querySelector(".Pressure_hPa .niz").textContent = data.main.pressure;
      weather_part.querySelector(".Humidity_percent .niz").textContent = data.main.humidity;

      var save_ls = JSON.stringify(data);
      var save_ls_lang = JSON.stringify(data_lang);
      localStorage.setItem('saved_data',save_ls);
      localStorage.setItem('saved_data_lang',save_ls_lang);
      const loc_stor_data = JSON.parse(localStorage.getItem('saved_data'));

      let id = data.weather[0]['id'];
      var name = icon; // gets element
      name.getAttribute('src');
      name.src;
      if (id == 800) { /*clear sky*/
        name.setAttribute('src', 'img/sun.png'); 
      }
      else if (id >= 200 && id <= 232) { /*stormy --> from internet*/
        name.setAttribute('src', 'img/storm.png'); 
      }
      else if (id >= 600 && id <= 622) { /*snowly --> from internet*/
        name.setAttribute('src', 'img/snow.png'); 
      }
      else if (id >= 701 && id <= 781) { /*foggy --> from internet*/
        name.setAttribute('src', 'img/haze.png'); 
      }
      else if (id >= 801 && id <= 804) { /*cloudly --> from internet*/
        name.setAttribute('src', 'img/cloud.png'); 
      }
      else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
        name.setAttribute('src', 'img/rain.png'); /*rainy --> from internet*/
      }
  }

  //Замена значений 1-ой карточки
  if (flag_card == 1)
  {
    var save_ls_newcity1 = JSON.stringify(data);
    localStorage.setItem('saved_data_newcity1',save_ls_newcity1);

    var save_ls_newcity1_lang = JSON.stringify(data_lang);
    localStorage.setItem('saved_data_newcity1_lang',save_ls_newcity1_lang);
    
    const loc_stor_data_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity1'));
    //если такой город уже имеется 
    if (weather_part.querySelector(".location").textContent == data.name || weather_part.querySelector(".name_city2").textContent == data.name)
    {
      let NewCity_1 = document.getElementById('city1');
      let NewCity_2 = document.getElementById('city2');
      let AddCity = document.getElementById('add');

      NewCity_1.style.display = "none";

      alert ("A city with that name has already been added!");
      number_card--; console. log("количество карточек на экране = ",number_card);

      if (NewCity_2.style.display == "flex") //если есть 2-ая карточка
      {
         AddCity.style.display = "flex"; //добавляем карточку с плсюсом
      }

      //сохраняем значения стилей в localstorage
      let ValueDisplay_1 = NewCity_1.style.display;
      let ValueDisplay_2 = NewCity_2.style.display;
      let ValueDisplay = AddCity.style.display;
      let ValueMargin_1 = NewCity_1.style.marginLeft;
      localStorage.setItem('margin', JSON.stringify(ValueMargin_1));
      localStorage.setItem('city1', JSON.stringify(ValueDisplay_1));
      localStorage.setItem('city2', JSON.stringify(ValueDisplay_2));
      localStorage.setItem('add', JSON.stringify(ValueDisplay));

      return;
    }

    weather_part.querySelector(".name_city1").textContent = data.name;
    weather_part.querySelector(".city1_temp1 .niz").textContent = Math.ceil(data.main.temp_max);
    weather_part.querySelector(".city1_temp2 .niz").textContent = Math.ceil(data.main.temp_min);

    let id = data.weather[0]['id'];
      var name = icon_newcity1; // gets element
      name.getAttribute('src');
      name.src;
      if (id == 800) { /*clear sky*/
        name.setAttribute('src', 'img/sun.png'); 
      }
      else if (id >= 200 && id <= 232) { /*stormy --> from internet*/
        name.setAttribute('src', 'img/storm.png'); 
      }
      else if (id >= 600 && id <= 622) { /*snowly --> from internet*/
        name.setAttribute('src', 'img/snow.png'); 
      }
      else if (id >= 701 && id <= 781) { /*foggy --> from internet*/
        name.setAttribute('src', 'img/haze.png'); 
      }
      else if (id >= 801 && id <= 804) { /*cloudly --> from internet*/
        name.setAttribute('src', 'img/cloud.png'); 
      }
      else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
        name.setAttribute('src', 'img/rain.png'); /*rainy --> from internet*/
    }
  }

  //Замена значений 2-ой карточки
  if (flag_card == 2)
  {

    var save_ls_newcity2 = JSON.stringify(data);
    localStorage.setItem('saved_data_newcity2',save_ls_newcity2);
    
    var save_ls_newcity2_lang = JSON.stringify(data_lang);
    localStorage.setItem('saved_data_newcity2_lang',save_ls_newcity2_lang);
    
    //если такой город уже есть
    if (weather_part.querySelector(".location").textContent == data.name || weather_part.querySelector(".name_city1").textContent == data.name)
    {

      let NewCity_1 = document.getElementById('city1');
      let NewCity_2 = document.getElementById('city2');
      let AddCity = document.getElementById('add');
      
      NewCity_2.style.display = "none"; //убираем 2-ую карточку (которую хотели добавить)

      alert ("A city with that name has already been added!");
      number_card--; console. log("количество карточек на экране = ",number_card);
      
      AddCity.style.display = "flex"; //добавляем карточку с плюсом
      NewCity_1.style.marginLeft = '0px'; //убираем отступ у 1-ой карточки, тк она больше не в начале

      //сохраняем значения стилей в localstorage
      let ValueDisplay_1 = NewCity_1.style.display;
      let ValueDisplay_2 = NewCity_2.style.display;
      let ValueDisplay = AddCity.style.display;
      let ValueMargin_1 = NewCity_1.style.marginLeft;
      localStorage.setItem('margin', JSON.stringify(ValueMargin_1));
      localStorage.setItem('city1', JSON.stringify(ValueDisplay_1));
      localStorage.setItem('city2', JSON.stringify(ValueDisplay_2));
      localStorage.setItem('add', JSON.stringify(ValueDisplay));

      return;
    }

    weather_part.querySelector(".name_city2").textContent = data.name;
    weather_part.querySelector(".city2_temp1 .niz").textContent = Math.ceil(data.main.temp_max);
    weather_part.querySelector(".city2_temp2 .niz").textContent = Math.ceil(data.main.temp_min);

    let id = data.weather[0]['id'];
      var name = icon_newcity2; // gets element
      name.getAttribute('src');
      name.src;
      if (id == 800) { /*clear sky*/
        name.setAttribute('src', 'img/sun.png'); 
      }
      else if (id >= 200 && id <= 232) { /*stormy --> from internet*/
        name.setAttribute('src', 'img/storm.png'); 
      }
      else if (id >= 600 && id <= 622) { /*snowly --> from internet*/
        name.setAttribute('src', 'img/snow.png'); 
      }
      else if (id >= 701 && id <= 781) { /*foggy --> from internet*/
        name.setAttribute('src', 'img/haze.png'); 
      }
      else if (id >= 801 && id <= 804) { /*cloudly --> from internet*/
        name.setAttribute('src', 'img/cloud.png'); 
      }
      else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
        name.setAttribute('src', 'img/rain.png'); /*rainy --> from internet*/
    }
  }

/*Repeats "GET" request every 5 min.Get processed data and output to console*/
var update_interval = setInterval(requestApi,300000,city,lang);
})
})
};


/*---------------------------------The button to return to the screen-----------------------------------------------------*/
 
 $(function swtch () {
      $('#switch-btn-1').click(function swtch () {
        $(this).toggleClass('switch-on');
        if ($(this).hasClass('switch-on')) {
          $(this).trigger('on.switch');
        } 
        else {
          $(this).trigger('off.switch');
        }
      });

      $('#switch-btn-1').on('on.switch', function swtch () {
        

        
        console.log ("old = ",lang_old);
        console.log ("new = ",lang);
        //убираем на экране кнопку смену языков
        let LangBlock = document.querySelector('.change-lang');
        LangBlock.style.display = 'none';  

        let Block1 = document.querySelector('.addcity_part');
        Block1.style.display = 'none';  
        let Block2 = document.querySelector('.weather_part');
        Block2.style.display = 'flex'; 
        let L, L1,L2;
        let data_from_ls = JSON.parse(localStorage.getItem('saved_data'));
        console.log(data_from_ls);
        let data_from_ls_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity1'));
        console.log(data_from_ls_newcity1);
        let data_from_ls_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity2'));
        console.log(data_from_ls_newcity2);
        counTT = JSON.parse(localStorage.getItem('count'));
        console.log(counTT);
        /*в зависимости от расположения городов на экране (главный/1-ая карточка/2-ая карточка) записываем в переменные
        данные из json файла*/
        //alert (counTT);
        x = 1;
        localStorage.setItem('x', JSON.stringify(1));
        if (counTT == 0)
        {
            if (lang_old != lang)
            {
              data_from_ls =  JSON.parse(localStorage.getItem('saved_data_lang'));
              L = JSON.parse(localStorage.getItem('saved_data'));
              localStorage.setItem('saved_data', JSON.stringify(data_from_ls));
              localStorage.setItem('saved_data_lang', JSON.stringify(L));
 
              data_from_ls_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity1_lang'));
              L1 = JSON.parse(localStorage.getItem('saved_data_newcity1'));
              localStorage.setItem('saved_data_newcity1', JSON.stringify(data_from_ls_newcity1)); 
              localStorage.setItem('saved_data_newcity1_lang', JSON.stringify(L1));

              data_from_ls_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity2_lang'));
              L2 = JSON.parse(localStorage.getItem('saved_data_newcity2'))
              localStorage.setItem('saved_data_newcity2', JSON.stringify(data_from_ls_newcity2));
              localStorage.setItem('saved_data_newcity2_lang', JSON.stringify(L2));
            }
        }
        if (counTT == 1)
        {
            if (lang_old == lang)
            {
              data_from_ls =  JSON.parse(localStorage.getItem('saved_data_newcity1'));
              data_from_ls_newcity1 = JSON.parse(localStorage.getItem('saved_data')); 
            }
            else
            {
              data_from_ls =  JSON.parse(localStorage.getItem('saved_data_newcity1_lang'));
              L =  JSON.parse(localStorage.getItem('saved_data_newcity1'));
              localStorage.setItem('saved_data_newcity1', JSON.stringify(data_from_ls));
              localStorage.setItem('saved_data_newcity1_lang', JSON.stringify(L));

              data_from_ls_newcity1 = JSON.parse(localStorage.getItem('saved_data_lang'));
              L1 = JSON.parse(localStorage.getItem('saved_data'));
              localStorage.setItem('saved_data', JSON.stringify(data_from_ls_newcity1));
              localStorage.setItem('saved_data_lang', JSON.stringify(L1));


              data_from_ls_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity2_lang'));
              L2 = JSON.parse(localStorage.getItem('saved_data_newcity2'));
              localStorage.setItem('saved_data_newcity2', JSON.stringify(data_from_ls_newcity2));
              localStorage.setItem('saved_data_newcity2_lang', JSON.stringify(L2));
            }
        }
        if (counTT == 2)
        {
            if (lang_old == lang)
            {          
              data_from_ls =  JSON.parse(localStorage.getItem('saved_data_newcity2'));
              data_from_ls_newcity2 = JSON.parse(localStorage.getItem('saved_data'));
            }
            else
            {
              data_from_ls =  JSON.parse(localStorage.getItem('saved_data_newcity2_lang'));
              L =  JSON.parse(localStorage.getItem('saved_data_newcity2'));
              localStorage.setItem('saved_data_newcity2', JSON.stringify(data_from_ls));
              localStorage.setItem('saved_data_newcity2_lang', JSON.stringify(L));

              data_from_ls_newcity2 = JSON.parse(localStorage.getItem('saved_data_lang'));
              L2 = JSON.parse(localStorage.getItem('saved_data'));
              localStorage.setItem('saved_data', JSON.stringify(data_from_ls_newcity2));
              localStorage.setItem('saved_data_lang', JSON.stringify(L2));

              data_from_ls_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity1_lang')); 
              L1 = JSON.parse(localStorage.getItem('saved_data_newcity1')); 
              localStorage.setItem('saved_data_newcity1', JSON.stringify(data_from_ls_newcity1));
              localStorage.setItem('saved_data_newcity1_lang', JSON.stringify(L1));


            }
        }
        if (counTT == 3)
        {
          if (lang_old == lang)
          {          
              data_from_ls =  JSON.parse(localStorage.getItem('saved_data_newcity2'));
              data_from_ls_newcity1 = JSON.parse(localStorage.getItem('saved_data'));
              data_from_ls_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity1'));
          }
          else
          {
              data_from_ls =  JSON.parse(localStorage.getItem('saved_data_newcity2_lang'));
              L =  JSON.parse(localStorage.getItem('saved_data_newcity2'));
              localStorage.setItem('saved_data_newcity2', JSON.stringify(data_from_ls));
              localStorage.setItem('saved_data_newcity2_lang', JSON.stringify(L));

              data_from_ls_newcity1 = JSON.parse(localStorage.getItem('saved_data_lang'));
              L1 = JSON.parse(localStorage.getItem('saved_data'));
              localStorage.setItem('saved_data', JSON.stringify(data_from_ls_newcity1));
              localStorage.setItem('saved_data_lang', JSON.stringify(L1));

              data_from_ls_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity1_lang'));
              L2 = JSON.parse(localStorage.getItem('saved_data_newcity1'));
              localStorage.setItem('saved_data_newcity1', JSON.stringify(data_from_ls_newcity2));
              localStorage.setItem('saved_data_newcity1_lang', JSON.stringify(L2));
          }
        }
        if (counTT == 4)
        {
          if (lang_old == lang)
          { 
            data_from_ls =  JSON.parse(localStorage.getItem('saved_data_newcity1'));
            data_from_ls_newcity2 = JSON.parse(localStorage.getItem('saved_data'));
            data_from_ls_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity2'));
          }
          else
          {
            data_from_ls =  JSON.parse(localStorage.getItem('saved_data_newcity1_lang'));
            L =  JSON.parse(localStorage.getItem('saved_data_newcity1'));
            localStorage.setItem('saved_data_newcity1', JSON.stringify(data_from_ls));
            L.setItem('saved_data_newcity1_lang', JSON.stringify(L));

            data_from_ls_newcity2 = JSON.parse(localStorage.getItem('saved_data_lang'));
            L1 = JSON.parse(localStorage.getItem('saved_data'));
            localStorage.setItem('saved_data', JSON.stringify(data_from_ls_newcity2));
            localStorage.setItem('saved_data_lang', JSON.stringify(L1));

            data_from_ls_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity2_lang'));
            L2 = JSON.parse(localStorage.getItem('saved_data_newcity2'));
            localStorage.setItem('saved_data_newcity2', JSON.stringify(data_from_ls_newcity1));
            localStorage.setItem('saved_data_newcity2_lang', JSON.stringify(L2));
          }
        }
       if (counTT == 5)
        {
          if (lang_old == lang)
          { 
            data_from_ls_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity2'));
            data_from_ls_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity1'));
          }
          else
          {
            data_from_ls_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity2_lang'));
            L = JSON.parse(localStorage.getItem('saved_data_newcity2'));
            localStorage.setItem('saved_data_newcity2', JSON.stringify(data_from_ls_newcity1));
            localStorage.setItem('saved_data_newcity2_lang', JSON.stringify(L));

            data_from_ls_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity1_lang'));
            L1 = JSON.parse(localStorage.getItem('saved_data_newcity1'));
            localStorage.setItem('saved_data_newcity1', JSON.stringify(data_from_ls_newcity2));
            localStorage.setItem('saved_data_newcity1_lang', JSON.stringify(L1));

            data_from_ls =  JSON.parse(localStorage.getItem('saved_data_lang'));
            L2 =  JSON.parse(localStorage.getItem('saved_data'));
            localStorage.setItem('saved_data', JSON.stringify(data_from_ls));
            localStorage.setItem('saved_data_lang', JSON.stringify(L2));
          }
        }
         /*reduce the text size of it's in two words and in rus */
        if (lang == 'ru')
          {
              let Weather_NameBlock = document.querySelector('.weather_name');
              for (let i=0, length = data_from_ls.weather[0]['description'].length; i < length; i++)
              {
                if (data_from_ls.weather[0]['description'][i] == ' ') 
                {
                  Weather_NameBlock.setAttribute('style', 'font-size: 35px;');
                  break;
                }
              }
          }
           console.log("-----");
          console.log(data_from_ls);
          lang_old = lang; 
          console.log ("old1 = ",lang_old);
        //заполняем главную погоду
        weather_part.querySelector(".location").textContent = data_from_ls.name;
        weather_part.querySelector(".temp .numb").textContent = Math.ceil(data_from_ls.main.temp);
        weather_part.querySelector(".weather_name").textContent = data_from_ls.weather[0]['description'];
        weather_part.querySelector(".high_C .niz").textContent = Math.ceil(data_from_ls.main.temp_max);
        weather_part.querySelector(".Pressure_hPa .niz").textContent = data_from_ls.main.pressure;
        weather_part.querySelector(".Humidity_percent .niz").textContent = data_from_ls.main.humidity;
        
        let id_ls = data_from_ls.weather[0]['id'];
        var name_ls = icon_ls; // gets element
        name_ls.getAttribute('src');
        name_ls.src;
        if (id_ls == 800) { /*clear sky*/
          name_ls.setAttribute('src', 'img/sun.png'); 
        }
        else if (id_ls >= 200 && id_ls <= 232) { /*stormy --> from internet*/
          name_ls.setAttribute('src', 'img/storm.png'); 
        }
        else if (id_ls >= 600 && id_ls <= 622) { /*snowly --> from internet*/
          name_ls.setAttribute('src', 'img/snow.png'); 
        }
        else if (id_ls >= 701 && id_ls <= 781) { /*foggy --> from internet*/
          name_ls.setAttribute('src', 'img/haze.png'); 
        }
        else if (id_ls >= 801 && id_ls <= 804) { /*cloudly --> from internet*/
          name_ls.setAttribute('src', 'img/cloud.png'); 
        }
        else if ((id_ls >= 500 && id_ls <= 531) || (id_ls >= 300 && id_ls <= 321)) {
          name_ls.setAttribute('src', 'img/rain.png'); /*rainy --> from internet*/
        }

        /*загружаем карточки с нужным занчением display и отступами*/ 
         let NewCity_1 = document.getElementById('city1');
         let DisplayCity_1 = JSON.parse(localStorage.getItem('city1'));
         let DisplayMargin = JSON.parse(localStorage.getItem('margin'));
         NewCity_1.style.display = DisplayCity_1;
         NewCity_1.style.marginLeft = DisplayMargin;
         
         let NewCity_2 = document.getElementById('city2');
         let DisplayCity_2 = JSON.parse(localStorage.getItem('city2'));
         NewCity_2.style.display = DisplayCity_2;

         let AddCity = document.getElementById('add');
         let DisplayCity = JSON.parse(localStorage.getItem('add'));
         AddCity.style.display = DisplayCity;

        //заполняем данные 1-ой карточки
        weather_part.querySelector(".name_city1").textContent = data_from_ls_newcity1.name;
        weather_part.querySelector(".city1_temp1 .niz").textContent = Math.ceil(data_from_ls_newcity1.main.temp_max);
        weather_part.querySelector(".city1_temp2 .niz").textContent = Math.ceil(data_from_ls_newcity1.main.temp_min);

        let id = data_from_ls_newcity1.weather[0]['id'];
        var name = icon_newcity1; // gets element
          name.getAttribute('src');
          name.src;
          if (id == 800) { /*clear sky*/
            name.setAttribute('src', 'img/sun.png'); 
          }
          else if (id >= 200 && id <= 232) { /*stormy --> from internet*/
            name.setAttribute('src', 'img/storm.png'); 
          }
          else if (id >= 600 && id <= 622) { /*snowly --> from internet*/
            name.setAttribute('src', 'img/snow.png'); 
          }
          else if (id >= 701 && id <= 781) { /*foggy --> from internet*/
            name.setAttribute('src', 'img/haze.png'); 
          }
          else if (id >= 801 && id <= 804) { /*cloudly --> from internet*/
            name.setAttribute('src', 'img/cloud.png'); 
          }
          else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            name.setAttribute('src', 'img/rain.png'); /*rainy --> from internet*/
        }

      
        //заполняем данные 2-ой карточки
        weather_part.querySelector(".name_city2").textContent = data_from_ls_newcity2.name;
        weather_part.querySelector(".city2_temp1 .niz").textContent = Math.ceil(data_from_ls_newcity2.main.temp_max);
        weather_part.querySelector(".city2_temp2 .niz").textContent = Math.ceil(data_from_ls_newcity2.main.temp_min);

        let id1 = data_from_ls_newcity2.weather[0]['id'];
        var name = icon_newcity2; // gets element
          name.getAttribute('src');
          name.src;
          if (id1 == 800) { /*clear sky*/
            name.setAttribute('src', 'img/sun.png'); 
          }
          else if (id1 >= 200 && id1 <= 232) { /*stormy --> from internet*/
            name.setAttribute('src', 'img/storm.png'); 
          }
          else if (id1 >= 600 && id1 <= 622) { /*snowly --> from internet*/
            name.setAttribute('src', 'img/snow.png'); 
          }
          else if (id1 >= 701 && id1 <= 781) { /*foggy --> from internet*/
            name.setAttribute('src', 'img/haze.png'); 
          }
          else if (id1 >= 801 && id1 <= 804) { /*cloudly --> from internet*/
            name.setAttribute('src', 'img/cloud.png'); 
          }
          else if ((id1 >= 500 && id1 <= 531) || (id1 >= 300 && id1 <= 321)) {
            name.setAttribute('src', 'img/rain.png'); /*rainy --> from internet*/
        }
      });

      $('.switch-btn').on('off.switch', function swtch () 
      {
        /*смена экранов*/
        let Block1 = document.querySelector('.addcity_part');
        Block1.style.display = 'none';
        let Block2 = document.querySelector('.weather_part');
        Block2.style.display = 'flex';    
      });
      if (lang == 'ru')
      {
        localStorage.setItem('lang',JSON.stringify('ru'));
      }
      else if (lang == 'en')
          localStorage.setItem('lang',JSON.stringify('en'));

    });


/*добавление новой карточки*/
var button = document.querySelector(".plus");
  button.addEventListener("click", function() {
    console.log ("dop = ",lang);
    //переходим на блок ввода города
    let WeatherBlock = document.querySelector('.weather_part');
    WeatherBlock.style.display = 'none';
    let CityBlock= document.querySelector('.addcity_part');
    CityBlock.style.display = 'flex'; 

    let NewCity_1 = document.getElementById('city1');
    let NewCity_2 = document.getElementById('city2');
    let AddCity = document.getElementById('add');
    
    //если еще нет ни одной карточки с городом --> добавляем 1-ую
    if (getComputedStyle(NewCity_1).display == 'none' && getComputedStyle(NewCity_2).display == 'none')
    {
        NewCity_1.style.display = 'flex'; 
        FlagDelete1 = 0; 
        flag_card = 1; //номер карты
        number_card = 1;
        karta_del = 0;
    }
    
    //если 1-ая уже есть -->добавляем вторую
    else if (getComputedStyle(NewCity_1).display == 'flex' && getComputedStyle(NewCity_2).display == 'none')
    {
      NewCity_2.style.display = 'flex'; 
      FlagDelete2 = 0;
      flag_card = 2;
      number_card = 2;
    }
    //если 2-ая уже есть -->добавляем первую
    else if  (getComputedStyle(NewCity_1).display == 'none' && getComputedStyle(NewCity_2).display == 'flex')
    {
      NewCity_2.style.display = 'flex'; 
      FlagDelete2 = 0;
      flag_card = 2;
      number_card = 2;
    }
    console.log ("number of plus = ",number_card);
    //если есть обе --> скрываем карточку с добавлением города
    if (getComputedStyle(NewCity_1).display == 'flex' && getComputedStyle(NewCity_2).display == 'flex')
    {
        AddCity.style.display = 'none';
        NewCity_1.style.marginLeft = '69px'; 
    }
/*сохраняем в Localtorage значения display'я у карточек*/
    let ValueDisplay_1 = NewCity_1.style.display;
    let ValueDisplay_2 = NewCity_2.style.display;
    let ValueDisplay = AddCity.style.display;
    let ValueMargin_1 = NewCity_1.style.marginLeft;
    localStorage.setItem('margin', JSON.stringify(ValueMargin_1));
    localStorage.setItem('city1', JSON.stringify(ValueDisplay_1));
    localStorage.setItem('city2', JSON.stringify(ValueDisplay_2));
    localStorage.setItem('add', JSON.stringify(ValueDisplay));
    let DisplayCity_1 = JSON.parse(localStorage.getItem('city1'));
    let DisplayCity_2 = JSON.parse(localStorage.getItem('city2'));
    console.log (DisplayCity_1);
    console.log (DisplayCity_2);
    console. log("количество карточек на экране = ",number_card);
  }); 

//заменяем значение 1-ой карточки и главного экрана
function replace (saved_data_newcity1, saved_data)
{
      weather_part.querySelector(".name_city1").textContent = saved_data.name;
      weather_part.querySelector(".city1_temp1 .niz").textContent = Math.ceil(saved_data.main.temp_max);
      weather_part.querySelector(".city1_temp2 .niz").textContent = Math.ceil(saved_data.main.temp_min);
      console.log(saved_data.name);
      let id = saved_data.weather[0]['id'];
      var name = icon_newcity1; // gets element
      name.getAttribute('src');
      name.src;
      if (id == 800) { /*clear sky*/
        name.setAttribute('src', 'img/sun.png'); 
      }
      else if (id >= 200 && id <= 232) { /*stormy --> from internet*/
        name.setAttribute('src', 'img/storm.png'); 
      }
      else if (id >= 600 && id <= 622) { /*snowly --> from internet*/
        name.setAttribute('src', 'img/snow.png'); 
      }
      else if (id >= 701 && id <= 781) { /*foggy --> from internet*/
        name.setAttribute('src', 'img/haze.png'); 
      }
      else if (id >= 801 && id <= 804) { /*cloudly --> from internet*/
        name.setAttribute('src', 'img/cloud.png'); 
      }
      else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
        name.setAttribute('src', 'img/rain.png'); /*rainy --> from internet*/
    }

    weather_part.querySelector(".location").textContent = saved_data_newcity1.name;
    weather_part.querySelector(".temp .numb").textContent = Math.ceil(saved_data_newcity1.main.temp);
    weather_part.querySelector(".weather_name").textContent = saved_data_newcity1.weather[0]['description'];
    weather_part.querySelector(".high_C .niz").textContent = Math.ceil(saved_data_newcity1.main.temp_max);
    weather_part.querySelector(".Pressure_hPa .niz").textContent = saved_data_newcity1.main.pressure;
    weather_part.querySelector(".Humidity_percent .niz").textContent = saved_data_newcity1.main.humidity;
        
        id = saved_data_newcity1.weather[0]['id'];
        name = icon; // gets element
        name.getAttribute('src');
        name.src;
        if (id == 800) { /*clear sky*/
          name.setAttribute('src', 'img/sun.png'); 
        }
        else if (id >= 200 && id <= 232) { /*stormy --> from internet*/
          name.setAttribute('src', 'img/storm.png'); 
        }
        else if (id >= 600 && id <= 622) { /*snowly --> from internet*/
          name.setAttribute('src', 'img/snow.png'); 
        }
        else if (id >= 701 && id <= 781) { /*foggy --> from internet*/
          name.setAttribute('src', 'img/haze.png'); 
        }
        else if (id >= 801 && id <= 804) { /*cloudly --> from internet*/
          name.setAttribute('src', 'img/cloud.png'); 
        }
        else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
          name.setAttribute('src', 'img/rain.png'); /*rainy --> from internet*/
        }
}

//заменяем значение 2-ой карточки и главного экрана
function replace2(saved_data_newcity2,saved_data)
{
    weather_part.querySelector(".name_city2").textContent = saved_data.name;
    weather_part.querySelector(".city2_temp1 .niz").textContent = Math.ceil(saved_data.main.temp_max);
    weather_part.querySelector(".city2_temp2 .niz").textContent = Math.ceil(saved_data.main.temp_min);

      let id = saved_data.weather[0]['id'];
      var name = icon_newcity2; // gets element
      name.getAttribute('src');
      name.src;
      if (id == 800) { /*clear sky*/
        name.setAttribute('src', 'img/sun.png'); 
      }
      else if (id >= 200 && id <= 232) { /*stormy --> from internet*/
        name.setAttribute('src', 'img/storm.png'); 
      }
      else if (id >= 600 && id <= 622) { /*snowly --> from internet*/
        name.setAttribute('src', 'img/snow.png'); 
      }
      else if (id >= 701 && id <= 781) { /*foggy --> from internet*/
        name.setAttribute('src', 'img/haze.png'); 
      }
      else if (id >= 801 && id <= 804) { /*cloudly --> from internet*/
        name.setAttribute('src', 'img/cloud.png'); 
      }
      else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
        name.setAttribute('src', 'img/rain.png'); /*rainy --> from internet*/
    }

    weather_part.querySelector(".location").textContent = saved_data_newcity2.name;
    weather_part.querySelector(".temp .numb").textContent = Math.ceil(saved_data_newcity2.main.temp);
    weather_part.querySelector(".weather_name").textContent = saved_data_newcity2.weather[0]['description'];
    weather_part.querySelector(".high_C .niz").textContent = Math.ceil(saved_data_newcity2.main.temp_max);
    weather_part.querySelector(".Pressure_hPa .niz").textContent = saved_data_newcity2.main.pressure;
    weather_part.querySelector(".Humidity_percent .niz").textContent = saved_data_newcity2.main.humidity;
        
        id = saved_data_newcity2.weather[0]['id'];
        name = icon; // gets element
        name.getAttribute('src');
        name.src;
        if (id == 800) { /*clear sky*/
          name.setAttribute('src', 'img/sun.png'); 
        }
        else if (id >= 200 && id <= 232) { /*stormy --> from internet*/
          name.setAttribute('src', 'img/storm.png'); 
        }
        else if (id >= 600 && id <= 622) { /*snowly --> from internet*/
          name.setAttribute('src', 'img/snow.png'); 
        }
        else if (id >= 701 && id <= 781) { /*foggy --> from internet*/
          name.setAttribute('src', 'img/haze.png'); 
        }
        else if (id >= 801 && id <= 804) { /*cloudly --> from internet*/
          name.setAttribute('src', 'img/cloud.png'); 
        }
        else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
          name.setAttribute('src', 'img/rain.png'); /*rainy --> from internet*/
        }
}


/*появление крестика при наведении на 1-ую карточку*/
  var Delete = document.getElementById('city1');
  Delete.addEventListener("mouseover", function() {
    let ImageBlock = document.getElementById('delete_card1'); 
    ImageBlock.style.display = 'inline'; 
  });

  /*удаление крестика при отведении с 1-ой карточки*/
  var Delete = document.querySelector(".new_city1");
  Delete.addEventListener("mouseout", function() {
    let ImageBlock= document.querySelector('.del1');
    ImageBlock.style.display = 'none'; 
  });

/*появление крестика при наведении на 2-ую карточку*/
  var Delete = document.querySelector(".new_city2");
  Delete.addEventListener("mouseover", function() {
    let ImageBlock= document.querySelector('.del2');
    ImageBlock.style.display = 'inline'; 
  });
  /*удаление крестика при отведении с 2-ой карточки*/
  var Delete = document.querySelector(".new_city2");
  Delete.addEventListener("mouseout", function() {
    let ImageBlock= document.querySelector('.del2');
    ImageBlock.style.display = 'none'; 
 });

let FlagDelete1 = 0;
let FlagDelete2 = 0;
let karta_del = 0;
/*нажатие на крестик 1-ой карточки --> удаление карточки*/
  var button = document.querySelector(".del1");
  button.addEventListener("click", function() 
  { 
    FlagDelete1 = 1;
    let NewCity_1 = document.getElementById('city1');
    let AddCity = document.getElementById('add');
    NewCity_1.style.display = 'none';

    AddCity.style.display = 'flex';
    NewCity_1.style.marginLeft = '0px';


    /*сохраняем в Localtorage значения display'я у карточки*/
    let ValueDisplay_1 = NewCity_1.style.display;
    localStorage.setItem('city1', JSON.stringify(ValueDisplay_1));

    let ValueDisplay = AddCity.style.display;
    localStorage.setItem('add', JSON.stringify(ValueDisplay));

    let DisplayCity_1 = JSON.parse(localStorage.getItem('city1')); 
        let NewCity_2 = document.getElementById('city2');
    if (NewCity_2.style.display == 'flex')
      number_card = 1;
    else
      number_card = 0;
    karta_del = 1;
    console.log (DisplayCity_1); console. log("количество карточек на экране = ",number_card);
  });

/*нажатие на крестик 2-ой карточки --> удаление карточки*/
  var button = document.querySelector(".del2");
  button.addEventListener("click", function() 
  {
    FlagDelete2 = 1;

    let AddCity = document.getElementById('add');
    let NewCity_2 = document.getElementById('city2');
    let NewCity_1 = document.getElementById('city1');

    NewCity_2.style.display = 'none';
    AddCity.style.display = 'flex';
    NewCity_1.style.marginLeft = '0px';

    if (NewCity_1.style.display == 'flex')
      number_card = 1;
    else
      number_card = 0;
    /*сохраняем в Localtorage значения display'я у карточки*/
    let ValueDisplay_2 = NewCity_2.style.display;
    localStorage.setItem('city2', JSON.stringify(ValueDisplay_2));
    
    let ValueDisplay = AddCity.style.display;
    localStorage.setItem('add', JSON.stringify(ValueDisplay));

    let ValueMargin = NewCity_1.style.marginLeft;
    localStorage.setItem('margin', JSON.stringify(ValueMargin));

    let DisplayCity_2 = JSON.parse(localStorage.getItem('city2'));
    console.log (DisplayCity_2); console. log("количество карточек на экране = ",number_card);
   });

  //нажатие на 1-ую карточку --> вызов функции замены с главным экраном
  
  var ReplaceCards = document.getElementById('city1');
  ReplaceCards.addEventListener("click", function() {
    console.log ("tap to city1"); 
    if (FlagDelete1 == 0) //если мы нажимаем не на крест
    {
      //в зависимости от нужной замены меняем  json файлы
        count = JSON.parse(localStorage.getItem('count')); //alert(count);
        if (count == 0)
        {
          if (lang_old == lang)
          {
                      console.log("lang_old_yap = ",lang_old);
          console.log("lang_now_yap = ",lang);
            const saved_data_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity1'));
            const saved_data = JSON.parse(localStorage.getItem('saved_data'));
            replace(saved_data_newcity1,saved_data); 
          }
          else
          {
            const saved_data_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity1_lang'));
            const saved_data = JSON.parse(localStorage.getItem('saved_data_lang'));
            replace(saved_data_newcity1,saved_data); 
          }
          count = 1;
          localStorage.setItem('count', JSON.stringify(1));
        }
        else if (count == 1)
        {
          if (lang_old == lang)
          {          
            const saved_data_newcity1 = JSON.parse(localStorage.getItem('saved_data'));
            const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity1'));
            replace(saved_data_newcity1,saved_data);
          }
          else
          {
            const saved_data_newcity1 = JSON.parse(localStorage.getItem('saved_data_lang'));
            const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity1_lang'));
            replace(saved_data_newcity1,saved_data);
          }
          count = 0;
          localStorage.setItem('count', JSON.stringify(0));
        }
        else if (count == 2)
        {
          if (lang_old == lang)
          {   
            const saved_data_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity1'));
            const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity2'));
            replace(saved_data_newcity1,saved_data);
          }
          else
          {
            const saved_data_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity1_lang'));
            const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity2_lang'));
            replace(saved_data_newcity1,saved_data);
          }
          count = 4;
          localStorage.setItem('count', JSON.stringify(4));
        }
        else if (count == 3)
        {
          if (lang_old == lang)
          { 
            const saved_data_newcity1 = JSON.parse(localStorage.getItem('saved_data'));
            const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity2'));
            replace(saved_data_newcity1,saved_data);
          }
          else
          {
            const saved_data_newcity1 = JSON.parse(localStorage.getItem('saved_data_lang'));
            const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity2_lang'));
            replace(saved_data_newcity1,saved_data);
          }
          count = 5;
          localStorage.setItem('count', JSON.stringify(5));
        }
        else if (count == 4)
        {
          if (lang_old == lang)
          {
            const saved_data_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity2'));
            const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity1'));
            replace(saved_data_newcity1,saved_data);
          }
          else
          {
            const saved_data_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity2_lang'));
            const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity1_lang'));
            replace(saved_data_newcity1,saved_data);
          }
          count = 2;
          localStorage.setItem('count', JSON.stringify(2));
        }    
        else if (count == 5)
        {
          if (lang_old == lang)
          {
            const saved_data_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity2'));
            const saved_data = JSON.parse(localStorage.getItem('saved_data'));
            replace(saved_data_newcity1,saved_data);            
          }
          else
          {
            const saved_data_newcity1 = JSON.parse(localStorage.getItem('saved_data_newcity2_lang'));
            const saved_data = JSON.parse(localStorage.getItem('saved_data_lang'));
            replace(saved_data_newcity1,saved_data);            
          }

          count = 3;
          localStorage.setItem('count', JSON.stringify(3));
        }   
}
  });

  //нажатие на 2-ую карточку --> вызов функции замены с главным экраном
  var ReplaceCards = document.getElementById('city2');
  ReplaceCards.addEventListener("click", function() {
    
  if (FlagDelete2 == 0) //если нажат не крест
  {
    count = JSON.parse(localStorage.getItem('count'));
    if (count == 0)
    {
      if (lang_old == lang)
      {
        const saved_data_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity2'));
        const saved_data = JSON.parse(localStorage.getItem('saved_data'));
        replace2(saved_data_newcity2,saved_data);
      }
      else
      {
        const saved_data_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity2_lang'));
        const saved_data = JSON.parse(localStorage.getItem('saved_data_lang'));
        replace2(saved_data_newcity2,saved_data);
      }
      count = 2;
      localStorage.setItem('count', JSON.stringify(2));
    }
    else if (count == 1)
    {
      if (lang_old == lang)
      {
        const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity1'));
        const saved_data_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity2'));
        replace2(saved_data_newcity2,saved_data);
      }
      else
      {
        const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity1_lang'));
        const saved_data_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity2_lang'));
        replace2(saved_data_newcity2,saved_data);
      }
      count = 3;
      localStorage.setItem('count', JSON.stringify(3));
    }
    else if (count == 2)
    {
      if (lang_old == lang)
      {
        const saved_data_newcity2 = JSON.parse(localStorage.getItem('saved_data'));
        const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity2'));
        replace2(saved_data_newcity2,saved_data);
      }
      else
      {
        const saved_data_newcity2 = JSON.parse(localStorage.getItem('saved_data_lang'));
        const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity2_lang'));
        replace2(saved_data_newcity2,saved_data);
      }
      count = 0;
      localStorage.setItem('count', JSON.stringify(0));
    }
    else if (count == 3)
    {
      if (lang_old == lang)
      {
        const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity2'));
        const saved_data_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity1'));
        replace2(saved_data_newcity2,saved_data);
      }
      else
      {
        const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity2_lang'));
        const saved_data_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity1_lang'));
        replace2(saved_data_newcity2,saved_data);
      }
      count = 1;
      localStorage.setItem('count', JSON.stringify(1));
    }
    else if (count == 4)
    {
      if (lang_old == lang)
      {
        const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity1'));
        const saved_data_newcity2 = JSON.parse(localStorage.getItem('saved_data'));
        replace2(saved_data_newcity2,saved_data);
      }
      else
      {
        const saved_data = JSON.parse(localStorage.getItem('saved_data_newcity1_lang'));
        const saved_data_newcity2 = JSON.parse(localStorage.getItem('saved_data_lang'));
        replace2(saved_data_newcity2,saved_data);
      }
      count = 5;
      localStorage.setItem('count', JSON.stringify(5));
    }
    else if (count == 5)
    {
      if (lang_old == lang)
      {
        const saved_data = JSON.parse(localStorage.getItem('saved_data'));
        const saved_data_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity1'));
        replace2(saved_data_newcity2,saved_data);
      }
      else
      {
        const saved_data = JSON.parse(localStorage.getItem('saved_data_lang'));
        const saved_data_newcity2 = JSON.parse(localStorage.getItem('saved_data_newcity1_lang'));
        replace2(saved_data_newcity2,saved_data);
      }
      count = 4;
      localStorage.setItem('count', JSON.stringify(4));
    }
  }
  });

