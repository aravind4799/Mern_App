import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function Barcode({ barcodeData }) {

    const [barcode_value,setBarcode] = useState("")
    const[itemData, setProductData] = useState({})
  
    return (<Autocomplete
        id="combo-box-demo"
        options={barcodeData}
        getOptionLabel={(option) => option.bar_code.toString()}
        style={{ width: 300 }}
        onChange={(event, newValue) => {
            console.log('selected barcode')
            console.log(newValue?newValue.bar_code:"");
            setProductData(newValue?newValue:{});
          }}
          
        renderInput={(params) => <TextField {...params} label="Barcode" variant="outlined" />}
        />);
}


export default Barcode;


<Autocomplete
          id="item_box"
          onChange={(event, newValue) => {
            console.log(newValue);

            
            if(newValue){
              setProductData(newValue)
              setTableData((prev_value) => ({
                ...prev_value,
                itemName: newValue.name,
              }))

            }
            
          }}

          options={item_data}
          getOptionLabel={(option) => option.name ? option.name : ""}
          value={itemData}
          
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Item Name" variant="outlined" />}
        />