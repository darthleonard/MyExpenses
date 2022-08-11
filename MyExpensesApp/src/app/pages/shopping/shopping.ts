export type ShoppingRepository = {
    shoppingLists: Shopping[]
}

export type Shopping = {
    id: string,
    creationDate: Date,
    lastModDate: Date,
    effectiveDate: Date,
    name: string,
    products: Product[]
}

export type Product = {
    id: string,
    name: string,
    brand: string,
    store: string,
    unitPrice: number,
    quantity: number,
    amount: number,
    image: string,
    onCar: boolean
}
