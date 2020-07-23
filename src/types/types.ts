export type PostType = {
    id: number,
    message: string | null,
    likes: number,
    photo: string | null
};
export type PhotoType = {
    "small": string | undefined | null,
    "large": string | undefined | null
};
export type ContactsType = {
    "facebook": string | null,
    "website": string | null,
    "vk": string | null,
    "twitter": string | null,
    "instagram": string | null,
    "youtube": string | null,
    "github": string | null,
    "mainLink": string | null
};
export type ProfileType = {
    "aboutMe": string | null,
    "contacts": ContactsType,
    "lookingForAJob": boolean,
    "lookingForAJobDescription": string | null,
    "fullName": string | null,
    "userId": number,
    "photos": PhotoType
};
export type UserType = {
    id: number,
    name: string | number,
    status: string | number,
    photos: PhotoType,
    followed: boolean,
    uniqueUrlName: string | null

};
export type PaginationType = {
    total:number,
    current:number,
    limit: number
}

export type DialogType = {
    id: number,
    name: string | null
};
export type MessagesType = {
    id: number,
    message: string | null
};
export type FieldValidatorType = (value: string) => string | undefined