//Сделайте компонент FoodPreferencesForm.tsx с Formik.
//Форма “Food Preferences”:
//1. Чекбоксы
//
//• Vegan (value="vegan")
//• Gluten-free (value="gluten-free")
//• Nut-free (value="nut-free")
//• Dairy-free (value="dairy-free")
//
//2. Поле textarea:
//• comment
//3. initialValues:
//4. При сабмите:
//• вывести values в консоль
//• сделать resetForm()
//5. Кнопка Submit.

import { Formik, Form, Field  } from 'formik';
import type { FormikHelpers } from "formik"

export function FoodPreferencesForm() {

    interface OrderFormValues {
      restrictions: string[];
      comment: string
    }

    const initialValues: OrderFormValues = {
       restrictions: [], 
       comment: ''
    }

    const handleSubmit = (values: OrderFormValues, action: FormikHelpers<OrderFormValues>) => {
        console.log(`Your order: ${values.restrictions},  comment: ${values.comment}`)
        action.resetForm()
    }

    return (
        
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>

                    <label>
                        Vegan
                        <Field type='checkbox' value="vegan" name="restrictions"/>
                    </label>

                    <label>
                        Gluten-free
                        <Field type='checkbox' value='gluten-free' name="restrictions"/>
                    </label>

                    <label>
                        Nut-free    
                        <Field type='checkbox' value='nut-free' name="restrictions"/>
                    </label>

                    <label>
                        Dairy-free
                        <Field type='checkbox' value='dairy-free' name="restrictions"/>
                    </label>

                    <label>
                        Enter your comment:
                        <Field as="textarea" name='comment'/>
                    </label>

                    <button type="submit">Place your order</button>
                </Form>
            </Formik>
    )
}