import { useState } from "react";

function InputComponent({
  value,
  onChange,
  onAdd,
}: {
  value: string;
  onChange: (v: string) => void;
  onAdd: () => void;
}) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
        placeholder="Escribe algo..."
        style={{ padding: "8px", flex: 1, borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <button onClick={onAdd} style={{ padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }}>
        Agregar
      </button>
    </div>
  );
}

function ListComponent({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.length === 0 ? (
        <li style={{ color: "#999" }}>La lista está vacía.</li>
      ) : (
        items.map((item, index) => (
          <li
            key={index}
            style={{
              padding: "8px 12px",
              marginBottom: "6px",
              background: "#f3f4f6",
              borderRadius: "4px",
            }}
          >
            {item}
          </li>
        ))
      )}
    </ul>
  );
}

export default function MiniX() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const handleAdd = () => {
    if (input.trim() === "") return;
    setItems((prev) => [...prev, input.trim()]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: "480px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Comentarios</h1>
      <InputComponent value={input} onChange={setInput} onAdd={handleAdd} />
      <ListComponent items={items} />
    </div>
  );
}
