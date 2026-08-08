"use client";

import { useState } from "react";
import type { Locale } from "@/content/portfolio";

type ProjectSlug = "finanzas-personales" | "wirin" | "mi-carrera-tech";

const text = {
  es: {
    demo: "Prototipo interactivo", budget: "Presupuesto", evolution: "Evolución", investments: "Inversiones", history: "Historial",
    income: "Ingreso mensual", expenses: "Gastos", savings: "Ahorro libre", add: "Agregar", category: "Nueva categoría", monthly: "Resumen mensual",
    lastMonth: "Último mes", sixMonths: "6 meses", year: "1 año", portfolio: "Portafolio activo", asset: "Activo", value: "Valor", return: "Resultado",
    dashboard: "Dashboard", tasks: "Tareas", users: "Usuarios", ranking: "Ranking", bibliography: "Bibliografías", totalTasks: "Total tareas", pending: "Pendientes", completed: "Completadas",
    searchTask: "Buscar tarea", newTask: "Nueva tarea", details: "Detalles", role: "Filtrar por rol", volunteer: "Voluntario", success: "Tasa de éxito", deliver: "Entregar",
    careerDashboard: "Dashboard", plan: "Plan de estudios", calendar: "Calendario", data: "Base de datos", progress: "Avance", passed: "Aprobadas", average: "Promedio", exams: "Exámenes restantes",
    inProgress: "En curso", promoted: "Promocionada", nextExams: "Próximos exámenes", noExams: "No hay exámenes próximos", backup: "Crear respaldo", restored: "Respaldo preparado correctamente",
  },
  en: {
    demo: "Interactive prototype", budget: "Budget", evolution: "Evolution", investments: "Investments", history: "History",
    income: "Monthly income", expenses: "Expenses", savings: "Available savings", add: "Add", category: "New category", monthly: "Monthly summary",
    lastMonth: "Last month", sixMonths: "6 months", year: "1 year", portfolio: "Active portfolio", asset: "Asset", value: "Value", return: "Return",
    dashboard: "Dashboard", tasks: "Tasks", users: "Users", ranking: "Ranking", bibliography: "Bibliographies", totalTasks: "Total tasks", pending: "Pending", completed: "Completed",
    searchTask: "Search tasks", newTask: "New task", details: "Details", role: "Filter by role", volunteer: "Volunteer", success: "Success rate", deliver: "Deliver",
    careerDashboard: "Dashboard", plan: "Study plan", calendar: "Calendar", data: "Database", progress: "Progress", passed: "Passed", average: "Average", exams: "Remaining exams",
    inProgress: "In progress", promoted: "Promoted", nextExams: "Upcoming exams", noExams: "No upcoming exams", backup: "Create backup", restored: "Backup prepared successfully",
  },
} as const;

export function ProjectPrototype({ slug, locale }: { slug: string; locale: Locale }) {
  if (slug === "finanzas-personales") return <FinancePrototype locale={locale} />;
  if (slug === "wirin") return <WirinPrototype locale={locale} />;
  if (slug === "mi-carrera-tech") return <CareerPrototype locale={locale} />;
  return null;
}

function PrototypeShell({ title, label, children, tone }: { title: string; label: string; children: React.ReactNode; tone: ProjectSlug }) {
  return <div className={`mini-app mini-${tone}`}>
    <header><span>{tone === "wirin" ? "W" : tone === "finanzas-personales" ? "$" : "▣"}</span><div><b>{title}</b><small>{label}</small></div></header>
    {children}
  </div>;
}

