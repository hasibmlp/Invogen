import { Context } from '@aws-appsync/utils'

export const request = (ctx: Context) => {
    const { shopId, name, content } = ctx.args;

    if (!shopId || !name || !content) {
        throw new Error('Missing required arguments');
    }
    

    return {
        operation: 'UpdateItem',
        key: {
            shopId: { S: shopId }
        },
        updateExpression: 'ADD templates :template',
        expressionAttributeValues: {
            ':template': { M: {
                [name]: { S: content }
            }}
        },
    }
}

export const response = (ctx: Context) => {
    return ctx.result;
}  