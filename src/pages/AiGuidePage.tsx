import styled from "@emotion/styled";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { useState } from "react";

interface FutureEvent {
  id: number;
  name: string;
  date: string;
  category: string;
  amount: number;
  priority: string;
}

const INITIAL_EVENTS: FutureEvent[] = [
  {
    id: 1,
    name: "부산 2박 3일 여행",
    date: "2026-06-14",
    category: "여행",
    amount: 420000,
    priority: "높음",
  },
  {
    id: 2,
    name: "친구 생일 선물",
    date: "2026-05-24",
    category: "선물",
    amount: 80000,
    priority: "보통",
  },
  {
    id: 3,
    name: "노트북 수리",
    date: "2026-06-02",
    category: "전자기기",
    amount: 150000,
    priority: "높음",
  },
];

const CATEGORIES = ["여행", "선물", "전자기기", "의료", "기타"];
const PRIORITIES = ["보통", "낮음", "높음"];

const AiGuidePage = () => {
  const [events, setEvents] = useState<FutureEvent[]>(INITIAL_EVENTS);
  const [form, setForm] = useState({
    name: "",
    date: new Date().toISOString().slice(0, 10),
    category: "여행",
    amount: "",
    priority: "보통",
  });

  // ── 수정 관련 state ──────────────────────────────────
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<FutureEvent>>({});

  const total = events.reduce((sum, e) => sum + e.amount, 0);

  // ── 추가 ─────────────────────────────────────────────
  const handleAdd = () => {
    if (!form.name || !form.amount) return;
    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: form.name,
        date: form.date,
        category: form.category,
        amount: Number(form.amount),
        priority: form.priority,
      },
    ]);
    setForm({
      name: "",
      date: new Date().toISOString().slice(0, 10),
      category: "여행",
      amount: "",
      priority: "보통",
    });
  };

  // ── 삭제 ─────────────────────────────────────────────
  const handleDelete = (id: number) => {
    if (editingId === id) setEditingId(null);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // ── 수정 시작 ─────────────────────────────────────────
  const handleEditStart = (event: FutureEvent) => {
    setEditingId(event.id);
    setEditForm({ ...event });
  };

  // ── 수정 취소 ─────────────────────────────────────────
  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  // ── 수정 저장 ─────────────────────────────────────────
  const handleEditSave = () => {
    if (!editingId || !editForm.name || !editForm.amount) return;
    setEvents((prev) =>
      prev.map((e) =>
        e.id === editingId ? ({ ...e, ...editForm } as FutureEvent) : e,
      ),
    );
    setEditingId(null);
    setEditForm({});
  };

  return (
    <Layout>
      <Container>
        <PageHeader
          label="AI FUTURE GUIDE"
          title="미래 일정 기반 소비 가이드"
          desc="다가올 미래 일정에 맞춰 예산을 똑똑하게 분배하고, 소비 가이드에 따라 안정적으로 자산을 관리해 보세요"
        />

        <ThreeCol>
          {/* 왼쪽: 추가 폼 */}
          <Card>
            <CardTitle>미래 일정 작성</CardTitle>
            <FormGroup>
              <Input
                type="text"
                placeholder="이벤트명"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </FormGroup>
            <FormRow>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              <Select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </FormRow>
            <FormRow>
              <Input
                type="number"
                placeholder="예상 지출"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
              <Select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                {PRIORITIES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </Select>
            </FormRow>
            <AiButton onClick={handleAdd}>✦ AI 분석에 추가</AiButton>
          </Card>

          {/* 중간: 이벤트 목록 */}
          <Card>
            <EventsHeader>
              <CardTitle>예정 이벤트</CardTitle>
              <TotalBadge>총 {total.toLocaleString()}원</TotalBadge>
            </EventsHeader>

            {events.map((event) => (
              <EventItem key={event.id}>
                {editingId === event.id ? (
                  /* ── 인라인 수정 폼 ── */
                  <EditFormWrap>
                    <EditInput
                      type="text"
                      placeholder="이벤트명"
                      value={editForm.name ?? ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                    <FormRow>
                      <EditInput
                        type="date"
                        value={editForm.date ?? ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, date: e.target.value })
                        }
                      />
                      <EditSelect
                        value={editForm.category ?? "여행"}
                        onChange={(e) =>
                          setEditForm({ ...editForm, category: e.target.value })
                        }
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </EditSelect>
                    </FormRow>
                    <FormRow>
                      <EditInput
                        type="number"
                        placeholder="예상 지출"
                        value={editForm.amount ?? ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            amount: Number(e.target.value),
                          })
                        }
                      />
                      <EditSelect
                        value={editForm.priority ?? "보통"}
                        onChange={(e) =>
                          setEditForm({ ...editForm, priority: e.target.value })
                        }
                      >
                        {PRIORITIES.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </EditSelect>
                    </FormRow>
                    <EditActions>
                      <CancelButton onClick={handleEditCancel}>
                        취소
                      </CancelButton>
                      <SaveButton onClick={handleEditSave}>저장</SaveButton>
                    </EditActions>
                  </EditFormWrap>
                ) : (
                  /* ── 일반 표시 ── */
                  <>
                    <EventTop>
                      <EventName>{event.name}</EventName>
                      <EventAmount>
                        {event.amount.toLocaleString()}원
                      </EventAmount>
                    </EventTop>
                    <EventMeta>
                      {event.date} · {event.category} · 중요도 {event.priority}
                    </EventMeta>
                    <EventActions>
                      <IconButton
                        aria-label="수정"
                        onClick={() => handleEditStart(event)}
                      >
                        ✏
                      </IconButton>
                      <IconButton
                        danger
                        aria-label="삭제"
                        onClick={() => handleDelete(event.id)}
                      >
                        🗑
                      </IconButton>
                    </EventActions>
                  </>
                )}
              </EventItem>
            ))}
          </Card>

          {/* 오른쪽: AI 가이드 */}
          <AiCard>
            <AiIconBox>🤖</AiIconBox>
            <AiTitle>AI 소비 가이드</AiTitle>
            <AiItem>
              <strong>예상 지출:</strong> 미래 일정으로 약{" "}
              {total.toLocaleString()}원이 필요합니다.
            </AiItem>
            <AiItem>
              <strong>저축 제안:</strong> 8주 동안 매주{" "}
              {Math.round(total / 8).toLocaleString()}원을 별도 통장에
              분리하세요.
            </AiItem>
            <AiItem>
              <strong>소비 조정:</strong> 식사와 쇼핑/여가 항목에서 주
              25,000원만 줄이면 여행 준비금의 약 38%를 확보할 수 있습니다.
            </AiItem>
            <ReflectButton>가이드 반영</ReflectButton>
          </AiCard>
        </ThreeCol>
      </Container>
    </Layout>
  );
};

