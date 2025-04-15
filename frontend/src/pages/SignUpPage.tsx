import '../styles/signUpPage.css';

const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");

const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");

if (loginButton && registerButton && loginModal && registerModal) {
    loginButton.addEventListener("click", (e) => {
        e.stopPropagation();
        loginModal.classList.add("active");
    });

    registerButton.addEventListener("click", (e) => {
        e.stopPropagation();
        registerModal.classList.add("active");
    });

    window.addEventListener("click", (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove("active");
        }
        if (e.target === registerModal) {
            registerModal.classList.remove("active");
        }
    });
}


const registerSubmitButton = document.getElementById("registerSubmitButton");
const loginSubmitButton = document.getElementById("loginSubmitButton");

if (loginSubmitButton && registerSubmitButton) {
    registerSubmitButton.addEventListener("click", async (e) => {
        e.preventDefault();
        await signup();
    });

    loginSubmitButton.addEventListener("click", async (e) => {
        e.preventDefault();
        await login();
    });
}

async function signup() {
    const fileInput = document.getElementById("profilePicture");
    let file;
    if (fileInput) {
        file = (fileInput as HTMLInputElement).files?.[0];
    } 
    
    const registerLogin = document.getElementById("registerLogin") as HTMLInputElement;
    const registerPassword = document.getElementById("registerPassword") as HTMLInputElement;


    const user = {
        login: registerLogin.value,
        password: registerPassword.value,
        userPhoto: file
            ? {
                fileName: file.name,
                data: await getFileData(file),
            }
            : null, // Если файл не выбран, передаем null
    };
    

    try {
        const response = await fetch("/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data));
            window.location.href = `/page/${data.id}`;
        } else {
            const error = await response.text();
            console.error("Ошибка регистрации:", error);
            alert(error);
        }
    } catch (err) {
        console.error("Ошибка запроса:", err);
        alert("Не удалось зарегистрироваться. Проверьте соединение с сервером.");
    }
}

async function getFileData(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const result = e.target?.result;
            if (result && typeof result === "string") {
                const mimeType = file.type;
                const base64Data = result.split(",")[1];
                resolve(`data:${mimeType};base64,${base64Data}`);
            } else {
                reject(new Error("Ошибка чтения файла: результат пустой или неверного типа."));
            }
        };

        reader.onerror = function () {
            reject(new Error("Ошибка чтения файла."));
        };

        reader.readAsDataURL(file);
    });
}


async function login() {
    const login = document.getElementById("login") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const user = {
        login: login.value,
        password: password.value,
    };

    const response = await fetch('/user/login', {
        method: 'POST',
        headers: {},
        body: JSON.stringify(user)
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = `/page/${data.id}`;
    } else {
        const error = await response.text();
        console.error('Ошибка авторизации:', error);
        alert(error);
    }
}

export const SignUpPage = () => {
    return(
        <div id="sign-up-page">
            <main id="sign-up-main-container">
                <button id="loginButton"><span>ВОЙТИ</span></button>
                <button id="registerButton"><span>ЗАРЕГИСТРИРОВАТЬСЯ</span></button>
            </main>

            <div className="modal" id="loginModal">
                <div className="modal-content">
                    <h2>Войти</h2>
                    <input type="text" placeholder="Логин" id="login"/>
                    <input type="password" placeholder="Пароль" id="password"/>
                    <button id="loginSubmitButton">Войти</button>
                </div>
            </div>

            <div className="modal" id="registerModal">
                <div className="modal-content">
                    <h2>Зарегистрироваться</h2>
                    <input type="text" placeholder="Логин" id="registerLogin"/>
                    <input type="password" placeholder="Пароль" id="registerPassword"/>
                    <input type="file" id="profilePicture"/>
                    <button id="registerSubmitButton">Зарегистрироваться</button>
                </div>
            </div>
        </div>
    )
}