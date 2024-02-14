import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

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
    else {
        div.classList.add('inner-incoming')
        div.innerHTML = `
        <div class="inner-name">${data.fullName}</div>
        `
    }

    div.innerHTML = div.innerHTML + `
        <div class="inner-content">${data.content}</div>
    `

    body.appendChild(div)
    bodyChat.scrollTop = bodyChat.scrollHeight
})

const bodyChat = document.querySelector('.chat .inner-body')
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight
}



const buttonIcon = document.querySelector('.button-icon')
if (buttonIcon) {
    const tooltip = document.querySelector('.tooltip')
    Popper.createPopper(buttonIcon, tooltip)

    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
    }
}



const emojiPicker = document.querySelector('emoji-picker')
if (emojiPicker) {
    const input = document.querySelector(".chat .inner-form input[name='content']")

    emojiPicker.addEventListener('emoji-click', (event) => {
        const icon = event.detail.unicode
        input.value = input.value + icon
    })
}