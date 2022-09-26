function getPost(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(user => {
            let card="";
            let j=0;
            for(let i=0; i < data.length; i++){
                if(data[i].userId == user[j].id){
                    card+= 
                    `
                    <div class="container">               
                        <div class="col mb-4">
                            <div class="card bg-black p-2 " style="--bs-bg-opacity: .23;">
                                
                                <div class ="p-2 fs-5 text-left text-white">
                                    <div>${data[i].title}
                                        <div class="text-end">
                                            <div class="btn-group me-2" role="group">
                                                <button type="button" class="btn bg-black text-white" style="--bs-bg-opacity: .37;">+</button>
                                                <button type="button" class="btn bg-black text-white" style="--bs-bg-opacity: .37;">-</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class ="card-body bg-black text-left text-white-50 rounded-3 m-2" style="--bs-bg-opacity: .37;">
                                    <div class="price fs-7" class="price fs-8">${data[i].body}</div>
                                </div>
                                    
                                <div class="fs-6 text-white-50 mt-2 mb-2">
                                    <div class="text-end">
                                        <abbr class="bg-black text-white-50 rounded-3 p-1" style="--bs-bg-opacity: .37;">
                                            <abbr title="attribute">pre 14 sati</abbr>
                                            <span id="username" class="fst-italic">${user[j].name}</span>
                                            <button id='${data[i].id}' onclick="getId(this)" class="btn text-white-50 fst-italic"><b>Comments</b></button>
                                        </abbr>                                                
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                }else{
                j++;
                i--;
                }
            };
        document.getElementById("cards").innerHTML = card;
        });
    });
}             

function getId(btn){
    //console.log("BUTTON ID =  " + btn.id);
    let comment = "";
    getComments(btn.id)
        .then(com => {
            //console.log(com);
            for(let i=0; i < com.length; i++){
                comment += 
                    `
                        <div class="modal-dialog">
                            <div class="modal-content">
                        
                                <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">${com[i].email}</h5>
                                </div>
                            
                                <div class="modal-body">
                                ${com[i].title}
                                </div>
                
                                <div class="modal-body">
                                ${com[i].body}
                                </div>
            
                            </div>
                        </div>
                    `;
                    
            //console.log(com[i].email);
            }
            document.getElementById("modals").innerHTML = comment;
            
            var modal = new bootstrap.Modal(document.getElementById('modals'));
            modal.show();
            
        })     
}

async function getComments(id){
    const jsonComments = 'https://jsonplaceholder.typicode.com/comments';
    let comment = [];

    const response = await fetch(jsonComments);
    const data = await response.json();
    //console.log(data);
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
    //console.log(comment);
    return comment;   
}

async function getUser(id){
    const jsonUser = 'https://jsonplaceholder.typicode.com/users';
    let user="";
    const response = await fetch(jsonUser);
    const data = await response.json();
    //console.log(data);
        for(let i=0; i < data.length; i++){
            if(id == data[i].id){
                user = data[i].name;
            }
        }
    //console.log(user);
    return user;        
}