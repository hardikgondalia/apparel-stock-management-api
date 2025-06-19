# apparel-stock-management-api

## How to start application
Run `npm i` to install all dependecies
Run `npm run start` to start server

## API definations

As a vendor, I can update the stock quality and price of one apparel code and size.
`{{base_url}}/apparel/code/:code/size/:size`

As a vendor, I can simultaneously update the stock quality and price of several apparel
codes and sizes.
`{{base_url}}/apparel/bulk-update`

As a user, I should be able to check If I can fulfill the requirement of a customer order.
`{{base_url}}/order/check-fulfill`

As a user, I should be able to know the lowest cost at which I can get the order fulfilled.
`{{base_url}}/order/lowest-cost`
 

Postman collection is also attached with source code for reference

