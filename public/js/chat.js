const formSendData = document.querySelector('.chat .inner-form')

if (formSendData) {
    formSendData.addEventListener('submit', (e) => {
        e.preventDefault()
        const content = e.target.elements.content.value

        if (content) {
            socket.emit('Client_send_message', content)
            e.target.elements.content.value = ""
        }
    })
}



socket.on('Server_return_message', (data) => {
    const myId = document.querySelector('[my-id]').getAttribute('my-id')
    const body = document.querySelector('.chat .inner-body')

    const div = document.createElement('div')
    
    if (myId == data.userId) 
        div.classList.add('inner-outgoing')
    else
        div.classList.add('inner-incoming')

    div.innerHTML = `
        <div class="inner-name">${data.fullName}</div>
        <div class="inner-content">${data.content}</div>
    `

    body.appendChild(div)
})