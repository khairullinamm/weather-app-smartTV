/*assign class values to const and variables*/
const wrapper = document.querySelector(".wrapper");
var input_part = document.querySelector(".input-part");
var weather_part = wrapper.querySelector(".weather_part");
var icon = weather_part.querySelector('img[name="icon"]');
var icon_ls = weather_part.querySelector('img[name="icon"]');
var loc = weather_part.querySelector(".location");
var input_field = input_part.querySelector("input");
var head = wrapper.querySelector("header");
var information = weather_part.querySelector("information");

/*---------CHANGR LANGUAGE----------------*/
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
    let hash = window.location.hash;
    hash = hash.substr(1); //убираем значок решетки 
    console.log(hash); //вывод в консоль языка
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



/*---------------------------LIST OF CITIES---------------------------*/
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
  formatResult: formatResult,
  formatSelected: formatSelected, /*Returns a string to insert into the input field when a hint is selected*/
  onSelect: function(suggestion) { /*Called when a hint is selected*/
    console.log(suggestion); /*JSON*/
  }
});


/*-------------------processing of pressing enter------------------------------------*/
let lang = select.value;
input_field.addEventListener("keydown", function(event) {
  if (event.code == "Enter" && input_field.value != "")
    {
      let LangBlock = document.querySelector('.change-lang');
      LangBlock.style.display = 'none';  
      let CityBlock= document.querySelector('.addcity_part');
      CityBlock.style.display = 'none';  
      let WeatherBlock = document.querySelector('.weather_part');
      WeatherBlock.style.display = 'flex';
      requestApi(input_field.value,lang);
    }
});

