export default function validateOrderForm(form){
    const errorValidation={};

    const name=form.clientName?form.clientName.tirm(): "";
    if(!name){
        errorValidation.clientName="Ім'я клієнта є обов'язковим";
    }else if (name.length<2){
        errorValidation.clientName="Ім'я повинне містити щонайменше 2 символи";
    } else if (name.length>50){
        errorValidation.clientName="Ім'я не повинне перевищувати 50 символів";
    }

    const phone=form.clientPhone?form.clientPhone.trim() : "";
    const phoneRegex=/^(\+380|0)\d{9}$/;
    if (!phone){
        errorValidation.clientPhone="Номер телефону є обов'язковим";
    } else if (!phoneRegex.test(phone)){
        errorValidation.clientPhone="Некоректний номер телефону";
    }

    const address=form.clientAddress?form.clientAddress.trim() : "";
    if(!address){
        errorValidation.clientAddress="Адреса є обов'язковою";
    }else if (address.length<5){
        errorValidation.clientAddress="Адреса занадто коротка (мінімум 5 символів)";
    }

    const qty=Number(form.quantity);
    if(isNaN(qty) || qty<1 || quantity>10){
        errorValidation.quantity="Мінімальна кількість порцій 1, максимальна - 10"
    }

    if(form.comment && form.comment.length>200){
        errorValidation.comment="Задовгий коментар, максимальна довжина 200 символів"
    }

    return errorValidation;
}
