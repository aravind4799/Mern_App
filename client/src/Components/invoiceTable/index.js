import React, { useState, useEffect } from 'react';
import './App.css';
import MaterialTable from 'material-table'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Icons from './tableIcons';
import { setQuarter } from 'date-fns';
import { fetchdata } from '../../Api'
import { MenuItem, Select, Button } from '@material-ui/core';
import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'
import Notification from '../Notification';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from "axios";
import getSeconds from 'date-fns/esm/getSeconds/index';

//  import { useFormikContext } from 'formik';


const AddInvoiceTable = ({ editRecordData, setFieldValue, taxType }) => {
  console.log(taxType)

  // const { submitForm } = useFormikContext();
  // const handleSubmit = () => {
  let itemList = []
  if (editRecordData) {
    itemList = [
      ...editRecordData.items
    ]
  }
  else {
    itemList = []
  }



  //   submitForm();
  // }
  // {console.log(hi)}

  const [item_data, setItemData] = useState([])
  const fetchAPI2 = async () => {
    await fetchdata().then(
      (data) => {
        setItemData(data);
        console.log('Data loaded from useEffect');
        console.log(data);
      }
    );


  }
  const [data, setData] = useState(itemList)
  const [rate, setRate] = useState(0)
  const [tax, setTax] = useState('')
  const [tax_preference,setTaxPreference] = useState("")
  const[round_off,setRoundoff]=useState(0)
 
  const [gst,setGst]=useState(0)
  const [finalTotal,setFinalTotal] = useState(0)

  const[itemData, setProductData] = useState({})

  const[calculation_array,setCalculationArray]=useState([])
  const[rate_tax_array,setRateTax]=useState([])

  const [table_data, setTableData] = useState({
    itemName: '',
    itemQuantity: 0,
    itemRate: 0,
    tax:0,
    discountType: editRecordData ? editRecordData.discount_type : 'number',
    discountAmount: editRecordData ? editRecordData.discount_amount : 0,
    shippingCharges: editRecordData ? editRecordData.shipping_charges : 0,
    subTotal: editRecordData ? editRecordData.sub_total : 0,
    finalTotal: editRecordData ? editRecordData.invoice_amount : 0,
    itemData: {}
  })

  useEffect(() => {
    fetchAPI2()
  }, []);

  useEffect(() => {
    calculateTotal()
    // setFieldValue('invoice_amount',table_data.finalTotal)
    setFieldValue('sub_total', table_data.subTotal)
    setFieldValue('discount_amount', table_data.discountAmount)
    setFieldValue('discount_type', table_data.discountType)
    setFieldValue('shipping_charges', table_data.shippingCharges)
  }, [table_data.shippingCharges, table_data.discountAmount, table_data.discountType, table_data.subTotal])

  useEffect(() => {
    setFieldValue('invoice_amount', table_data.finalTotal)
  }, [table_data.finalTotal])

  useEffect(() => {
    setFieldValue('items', data)
  }, [data])

  useEffect(() => {
    setRate(itemData.selling_price)
    if (taxType) {
      setTax(itemData.inter_tax_rate)
    }
    else {
      setTax(itemData.intra_tax_rate)
    }

  },[table_data.itemName])

  useEffect(() => {
    calculateGST()
  },[rate_tax_array])

 useEffect(() => {
   let i;
   let final_tax=0;
   let final_discounted_amount=0;
   let final_total=0;
   let calc_array=[]
   console.log(rate_tax_array)

  rate_tax_array.map((data,index)=>{
      let UNIT_PRICE = tax_preference==='exclude' ? data.amount : (data.amount/(100+data.tax))*100
      let DISCOUNTED_AMOUNT = table_data.discountType==='percentage' ? (UNIT_PRICE - (UNIT_PRICE * table_data.discountAmount) / 100) : UNIT_PRICE-table_data.discountAmount
      calc_array.push(
        {
        amount:data.amount,
        tax:data.tax,
        unit_price: UNIT_PRICE,
        discounted_amount: DISCOUNTED_AMOUNT,
        tax_amount:DISCOUNTED_AMOUNT*data.tax/100
      })

  })
  console.log(calc_array)
  setCalculationArray(calc_array)
  for(i=0; i<calc_array.length; i++){
    final_tax+=calc_array[i].tax_amount
    final_discounted_amount+=calc_array[i].discounted_amount
  }
  setGst(final_tax)
  console.log(gst)
  if(tax_preference==='exclude'){
    final_total=final_discounted_amount+final_tax
  }
  else{
    final_total=final_discounted_amount+final_tax
  }

  let FinalTotal = final_total+parseInt(table_data.shippingCharges)

  // let FinalTotal_before_decimal= FinalTotal/1

  // let FinalTotal_after_decimal=FinalTotal%1

  // if(FinalTotal_after_decimal >=0.5 ){
  //   FinalTotal=FinalTotal_before_decimal+1
  // }
  // else{
  //   FinalTotal=FinalTotal_before_decimal
  // }
  // let roundoff= 1-FinalTotal_after_decimal
  // setRoundoff(roundoff)
   setRoundoff(Math.round(FinalTotal)-FinalTotal)

  setFinalTotal(  Math.round(FinalTotal))


  console.log(finalTotal)


 },[tax_preference,table_data.discountType,table_data.discountAmount,rate_tax_array,table_data.shippingCharges])





  const columns = [
    { title: "ID", field: "id", editable: false },
    {
      title: "Item Details", field: "item_name", editComponent: () => (
        <Autocomplete
          id="item_box"
          onChange={(event, newValue) => {
            console.log(newValue);
            setProductData(newValue)
          }}

          options={item_data}
          getOptionLabel={(option) => option.name ? option.name : ""}
          getOptionSelected={(option, value) => option === value}
          value={itemData}
          onInputChange={(event, inputValue) => {
            console.log(inputValue)
            setTableData((prev_value) => ({
              ...prev_value,
              itemName: inputValue,
            }))

            console.log(table_data)
          }}
          inputValue={table_data.itemName}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Item Name" variant="outlined" />}
        />
      )
    },
    {
      title: "Quantity", field: "qty", editComponent: () => (
        <TextField
          value={table_data.itemQuantity}
          InputProps={{
            inputProps: {
              min: 0
            }
          }}
          onChange={(event, newValue) => {
            console.log('Quantity: ' + event.target.value);
            setTableData((prev_value) => ({
              ...prev_value,
              itemQuantity: event.target.value,
            }))
            console.log(table_data)
          }}
          type="number"
          min="1"
        />
      )
    },
    {
      title: "Rate", field: 'rate', editComponent: () => (
        <TextField
          value={rate}
          onChange={(event, newValue) => {
            setRate(event.target.value);
          }}
          type="numeric"
        />
      )
    },
    {
      title: "Tax", field: "tax", editComponent: () => (
        // <Autocomplete
        // id="tax_box"
        // value={taxType}
        // onChange={(event, newValue) => {
        //     setTaxType(newValue.tax_preference);
        // }}
        // options={item_data}
        // getOptionLabel= {(option) => option.tax_preference ? option.tax_preference : ""}
        // style={{ width: 300 }}
        // renderInput={(params) => <TextField {...params} label="Tax Type" variant="outlined" />}
        // />
        <TextField
          value={tax ? tax : 0}
          disabled
          //   onChange={(event, newValue) => {
          //     setRate(newValue);
          // }}
          type="text"
        />
      )
    },
    {
      title: "Amount", field: "amt", editComponent: () => (
        <TextField
          value={rate ? rate * table_data.itemQuantity : 0}
          type="numeric"
        />
      )
    }
  ]

  function calculateTotal() {
    console.log('called')
    let total = 0;

    if (table_data.subTotal !== 0 || table_data.shippingCharges !== 0 || table_data.discountAmount !== 0) {

      if (table_data.discountType === 'percentage') {
        total = table_data.subTotal - ((table_data.subTotal * table_data.discountAmount) / 100) + table_data.shippingCharges;
      } else {
        total = table_data.subTotal - table_data.discountAmount + table_data.shippingCharges;
      }
      console.log(total)
      setTableData((prev_value) => ({
        ...prev_value,
        finalTotal: total
      }))


      console.log(table_data)

    }

   

    // setTotal(total)
    // setFieldValue('total',total)


    // return total;
  }
  function calculateGST(){
    let gstTax=0;
    rate_tax_array.map((data,index)=>{
      gstTax+=data.tax_amount
    })
    setGst(gstTax)

  }



  return (
    <div className="App">
           <TextField
          type="text"
          label="tax preference"
          select
          variant="standard"
          helperText="tax preference"
          style={{ width: '25%'}}
          margin="normal"
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label 
          onChange={(e)=>{
            setTaxPreference(e.target.value)
          }}  
        >
          <MenuItem value="include"  > Tax-Inclusive</MenuItem>
          <MenuItem value="exclude" > Tax-Exclusive</MenuItem>
        </TextField>

        {/* <p>{taxtype}</p> */}

       
      <MaterialTable
        style={{ fontSize: '20%' }}
        icons={Icons}
        title="Add Items"
        data={data}

        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const itemToAdd = table_data.itemName;
            const rateToAdd = rate;
            const taxToAdd = tax;
            const amountToAdd = table_data.itemQuantity * rateToAdd;
            const quantityToAdd = table_data.itemQuantity;

            let newAppendRow = { id: Math.floor(Math.random() * 100), item_name: itemToAdd, rate: rateToAdd, amt: amountToAdd, tax: taxToAdd, qty: quantityToAdd, ...newRow }
            console.log(newAppendRow);
       
            console.log(rate_tax_array);

            setRateTax((prev_value)=>{
              
              return([...prev_value,
                {
                id:newAppendRow.id,
                amount:amountToAdd,
                tax:taxToAdd,
                unit_price: null,
                discounted_amount:null,
                tax_amount:null
              }
              ])
            })             
           
            const updatedRows = [...data, newAppendRow]
            let sub = 0;
            updatedRows.forEach(row => {
              const rowamt = row.amt;
              sub = sub + rowamt;
            })


            setTimeout(() => {
              setData(updatedRows)
              // setSubTotal(sub);
              setTableData((prev_value) => ({
                ...prev_value,
                subTotal: sub
              }))
              // setProductsData(updatedRows)
              resolve()
            }, 500)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setData(updatedRows)
              // setProductsData(updatedRows)
              let i;

              for(i=0;i<rate_tax_array.length;i++){
                
                  rate_tax_array = rate_tax_array.filter(item => item.id===index)
                  setRateTax(rate_tax_array)
                  console.log(rate_tax_array)
               
              }


              resolve()
            }, 2000)
          }),
          onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
            console.log(updatedRow)
            console.log(oldRow)
            const index = oldRow.tableData.id;
            const updatedRows = [...data]
            updatedRows[index] = updatedRow
            setTimeout(() => {
              setData(updatedRows)
              // setProductsData(updatedRows)
              resolve()
            }, 2000)
          })

        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first"
        }}
      />

      <div className='invoiceform'>


   
        {calculation_array.map((data,index)=>{
          return(
            <>
            <span>amount:  {data.amount}</span>
            <span>tax:  {data.tax}</span>
            <span>unit_price:  {data.unit_price}</span>
            <span>discounted_amount:  {data.discounted_amount}</span>
            <span>tax_amount:  {data.tax_amount}</span>
            
            </>
          )
        })}
        <span>roundoff:  {round_off}</span>



        <Grid container>
          <Grid item><p>SubTotal:<BiIcons.BiRupee /> </p></Grid>
          <Grid item><p>{table_data.subTotal}</p></Grid>
        </Grid>
        <Grid container >
          <Grid item >
            <TextField
              variant="standard"

              value={table_data.discountAmount}
              type='tel'
              label='Discount'
              InputLabelProps={{ style: { fontSize: 20 } }}

              onChange={(e) => {
                var Discount = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)

                setTableData((prev_value) => ({
                  ...prev_value,
                  discountAmount: Discount
                }))


              }}

            />
          </Grid>
          
          <Grid item  alignitems style={{ display: "flex" }}  >
            <Select

              value={table_data.discountType}
              select
              onChange={(e) => {
                setTableData((prev_value) => ({
                  ...prev_value,
                  discountType: e.target.value
                }))
              }}
            >
              <MenuItem key='1' value='percentage'>{<AiIcons.AiOutlinePercentage />}</MenuItem>
              <MenuItem key='2' value='number'>{<BiIcons.BiRupee />}</MenuItem>
            </Select>
          </Grid>
        </Grid>


       
        {taxType ?
          <>

            <Grid container>
              <Grid item><p>SGST:<BiIcons.BiRupee /></p></Grid>
              <Grid item><p>{gst/2}</p></Grid>
            </Grid>


            <Grid container>
              <Grid item><p>CGST:<BiIcons.BiRupee /></p></Grid>
              <Grid item><p>{gst/2}</p></Grid>
            </Grid>
          </>
          : 
          
          <Grid container>
            <Grid item><p>IGST:<BiIcons.BiRupee /></p></Grid>
            <Grid item><p>{gst}</p></Grid>
          </Grid>}



        <TextField
          variant='standard'
          type='tel'
          label='Shipping Charges'
          value={table_data.shippingCharges}
          onChange={(e) => {
            var ShippingCharges = isNaN(parseInt(e.target.value)) ? parseInt(0) : parseInt(e.target.value)
            // setShippingCharges(parseInt(e.target.value))

            setTableData((prev_value) => ({
              ...prev_value,
              shippingCharges: ShippingCharges
            }))
          }}
          InputLabelProps={{ style: { fontSize: 20 } }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><BiIcons.BiRupee /></InputAdornment>,
            style: { fontSize: 20, }
          }}
        />




        <Grid container>
          <Grid item><p>Total:<BiIcons.BiRupee /></p></Grid>
          <Grid item><p>{finalTotal}</p></Grid>
        </Grid>





      </div>


    </div>
  );
}

export default AddInvoiceTable;