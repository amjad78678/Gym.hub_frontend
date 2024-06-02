interface iMessageType {
    sender: string;
    receiver: string;
    content: string;
    createdAt?: Date;
}

export default iMessageType