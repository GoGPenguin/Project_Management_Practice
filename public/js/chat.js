import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

const formSendData = document.querySelector('.chat .inner-form')

if (formSendData) {
    formSendData.addEventListener('submit', (e) => {
        e.preventDefault()
        const content = e.target.elements.content.value

        if (content != "") {
            socket.emit('Client_send_message', content)
            e.target.elements.content.value = ""
            socket.emit('Client_send_typing', 'hidden')
        }
    })
}



socket.on('Server_return_message', (data) => {
    const myId = document.querySelector('[my-id]').getAttribute('my-id')
    const body = document.querySelector('.chat .inner-body')
    const boxTyping = document.querySelector('.inner-list-typing')

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

    body.insertBefore(div, boxTyping)

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

const showTyping = () => {
    socket.emit('Client_send_typing', 'show')

    clearTimeout(timeOut)

    timeOut = setTimeout(() => {
        socket.emit('Client_send_typing', 'hidden')
    }, 3000)
}

const emojiPicker = document.querySelector('emoji-picker')
if (emojiPicker) {
    const input = document.querySelector(".chat .inner-form input[name='content']")
    var timeOut;
    emojiPicker.addEventListener('emoji-click', (event) => {
        const icon = event.detail.unicode
        input.value = input.value + icon

        input.setSelectionRange(input.value.clientHeight, input.value.clientHeight)
        input.focus()
        showTyping()
    })



    input.addEventListener('keyup', () => {
        showTyping()
    })
}


const elementListTyping = document.querySelector('.chat .inner-list-typing')
if (elementListTyping) {
    socket.on('Server_return_typing', (data) => {
        if (data.type == 'show') {
            const existTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`)


            if (!existTyping) {
                const boxTyping = document.createElement('div')
                boxTyping.setAttribute('user-id', data.userId)
                boxTyping.classList.add('box-typing')
                boxTyping.innerHTML = `
                    <div class="box-typing">
                        <div class="inner-name">${data.fullName}</div>
                        <div class="inner-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                `
                elementListTyping.appendChild(boxTyping)
                const bodyChat = document.querySelector('.chat .inner-body')
                if (bodyChat) {
                    bodyChat.scrollTop = bodyChat.scrollHeight
                }
            }
        } else {
            const boxTypingRemove = elementListTyping.querySelector(`[user-id="${data.userId}"]`)

            if (boxTypingRemove) {
                elementListTyping.removeChild(boxTypingRemove)
            }
        }


    })
}