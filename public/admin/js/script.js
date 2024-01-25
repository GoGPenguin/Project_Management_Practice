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


