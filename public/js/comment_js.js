
const commentTextEle =  document.querySelector('#CommentFormControlTextarea')
console.log("commentTextEle =",commentTextEle.value)
const commentSubmitBtnEle =  document.querySelector('#commentSubmitBtn')
const addCommentFormEle = document.querySelector('#postCommentForm')


function commentFormHandler(event) {
   
    event.preventDefault();
    const comment_text = commentTextEle.value.trim();
   

    const post_id_old = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const post_id = post_id_old.split('?')[0]



    fetch(`http://localhost:3001/api/comments`,{
      method:"POST",
      body:JSON.stringify({
            "comment_text":comment_text ,
            "post_id": post_id,
            "user_id": 3
          }),
      headers: {
            'Content-Type': 'application/json'
          }
    }).then((addCommentData)=>{
      console.log("addCommentData = ",addCommentData)
      if(addCommentData.status === 200){
        document.location.reload()
      }
    }).catch((err)=>{
      console.log(err)
    })


  }

     
  
  addCommentFormEle.addEventListener('submit', commentFormHandler);


  