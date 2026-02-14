const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ValidFormLogin(email: string, password: string) {
    if (!email || !password) {
        return {
            error: true,
            message: "Todos los campos son obligatorios",
        };
    }
    if (!emailRegex.test(email)) {
        return {
            error: true,
            message: "El correo no es válido",
        };
    }

    if (password.length < 6) {
        return {
            error: true,
            message: "La contraseña debe tener al menos 6 caracteres",
        };
    }

    return {
        error: false,
        message: "",
    };
}

export function ValidFormRegister(nameUser: string, email: string, password: string) {
    if (!nameUser || !email || !password) {
        return {
            error: true,
            message: "Todos los campos son obligatorios",
        };
    }
    if(nameUser.length < 4) {
        return {
            error: true,
            message: "El nombre de usuario debe tener al menos 4 caracteres",
        };
    }
    if (!emailRegex.test(email)) {
        return {
            error: true,
            message: "El correo no es válido",
        };
    }
    if(password.length < 6) {
        return {
            error: true,
            message: "La contraseña debe tener al menos 6 caracteres",
        };
    }
    return{
        error: false,
        message: "",
    }
}