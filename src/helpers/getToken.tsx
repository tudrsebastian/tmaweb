import useUser from "../store/userStore";

export function getAccesToken() {
    const { token } = useUser();
    return token;
}