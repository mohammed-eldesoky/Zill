export interface IMessage {
    _id: string;
    receiver: string;
    content: string;
    attachments: Array<any>;
    createdAt: Date;
    updatedAt: Date;
    
}
