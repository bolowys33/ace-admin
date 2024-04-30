export function generateToken(): string {
    const token = crypto.randomUUID();
    console.log(token);

    return token;
}
