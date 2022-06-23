interface IUserResponseDTO {
    email: string;
    name: string;
    username: string;
    id: string;
    avatar: string;
    active: boolean;
    documentId: string;
    type: string;
    avatarUrl(): string;
}

export { IUserResponseDTO };
