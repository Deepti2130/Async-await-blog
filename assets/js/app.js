const cl =  console.log;

const cardContainer =document.getElementById("cardContainer");
// const objContainer =document.getElementById("objContainer");
const titleControls =document.getElementById("title");
const contentControls =document.getElementById("content");
const submitbtn = document.getElementById("submitbtn");
const blogForm = document.getElementById("blogForm");

const sweetAlert =(msg, iconStr)=>{
    Swal.fire({
        title:msg,
        timer:2500,
        icon:iconStr
    })
}

const createBlogCard =(arr)=>{
    if(arr.length == 0){
        alert(`Plz provide valid Data`)
    }

    let result ='';
    arr.forEach(ele=>{
        result+=`
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h2 class="m-0">${ele.title}</h2>
                    </div>
                    <div class="card-body">
                        <p class="m-0">
                            ${ele.content}
                        </p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-sm btn-outline-info">Edit</button>
                        <button class="btn btn-sm btn-outline-danger">Remove</button>
                    </div>
                </div>
            </div>
        
        `
    });
    cardContainer.innerHTML=result; 
}

const generateUuid = () => {
    return String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(
      /[xy]/g,
      (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
  
        return value.toString(16);
      }
    );
  };
// let blogArr =[
//     {
//         title:"HTML",
//         content: "HTML stands for HyperText Markup Language",
//         blogId:"123"
//     },
//     {
//         title:"CSS",
//         content: "CSS stands for Cascading style sheets, it is used to style an HTML element",
//         blogId:"124"
//     },
//     {
//         title:"Javascript",
//         content: "Javascript is Object oriented langauge used to add functionality",
//         blogId:"125"
//     }
// ]

let blogData =[];

const onAddpost = (eve) => {
    eve.preventDefault()

    let newblog = {
        title:titleControls.value,
        content:contentControls.value,
        blogId:generateUuid()
    }
    // cl(newblog)
    blogForm.reset()
    const init =async()=>{
        try{
            await createBlog(newblog);
            let data = await fetchBlogs();
            createBlogCard(data)
                  
        }catch(err){
           sweetAlert(err, "error")
        }
    }
    
    init()
}

const createBlog =(blogObj)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let err = Math.random() >= 0.5 ? false : true;
            //success
            if(!err){ 
                blogData.push(blogObj)
                resolve("New blog is created successfully")
                //reject
            }else{
                reject("Something went wrong while creating new blog!!")
            }
        }, 2500)
    })
}

const fetchBlogs = () =>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let err = Math.random() >= 0.5 ? false : true;
            if(!err){
                resolve(blogData)
            }else{
                reject("Something went wrong while fetching new blog!!")
            }
        }, 2000)
    })
}


// let newBlog = {
//     title:"Angular 18",
//     content :" Angular 18 boosts performance with zoneless change detection and improved signal debugging",
//     blogId :"126"
// }




blogForm.addEventListener("submit", onAddpost)
