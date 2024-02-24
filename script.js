let body =
  document.querySelector('.body')
let menu =
  document.querySelector('.burger input')
let menu_items = 
  document.querySelector('.menu_items')
let links = 
document.querySelectorAll('.menu_items a')
let down_btn =
  document.querySelector('.down_btn')
let video_url =
  document.querySelector('.input_link')
let message =
  document.querySelector('.message')
let close_btn =
  document.querySelector('.close_btn')
let results_box =
  document.querySelector('.results_box')
let loader =
  document.querySelector('.loader')
  
  
// nav bar 

menu.addEventListener('click', () => {
  if (menu.checked) {
    menu_items.style.top = '60px'
  } else {
    menu_items.style.top = '-190px'
  }
})

// close message

close_btn.addEventListener('click', () => {
  message.classList.remove('message_add')
  close_btn.style.display = 'none'
})

// show and hide loader

function showLoader() {
  loader.style.height = '200px'
}
function hiedLoader() {
  loader.style.height = '0px'
}


// fetsh data

down_btn.addEventListener('click', getData)
function getData() {
  
  if (video_url.value !== "") {
    showLoader()
    fetshData(video_url.value)
    results_box.innerHTML = ""
  } else {
    video_url.focus()
    message.classList.add('message_add')
    message.textContent = 'You have to past the FB Video url in input!'
    close_btn.style.display = 'flex'
    results_box.innerHTML = ""
  }
}

function fetshData(value) {
  try {
    const url = `https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php?url=${value}`
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a4f5f4be0dmsh2e41ed4f12285b3p15adf8jsn47d30207a00c',
        'X-RapidAPI-Host': 'facebook-reel-and-video-downloader.p.rapidapi.com'
      }
    }
    fetch(url, options)
      .then(response => response.json())
      .then(data => { results(data) })
      .catch(error => {
        message.classList.add('message_add')
        message.textContent = 'Service is Busy, Try again Later!'
        close_btn.style.display = 'flex'
      })
  } catch (error) {
    message.classList.add('message_add')
    message.textContent = 'Something Wrong Tchak your internet!'
    close_btn.style.display = 'flex'
  }
}

function results(data) {
  showLoader()
  let Data = data
  if (Data.success) {
    hiedLoader()
    let media = Data.media[0]
    let HD = media.hd_url
    let HD_Title =  ''
    let SD = media.sd_url
    let videoImg = Data.thumbnail
    let videoName = Data.title
    results_box.innerHTML =
    ` <span>${videoName}</span>
      <div class="video_box">
        
        <video src=${HD} controls
         poster=${videoImg}>
        </video>
        
      </div>
      <div class="down_box">
        
      <div class="HD_Btn">
          
        <img src="video-camera.gif">
        <span>HD 720</span>
        <a target="_blank" href="${HD}">
          <img src="download.gif">
        </a>
          
      </div>
      <div class="SD_Btn">
          
        <img src="video-camera.gif">
        <span>HD 480</span>
        <a target="_blank" href="${SD}">
          <img src="download.gif">
        </a>
        
      </div>
       
    </div>`
    
  } else {
    hiedLoader()
    message.classList.add('message_add')
    message.textContent = 'The Url is not Working!'
    close_btn.style.display = 'flex'
  }
}
