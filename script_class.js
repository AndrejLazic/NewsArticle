let thePosts = [];
let theUser = [];
let theComments = [];

async function jsonPost(){
    const jsonPost = 'https://jsonplaceholder.typicode.com/posts';
    const response =  await fetch(jsonPost);
    const data = await response.json();

    thePosts = data.map(post => new Post(post));

    //console.log(thePosts);
    //console.log(thePosts[9].getPostId());
    for(let i=0; i<=thePosts.length; i++){
        thePosts[i].createPost();
    }
    
}

async function parseJsonUser(){
    const jsonPost = 'https://jsonplaceholder.typicode.com/users';
    const response =  await fetch(jsonPost);
    const data = await response.json();

    let theUser = data.map(user => new User(user));
    //console.log(theUser);
    //console.log(theUser[9].getUserId());
}

async function parseJsonComm(){
    const jsonPost = 'https://jsonplaceholder.typicode.com/comments';
    const response =  await fetch(jsonPost);
    const data = await response.json();

    let theComments = data.map(comm => new Comments(comm));

    //console.log(theComments);
    //console.log(theComments[9].getCommentId());
}

jsonPost();
parseJsonUser();
parseJsonComm();

class Post{
    constructor(post){
        //console.log("constructor Post")
        this.title = post.title;
        this.body = post.body;
        this.id = post.id;
        this.username = "ANDREJ";
    }

    getPostId (){
        return this.id;
    }

    createPost(){
        let card = "";
            
                card +=  `
                <div class="container">             
                <div class="col mb-4">
                    <div class="card bg-black p-2 " style="--bs-bg-opacity: .23;">
                        
                        <div class ="p-2 fs-5 text-left text-white">
                            <div>${this.title}
                                <div class="text-end">
                                    <div class="btn-group me-2" role="group">
                                        <button type="button" class="btn bg-black text-white" style="--bs-bg-opacity: .37;">+</button>
                                        <button type="button" class="btn bg-black text-white" style="--bs-bg-opacity: .37;">-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class ="card-body bg-black text-left text-white-50 rounded-3 m-2" style="--bs-bg-opacity: .37;">
                            <div class="price fs-7" class="price fs-8">${this.body}</div>
                        </div>
                        
                        <div class="fs-6 text-white-50 mt-2 mb-2">
                            <div class="text-end">
                                <abbr class="bg-black text-white-50 rounded-3 p-1" style="--bs-bg-opacity: .37;">
                                    <abbr title="attribute">pre 14 sati</abbr>
                                    <span id="username" class="fst-italic">${this.username}</span>
                                    <button id='${this.id}' onclick="getId(this)" class="btn text-white-50 fst-italic"><b>Comments</b></button>
                                </abbr>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                `;
            
        document.getElementById("cards").innerHTML = card;
    }

}

class User{
    constructor(user){
        //console.log("constructor User")
        this.name = user.name;
        this.id = user.id;
    }

    getUserId(){
        return this.id;
    }

}

class Comments{
    constructor(comm){
        //console.log("constructor Comments")
        this.title =  comm.name;
        this.body = comm.body;
        this.email = comm.email;
        this.postId = comm.postId;
    }

    getCommentId(){
        return this.postId;
    }

    createComments(){
        var comment = 
                    `
                        <div class="modal-dialog">
                            <div class="modal-content">
                        
                                <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">${this.email}</h5>
                                </div>
                            
                                <div class="modal-body">
                                ${this.title}
                                </div>
                
                                <div class="modal-body">
                                ${this.body}
                                </div>
            
                            </div>
                        </div>
                    `;

        document.getElementById("modals").innerHTML = comment;

        var modal = new bootstrap.Modal(document.getElementById('modals'));
        modal.show();
    }

}

function getId(btn){
    console.log("BUTTON ID =  " + btn.id);
}