"use client";

import { useId, useState, type KeyboardEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  FileText,
} from "lucide-react";

export type TimelineEvent = {
  id: string;
  date: string;
  topic: string;
  title: string;
  body: string;
  context?: string;
  limit: string;
  sources: { label: string; url: string }[];
  kind?: string;
};

export function InteractiveTimeline({
  events,
  label,
}: {
  events: TimelineEvent[];
  label: string;
}) {
  const id = useId();
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState(events[0].id);
  const visible = events.filter(
    (event) => filter === "Todos" || event.topic === filter,
  );
  const index = Math.max(
    0,
    visible.findIndex((event) => event.id === selected),
  );
  const active = visible[index];

  function choose(next: number, focus = false) {
    const event = visible[next];
    if (!event) return;
    setSelected(event.id);
    if (focus) document.getElementById(`${id}-tab-${event.id}`)?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const next = {
      ArrowRight: Math.min(index + 1, visible.length - 1),
      ArrowLeft: Math.max(index - 1, 0),
      Home: 0,
      End: visible.length - 1,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    choose(next, true);
  }

  return (
    <div className="interactive-timeline">
      <div className="filters timeline-filters" aria-label={`Filtrar ${label}`}>
        {["Todos", ...new Set(events.map((event) => event.topic))].map(
          (topic) => (
            <button
              key={topic}
              aria-pressed={filter === topic}
              className={filter === topic ? "active" : ""}
              onClick={() => setFilter(topic)}
            >
              {topic}
            </button>
          ),
        )}
      </div>
      <p className="timeline-instruction">
        <CalendarDays size={16} />
        Selecione uma data para ler o evento completo e consultar suas fontes.
      </p>
      <div
        className="timeline-rail"
        role="tablist"
        aria-label={label}
        onKeyDown={handleKeyDown}
      >
        {visible.map((event, eventIndex) => (
          <button
            key={event.id}
            id={`${id}-tab-${event.id}`}
            role="tab"
            aria-selected={active.id === event.id}
            aria-controls={`${id}-panel`}
            tabIndex={index === eventIndex ? 0 : -1}
            className={index === eventIndex ? "selected" : ""}
            onClick={() => choose(eventIndex)}
          >
            <span className="rail-date">{event.date}</span>
            <span className="rail-dot" />
            <span className="rail-title">{event.title}</span>
          </button>
        ))}
      </div>
      <article
        className="timeline-panel"
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active.id}`}
        tabIndex={0}
      >
        <div className="timeline-panel-meta">
          <span>{active.date}</span>
          <span>{active.kind ?? active.topic}</span>
          <span>
            Evento {index + 1} de {visible.length}
          </span>
        </div>
        <h3>{active.title}</h3>
        <p className="timeline-event-body">{active.body}</p>
        {active.context && (
          <div className="timeline-context">
            <h4>Por que este evento importa</h4>
            <p>{active.context}</p>
          </div>
        )}
        <aside className="timeline-limit">
          <strong>Como interpretar este registro</strong>
          <p>{active.limit}</p>
        </aside>
        <div className="timeline-event-sources">
          <h4>
            <FileText size={16} />
            Fontes deste evento
          </h4>
          {active.sources.map((source) => (
            <a
              href={source.url}
              key={source.url}
              target="_blank"
              rel="noreferrer"
            >
              {source.label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      </article>
      <div className="timeline-pagination">
        <button disabled={index === 0} onClick={() => choose(index - 1)}>
          <ArrowLeft size={16} />
          Evento anterior
        </button>
        <span aria-live="polite">
          {index + 1} / {visible.length}
        </span>
        <button
          disabled={index === visible.length - 1}
          onClick={() => choose(index + 1)}
        >
          Próximo evento
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
