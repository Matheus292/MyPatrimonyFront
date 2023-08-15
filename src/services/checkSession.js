import api from "./api";

export async function isLogged() {
    const token = localStorage.getItem("token");

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let result = null;

    await api.get('/api/check', config)
        .then(() => {
            result = true;
        }).catch(() => { result = false });

    return result;
}