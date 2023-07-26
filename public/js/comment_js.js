// {{!-- console.log('eachCommentId = ',eachCommentId) --}}

  // console.log({{post.comments.id}})

  // {{#each post as |i|}}
  //     console.log({{i.comment_text}})
  // {{/each}}

  const commentTextEle = document.querySelector('#CommentFormControlTextarea')
  const commentUpdateEle = document.querySelector('.commentUpdate')
  const commentDeleteEle = document.querySelector('.commentDelete')
  const addCommentFormEle = document.querySelector('#postCommentForm')


  const commentAddFormHandler = (event)=> {

    event.preventDefault();
    const comment_text = commentTextEle.value.trim();


    const post_id_old = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const post_id = post_id_old.split('?')[0]


    fetch(`http://localhost:3001/api/comments`, {
      method: "POST",
      body: JSON.stringify({
        "comment_text": comment_text,
        "post_id": post_id,
        "user_id": 3
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((addCommentData) => {
      console.log("addCommentData = ", addCommentData)
      // if (addCommentData.status === 200) {
      //   {{!-- document.location.reload() --}}
      // }
    }).catch((err) => {
      console.log(err)
    })
  }


  const commentUpdateHandler = (id) => {
    fetch(`http://localhost:3001/api/comments/${id}`, {
      method: "PUT",
      body: JSON.stringify(
        {
          "post_id": 1,
          "comment_text": "this is my first blog post",
          "created_at": "2023-07-27T00:00:00.000Z",
          "updated_at": "2023-07-28T00:00:00.000Z",
          "post": {
            "id": 1,
            "title": "javascript",
            "created_at": "2023-07-27T00:00:00.000Z",
            "post_content": "const add = (a,b) "
          }
      }),
      headers: {
      "Content-Type": "application/json"
    }
  }).then((updateCommentData) => {
    console.log("updateCommentData ", updateCommentData)
  }).catch((err) => {
    console.error(err)
  })
  }




  const commentDeleteHandler = (id) => {
    fetch(`http://localhost:3001/api/comments/${id}`, {
      method: "DELETE"
    }).then((deleteCommentData) => {
      console.log("deleteCommentData ", deleteCommentData)
    }).catch((err) => {
      console.error(err)
    })
  }


  addCommentFormEle.addEventListener('submit', commentAddFormHandler);

  commentUpdateEle.addEventListener('click', ()=>commentUpdateHandler(1));

  commentDeleteEle.addEventListener('click', 
  ()=>commentDeleteHandler(1));


