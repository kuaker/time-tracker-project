// src/pages/EditEntryPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getTimeEntries,
  updateTimeEntry,
} from "../services/timeServicesEntires";
import type { TimeEntry } from "../services/timeServicesEntires";
import { Layout, Typography, message, Button } from "antd";
import TimeEntryForm from "../components/TimeEntryForm";

const { Content } = Layout;
const { Title } = Typography;

const EditEntryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<TimeEntry | null>(null);

  useEffect(() => {
    getTimeEntries().then((entries) => {
      const found = entries.find((e) => e._id === id);
      if (found) setEntry(found);
      else message.error("Entrada no encontrada");
    });
  }, [id]);

  const handleEditSubmit = async (data: TimeEntry) => {
    if (!entry?._id) return;

    try {
      await updateTimeEntry(entry._id, data);
      message.success("Entrada actualizada correctamente");
      navigate("/"); // volver al listado
    } catch {
      message.error("Error al actualizar la entrada");
    }
  };

  if (!entry) return <div>Cargando entrada...</div>;

  return (
    <Layout style={{ padding: "2rem", maxWidth: 800, margin: "auto" }}>
      <Content>
        <Title level={2}>Editar Entrada</Title>
        <TimeEntryForm initialData={entry} onSubmit={handleEditSubmit} />
        <Button type="link" onClick={() => navigate("/")}>
          ← Volver al listado
        </Button>
      </Content>
    </Layout>
  );
};

export default EditEntryPage;
