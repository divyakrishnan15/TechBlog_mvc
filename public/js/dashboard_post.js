
//ADD POST
const postTitleEle = document.querySelector('.postTitle')
const postMsgEle = document.querySelector('.postMsg')
const addPostFormEle = document.querySelector('#addPostFormId')

const userPostUpdateEle = document.querySelector('.userPostUpdate')
const userPostDeleteEle = document.querySelector('.userPostDelete')

const delID1 = document.location.toString().split('/')[document.location.toString().split('/').length-1]
console.log("delID = ",delID1)

        function addUserPostForm(event) {
            event.preventDefault()

            fetch('/api/posts', {
                method: "POST",
                body: JSON.stringify({
                    "title": postTitleEle.value,
                    "post_content": postMsgEle.innerText,
                    "user_id": 1
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((adPostData) => {
                console.log("add POst data = ", adPostData)
                document.location.reload()
            }).catch((err) => {
                console.log(err)
            })
        }




//DELETE POST

        //from url
    const delID = document.location.toString().split('/')[document.location.toString().split('/').length-1]
    console.log("delID = ",delID)
    
    const deleteUserPostForm = document.querySelector(".deleteUserPostForm")

    // //from db
    // const delpostsId = delposts.id
    // console.log("delete id ==== ", delpostsId)


    function deleteUserPost(event) {
        event.preventDefault();


        console.log("delpostsId id 2 ==== ", delpostsId)
        fetch(`/api/posts/${delpostsId}`, {
            method: "DELETE",
        }).then((delUserPostData) => {
            console.log(delUserPostData)
            document.location.replace('/dashboard')
        }).catch((err) => {
            console.error(err)
        })
    }


    const updateUserPostForm = document.querySelector(".updateUserPostForm")
    let dashboardEditText = document.querySelector(".dashboardEditText")
    let dashboardEditTitle = document.querySelector(".dashboardEditTitle")

    // const updateid = {{editposts.id}}
    // console.log("update id ==== ", {{editposts.id}})




//UPDATE
    function updateUserPost(event) {
        event.preventDefault();


        console.log("update id 2 ==== ", dashboardEditText.innerText)
        fetch(`/api/posts/${updateid}`, {
            method: "PUT",
            body: JSON.stringify({
                    "title":dashboardEditTitle.value, 
                    "post_content":dashboardEditText.innerText
                }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((updateCommentData) => {
            console.log("updateCommentData ", updateCommentData)
             document.location.replace('/dashboard')
        }).catch((err) => {
            console.error(err)
        })
    }



    updateUserPostForm.addEventListener('submit', updateUserPost)

    deleteUserPostForm.addEventListener('submit', deleteUserPost)

    addPostFormEle.addEventListener('submit', addUserPostForm)