/*---------------------api request------------------------------------------*/
function requestApi(city, language) 
{
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=18fbdb092ad1f0198f2f9f9a96fbc909&lang=${language}`)
  .then (function(resp) {return resp.json()}) /*getting result of fetch request and convert json*/
  .then(function(data) {
    console.log(data);

    
    /*reduce the text size of it's in two words and in rus */
    if (lang == 'ru')
      {
          let Weather_NameBlock = document.querySelector('.weather_name');
          for (let i=0, length = data.weather[0]['description'].length; i < length; i++)
          {
            if (data.weather[0]['description'][i] == ' ') 
            {
              Weather_NameBlock.setAttribute('style', 'font-size: 35px;');
              break;
            }
          }
      }
      /*converting getted data from api weathermap to text*/
    weather_part.querySelector(".location").textContent = data.name;
    weather_part.querySelector(".temp .numb").textContent = Math.ceil(data.main.temp);
    weather_part.querySelector(".weather_name").textContent = data.weather[0]['description'];
    weather_part.querySelector(".high_C .niz").textContent = Math.ceil(data.main.temp_max);
    weather_part.querySelector(".Pressure_hPa .niz").textContent = data.main.pressure;
    weather_part.querySelector(".Humidity_percent .niz").textContent = data.main.humidity;

    var save_ls = JSON.stringify(data);
    localStorage.setItem('saved_data',save_ls);
    const loc_stor_data = JSON.parse(localStorage.getItem('saved_data'));
    //console.log(loc_stor_data);

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
  }) 
/*Repeats "GET" request every 5 min.Get processed data and output to console*/
var update_interval = setInterval(requestApi,300000,city,lang);

};
/*кнопка переключатель*/
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
        let LangBlock = document.querySelector('.change-lang');
        LangBlock.style.display = 'none';  

        let Block1 = document.querySelector('.addcity_part');
        Block1.style.display = 'none';  
        let Block2 = document.querySelector('.weather_part');
        Block2.style.display = 'flex'; 

        const data_from_ls = JSON.parse(localStorage.getItem('saved_data'));
        console.log(data_from_ls);

        weather_part.querySelector(".location").textContent = data_from_ls.name;
        weather_part.querySelector(".temp .numb").textContent = Math.ceil(data_from_ls.main.temp);
        weather_part.querySelector(".weather_name").textContent = data_from_ls.weather[0]['description'];
        weather_part.querySelector(".high_C .niz").textContent = Math.ceil(data_from_ls.main.temp_max);
        weather_part.querySelector(".Pressure_hPa .niz").textContent = data_from_ls.main.pressure;
        weather_part.querySelector(".Humidity_percent .niz").textContent = data_from_ls.main.humidity;

        /////////////////////////////////////////////////////////////////////////////////////////////////
        
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
        else if ((id_ls >= 500 && id <= 531) || (id_ls >= 300 && id <= 321)) {
          name_ls.setAttribute('src', 'img/rain.png'); /*rainy --> from internet*/
        }
        /*загрузка карточек с нужным занчением display*/ 
         let NewCity_1 = document.getElementById('city1');
         let DisplayCity_1 = JSON.parse(localStorage.getItem('city1'));
         NewCity_1.style.display = DisplayCity_1;

         let NewCity_2 = document.getElementById('city2');
         let DisplayCity_2 = JSON.parse(localStorage.getItem('city2'));
         NewCity_2.style.display = DisplayCity_2;

        /////////////////////////////////////////////////////////////////////////////////////////////////
      });

      $('.switch-btn').on('off.switch', function swtch () 
      {
        /*смена экранов*/
        let Block1 = document.querySelector('.addcity_part');
        Block1.style.display = 'none';
        let Block2 = document.querySelector('.weather_part');
        Block2.style.display = 'flex';    
      });

    });
/*добавление нового города*/
var button = document.querySelector(".plus");
  button.addEventListener("click", function() {
    let WeatherBlock = document.querySelector('.weather_part');
    WeatherBlock.style.display = 'none';
    let CityBlock= document.querySelector('.addcity_part');
    CityBlock.style.display = 'flex'; 
    let NewCity_1 = document.getElementById('city1');
    let NewCity_2 = document.getElementById('city2');
    if (getComputedStyle(NewCity_1).display == 'none')
    {
        NewCity_1.style.display = 'flex'; 
    }
    else
    {
      NewCity_2.style.display = 'flex'; 
    }
/*сохраняем в Localtorage значения display'я у карточек*/
    let ValueDisplay_1 = NewCity_1.style.display;
    let ValueDisplay_2 = NewCity_2.style.display;
    localStorage.setItem('city1', JSON.stringify(ValueDisplay_1));
    localStorage.setItem('city2', JSON.stringify(ValueDisplay_2));
    let DisplayCity_1 = JSON.parse(localStorage.getItem('city1'));
    let DisplayCity_2 = JSON.parse(localStorage.getItem('city2'));
    console.log (DisplayCity_1);
    console.log (DisplayCity_2);

  }); 

/*появление крестика при наведении на 1-ый город*/
  var Delete = document.querySelector(".new_city1");
  Delete.addEventListener("mouseover", function() {
    let ImageBlock= document.querySelector('.del1'); 
    ImageBlock.style.display = 'inline'; 
  });
  /*удаление крестика при отведении с 1-ого города*/
  var Delete = document.querySelector(".new_city1");
  Delete.addEventListener("mouseout", function() {
    let ImageBlock= document.querySelector('.del1');
    ImageBlock.style.display = 'none'; 
  });

  var Delete = document.querySelector(".new_city2");
  Delete.addEventListener("mouseover", function() {
    let ImageBlock= document.querySelector('.del2');
    ImageBlock.style.display = 'inline'; 
  });
  var Delete = document.querySelector(".new_city2");
  Delete.addEventListener("mouseout", function() {
    let ImageBlock= document.querySelector('.del2');
    ImageBlock.style.display = 'none'; 
 });

/*нажатие на крестик --> удаление карточки*/
  var button = document.querySelector(".del1");
  button.addEventListener("click", function() {
    let NewCity_1 = document.getElementById('city1');
    NewCity_1.style.display = 'none';
    /*сохраняем в Localtorage значения display'я у карточки*/
    let ValueDisplay_1 = NewCity_1.style.display;
    localStorage.setItem('city1', JSON.stringify(ValueDisplay_1));
    let DisplayCity_1 = JSON.parse(localStorage.getItem('city1'));
    console.log (DisplayCity_1);
  });

  var button = document.querySelector(".del2");
  button.addEventListener("click", function() {
    let NewCity_2 = document.getElementById('city2');
    NewCity_2.style.display = 'none';
    /*сохраняем в Localtorage значения display'я у карточки*/
    let ValueDisplay_2 = NewCity_2.style.display;
    localStorage.setItem('city2', JSON.stringify(ValueDisplay_2));
    let DisplayCity_2 = JSON.parse(localStorage.getItem('city2'));
    console.log (DisplayCity_2);
   });

