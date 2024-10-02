export function request(ctx) {
    return dynamoDBScanInvoicesRequest(ctx.args);
}

export function response(ctx) {
    return formatResponse(ctx.result);
}

/**
 * A helper function to get a list of invoices from DynamoDB
 */
function dynamoDBScanInvoicesRequest({ first, after }) {
    return {
        operation: "Scan",
        limit: first || 10,
        nextToken: after,
    };
}

function formatResponse(result) {
    const edges = Array.isArray(result.items) ? result.items.map(item => ({
        cursor: result.nextToken,
        node: item,
    })) : [];

    const pageInfo = {
        hasNextPage: Boolean(result.nextToken),
        startCursor: edges.length > 0 ? edges[0].cursor : null,
        endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    };

    return {
        edges,
        pageInfo,
    };
}
