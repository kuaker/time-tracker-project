import { useEffect, useState } from "react";
import TimeEntryForm from "./components/TimeEntryForm";
import {
  deleteTimeEntry,
  createTimeEntry,
  getTimeEntries,
  updateTimeEntry,
} from "./services/timeServicesEntires";

import type { TimeEntry } from "./services/timeServicesEntires";
import { exportToCSV } from "./utils/exportCSV";
import { exportToExcel } from "./utils/exportExcel";

import {
  Layout,
  Typography,
  Button,
  DatePicker,
  Space,
  List,
  Popconfirm,
  message,
} from "antd";
import dayjs from "dayjs";

const { Title } = Typography;
const { Content } = Layout;
const { RangePicker } = DatePicker;

function App() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);

  useEffect(() => {
    getTimeEntries()
      .then((data) => setEntries(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddEntry = async (entry: TimeEntry) => {
    try {
      const newEntry = await createTimeEntry(entry);
      setEntries((prev) => [newEntry, ...prev]);
    } catch (err) {
      message.error("Error al guardar la entrada");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTimeEntry(id);
      setEntries((prev) => prev.filter((entry) => entry._id !== id));
    } catch (err) {
      message.error("Error al eliminar la entrada");
    }
  };

  const handleEditSubmit = async (entry: TimeEntry) => {
    if (!editingEntry || !editingEntry._id) return;
    try {
      const updated = await updateTimeEntry(editingEntry._id, entry);
      setEntries((prev) =>
        prev.map((e) => (e._id === updated._id ? updated : e))
      );
      setEditingEntry(null);
    } catch {
      message.error("Error al actualizar la entrada");
    }
  };

  const startEditing = (entry: TimeEntry) => {
    setEditingEntry(entry);
  };

  const filteredEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.date).getTime();
    const start = startDate ? new Date(startDate).getTime() : -Infinity;
    const end = endDate ? new Date(endDate).getTime() : Infinity;
    return entryDate >= start && entryDate <= end;
  });

  return (
    <div
      style={{
        height: "100vh", // alto de toda la ventana
        width: "100vw", // ancho de toda la ventana
        display: "flex",
        justifyContent: "center", // centrado horizontal
        alignItems: "center", // centrado vertical
        backgroundColor: "#f0f2f5", // gris claro (fondo de Ant Design)
        padding: "20px", // espacio interno
        boxSizing: "border-box",
      }}
    >
      <Layout style={{ padding: "2rem", maxWidth: 800, margin: "auto" }}>
        <Content>
          <Title level={2}>Cargador de horas</Title>

          {editingEntry ? (
            <>
              <Title level={4}>Editando entrada</Title>
              <TimeEntryForm
                onSubmit={handleEditSubmit}
                initialData={editingEntry}
              />
              <Button
                type="link"
                onClick={() => setEditingEntry(null)}
                style={{ marginTop: "1rem" }}
              >
                Cancelar edición
              </Button>
            </>
          ) : (
            <>
              <Title level={4}>Nueva entrada</Title>
              <TimeEntryForm onSubmit={handleAddEntry} />
            </>
          )}

          <Space size="middle" style={{ margin: "2rem 0" }}>
            <RangePicker
              onChange={(dates) => {
                setStartDate(dates?.[0]?.toISOString() || "");
                setEndDate(dates?.[1]?.toISOString() || "");
              }}
            />
            <Button onClick={() => exportToCSV(filteredEntries)}>📤 CSV</Button>
            <Button onClick={() => exportToExcel(filteredEntries)}>
              📊 Excel
            </Button>
          </Space>

          <List
            itemLayout="horizontal"
            dataSource={filteredEntries}
            renderItem={(entry) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => startEditing(entry)}>
                    ✏️
                  </Button>,
                  <Popconfirm
                    title="¿Seguro que querés eliminar esta entrada?"
                    onConfirm={() => handleDelete(entry._id!)}
                  >
                    <Button type="link" danger>
                      🗑️
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  title={dayjs(entry.date).format("YYYY-MM-DD")}
                  description={`${entry.hours}h - ${entry.description}`}
                />
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
