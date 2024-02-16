const listBtnAddFriend = document.querySelectorAll('[btn-add-friend]')

if (listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.box-user').classList.add('add')
            const userId = button.getAttribute("btn-add-friend")
            
            socket.emit('Client_add_friend', userId)
        })
    })
}

const listBtnCancelAdd = document.querySelectorAll('[btn-cancel-friend')
if(listBtnCancelAdd.length > 0) {
    listBtnCancelAdd.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.box-user').classList.remove('add')
            const userId = button.getAttribute('btn-cancel-friend')

            socket.emit('Client_cancel_add', (userId))
        })
    })
}