import bcrypt from "bcrypt";

const pwHash = async (pw) => {
    const hashed = await bcrypt.hash(pw, 10);

    return hashed;
} 

const pwCompare = async (pw, hashed) => {
    return await bcrypt.compare(pw, hashed);
} 

export {
    pwHash,
    pwCompare
}