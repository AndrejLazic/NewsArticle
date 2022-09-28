async function getPost(){
    const response =  await fetch('https://jsonplaceholder.typicode.com/posts');
    var posts = await response.json();
    //console.log(posts);

    const response1 = await fetch('https://jsonplaceholder.typicode.com/users');
    var users = await response1.json();
    //console.log(users);

    //merge two JSONs into one, based od id and postId
    //to get username and post details in one JSON
    var j=0;
    var merge=[];
    for(let i=0; i < posts.length; i++){
        if(posts[i].userId == users[j].id){
            merge.push({...users[j], ...posts[i]});
        }else{
        i--;
        j++;
        }
    }
    
    const post = new Post(merge);
}

class Post{
    constructor(post){
        this.article = post;
        
        console.log(this.article);

        this.generatePosts();
    }

    generatePosts(){
        var card = "";
        for(let i=0; i<this.article.length; i++){
            card +=  `
                <div class="container">             
                <div class="col mb-4">
                    <div class="card bg-black p-2 " style="--bs-bg-opacity: .23;">
                        
                        <div class ="p-2 fs-5 text-left text-white">
                            <div>${this.article[i].title}
                                <div class="text-end">
                                    <div class="btn-group me-2" role="group">
                                        <button type="button" class="btn bg-black text-white" style="--bs-bg-opacity: .37;">+</button>
                                        <button type="button" class="btn bg-black text-white" style="--bs-bg-opacity: .37;">-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class ="card-body bg-black text-left text-white-50 rounded-3 m-2" style="--bs-bg-opacity: .37;">
                            <div class="price fs-7" class="price fs-8">${this.article[i].body}</div>
                        </div>
                        
                        <div class="fs-6 text-white-50 mt-2 mb-2">
                            <div class="text-end">
                                <abbr class="bg-black text-white-50 rounded-3 p-1" style="--bs-bg-opacity: .37;">
                                    <abbr title="attribute">pre 14 sati</abbr>
                                    <span id="username" class="fst-italic">${this.article[i].name}</span>
                                    <button id='${this.article[i].id}' class="btn text-white-50 fst-italic"><b>Comments</b></button>
                                </abbr>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                `;
            
        }
        document.getElementById("cards").innerHTML = card;
    }

    getArictleId(e){
        let button = e.target;
        let buttonId = getAttribute('id');
        let buttonValue = button.value;

        console.log(buttonId);
        console.log(buttonValue);
    }
}

async function getComments(){
    const response =  await fetch('https://jsonplaceholder.typicode.com/comments');
    const comm = await response.json();

    const comments = new Comments(comm)
}

class Comments{
    constructor(comm){

    }
    generateComments(){

    }
}
