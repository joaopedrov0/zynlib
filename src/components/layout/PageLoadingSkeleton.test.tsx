import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageLoadingSkeleton } from "./PageLoadingSkeleton";
import RootLoading from "@/app/loading";
import DisciplineLoading from "@/app/[disciplineSlug]/loading";
import SubjectLoading from "@/app/[disciplineSlug]/[subjectSlug]/loading";
import TopicLoading from "@/app/[disciplineSlug]/[subjectSlug]/[topicSlug]/loading";
import EditLoading from "@/app/[disciplineSlug]/[subjectSlug]/[topicSlug]/edit/loading";
import HistoryLoading from "@/app/[disciplineSlug]/[subjectSlug]/[topicSlug]/history/loading";

describe("PageLoadingSkeleton", () => {
  it("announces the loading state to assistive technology", () => {
    render(<PageLoadingSkeleton />);

    expect(screen.getByRole("status").textContent).toContain("Carregando");
  });

  it.each([
    ["/", RootLoading],
    ["/[disciplineSlug]", DisciplineLoading],
    ["/[disciplineSlug]/[subjectSlug]", SubjectLoading],
    ["/[disciplineSlug]/[subjectSlug]/[topicSlug]", TopicLoading],
    ["/[disciplineSlug]/[subjectSlug]/[topicSlug]/edit", EditLoading],
    ["/[disciplineSlug]/[subjectSlug]/[topicSlug]/history", HistoryLoading],
  ])("is the loading boundary of route %s", (_route, Loading) => {
    expect(Loading).toBe(PageLoadingSkeleton);
  });
});
