const formSendData = document.querySelector('.chat .inner-form')

if (formSendData) {
    formSendData.addEventListener('submit', (e) => {
        e.preventDefault()
        const content = e.target.elements.content.value
        
        if(content) {
            socket.emit('Client_send_message', content)
            e.target.elements.content.value = ""
        }
    })
}

