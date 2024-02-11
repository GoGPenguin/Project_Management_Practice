const showAlert = document.querySelector('[show-alert]')
if (showAlert) {
    const time = showAlert.getAttribute("data-time")
    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, parseInt(time))

    const closeAlert = showAlert.querySelector('[close-alert]')
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden")
    })
}