import { describe, it, expect } from "vitest";
import { toSubjectPath, toTopicPath } from "./catalogPathRows";
import { DisciplineRecord, SubjectRecord, TopicRecord } from "@/types/database";

const discipline: DisciplineRecord = {
  id: "d1",
  name: "Matemática",
  slug: "matematica",
  description: null,
  created_at: "2026-01-01T00:00:00Z",
};

const subject: SubjectRecord = {
  id: "s1",
  discipline_id: "d1",
  name: "Cálculo",
  slug: "calculo",
  description: null,
  order_index: 0,
  created_at: "2026-01-01T00:00:00Z",
};

const topic: TopicRecord = {
  id: "t1",
  subject_id: "s1",
  name: "Limites",
  slug: "limites",
  description: null,
  order_index: 0,
  created_at: "2026-01-01T00:00:00Z",
};

describe("catalogPathRows", () => {
  it("splits an embedded subject row into discipline and subject", () => {
    const path = toSubjectPath({ ...subject, discipline });

    expect(path).toEqual({ discipline, subject });
  });

  it("splits an embedded topic row into discipline, subject and topic", () => {
    const path = toTopicPath({ ...topic, subject: { ...subject, discipline } });

    expect(path).toEqual({ discipline, subject, topic });
  });
});
