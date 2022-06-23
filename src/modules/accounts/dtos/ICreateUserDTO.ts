interface ICreateUserDTO {
    name: string;
    username: string;
    email: string;
    password: string;
    documentId: string;
    type: string;
    id?: string;
    avatar?: string;
}

export { ICreateUserDTO };
