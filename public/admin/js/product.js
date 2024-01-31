const buttonChange = document.querySelectorAll('[button-change-status]')

if (buttonChange.length > 0) {
    const formChange = document.querySelector('#form-change-status')
    const path = formChange.getAttribute('data-path')
    

    buttonChange.forEach(button => {
        button.addEventListener("click", ()=> {
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")

            let statusChange = statusCurrent == "active" ? "inactive" : "active"
            const action = path + `/${statusChange}/${id}?_method=PATCH`
            
            formChange.action = action

            formChange.submit();
        } )
    })
}