export const UserName_Validation={
    required:"UserName is required",
    minLength:{
      value:4,
      message:'The userName must be at least 4 characters'
    },
    maxLength:{
    value:8,
    message:'The userName may not be greater than 8 characters.'
    },
    pattern:{
     value:/^[A-Za-z]{3,}\d+$/,
     message:'The userName must contain letters, and end with numbers without spaces.'
    }
  }
  
  export const Country_Validation={
    required:"Country is required",
    pattern:{
      value:/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-' ]?[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/,
      message:"Please Enter a valid Country"
    }
  }
  export const Phone_Validation={
    required:"PhoneNumber is required",
    pattern:{
      value:/^(\+20|0)?1[0-2,5]\d{8}$/,
      message:"Please Enter a valid Egyption Number"
    }
  }
  export const Password_Validation={
    required:'Password is Required',
    pattern:{
      value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
     message:"The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
   }
  }
  
  
  export const PasswordComfirm_Validation={
    required:'confirmPassword is Required'
   }
  
   export const Email_Validation={
    required:'Email is Required',
    pattern:{
      value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message:'Please Enter a valid Email'
     }
   }
  export const Code_Validation={
    required:'otp is Required',
    minLength:{
      value:4,
      message:"Enter min 4 characters"
     }
   }
  export const Project_Title_Validation={
  required:'Title is Required'

  }
  export const Project_Desc_Validation={
  required:'Description is Required'

  }
  export const Project_Id_Validation={
  required:'Project is Required'

  }
  export const User_Id_Validation={
  required:'User is Required'

  }