const buttons = document.querySelectorAll("[button-status]")

if (buttons.length) {
    let url = new URL(window.location.href)

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            
            if (status) {
                url.searchParams.set("status", status)
            }
            else url.searchParams.delete("status")

            window.location.href = url.href

        })
    })
}

const searchForm = document.querySelector('#form-search') 

if (searchForm) {
    let url = new URL(window.location.href)

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const keyword = e.target.elements.keyword.value

        if (keyword) {
            url.searchParams.set("keyword", keyword)
        }
        else url.searchParams.delete("keyword")

        window.location.href = url.href
    })
}

const paginationBtn = document.querySelectorAll("[button-pagination]")

if (paginationBtn.length) {
    let url = new URL(window.location.href)

    paginationBtn.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")

            url.searchParams.set("page", page)

            window.location.href = url.href
        })
})
}

const checkboxMulti = document.querySelector('[checkbox-multi]')
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']")


    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true
            })
        }
        else {
            inputsId.forEach(input => {
                input.checked = false
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener('click', () => {
            const count = checkboxMulti.querySelectorAll("input[name='id']:checked").length

            if (count == inputsId.length) {
                inputCheckAll.checked = true
            }
            else inputCheckAll.checked = false
        })
    })
}

const formchangeMulti = document.querySelector("[form-change-multi]")
if (formchangeMulti) {
    formchangeMulti.addEventListener("submit", (e) => {
        e.preventDefault()

        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const inputsChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        )


        if (inputsChecked.length > 0) {
            let ids = []
            const inputIds = formchangeMulti.querySelector("input[name='ids']")
            
            inputsChecked.forEach(input => {
                const id = input.value
                ids.push(id)
            })

            inputIds.value = ids.join(", ")

            formchangeMulti.submit();
        }
        else {
            alert("Vui lòng chọn ít nhất 1")
        }
    })
}





