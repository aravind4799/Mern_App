import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import React,{ useState, useEffect} from 'react'
import DisplayItem from './Components/DisplayItem'
import DisplayCustomer from './Components/DisplayCustomer'


import {AddItem} from './Pages/Inventory';
import {AddCustomer,AddInvoice} from './Pages/Sales';

function App() {
  const [purchase_or_sales,toggle]=useState(true)
  //true = sales route 
  //false = purchase route
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path='/inventory/addproduct' exact component={AddItem}/>
        <Route path='/inventory/product/overview/:id' exact component={DisplayItem}/>

        <Route path='/sales/addcustomer' exact>
          <AddCustomer 
           Sales={true}
           route='/customers/' 
          />
        </Route>

        <Route path='/sales/addinvoice' exact>
         <AddInvoice
         Sales={true}
         route='/invoice/'
         /> 
        </Route>
          
        <Route path='/sales/customer/overview/:id' exact>
          <DisplayCustomer
          Sales={true}
          />
        </Route>  



        <Route path='/purchase/addvendor' exact>
          <AddCustomer
          Sales={false}
          route='/vendors/'
          />
        </Route>
        <Route path='/purchase/addbill' exact>
          <AddInvoice
          Sales={false}
          route='/bills/'
          />
        </Route>

        <Route path='/purchase/vendor/overview/:id' exact>
          <DisplayCustomer
          Sales={false}
          />
        </Route>



      </Switch>
    </Router>
    
  )
}

export default App;
