import { API } from "../../Api";

//create category
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};

//get all categories
export const getAllCategories = () => {
    return fetch(`${API}/categories`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

// delete category

export const deleteCategory = ( categoryId, userId, token ) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};

// get a category

export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

//update category

export const updateaCategory = ( categoryId, userId, token, category  ) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {'Authorization': `Bearer ${token}`
        },
        body: category
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};


//create product

export const createaProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {'Authorization': `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};

//getAll products

export const getAllProducts = () => {
    return fetch(`${API}/products`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

//delete a product

export const deleteProduct = ( productId, userId, token ) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};

//get a product

export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

//update a product

export const updateProduct = ( productId, userId, token, product ) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {'Authorization': `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};

