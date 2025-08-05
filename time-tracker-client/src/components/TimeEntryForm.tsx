import { Form, Input, DatePicker, InputNumber, Button } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import type { TimeEntry } from "../services/timeServicesEntires";

interface TimeEntryFormProps {
  onSubmit: (entry: TimeEntry) => void;
  initialData?: TimeEntry;
}

const TimeEntryForm = ({ onSubmit, initialData }: TimeEntryFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        date: dayjs(initialData.date),
        hours: initialData.hours,
        taskName: initialData.taskName,
        description: initialData.description,
      });
    }
  }, [initialData, form]);

  interface TimeEntryFormValues {
    date: dayjs.Dayjs;
    hours: number;
    taskName?: string;
    description: string;
  }

  const handleFinish = (values: TimeEntryFormValues) => {
    const formatted: TimeEntry = {
      date: values.date.toISOString(),
      hours: values.hours,
      taskName: values.taskName || "", // Ensure taskName is a string
      description: values.description,
    };
    onSubmit(formatted);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        label="Fecha"
        name="date"
        rules={[{ required: true, message: "La fecha es obligatoria" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Nombre de la tarea"
        name="taskName"
        rules={[
          { required: true, message: "El nombre de la tarea es obligatorio" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Horas"
        name="hours"
        rules={[
          { required: true, message: "Cantidad de horas obligatoria" },
          {
            type: "number",
            min: 0.1,
            max: 24,
            message: "Debe estar entre 0.1 y 24",
          },
        ]}
      >
        <InputNumber step={0.5} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Descripción"
        name="description"
        rules={[{ required: true, message: "La descripción es obligatoria" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialData ? "Actualizar entrada" : "Guardar entrada"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TimeEntryForm;
