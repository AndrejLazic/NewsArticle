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

    //console.log(merge)
    const post = new Post(merge);
}

async function getComments(btn){
    console.log("BUTTON ID =  " + btn.id);

    const response =  await fetch('https://jsonplaceholder.typicode.com/comments');
    const comm = await response.json();

    const comments = new Comments(comm, btn.id);
}

class Post{
    constructor(post){
        this.article = post;

        //console.log(this.article);

        this.generatePosts();
    }

    generatePosts(){
        var card = "";
        for(let i=0; i<this.article.length; i++){
            card +=  `
                <div class="container">
                <div class="col mb-4">
                    <div class="card bg-black p-2 " style="--bs-bg-opacity: .23;">

                        <div class="modal-header m-2 ">
                            <div class="text-white fs-5">${this.article[i].title}</div>
                            <button id='${this.article[i].id}' onclick="Post.removePost(this)" class="btn btn-danger">X</button>
                        </div>

                        <div class ="card-body bg-black text-left text-white-50 rounded-3 m-2" style="--bs-bg-opacity: .37;">
                            <div class="price fs-7" class="price fs-8">${this.article[i].body}</div>
                        </div>

                        <div class="fs-6 text-white-50 mt-2 mb-2">
                            <div class="text-end">
                                <abbr class="bg-black text-white-50 rounded-3 p-1" style="--bs-bg-opacity: .37;">
                                    <span id="username" class="fst-italic">${this.article[i].name}</span>
                                    <button id='${this.article[i].id}' onclick="getComments(this)" class="btn text-white-50 fst-italic"><b>Comments</b></button>
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

    static removePost(btn){
        alert("Remove Post: " + btn.id);
    }
}

class Comments{
    constructor(comm, id){
        this.comments = comm;
        this.id = id;

        this.getComments(this.id);
    }

    getComments(){
        var data = this.comments;
        var id = this.id;
        let comment = [];
        let modal = "";
        for(let i=0; i < data.length; i++){
            if(id == data[i].postId){
                comment.push({
                    id: data[i].id,
                    postId: data[i].postId,
                    title: data[i].name,
                    body: data[i].body,
                    email: data[i].email
                });
            }
        }
        console.log(comment);

        for(let i=0; i<comment.length; i++){
            modal +=
                    `
                    <div class="modal-dialog">
                        <div class="modal-content">

                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${comment[i].email}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div class="modal-body">
                            ${comment[i].title}
                            </div>

                            <div class="modal-body">
                            ${comment[i].body}
                            </div>

                        </div>
                    </div>
                    `;
        }
        //console.log(modal);
        document.getElementById("modals").innerHTML = modal;

        var modals = new bootstrap.Modal(document.getElementById('modals'));
        modals.show();
    }

}
