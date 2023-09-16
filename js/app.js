const newsQuantity = document.getElementById( 'news-quantity' )
const news = document.getElementById('news')

const allBrakingNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data[0].details);
    // console.log(data.data.length);
    newsQuantity.innerHTML = '';
    news.innerHTML = '';

    
// news counter 
if (`${data.data.length}` > 0 ){
        const newsCounterText = document.createElement('p');
        newsCounterText.style.backgroundColor = "white" ;
        newsCounterText.style.padding = "20px" ;
         newsCounterText.innerText = `${data.data.length} Items Found for Category Breaking News`;
        newsQuantity.appendChild(newsCounterText);

// news 
    for (let i = 0 ; i < data.data.length; i++){
        if(`${data.data[i].total_view}` === 'null'){
            data.data[i].total_view = 0;
    }

    }

    for (let i = 0 ; i < data.data.length; i++){
        for (let j = 0 ; j < data.data.length -i -1 ; j++ ){

            if(`${data.data[j].total_view}` < data.data[j+1].total_view ){
                   
                    let temp = data.data[j];
                    data.data[j] = data.data[j+1];
                    data.data[j+1] = temp;
            }
                
        }
        
    }

    for(let i = 0 ; i < data.data.length; i++){

        const newSingel = document.createElement('div')

        newSingel.innerHTML = `
        <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src="${data.data[i].thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-9 d-flex align-items-center">
                        <div class="card-body">
                            <h5 class="card-title">${data.data[i].title}</h5>
                            <p class="card-text">${data.data[i].details.slice(0,500)}...</p>
                            <div class="d-flex justify-content-between">
                              <div class="author d-flex">
                                <div style="width: 40px; height: 40px;">
                                  <img class="img-fluid rounded-circle border border-danger-subtle" src="${data.data[i].author.img}" alt="">
                                </div>
                                <div class="ps-2">
                                  <p> ${data.data[i].author.name} <br> <span class="text-black-50"> ${data.data[i].author.published_date} </span></p>
                                </div>

                              </div>
                              <div>
                                 <p><i class="fa-regular fa-eye"><span class="ps-2" >${data.data[i].total_view}</span></i></p>
                              </div>
                              <div>
                                <p>${data.data[i].rating.number}<span class="ps-2" >${data.data[i].rating.badge}</span></p>
                              </div>
                              <button id="details-info" class="btn" type="button"> 
                                <i class="fa-solid fa-arrow-right"></i>
                              </button>
                            </div>
                        </div>
                    </div>
                </div>
              </div> 
        `
        news.appendChild(newSingel)
    }
}
else{
        const newsCounterText = document.createElement('p');
        newsCounterText.style.backgroundColor = "white" ;
        newsCounterText.style.padding = "20px" ;
         newsCounterText.innerText = `No Items Found for Category Breaking News`;
        newsQuantity.appendChild(newsCounterText);
        news.innerHTML = '';
    }
    
}






