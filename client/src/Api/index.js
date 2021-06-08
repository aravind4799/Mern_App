import axios from "axios";

const url = "/items/";
const url2="/customers/";
const url3="/invoice/";

export const fetchdata = async () => {
    try{
        // const { data :{name,SKU,category,selling_price,HSN_Code,opening_stock,unit}} = await axios.get(url);
        // return {name,SKU,category,selling_price,HSN_Code,opening_stock,unit};
        const data=await axios.get(url)
        console.log(data)
        return data.data
    }
    catch(error){
        console.log(error)
    }

}

export const fetchcustomerdata = async () => {
    try{
        const data=await axios.get(url2)
        console.log(data)
        return data.data
    }
    catch(error){
        console.log(error)
    }

}
export const fetchinvoicedata = async () => {
    try{
        const data=await axios.get(url3)
        // console.log(data)
        return data.data
    }
    catch(error){
        console.log(error)
    }

}

export const fetchcustomerdetails = async () => {
    try{
        const data=await axios.get(url2)
        console.log(data.data.length)
        const names=[]
        for(let i=0;i<data.data.length;i++){
            names.push(
                {
                name:data.data[i].display_name,
                id:data.data[i]._id,
                billing_address:{
                    ba_country:data.data[i].BA_country,
                    ba_city:data.data[i].BA_city,
                    ba_state:data.data[i].BA_state,
                    ba_address: data.data[i].BA_address_street1 || data.data[i].BA_address_street2,
                    ba_zipcode:data.data[i].BA_zipcode
                },
                shipping_address:{
                    sp_country:data.data[i].SP_country,
                    sp_city:data.data[i].SP_city,
                    sp_state:data.data[i].SP_state,
                    sp_address: data.data[i].SP_address_street1 || data.data[i].SP_address_street2,
                    sp_zipcode:data.data[i].SP_zipcode
                },
                place_of_supply:data.data[i].place_of_supply
            })
        }
        return names;
    }
    catch(error){
        console.log(error)
    }

}

export const fetchitem = async (id) => {
    try{
        console.log(id)
        let fetchurl =`http://localhost:5000/items/${id}`
        const data=await axios.get(fetchurl)
        console.log(data.data)
        return data.data
    }
    catch(error){
        console.log(error)
    }

}

export const fetchcustomer = async (id) => {
    try{
        console.log(id)
        let fetchurl =`http://localhost:5000/customers/${id}`
        const data=await axios.get(fetchurl)
        console.log(data.data)
        return data.data
    }
    catch(error){
        console.log(error)
    }

}
