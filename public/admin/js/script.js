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

