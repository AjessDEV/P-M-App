class Password {
    constructor(platform, user, pass) {
        this.platform = platform
        this.user = user
        this.pass = pass
    }
}

class Interface {
    addPassword(pass) {
        const passContainer = document.getElementById('passwords-container')
        const passAdded = document.createElement('div')

        passAdded.innerHTML = `<div class="password">
        <h4 class="pass-platform">${pass.platform}</h4>
        <h4 class="pass-user">${pass.user}</h4>
        <button class="view-p" id="viewPass"><i class="ti ti-eye-filled"></i></button>
        <div class="password-view">
            <div class="pv-container">
                <div class="pv-1">
                    <button class="pv-close-btn" id="pv-close-btn"><i class="ti ti-x"></i></button>
                </div>
                <h2>Tu Contraseña es:</h2>
                <br>
                <h1>${pass.pass}</h1>
            </div>
        </div>
    </div>`


        const viewPassButton = passAdded.querySelector('.view-p');
        const passwordViewCont = passAdded.querySelector('.password-view');
        const passView = passAdded.querySelector('.pv-container')

        viewPassButton.addEventListener('click', () => {
            passwordViewCont.classList.add('password-view_active');
            passView.classList.add('pv-container_active')
            document.body.setAttribute('style', 'pointer-events: none;')
        });

        const closePassViewBtn = passAdded.querySelector('.pv-close-btn')
        closePassViewBtn.addEventListener('click', () => {
            passwordViewCont.classList.remove('password-view_active');
            passView.classList.remove('pv-container_active')
            document.body.removeAttribute('style', 'pointer-events: none;')
        })

        passContainer.appendChild(passAdded)
        this.reset()
    }

    message(text) {
        const p = document.createElement('p')
        p.className = 'pass-added'
        p.appendChild(document.createTextNode(text))
        const container = document.querySelector('.ap-container')
        const form = document.querySelector('.a-p-form')
        container.insertBefore(p, form)

        setTimeout(function() {
            document.querySelector('.pass-added').remove()
        }, 2500)
    }

    reset() {
        document.getElementById('adform').reset()
    }

}

// DOM

document.getElementById('adform').addEventListener('submit', e => {
    e.preventDefault()

    const platform = document.getElementById('platform').value
    const user = document.getElementById('user').value
    const pass = document.getElementById('pass').value

    const password = new Password(platform, user, pass)

    const appInterface = new Interface()
    appInterface.addPassword(password)
    appInterface.message('Contraseña Añadida Satisfactoriamente')
})


// Search Passwords in List

document.addEventListener('keyup', e => {
    if(e.target.matches('#search')) {
        document.querySelectorAll('.password').forEach(pass => {
            pass.textContent.toLocaleLowerCase().includes(e.target.value)
            ? pass.classList.add('filter')
            : pass.classList.remove('filter')
        })
    }
})