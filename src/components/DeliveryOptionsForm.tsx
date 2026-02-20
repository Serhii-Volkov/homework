//ТЗ 2
//Сделайте компонент DeliveryOptionsForm.tsx с Formik.
//
//Форма “Delivery Options”:
//	1.	Radio group delivery
//	•	Pickup (value="pickup")
//	•	Courier (value="courier")
//	•	Drone (value="drone")
//
//	2.	Select deliveryTime:
//	•	placeholder option value="" текст: -- Choose time --
//	•	Morning value="morning"
//	•	Afternoon value="afternoon"
//	•	Evening value="evening"
//
//	3.	initialValues:
//	4.	При сабмите:
//	•	вывести values в консоль
//	•	сбросить форму resetForm()

import { Formik, Form, Field } from "formik";
import type { FormikHelpers } from "formik";

interface FormValues {
  delivery: string;
  deliveryTime: "";
}

const initialValues: FormValues = {
  delivery: "",
  deliveryTime: ""
};

const handleSubmit = (values: FormValues, action: FormikHelpers<FormValues>) => {
        console.log(`Delivery: ${values.delivery},  Delivery time:: ${values.deliveryTime}`)
        action.resetForm()
    }

export function DeliveryOptionsForm() {
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <h2>Delivery Options</h2>

          <label>
            Pickup
            <Field type="radio" name="delivery" value="pickup" />
          </label>

          <label>
            Courier
            <Field type="radio" name="delivery" value="courier" />
          </label>

          <label>
            Drone
            <Field type="radio" name="delivery" value="drone" />
          </label>

          <h3>Delivery time:</h3>
          <Field as="select" name="deliveryTime">
            <option value="">-- Choose time --</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </Field>
          <br />
          <br />
          <button type="submit">Place your order</button>
        </Form>
      </Formik>
    </>
  );
}