export default AiGuidePage;

const Container = styled.div`
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ThreeCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr 0.9fr;
  gap: 16px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 24px;
`;

const CardTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #2c2c2a;
  margin-bottom: 16px;
`;

const FormGroup = styled.div`
  margin-bottom: 12px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 0.5px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-size: 14px;
  color: #2c2c2a;
  background: #fff;
  outline: none;
  font-family: inherit;

  &::placeholder {
    color: #b4b2a9;
  }

  &:focus {
    border-color: rgba(0, 0, 0, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 14px;
  border: 0.5px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-size: 14px;
  color: #2c2c2a;
  background: #fff;
  outline: none;
  font-family: inherit;
  cursor: pointer;

  &:focus {
    border-color: rgba(0, 0, 0, 0.3);
  }
`;

const AiButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #111;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  margin-top: 4px;

  &:hover {
    background: #333;
  }
`;

const EventsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  p {
    margin-bottom: 0;
  }
`;

const TotalBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  background: #e8f7f1;
  color: #0f6e56;
  padding: 4px 10px;
  border-radius: 12px;
`;

const EventItem = styled.div`
  background: #f7f6f3;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const EventTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const EventName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #2c2c2a;
`;

const EventAmount = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #2c2c2a;
  white-space: nowrap;
`;

const EventMeta = styled.p`
  font-size: 12px;
  color: #888780;
  margin-bottom: 10px;
`;

const EventActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const IconButton = styled.button<{ danger?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: #888780;
  padding: 4px;
  border-radius: 4px;
  font-size: 14px;

  &:hover {
    color: ${({ danger }) => (danger ? "#E24B4A" : "#2c2c2a")};
    background: #fff;
  }
`;

// ── 인라인 수정 폼 스타일 ──────────────────────────────────

const EditFormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 0.5px solid rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  font-size: 13px;
  color: #2c2c2a;
  background: #fff;
  outline: none;
  font-family: inherit;

  &::placeholder {
    color: #b4b2a9;
  }

  &:focus {
    border-color: rgba(0, 0, 0, 0.35);
  }
`;

const EditSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 0.5px solid rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  font-size: 13px;
  color: #2c2c2a;
  background: #fff;
  outline: none;
  font-family: inherit;
  cursor: pointer;

  &:focus {
    border-color: rgba(0, 0, 0, 0.35);
  }
`;

const EditActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 2px;
`;

const SaveButton = styled.button`
  background: #2c2c2a;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: #444;
  }
`;

const CancelButton = styled.button`
  background: none;
  border: 0.5px solid rgba(0, 0, 0, 0.18);
  border-radius: 6px;
  padding: 7px 16px;
  font-size: 13px;
  color: #888780;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: #fff;
    color: #2c2c2a;
  }
`;

// ── AI 카드 스타일 ──────────────────────────────────────────

const AiCard = styled.div`
  background: #2c2c2a;
  border-radius: 12px;
  padding: 24px;
  color: #fff;
`;

const AiIconBox = styled.div`
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 16px;
`;

const AiTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
`;

const AiItem = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 12px;

  strong {
    color: #fff;
    font-weight: 600;
  }
`;

const ReflectButton = styled.button`
  margin-top: 20px;
  background: #1d9e75;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: #0f6e56;
  }
`;
