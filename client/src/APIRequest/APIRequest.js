import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper";
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import {getToken, setToken, setUserDetails} from "../helper/SessionHelper";
import {SetSummary} from "../redux/state-slice/summary-slice";

const BaseURL= "http://localhost:5050/api/v1"
const AxiosHeader={headers:{"token":getToken()}}

export function NewTaskRequest(title,description){


    store.dispatch(ShowLoader())

    let URL=BaseURL+"/createTask";
    let PostBody={"title":title,"description":description,status:"New"}

    return axios.post(URL,PostBody,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            SuccessToast("New Task Created")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }

    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    })
}


export function LoginRequest(email,password){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/login";
    let PostBody={"email":email,"password":password}
    return axios.post(URL,PostBody).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            setToken(res.data['token']);
            setUserDetails(res.data['data']);
            SuccessToast("Login Success")
            return true;
        }
        else{
            ErrorToast("Invalid Email or Password")
            return  false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}




export function RegistrationRequest(email,firstName,lastName,mobile,password,photo){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/registration";
    let PostBody={email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password, photo:photo}
    return axios.post(URL,PostBody).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status']==="fail"){
                if(res.data['data']['keyPattern']['email']===1){
                    ErrorToast("Email Already Exist")
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong")
                    return false;
                }
            }
            else {
                SuccessToast("Registration Success")
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }).catch((err)=>{
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        return false;
    })
}

export function SummaryRequest(){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/taskStatusCount";
    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            store.dispatch(SetSummary(res.data['data']))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}


