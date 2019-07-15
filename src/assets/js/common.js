import {Message} from "element-ui";
 export const messages = function (type, message) {
     if (message !== ''){
        Message({
            type: type,
            message: message
        });
    }
    return;
};