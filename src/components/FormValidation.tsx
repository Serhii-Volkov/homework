//Сделать форму “Заявка на доставку”
//Требования к форме
//1. Поля формы:
//• username (text)
//• email (email)
//• deliveryTime (select) со значениями:
//• "" (пустое, placeholder “– Choose delivery time –”)
//• "morning"
//• "afternoon"
//• "evening"
//• delivery (radio):
//• "pickup"
//• "courier"
//• "drone"
//• restrictions (checkboxes, массив строк):
//• "vegan"
//• "gluten-free"
//• "nut-free"
//• message (textarea)
//
//2. initialValues должны быть типизированы интерфейсом.
//3. Валидация через Yup:
//• username: строка, минимум 2 символа, максимум 30, обязательное
//• email: валидный email, обязательное
//• deliveryTime: обязательное (нельзя оставлять пустым)
//• delivery: обязательное (одно из значений)
//• restrictions: минимум 1 выбранный чекбокс
//• message: минимум 10 символов, обязательное
//
//4. Ошибки показывать через ErrorMessage под каждым полем.
//
//• Ошибки должны быть красного цвета. Просто inline style.
//
//5. На сабмите:
//• вывести values в console.log
//• сбросить форму
import { Formik, Form, Field, ErrorMessage   } from 'formik';
import type { FormikHelpers } from "formik"
import * as Yup from 'yup';

export function FormValidation() {

    interface OrderFormValues {
        name: string;
        email: string;
        deliveryTime: string;
        delivery: string;
        restrictions: string[];
        message: string;
    }

    const initialValues: OrderFormValues = {
        name: '',
        email: '',
        deliveryTime: '',
        delivery: '',
        restrictions: [],
        message: ''
    }

    const OrderFormSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Name must be at least 2 characters')
            .max(30, 'Name must be at most 30 characters')
            .required('Name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email address'),
        deliveryTime: Yup.string()
            .required('Delivery time is required'),
        delivery: Yup.string()
            .required('Delivery is required'),
        restrictions: Yup.array()
            .min(1, 'Select at least one restriction'),
        message: Yup.string()
            .min(10, 'Name must be at least 10 characters')
            .required('Message is required')
    })


    const handleSubmit = (values: OrderFormValues, action: FormikHelpers<OrderFormValues>) => {
        console.log(`data: ${values.name}, ${values.email} delivery time: ${values.deliveryTime}, ${values.delivery}, ${values.restrictions}, ${values.message}`)
        action.resetForm()
    }

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={OrderFormSchema}>
                <Form>
                    <label>
                        Name
                        <Field type='text' name='name'/>
                    </label>
                    <ErrorMessage name="name" component="div" className='error'/>

                    <label>
                        Email
                        <Field type='email' name='email'/>
                    </label>
                    <ErrorMessage name='email'component='div'className='error'/>

                    <label>
                        deliveryTime 
                        <Field as='select' name='deliveryTime'>
                            <option value="">-- Choose time --</option>
                            <option value="morning">morning</option>
                            <option value="afternoon">afternoon</option>
                            <option value="evening">evening</option>
                        </Field>
                    </label>
                    <ErrorMessage name='deliveryTime'component='div' className='error'/>


                    <h3>delivery</h3>

                    <label>
                        Pickup
                        <Field type='radio' value='pickup' name='delivery'/>
                    </label>
                    

                    <label>
                        Courier    
                        <Field type='radio' value='courier' name='delivery'/>
                    </label>

                    <label>
                        Drone
                        <Field type='radio' value='drone' name='delivery'/>   
                    </label>
                    <ErrorMessage name='delivery'component='div' className='error'/>

                    <h3>restrictions</h3>

                    <label>
                        Vegan
                        <Field type='checkbox' value='vegan' name='restrictions'/>
                    </label>

                    <label>
                        Gluten-free
                        <Field type='checkbox' value='gluten-free' name='restrictions'/>
                    </label>

                    <label>
                        Nut-free
                        <Field type='checkbox' value='nut-free' name='restrictions'/>
                    </label>
                    <ErrorMessage name='restrictions' component='div' className='error'/>

                    <h3>message</h3>
                    <Field as='textarea' name='message' placeholder='Enter your merssage...'/>
                    <ErrorMessage name='message' component='div' className='error'/>
                    

                    <button type="submit">Place your order</button>
                </Form>
            </Formik>
        </>
    )
}