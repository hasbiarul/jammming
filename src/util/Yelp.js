const apiKey = 'vmLQXKPbZIiQxc47IwTdOR5C9d5wCvWImxpB7g_17R1wZRrgxlX8el5UY-LBphzMxjLkiFS-xAafzTXvp0uUtEarxOZfqF3W_NNXkrXwRHiTMH3VbPDTmCVAJA5aWnYx';

let Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,{headers:{
            Authorization: `Bearer ${apiKey}`
        }}).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc: business.imageSrc,
                        name: business.name,
                        address: business.address,
                        city: business.city,
                        state: business.state,
                        zipCode: business.zipCode,
                        category: business.category,
                        rating: business.rating,
                        reviewCount: business.reviewCount
                    } 
                });
            }
        });
    }
};

export default Yelp;