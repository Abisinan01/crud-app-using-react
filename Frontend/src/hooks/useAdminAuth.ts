import axios from "axios";
import { useEffect, useState } from "react";
import type { AuthType } from "../interfaces/authType";
const localUrl = import.meta.env.VITE_API_URL

export const useAdminAuth = () => {
    const [auth, setAuth] = useState<AuthType>({
        token: null,
        role: null,
        isRemoved: false
    })
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${localUrl}/authenticated`, { withCredentials: true })
            .then((res) => {
                console.log(`Auth data : ${res.data.isRemoved}`)
                setAuth({ token: res.data.token, role: res.data.role, isRemoved: res.data.isRemoved })
            })
            .catch(() => {
                setAuth({ token: null, role: null, isRemoved: false })
            })
            .finally(() => setLoading(false));
    }, []);

    return { ...auth, loading }
}