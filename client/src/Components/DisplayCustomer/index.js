import React,{useEffect,useState} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import {fetchcustomer,fetchvendor} from '../../Api'
import './DisplayCustomer.scss'
import Controls from '../controls/Controls';
 
import axios from 'axios'



const DisplayCustomer = ({Sales}) => {
    const params = useParams();
    const history = useHistory();
    const [customer, setCustomerData] = useState(null)



    const fetchAPI = async () => {
        if(Sales){
            setCustomerData(await fetchcustomer(params.id));
        }
        else{
            setCustomerData(await fetchvendor(params.id))
        }
        
    }
  
    useEffect(() => {
        fetchAPI();
    }, []);



    // useEffect(() =>{
    //     axios({
    //         url:`http://localhost:5000/items/${params.id}`,
    //         method: 'GET'
    //     }).then((res)=>{setItemData(res.data)})
    //     .catch((err)=>{console.error(err)})
    // },[])


    return (
        <>

            {customer && 
            <div className='box'>


            <div className='box-row'>
            <div className='box-row-header'>

            <h1>{customer.display_name}</h1>
            <h2>{customer.mobile_number}</h2>

            </div>

            <div className='box-row-button'>
            <Controls.Button color="secondary" 
                text='Back'
                 onClick={()=>{history.goBack()}}
                >Back</Controls.Button>
            </div>
            </div>

            <div className='box-boxcol'>

            <div className='box-col1'>
                {/* <div className='box-boxcol-row'><p className='box-boxcol-head'>Customer ID :</p><p>{customer._id}</p></div> */}
                {Sales && <div className='box-boxcol-row'><p className='box-boxcol-head'>Customer Type :</p><p>{customer.customer_type}</p></div>}
                <div className='box-boxcol-row'><p className='box-boxcol-head'>Currency Code :</p><p> {customer.currency}</p></div>
                <div className='box-boxcol-row'><p className='box-boxcol-head'>Payment Terms:</p><p> {customer.payment_terms}</p></div>
                <div className='box-boxcol-row'><p className='box-boxcol-head'>GST Treatment:</p><p> {customer.gst_treatment}</p></div>
                <div className='box-boxcol-row'><p className='box-boxcol-head'>Place Of Supply:</p><p> {customer.place_of_supply}</p></div>
                <div className='box-boxcol-row'><p className='box-boxcol-head'>Tax Preference:</p><p> {customer.tax_preference}</p></div>
            </div>

            <div className='box-col2'>
                <p className='box-col2-headings'>Billing Address</p>
                <div className='box-boxcol-row'><p>{customer.BA_country}  </p></div>
                <div className='box-boxcol-row'><p> {customer.BA_address_street1}</p></div>
                <div className='box-boxcol-row'><p> {customer.BA_address_street2 && customer.BA_address_street2}</p></div>
                <div className='box-boxcol-row'><p> {customer.BA_city}</p></div>
                <div className='box-boxcol-row'><p> {customer.BA_state}</p></div>
                <div className='box-boxcol-row'><p> {customer.BA_zipcode}</p></div>


                <p className='box-col2-headings'>Shipping Address</p>
                <div className='box-boxcol-row'><p>{customer.SP_country}  </p></div>
                <div className='box-boxcol-row'><p> {customer.SP_address_street1}</p></div>
                <div className='box-boxcol-row'><p> {customer.SP_address_street2 && customer.SP_address_street2}</p></div>
                <div className='box-boxcol-row'><p> {customer.SP_city}</p></div>
                <div className='box-boxcol-row'><p> {customer.SP_state}</p></div>
                <div className='box-boxcol-row'><p> {customer.SP_zipcode}</p></div>
               
            </div>

            
           

            </div>
           


            </div>
            }
        
        </>
    )
}

export default DisplayCustomer;
