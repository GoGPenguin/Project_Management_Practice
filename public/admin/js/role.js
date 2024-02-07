const tablePermissions = document.querySelector('[table-permissions]')

if (tablePermissions) {
    const buttonSubmit = document.querySelector('[button-submit]')

    buttonSubmit.addEventListener('click', () => {
        let permissions = []

        const rows = tablePermissions.querySelectorAll('[data-name]')


        rows.forEach(item => {
            const name = item.getAttribute('data-name')
            const inputs = item.querySelectorAll('input')

            if (name == 'id') {
                inputs.forEach(input => {
                    const id = input.value
                    permissions.push({
                        id: id,
                        permissions: []
                    })
                })
            } else {
                inputs.forEach((input, index) => {
                    const checked = input.checked

                    if (checked) permissions[index].permissions.push(name)
                })
            }
        })

        if (permissions.length > 0) {
            const formChange = document.querySelector('#form-change-permissions')
            const inputPermissions = formChange.querySelector("input[name='permissions']")

            inputPermissions.value = JSON.stringify(permissions)

            formChange.submit()
        }
    })
}

const dataRecords = document.querySelector('[data-records]')

if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute('data-records'))
    const tablePermissions = document.querySelector('[table-permissions]')

    records.forEach((item, index) => {
        const permissions = item.permissions

        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`)
            const input = row.querySelectorAll('input')

            input[index].checked = true;

        })
    })

}