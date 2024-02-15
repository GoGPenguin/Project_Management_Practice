const listBtnAddFriend = document.querySelectorAll('[btn-add-friend]')

if (listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.box-user').classList.add('add')
            console.log(button.closest('.box-user'))
            const userId = button.getAttribute("btn-add-friend")
            
            socket.emit('Client_add_friend', userId)
        })
    })
}