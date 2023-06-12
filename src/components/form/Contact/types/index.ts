import {MouseEvent} from "react";

export type SubmitParams = {
    isSending: boolean;
    isSent: boolean;
    formError: string;
    sentError: string;
    sendMessage: (event: MouseEvent<HTMLElement>) => Promise<any>;
}