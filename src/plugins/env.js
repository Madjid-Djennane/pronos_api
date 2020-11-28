require('dotenv').config({ path: '.env' })
if (!process.env.NODE_ENV) {
    throw new Error('!!! NO ENVIRONMENT SET !!!')
}
