const getProducts=async(page)=>{
   
    const skip=(page-1)*10;
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    const data= await response.json();
   
    return data;
}


const displayProducts=async(page=1)=>{
  
    const data=await getProducts(page);
    const products=data.products;

    let numberOfPages=(data.total/10);
   
    if(data.total%10!=0)
    {
        numberOfPages=Math.floor(numberOfPages);
        numberOfPages++;
    }

    let paginationLinks="";
    if(page==1)
    {
        paginationLinks=`<li class="page-item"><button class="page-link disabled" >Previous</button></li>`;
    }else{
        paginationLinks=`<li class="page-item"><button class="page-link " onclick=displayProducts(${parseInt(page)-1}) >Previous</button></li>`;

    }
     
    for(let i=1;i<=numberOfPages;i++)
    {
        if(i==page)
        paginationLinks+= `<li class="page-item"><button class="page-link active" onclick=displayProducts(${i})>${i}</button></li>`;

        else
        paginationLinks+= `<li class="page-item"><button class="page-link" onclick=displayProducts(${i})>${i}</button></li>`;

    }

    if(page==numberOfPages)
        {
            paginationLinks+=`<li class="page-item"><button class="page-link disabled" >Previous</button></li>`;
        }
        else{
            paginationLinks+=`<li class="page-item"><button class="page-link " onclick=displayProducts(${parseInt(page)-1   }) >Next </button></li>`;
    
        }
     document.querySelector(".pagination").innerHTML=paginationLinks;


    const result=products.map( product=>
        `
        <div class="col-lg-3 col-md-4 col-sm-6">
     <div class="card" style="width: 18rem;">
       <img src="${product.thumbnail}" class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</div>

        `).join("");

        document.querySelector(".products .row").innerHTML=result;
}
displayProducts();