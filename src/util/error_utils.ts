export const parseError = (statusCode: number) => {
    switch (statusCode) {
            case 403:
                return "Username and Password not found"
            case 401:
                return "You are not logged in"
            default:
                return "A server error occurred"
        }
}