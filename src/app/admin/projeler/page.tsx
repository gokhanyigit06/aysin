"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects, deleteProject, Project } from "@/lib/adminDb";

export default function AdminProjeler() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setProjects(await getProjects());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`"${title}" projesini silmek istediğinize emin misiniz?`)) return;
    await deleteProject(id);
    await load();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div>
          <h1 className="admin-page-title">Projeler</h1>
          <p className="admin-page-sub">Tüm projeleri yönetin</p>
        </div>
        <Link href="/admin/projeler/yeni">
          <button className="admin-btn">+ Yeni Proje</button>
        </Link>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>Yükleniyor...</div>
        ) : projects.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>Henüz proje yok.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Proje</th>
                <th>Yıl</th>
                <th>Kapsam</th>
                <th>Kapak</th>
                <th>Durum</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.title}</div>
                    <div style={{ fontSize: "12px", color: "#9ca3af" }}>{p.slug}</div>
                  </td>
                  <td>{p.year}</td>
                  <td style={{ maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.scope}</td>
                  <td>
                    <span style={{ fontSize: "11px", color: "#6b7280", background: "#f5f5f5", padding: "2px 8px", borderRadius: "4px" }}>
                      {p.coverAspect}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-tag ${p.isSeed ? "admin-tag-seed" : "admin-tag-live"}`}>
                      {p.isSeed ? "Seed" : "Canlı"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href={`/admin/projeler/${p.id}`}>
                        <button className="admin-btn-ghost" style={{ padding: "6px 14px", fontSize: "12px" }}>Düzenle</button>
                      </Link>
                      <button className="admin-btn-danger" onClick={() => handleDelete(p.id!, p.title)}>Sil</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
