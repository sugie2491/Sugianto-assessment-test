export const getCustomer = () => {
    const customerStr = localStorage.getItem('customerData')
    const customer = JSON.parse(customerStr)
    const now = new Date()
    const strNow = Math.ceil(Date.parse(now) / 1000)

    if (customerStr) {
        if (strNow > customer.expiry) {
            localStorage.removeItem('customerData')

            return null
        }

        return JSON.parse(customerStr)
    }

    return null
}

export const numberFormatPrice = (price) => {
    let priceDisplay = (price).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
    })

    return priceDisplay.replace('Rp', 'IDR')
}

export const removeCustomerSession = () => {
    localStorage.removeItem('customerData')
}

export const setCustomerSession = (customerId, customer) => {
    const now = new Date()
    const ttl = Math.ceil(now.setHours(now.getHours() + 2) / 1000)
	const item = {
		value: {
            "customerId": customerId,
            "customer": customer
        },
		expiry: ttl,
	}

	localStorage.setItem('customerData', JSON.stringify(item))
}