"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  frameworkIcons,
  frameworkPalette,
  frameworkPrototypeCopy,
  type FrameworkView,
  type ScreenView,
} from "@/content/frameworkPrototype";
import type { Locale } from "@/content/portfolio";

const codeExample = `Container:
  Fill: _color.Neutral.Light
  BorderColor: _color.Brand.Primary
  Radius: _radius.Medium
Button:
  Fill: _color.Brand.Primary
  Color: _color.Surface.Raised`;

export function FrameworkPrototype({ locale }: { locale: Locale }) {
  const t = frameworkPrototypeCopy[locale];
  const [view, setView] = useState<FrameworkView>("home");
  const [screen, setScreen] = useState<ScreenView>("form");
  const [copied, setCopied] = useState("");
  const [iconFilter, setIconFilter] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<(typeof frameworkIcons)[number]>(frameworkIcons[7]);
  const [source, setSource] = useState(codeExample);
  const [search, setSearch] = useState("Primary");
  const [replacement, setReplacement] = useState("Secondary");
  const [initiativeStage, setInitiativeStage] = useState(2);
  const [openInitiativePanel, setOpenInitiativePanel] = useState(0);

  const filteredIcons = useMemo(
    () => frameworkIcons.filter(([name]) => name.includes(iconFilter.toLowerCase().trim())),
    [iconFilter],
  );
  const transformed = search ? source.split(search).join(replacement) : source;

  async function copyVariable(variable: string) {
    try {
      await navigator.clipboard.writeText(variable);
      setCopied(variable);
    } catch {
      setCopied(variable);
    }
  }

  return (
    <div className="framework-window">
      <div className="framework-toolbar">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <b>{t.product}</b>
        <i>{t.prototype}</i>
      </div>

      <div className="prototype-header">
        {view !== "home" ? (
          <button className="prototype-back" type="button" onClick={() => setView("home")}>
            <span aria-hidden="true">←</span> {t.back}
          </button>
        ) : <span />}
        <span className="prototype-badge">POWER APPS · UX SYSTEM</span>
      </div>

      {view === "home" && (
        <div className="framework-layout prototype-home">
          <div className="framework-intro">
            <p>{t.prototype}</p>
            <h3>{t.homeTitle}</h3>
            <p>{t.homeLead}</p>
            <div className="framework-tokens" aria-hidden="true">
              <span /><span /><span /><span />
            </div>
          </div>
          <div className="framework-cards">
            {(["components", "screens", "icons"] as const).map((target, index) => (
              <button
                className={`framework-card card-${index + 1}`}
                key={target}
                type="button"
                onClick={() => setView(target)}
              >
                <span><b>{t.views[target].title}</b><small>{t.views[target].description}</small></span>
                <i aria-hidden="true">0{index + 1}</i>
              </button>
            ))}
          </div>
        </div>
      )}

      {view === "components" && (
        <div className="prototype-body component-lab">
          <section aria-labelledby="palette-title">
            <header className="prototype-section-head">
              <div><span>01</span><h4 id="palette-title">{t.paletteTitle}</h4></div>
              <p>{t.paletteHelp}</p>
            </header>
            <div className="color-grid">
              {frameworkPalette.map((color) => (
                <button
                  type="button"
                  className="color-token"
                  key={color.variable}
                  style={{ "--token-color": color.hex } as CSSProperties}
                  data-hex={color.hex}
                  onClick={() => copyVariable(color.variable)}
                  aria-label={`${color.variable}, ${color.hex}`}
                >
                  <span aria-hidden="true" />
                  <small>{color.variable}</small>
                </button>
              ))}
            </div>
            <p className="copy-result" aria-live="polite">
              {copied ? `${t.copied}: ${copied}` : "\u00a0"}
            </p>
          </section>
          <section className="type-components" aria-labelledby="type-title">
            <div>
              <span>02</span><h4 id="type-title">{t.typography}</h4>
              <p className="type-h1">H1 <b>Display</b></p>
              <p className="type-h2">H2 <b>Heading</b></p>
              <p className="type-h3">H3 <b>Subheading</b></p>
              <p className="type-body">Aa <b>Body / UI text</b></p>
            </div>
            <div className="component-states">
              <span>03</span><h4>{t.componentExamples}</h4>
              <button type="button">{t.primaryAction}</button>
              <button type="button" className="outline">{t.secondaryAction}</button>
              <label htmlFor="component-example">{t.inputLabel}<input id="component-example" placeholder={t.placeholder} /></label>
              <span className="status-pill">{t.activeStatus}</span>
            </div>
          </section>
        </div>
      )}

      {view === "icons" && (
        <div className="prototype-body icon-lab">
          <div className="icon-gallery">
            <label htmlFor="icon-filter">{t.iconSearch}</label>
            <input id="icon-filter" value={iconFilter} onChange={(event) => setIconFilter(event.target.value)} />
            <div className="icon-grid">
              {filteredIcons.map((icon) => (
                <button
                  type="button"
                  key={icon[0]}
                  className={selectedIcon[0] === icon[0] ? "selected" : ""}
                  aria-label={icon[0]}
                  aria-pressed={selectedIcon[0] === icon[0]}
                  onClick={() => setSelectedIcon(icon)}
                >{icon[1]}</button>
              ))}
            </div>
          </div>
          <aside className="icon-preview" aria-label={t.iconPreview}>
            <p>{t.iconPreview}</p>
            <span aria-hidden="true">{selectedIcon[1]}</span>
            <strong>{selectedIcon[0]}</strong>
            <div><i /><i /><i /><i /></div>
          </aside>
        </div>
      )}

      {view === "screens" && (
        <div className="prototype-body screens-lab">
          <div className="screen-tabs" role="tablist" aria-label={t.views.screens.title}>
            {(Object.keys(t.screenTabs) as ScreenView[]).map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={screen === item}
                onClick={() => setScreen(item)}
              >{t.screenTabs[item]}</button>
            ))}
          </div>

          {screen === "initiative" && (
            <section className="initiative-screen" role="tabpanel">
              <header className="initiative-heading">
                <div><span>PROCESS / 01</span><h4>{t.initiative.title}</h4><p>{t.initiative.lead}</p></div>
                <b>{t.prototype}</b>
              </header>
              <div className="initiative-stages" aria-label={t.initiative.title}>
                {t.initiative.stages.map((stage, index) => (
                  <button key={stage} type="button" className={index === initiativeStage ? "current" : index < initiativeStage ? "done" : ""} aria-current={index === initiativeStage ? "step" : undefined} onClick={() => setInitiativeStage(index)}>
                    <span>{index < initiativeStage ? "✓" : index + 1}</span>{stage}
                  </button>
                ))}
              </div>
              <div className="initiative-workspace">
                <div className="initiative-panels">
                  {t.initiative.panels.map((panel, index) => {
                    const expanded = openInitiativePanel === index;
                    return <section key={panel} className="initiative-panel">
                      <button type="button" aria-expanded={expanded} onClick={() => setOpenInitiativePanel(expanded ? -1 : index)}><span>{panel}</span><i aria-hidden="true">{expanded ? "−" : "+"}</i></button>
                      {expanded && <div className="initiative-panel-body">
                        {index === 0 && <div className="initiative-fields">{t.initiative.fields.map((field, fieldIndex) => <label key={field}>{field}{fieldIndex === 2 ? <textarea rows={3} defaultValue={t.initiative.values[fieldIndex]} /> : <input defaultValue={t.initiative.values[fieldIndex]} />}</label>)}</div>}
                        {index === 1 && <div className="initiative-assessment"><span><b>01</b>{t.review}</span><span><b>02</b>{t.discovery}</span><span><b>03</b>{t.approval}</span></div>}
                        {index === 2 && <button className="attachment-drop" type="button"><b>＋ {t.initiative.attachments}</b><small>{t.initiative.attachmentHelp}</small></button>}
                        {index === 3 && <div className="initiative-plan"><span /><span /><span /><p>{t.initiative.pendingApproval}</p></div>}
                      </div>}
                    </section>;
                  })}
                </div>
                <aside className="initiative-approval">
                  <h5>{t.initiative.approvers}</h5>
                  <div><span>✓</span><p><b>{t.review}</b><small>{t.initiative.approved}</small></p></div>
                  <div><span>2</span><p><b>{t.approval}</b><small>{t.initiative.pendingApproval}</small></p></div>
                  <section><h6>◌ {t.initiative.history}</h6>{t.initiative.historyItems.map((item, index) => <p key={item}><b>{index + 1}</b>{item}</p>)}</section>
                  <button type="button">{t.initiative.nextLevel} →</button>
                </aside>
              </div>
            </section>
          )}

          {screen === "form" && (
            <section className="standard-screen" role="tabpanel">
              <header><div><span>{t.step}</span><h4>{t.formTitle}</h4><p>{t.formLead}</p></div><b>{t.draft}</b></header>
              <div className="standard-form">
                <label>{t.fields[0]}<input defaultValue={locale === "es" ? "Optimizar proceso interno" : "Improve an internal process"} /></label>
                <label>{t.fields[1]}<select defaultValue=""><option value="">{t.select}</option>{t.areaOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                <label className="wide">{t.fields[2]}<textarea rows={3} defaultValue={locale === "es" ? "Descripción ficticia para mostrar el patrón de captura." : "Fictional description used to demonstrate the capture pattern."} /></label>
                <label>{t.fields[3]}<select defaultValue={t.priorityOptions[1]}>{t.priorityOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                <aside><span /><p><b>{t.review}</b><small>{t.discovery}</small></p><span /><p><b>{t.approval}</b><small>{t.pending}</small></p></aside>
              </div>
              <footer><button type="button">{t.cancel}</button><button type="button" className="primary">{t.save}</button></footer>
            </section>
          )}

          {screen === "gallery" && (
            <section className="standard-screen gallery-screen" role="tabpanel">
              <header><div><span>{t.dataView}</span><h4>{t.galleryTitle}</h4><p>{t.galleryLead}</p></div><button type="button">{t.newItem}</button></header>
              <div className="prototype-table-wrap"><table><thead><tr>{t.galleryColumns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{t.galleryRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={cell}>{index === 3 ? <span className="table-status">{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div>
              <nav className="table-pagination" aria-label="Pagination"><button type="button">←</button><button type="button" aria-current="page">1</button><button type="button">2</button><button type="button">→</button></nav>
            </section>
          )}

          {screen === "replace" && (
            <section className="replace-screen" role="tabpanel">
              <header><span>{t.utility}</span><h4>{t.replaceTitle}</h4><p>{t.replaceLead}</p></header>
              <div className="replace-editors">
                <label>{t.input}<textarea value={source} onChange={(event) => setSource(event.target.value)} rows={9} /></label>
                <label>{t.output}<textarea value={search ? transformed : t.emptyReplace} readOnly rows={9} /></label>
              </div>
              <div className="replace-controls">
                <label>{t.search}<input value={search} onChange={(event) => setSearch(event.target.value)} /></label>
                <span aria-hidden="true">→</span>
                <label>{t.replacement}<input value={replacement} onChange={(event) => setReplacement(event.target.value)} /></label>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