function FinancePrototype({ locale }: { locale: Locale }) {
  const t = text[locale];
  const [tab, setTab] = useState<"budget" | "evolution" | "investments" | "history">("budget");
  const [income, setIncome] = useState(1250000);
  const [categories, setCategories] = useState([200000, 60000, 150000]);
  const [draft, setDraft] = useState("");
  const spent = categories.reduce((total, value) => total + value, 0);
  const savings = Math.max(0, income - spent - 700000);
  const tabs = [["budget", t.budget], ["evolution", t.evolution], ["investments", t.investments], ["history", t.history]] as const;
  return <PrototypeShell title={locale === "es" ? "Gestión financiera" : "Financial manager"} label={t.demo} tone="finanzas-personales">
    <div className="mini-tabs" role="tablist">{tabs.map(([key, label]) => <button key={key} role="tab" aria-selected={tab === key} onClick={() => setTab(key)}>{label}</button>)}</div>
    <div className="mini-app-body">
      {tab === "budget" && <div className="finance-grid">
        <section><label>{t.income}<input type="number" value={income} onChange={(event) => setIncome(Number(event.target.value))} /></label><h5>{t.expenses}</h5>{categories.map((value, index) => <button className="expense-row" key={index} onClick={() => setCategories((items) => items.filter((_, itemIndex) => itemIndex !== index))}><span>{locale === "es" ? `Categoría ${index + 1}` : `Category ${index + 1}`}</span><b>${value.toLocaleString()}</b></button>)}<div className="mini-add"><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={t.category} /><button onClick={() => { if (draft.trim()) { setCategories((items) => [...items, 50000]); setDraft(""); } }}>{t.add}</button></div></section>
        <aside><h5>{t.monthly}</h5><div className="budget-ring" style={{ "--spent": `${Math.min(92, spent / Math.max(income, 1) * 100)}%` } as React.CSSProperties}><b>${savings.toLocaleString()}</b><small>{t.savings}</small></div><p><span>{t.income}</span><b>${income.toLocaleString()}</b></p><p><span>{t.expenses}</span><b>${spent.toLocaleString()}</b></p></aside>
      </div>}
      {tab === "evolution" && <><div className="metric-strip"><span>{t.lastMonth}<b>+US$ 1,280</b></span><span>{t.sixMonths}<b>+US$ 5,470</b></span><span>{t.year}<b>+US$ 10,830</b></span></div><div className="mini-chart" aria-label={t.evolution}>{[12,18,16,26,31,38,43,55,62,76,84,94].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></>}
      {tab === "investments" && <div className="mini-table"><h5>{t.portfolio}</h5><div className="mini-table-head"><span>{t.asset}</span><span>{t.value}</span><span>{t.return}</span></div>{[["Índice global", "$4,680", "+20.2%"], ["Tecnología", "$3,340", "+25.1%"], ["Renta fija", "$2,030", "-3.2%"]].map((row) => <div key={row[0]}>{row.map((cell, i) => <span key={cell} className={i === 2 ? (cell.startsWith("+") ? "positive" : "negative") : ""}>{cell}</span>)}</div>)}</div>}
      {tab === "history" && <div className="mini-table"><h5>{t.history}</h5>{["2026-08-08", "2026-08-01", "2026-07-24", "2026-07-17"].map((date, index) => <div key={date}><span>{date}</span><span>US$ {(16040 - index * 430).toLocaleString()}</span><span className="tag">{index ? "Manual" : "Auto"}</span></div>)}</div>}
    </div>
  </PrototypeShell>;
}

function WirinPrototype({ locale }: { locale: Locale }) {
  const t = text[locale];
  const [view, setView] = useState<"dashboard" | "tasks" | "users" | "ranking" | "bibliography">("dashboard");
  const [priority, setPriority] = useState(false);
  const nav = [["dashboard", t.dashboard], ["tasks", t.tasks], ["users", t.users], ["ranking", t.ranking], ["bibliography", t.bibliography]] as const;
  const users = locale === "es" ? ["Ana Fernández", "Julián Ruiz", "Marina Pérez", "Tomás Gómez"] : ["Ana Fernández", "Julian Ruiz", "Marina Perez", "Tomas Gomez"];
  return <PrototypeShell title="WIRIN" label={t.demo} tone="wirin">
    <div className="wirin-layout"><nav aria-label="WIRIN">{nav.map(([key, label]) => <button key={key} className={view === key ? "active" : ""} onClick={() => setView(key)}>{label}</button>)}</nav><div className="wirin-main">
      {view === "dashboard" && <><div className="wirin-stats"><span><b>6</b>{t.totalTasks}</span><span><b>2</b>{t.pending}</span><span><b>4</b>{t.completed}</span></div><div className="wirin-summary"><div className="mini-donut" /><p>{locale === "es" ? "Flujo bibliográfico" : "Bibliographic workflow"}<b>67%</b></p></div></>}
      {view === "tasks" && <><div className="mini-toolbar"><input placeholder={t.searchTask} /><label><input type="checkbox" checked={priority} onChange={(event) => setPriority(event.target.checked)} />{locale === "es" ? "Prioritarias" : "Priority"}</label><button>{t.newTask}</button></div>{["Revisar OCR", "Validar páginas", "Corregir estructura"].slice(0, priority ? 1 : 3).map((task, i) => <article className="task-card" key={task}><span>{i ? t.pending : t.inProgress}</span><h5>{task}</h5><p>{locale === "es" ? "Material de demostración" : "Demonstration material"}</p><button>{t.details}</button></article>)}</>}
      {view === "users" && <div className="user-list"><div className="mini-toolbar"><select><option>{t.role}</option><option>Admin</option><option>{t.volunteer}</option></select><input placeholder={locale === "es" ? "Buscar usuario" : "Search users"} /></div>{users.map((user, i) => <details key={user}><summary>{user}</summary><p>{i % 2 ? t.volunteer : "Admin"} · {i + 1} {t.tasks.toLowerCase()}</p></details>)}</div>}
      {view === "ranking" && <div className="ranking-list"><h5>🏆 {t.ranking}</h5>{users.slice(0,3).map((user, i) => <p key={user}><b>{i + 1}</b><span>{user}</span><i style={{ width: `${80 - i * 20}%` }} /><strong>{80 - i * 20}%</strong></p>)}</div>}
      {view === "bibliography" && <div className="mini-table"><div className="mini-table-head"><span>{t.bibliography}</span><span>{t.tasks}</span><span>{locale === "es" ? "Acción" : "Action"}</span></div>{["Accesibilidad web", "Diseño inclusivo"].map((title, i) => <div key={title}><span>{title}</span><span>{i + 2}</span><button>{t.deliver}</button></div>)}</div>}
    </div></div>
  </PrototypeShell>;
}

function CareerPrototype({ locale }: { locale: Locale }) {
  const t = text[locale];
  const [view, setView] = useState<"dashboard" | "plan" | "calendar" | "data">("dashboard");
  const [selectedDay, setSelectedDay] = useState(8);
  const [notice, setNotice] = useState(false);
  const nav = [["dashboard", t.careerDashboard], ["plan", t.plan], ["calendar", t.calendar], ["data", t.data]] as const;
  const courses = locale === "es" ? ["Ingeniería de software", "Gestión del conocimiento", "Arquitectura de software", "Economía tecnológica"] : ["Software engineering", "Knowledge management", "Software architecture", "Technology economics"];
  return <PrototypeShell title="Mi Carrera Tech" label={t.demo} tone="mi-carrera-tech">
    <div className="mini-tabs" role="tablist">{nav.map(([key, label]) => <button key={key} role="tab" aria-selected={view === key} onClick={() => setView(key)}>{label}</button>)}</div><div className="mini-app-body career-body">
      {view === "dashboard" && <><div className="career-metrics"><span><b>28%</b>{t.progress}</span><span><b>5/18</b>{t.passed}</span><span><b>9.2</b>{t.average}</span><span><b>26</b>{t.exams}</span></div><section><h5>{t.nextExams}</h5>{courses.slice(0,3).map((course, i) => <p key={course}><time>{18 + i * 4} JUN</time><span>{course}<small>Parcial {i + 1}</small></span></p>)}</section></>}
      {view === "plan" && <div className="course-list">{courses.map((course, i) => <details key={course}><summary><span>●</span>{course}<b>{i < 2 ? t.promoted : t.inProgress}</b></summary><p>{locale === "es" ? "Notas y correlatividades ficticias para esta demostración." : "Fictional grades and prerequisites for this demonstration."}</p></details>)}</div>}
      {view === "calendar" && <div className="career-calendar"><div><h5>{locale === "es" ? "Agosto 2026" : "August 2026"}</h5>{Array.from({ length: 31 }, (_, i) => i + 1).map((day) => <button key={day} className={selectedDay === day ? "selected" : ""} onClick={() => setSelectedDay(day)}>{day}</button>)}</div><aside><h5>{t.nextExams}</h5>{selectedDay === 18 ? <p>{courses[0]}</p> : <p>{t.noExams}</p>}</aside></div>}
      {view === "data" && <div className="career-data"><h5>{t.data}</h5><p>materias.json · 18 {locale === "es" ? "registros locales" : "local records"}</p><button onClick={() => { setNotice(true); window.setTimeout(() => setNotice(false), 1800); }}>{t.backup}</button><pre>{`{\n  "courses": 18,\n  "passed": 5,\n  "storage": "local"\n}`}</pre></div>}
    </div>{notice && <div className="mini-notice" role="status">✓ {t.restored}</div>}
  </PrototypeShell>;
}
